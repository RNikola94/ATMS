import { createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase.utils';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;

export const registerUser = (email, password, userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: user.email,
      role: userData.role,
    });

    const serializedUser = {
      uid: user.uid,
      email: user.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
    };

    dispatch(setUser(serializedUser));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      const serializedUser = {
        uid: user.uid,
        email: user.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
      };

      dispatch(setUser(serializedUser));
    }
    
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUser());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
