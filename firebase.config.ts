import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { modifyString } from "./lib/genFunc";
import { Baglama } from "./lib/Interfaces";

function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

const firebaseConfig = {
  apiKey: requireEnv(process.env.NEXT_PUBLIC_API_KEY, "NEXT_PUBLIC_API_KEY"),
  authDomain: requireEnv(
    process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    "NEXT_PUBLIC_AUTH_DOMAIN",
  ),
  projectId: requireEnv(
    process.env.NEXT_PUBLIC_PROJECT_ID,
    "NEXT_PUBLIC_PROJECT_ID",
  ),
  storageBucket: requireEnv(
    process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    "NEXT_PUBLIC_STORAGE_BUCKET",
  ),
  messagingSenderId: requireEnv(
    process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    "NEXT_PUBLIC_MESSAGING_SENDER_ID",
  ),
  appId: requireEnv(process.env.NEXT_PUBLIC_APP_ID, "NEXT_PUBLIC_APP_ID"),
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const addBaglama = async (baglama: {
  title: string;
  boyut: string;
  govdeAgaci: string;
  tekneBoyu: string;
  tip: string;
  description: string;
  youtubeLink: string;
  images: string[];
  fiyat: number;
}) => {
  const data = {
    ...baglama,
    created_at: serverTimestamp(),
  };
  const result = await setDoc(
    doc(db, "baglama", modifyString(baglama.title)),
    data,
  );
  return result;
};

const updateBaglama = async (
  id: string,
  baglama: {
    title: string;
    boyut: string;
    govdeAgaci: string;
    tekneBoyu: string;
    tip: string;
    description: string;
    youtubeLink: string;
    images: string[];
    fiyat: number;
  },
) => {
  await updateDoc(doc(db, "baglama", id), {
    ...baglama,
    updated_at: serverTimestamp(),
  });
};

const getBaglamalar = async () => {
  const animeCollectionRef = collection(db, "baglama");
  const querySnapshot = await getDocs(animeCollectionRef);
  const queryList: Baglama[] = querySnapshot.docs.map((doc) => ({
    created_at: doc.data().created_at.seconds,
    tip: doc.data().tip,
    images: doc.data().images,
    description: doc.data().description,
    title: doc.data().title,
    id: doc.id || modifyString(doc.data().title),
    boyut: doc.data().boyut,
    govdeAgaci: doc.data().govdeAgaci,
    tekneBoyu: doc.data().tekneBoyu,
    fiyat: doc.data().fiyat,
    youtubeLink: doc.data().youtubeLink,
  }));
  return queryList;
};

const getBaglama = async (id: string) => {
  const animeCollectionRef = doc(db, "baglama", id);
  const querySnapshot = await getDoc(animeCollectionRef);
  if (querySnapshot.exists()) {
    const data = querySnapshot.data();
    const queryList: Baglama = {
      created_at: data.created_at?.seconds,
      tip: data.tip ?? "",
      images: data.images ?? [],
      description: data.description ?? "",
      title: data.title ?? "",
      id: querySnapshot.id || modifyString(data.title),
      boyut: data.boyut ?? "",
      govdeAgaci: data.govdeAgaci ?? "",
      tekneBoyu: data.tekneBoyu ?? "",
      fiyat: data.fiyat,
      youtubeLink: data.youtubeLink ?? "",
    };
    return queryList;
  }
};

export {
  app,
  db,
  storage,
  auth,
  addBaglama,
  updateBaglama,
  firebaseConfig,
  getBaglamalar,
  getBaglama,
};
