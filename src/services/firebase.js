import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5G9DYUMR7rP8c4z5MI2E4rU8AgFBP4Xo",
  authDomain: "studentos-4506.firebaseapp.com",
  projectId: "studentos-4506",
  storageBucket: "studentos-4506.firebasestorage.app",
  messagingSenderId: "831460102761",
  appId: "1:831460102761:web:d11ac80cb2c475bd8088f8",
  measurementId: "G-Y80CZHGNWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
