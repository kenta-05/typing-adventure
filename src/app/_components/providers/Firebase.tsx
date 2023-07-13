import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Auth, getAuth, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { FirebaseContext, firebaseConfig } from "@/firebase";

export const FirebaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>();
  const [provider, setProvider] = useState<GoogleAuthProvider>();
  const [user, setUser] = useState<User>();
  const [highscore, setHighscore] = useState();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    setAuth(auth);
    setProvider(provider);

    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user || undefined);

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
          await setDoc(userDocRef, {
            username: user.displayName,
            highscore: 0,
            monstername: "",
            uid: user.uid,
            email: user.email,
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
