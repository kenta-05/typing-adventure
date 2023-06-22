"use client";
import React, { useEffect, useState, createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

export const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

export function FirebaseProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [user, setUser] = useState(null);
  const [highscore, setHighscore] = useState(null);

  useEffect(() => {
    // Firebaseのアプリケーションを初期化します
    const app = initializeApp(firebaseConfig);

    // Firebaseの認証サービスのインスタンスを取得します
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    setAuth(auth);
    setProvider(provider);

    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
          // ドキュメントが存在しない場合、新たに作成
          await setDoc(userDocRef, {
            username: user.displayName,
            highscore: 0,
            monstername: "",
            uid: user.uid,
          });
        }

        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (doc) => {
            const data = doc.data();
            if (data) {
              setHighscore(data.highscore);
            }
          }
        );
        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth, provider, user, highscore }}>
      {children}
    </FirebaseContext.Provider>
  );
}
