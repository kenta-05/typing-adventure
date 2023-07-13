import { Auth, GoogleAuthProvider, User } from "firebase/auth";
import  { createContext } from "react";

export type FirebaseContext = {
  auth: Auth
  provider: GoogleAuthProvider
  user: User
  highscore: number
}
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
