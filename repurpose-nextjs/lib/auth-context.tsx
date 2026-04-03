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
    if (!auth) {
      setLoading(false);
      console.warn("[ZenoAI] Auth not initialized — check Firebase env vars in Vercel.");
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) {
      setSignInError("Auth not configured. Check Firebase environment variables.");
      return;
    }
    setSignInError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      console.error("[ZenoAI] Sign in error:", err);

      if (err.code === "auth/popup-blocked") {
        setSignInError("Popup was blocked by your browser. Please allow popups for this site.");
      } else if (err.code === "auth/popup-closed-by-user") {
        // User closed popup — not an error
      } else if (err.code === "auth/unauthorized-domain") {
        setSignInError("This domain is not authorised in Firebase. Add it to Firebase Console → Authentication → Authorised domains.");
      } else if (err.code === "auth/cancelled-popup-request") {
        // Ignore — happens when popup opens twice
      } else {
        setSignInError(err.message ?? "Sign in failed. Please try again.");
      }
    }
  };

  const signOutUser = async () => {
    if (!auth) return;
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
