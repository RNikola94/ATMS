import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../utils/firebase.utils";
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Real-time listener for users
export const listenToUsers = () => (dispatch) => {
  dispatch(setLoading(true));

  const unsubscribe = onSnapshot(
    collection(db, "users"),
    (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setUsers(users));
      dispatch(setLoading(false));
      toast.success("Users data updated in real-time.");
    },
    (error) => {
      dispatch(setError(error.message));
      toast.error("Failed to load users in real-time.");
    }
  );

  return unsubscribe;
};

// Update user
export const updateUser = createAsyncThunk("users/updateUser", async (user, { rejectWithValue }) => {
  try {
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
    toast.success("User updated successfully!");
    return user;
  } catch (error) {
    toast.error("Failed to update user.");
    return rejectWithValue(error.message);
  }
});

// Delete a user
export const deleteUser = createAsyncThunk("users/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, "users", userId));
    toast.success("User deleted successfully!");
    return userId;
  } catch (error) {
    toast.error("Failed to delete user.");
    return rejectWithValue(error.message);
  }
});

// Create project
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const projectRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: serverTimestamp(),
      });
      return { id: projectRef.id, ...projectData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUserIndex = state.users.findIndex(user => user.id === action.payload.id);
        if (updatedUserIndex !== -1) state.users[updatedUserIndex] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setLoading, setUsers, setError } = userSlice.actions;
export default userSlice.reducer;
