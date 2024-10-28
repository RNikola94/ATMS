import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../utils/firebase.utils";
import { collection, addDoc, updateDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';

const initialState = {
    tasks: [],
    loading: false,
    error: null
};

// Thunk to create a new task with assignment
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const taskRef = await addDoc(collection(db, 'tasks'), {
        ...taskData,
        isNew: true,
        createdAt: serverTimestamp(),
      });
      return { id: taskRef.id, ...taskData, isNew: true, createdAt: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to update task status with role-based checks
export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, status, userRole }, { rejectWithValue }) => {
    try {
      if (userRole !== 'admin' && userRole !== 'manager' && status === 'Completed') {
        return rejectWithValue("Unauthorized to mark task as completed");
      }
      
      if (userRole !== 'admin' && userRole !== 'contributor' && status === 'In Progress') {
        return rejectWithValue("Unauthorized to mark task as in progress");
      }

      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, { status });
      return { id: taskId, status };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to listen for real-time task updates
export const listenToTasks = () => (dispatch) => {
  const tasksCollection = collection(db, 'tasks');
  onSnapshot(tasksCollection, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()?.toISOString() || null,
    }));
    dispatch(setTasks(tasks));
  });
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    clearNewTaskFlags(state) {
      state.tasks.forEach(task => {
        if (task.isNew) {
          task.isNew = false;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => { state.loading = true; })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find(task => task.id === action.payload.id);
        if (task) {
          task.status = action.payload.status;
        }
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setTasks, clearNewTaskFlags } = tasksSlice.actions;
export default tasksSlice.reducer;
