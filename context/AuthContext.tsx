"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, getUserProfile, saveUserProfile } from "@/firebase.config";

/** Auth photoURL çok uzun data URL’leri reddedebilir */
const AUTH_PHOTO_URL_MAX = 1800;

type AuthContextValue = {
  user: User | null;
  /** Auth + Firestore birleşik görsel */
  photoURL: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (values: {
    displayName?: string | null;
    photoURL?: string | null;
  }) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setPhotoURL(null);
        setLoading(false);
        return;
      }
      try {
        const profile = await getUserProfile(nextUser.uid);
        setPhotoURL(profile?.photoURL || nextUser.photoURL || null);
      } catch {
        setPhotoURL(nextUser.photoURL || null);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  const updateUserProfile = useCallback(
    async (values: {
      displayName?: string | null;
      photoURL?: string | null;
    }) => {
      if (!auth.currentUser) {
        throw new Error("Oturum açık değil");
      }
      const uid = auth.currentUser.uid;
      const nextDisplayName =
        values.displayName !== undefined
          ? values.displayName
          : auth.currentUser.displayName;
      const nextPhoto =
        values.photoURL !== undefined
          ? values.photoURL
          : photoURL || auth.currentUser.photoURL;

      await saveUserProfile(uid, {
        displayName: nextDisplayName ?? null,
        photoURL: nextPhoto ?? null,
      });

      const authPayload: {
        displayName?: string | null;
        photoURL?: string | null;
      } = {};

      if (values.displayName !== undefined) {
        authPayload.displayName = values.displayName;
      }

      // Kısa http(s) URL’leri Auth’a yaz; data URL yalnızca Firestore’da kalır
      if (
        values.photoURL &&
        values.photoURL.length <= AUTH_PHOTO_URL_MAX &&
        !values.photoURL.startsWith("data:")
      ) {
        authPayload.photoURL = values.photoURL;
      }

      if (Object.keys(authPayload).length > 0) {
        await updateProfile(auth.currentUser, authPayload);
        await auth.currentUser.reload();
        setUser(auth.currentUser);
      }

      if (values.photoURL !== undefined) {
        setPhotoURL(values.photoURL);
      }
    },
    [photoURL],
  );

  const value = useMemo(
    () => ({
      user,
      photoURL,
      loading,
      login,
      logout,
      updateUserProfile,
    }),
    [user, user?.displayName, user?.email, photoURL, loading, login, logout, updateUserProfile],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth yalnızca AuthProvider içinde kullanılabilir");
  }
  return context;
}
