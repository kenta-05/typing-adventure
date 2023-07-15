import "firebase/compat/firestore";
import { Auth, GoogleAuthProvider, User } from "firebase/auth";
import { createContext } from "react";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export type FirebaseContext = {
  auth: Auth;
  provider: GoogleAuthProvider;
  user: User;
  highscore: number;
  username: string;
};
export const FirebaseContext = createContext<Partial<FirebaseContext>>({});
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
