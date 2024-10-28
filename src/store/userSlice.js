import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../utils/firebase.utils';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Thunk to fetch all users for admins
const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const usersCollection = await getDocs(collection(db, 'users'));
    return usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Thunk to update a user’s role or details
const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, updates);
      return { id, updates };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload.updates };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
export { fetchUsers, updateUser };
