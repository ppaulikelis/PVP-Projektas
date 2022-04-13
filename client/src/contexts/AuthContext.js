import { createContext, useState, useEffect, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      res ? setUser(res) : setUser(null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const value = {
    user,
    signUp,
    signIn,
    logout,
    forgotPassword
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
