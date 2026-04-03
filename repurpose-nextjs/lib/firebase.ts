import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDfBZhhzYATm0P5_6FWjkCCDG4jJ1ITla0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "repurposeai-71dd2.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "repurposeai-71dd2",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "repurposeai-71dd2.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function getFirebaseApp(): FirebaseApp {
  try {
    return getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  } catch (e) {
    console.error("[ZenoAI] Firebase init error:", e);
    return initializeApp(firebaseConfig, `app-${Date.now()}`);
  }
}

const app = getFirebaseApp();

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");
googleProvider.setCustomParameters({ prompt: "select_account" });

export default app;
