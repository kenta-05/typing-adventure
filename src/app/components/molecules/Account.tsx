"use client";
import { FirebaseContext } from "@/app/providers/FirebaseProvider";
import {
  Auth,
  AuthProvider,
  User,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useContext } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

function Account() {
  const firebaseContext = useContext(FirebaseContext);
  if (!firebaseContext) {
    return;
  }
  const {
    auth,
    provider,
    user,
    highscore,
  }: {
    auth: Auth;
    provider: AuthProvider;
    user: User | null;
    highscore: number;
  } = firebaseContext;

  const signInWithGoogle = () => {
    if (auth && provider) {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const signOutWithGoogle = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div>
        <div className="bg-first">アカウント</div>
        {user ? (
          <>
            <div className="h-20 flex flex-col bg-second space-x-2 space-y-1 pt-1">
              <div className="flex">
                <p className="text-lg overflow-y-hidden pl-1">
                  現在のハイスコア:
                </p>
                <p className="text-xl overflow-y-hidden pl-1 text-red-500 font-bold">
                  {highscore || "----"}
                </p>
              </div>
              <div className="flex overflow-y-hidden items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={user.photoURL || "/main/background.png"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full shadow-lg"
                  />
                  <p className="text-black text-[1rem] whitespace-nowrap overflow-hidden max-w-[6.9em] text-overflow-ellipsis">
                    {user.displayName}
                  </p>
                </div>
                <button
                  onClick={signOutWithGoogle}
                  className="bg-base mr-2 w-28 h-8 border-2 border-gray-300 rounded-md transition hover:bg-base-hover"
                >
                  ログアウト
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-20 flex flex-col bg-second p-2 space-y-2">
            <p>ログインしてランキングに掲載！</p>
            <button
              onClick={signInWithGoogle}
              className="rounded-md w-48 transition bg-base hover:bg-base-hover border-2 border-gray-300 w-40 h-8"
            >
              Googleでログイン
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Account;
