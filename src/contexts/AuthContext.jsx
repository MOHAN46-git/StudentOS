import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register
  async function register(email, password, additionalData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save additional user info to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      userId: user.uid,
      email: user.email,
      ...additionalData
    });
    
    return userCredential;
  }

  // Login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  // Reset Password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Fetch user profile data from Firestore
  async function fetchUserData(uid) {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    login,
    register,
    logout,
    resetPassword,
    fetchUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
