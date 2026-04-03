"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  clearSignInError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInError: null,
  signInWithGoogle: async () => {},
  signOutUser: async () => {},
  clearSignInError: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signInError, setSignInError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    setSignInError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      console.error("[ZenoAI] Sign in error:", err);

      if (err.code === "auth/popup-blocked") {
        setSignInError("Popup was blocked. Please allow popups for this site and try again.");
      } else if (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request") {
        // User dismissed — not an error
      } else if (err.code === "auth/unauthorized-domain") {
        setSignInError("Domain not authorised in Firebase. Go to Firebase Console → Authentication → Authorised domains and add this site's URL.");
      } else {
        setSignInError(err.message ?? "Sign in failed. Please try again.");
      }
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("[ZenoAI] Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInError, signInWithGoogle, signOutUser, clearSignInError: () => setSignInError(null) }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
