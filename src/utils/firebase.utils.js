// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const API_KEY = import.meta.env.VITE_API_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "atms-b80ea.firebaseapp.com",
  projectId: "atms-b80ea",
  storageBucket: "atms-b80ea.appspot.com",
  messagingSenderId: "267573901775",
  appId: "1:267573901775:web:161ec0031effe60a37faba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };


export const fetchUserById = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.exists() ? userSnapshot.data() : null;
};
