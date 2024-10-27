import { createSlice } from "@reduxjs/toolkit";
import { db } from "../utils/firebase.utils";
import { collection, addDoc, updateDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore'; 

const initialState = {
    tasks: [],
    loading: false,
    error: null
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload;
        },
        addTask(state, action) {
            state.tasks.push(action.payload);
        },
        updateTaskStatus(state, action) {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.status = action.payload.status;
            }
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearNewTaskFlags(state) {
            state.tasks.forEach(task => {
                if (task.isNew) {
                    task.isNew = false;
                }
            });
        },
    },
});

export const {
    setTasks,
    addTask,
    updateTaskStatus,
    setLoading,
    setError,
    clearNewTaskFlags,
} = taskSlice.actions;

export default taskSlice.reducer;

export const createTask = (taskData) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const taskRef = await addDoc(collection(db, 'tasks'), {
        ...taskData,
        isNew: true,
        createdAt: serverTimestamp(),
      });
      dispatch(addTask({ id: taskRef.id, ...taskData, isNew: true, createdAt: new Date().toISOString() }));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export const updateTask = (taskId, status) => async (dispatch) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, { status });
      dispatch(updateTaskStatus({ id: taskId, status }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

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
