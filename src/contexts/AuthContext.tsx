// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

// --------- Firebase safe init ---------

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let firebaseApp: FirebaseApp | null = null;
let firebaseInitError: Error | null = null;

try {
  const hasAllCoreFields =
    !!firebaseConfig.apiKey &&
    !!firebaseConfig.authDomain &&
    !!firebaseConfig.projectId &&
    !!firebaseConfig.appId;

  if (!hasAllCoreFields) {
    throw new Error(
      "Missing Firebase environment variables. Check VITE_FIREBASE_* in Vercel."
    );
  }

  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }
} catch (err) {
  console.error("🔥 Firebase init failed:", err);
  firebaseInitError = err as Error;
  firebaseApp = null;
}

// --------- Auth context types ---------

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  hasAuthError: boolean;
  authErrorMessage: string | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAuthError] = useState(!!firebaseInitError);
  const [authErrorMessage] = useState<string | null>(
    firebaseInitError ? firebaseInitError.message : null
  );

  useEffect(() => {
    if (!firebaseApp) {
      // No Firebase → just stop loading, UI still works (auth disabled)
      setLoading(false);
      return;
    }

    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!firebaseApp) {
      console.warn("Firebase not initialized. Sign-in disabled.");
      return;
    }
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    if (!firebaseApp) return;
    const auth = getAuth(firebaseApp);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOutUser,
        hasAuthError,
        authErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
