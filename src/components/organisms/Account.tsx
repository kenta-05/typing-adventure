"use client";
import { FirebaseContext } from "@/firebase";
import {
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useContext } from "react";

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
    if(!auth) return
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
            <div className="h-[4.75rem] flex flex-col bg-second space-y-1 pt-1">
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
                  {/* <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={user.photoURL || "/main/background.png"}
                      alt="Avatar"
                      width={40}
                      height={40}
                    />
                  </div> */}

                  <p className="text-black text-xl whitespace-nowrap overflow-hidden max-w-[9.6rem] text-overflow-ellipsis font-bold">
                    「{user.displayName}」
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
          <div className="h-[4.75rem] flex flex-col bg-second p-2 space-y-2">
            <p className="overflow-y-hidden">ログインしてランキングに掲載！</p>
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
