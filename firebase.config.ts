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
import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { modifyString } from "./lib/genFunc";
import { Baglama } from "./lib/Interfaces";
// import { Anime, Category } from "@/lib/Interface";
// import { modifyString } from "@/lib/generalFunc";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();

const addBaglama = async (baglama: {
  title: string;
  boyut: string;
  govdeAgaci: string;
  tekneBoyu: string;
  tip: string;
  description: string;
  youtubeLink: string;
  images: string[];
}) => {
  const data = {
    ...baglama,
    created_at: serverTimestamp(),
  };
  const result = await setDoc(
    doc(db, "baglama", modifyString(baglama.title)),
    data
  );
  return result;
};

const addCategory = async (title: string) => {
  const data = {
    title,
    created_at: serverTimestamp(),
  };
  const result = await setDoc(doc(db, "categories", modifyString(title)), data);
  return result;
};

const updateMyProfile = async (values: any) => {
  try {
    const user = auth.currentUser;
    user
      ? await updateProfile(auth.currentUser, values)
      : console.log("user yok");
  } catch (error) {
    console.log(error);
  }
};

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log(user);
//     console.log(user.displayName);
//     updateProfile(user, {
//       displayName: "Biladerler Müzik",
//       photoURL: "https://eksiup.com/images/22/59/ib660995rinz.png",
//     })
//       .then(() => {
//         console.log("updated");
//         // ...
//       })
//       .catch((error) => {
//         console.log("error");
//       });
//   } else {
//     console.log("user yok");
//   }
// });

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
    const queryList: Baglama = {
      created_at: querySnapshot.data().created_at.seconds,
      tip: querySnapshot.data().tip,
      images: querySnapshot.data().images,
      description: querySnapshot.data().description,
      title: querySnapshot.data().title,
      id: querySnapshot.id || modifyString(querySnapshot.data().title),
      boyut: querySnapshot.data().boyut,
      govdeAgaci: querySnapshot.data().govdeAgaci,
      tekneBoyu: querySnapshot.data().tekneBoyu,
      fiyat: querySnapshot.data().fiyat,
      youtubeLink: querySnapshot.data().youtubeLink,
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
  updateMyProfile,
  firebaseConfig,
  getBaglamalar,
  getBaglama,
};
