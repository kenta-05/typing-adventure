"use client";
import db, { FirebaseContext } from "@/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";

function Account() {
  const [isRenameDisplay, setIsRenameDisplay] = useState(false);
  const [newName, setNewName] = useState("");
  const firebaseContext = useContext(FirebaseContext);
  if (!firebaseContext) {
    return;
  }
  const { auth, provider, user, highscore, username } = firebaseContext;

  const renameAdapt = async () => {
    try {
      if (!user) {
        throw new Error("現在サインインされていません");
      }
      const docRef = doc(collection(db, "users"), user.uid);
      await updateDoc(docRef, { username: newName });
      console.log("名前を変更しました");
    } catch (error) {
      console.error("名前の変更に失敗しました: ", error);
    }
    setNewName("");
  };

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
    if (!auth) return;
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
            {isRenameDisplay ? (
              <div className="h-[4.85rem] flex flex-col bg-second space-y-1 pt-1">
                <div className="flex">
                  <p
                    className="text-lg overflow-y-hidden pl-1 cursor-pointer hover:underline"
                    onClick={() => {
                      setIsRenameDisplay(false);
                    }}
                  >
                    ←戻る
                  </p>
                </div>
                <div className="flex overflow-y-hidden items-center justify-between px-2 space-x-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                    placeholder="アカウント名を変更"
                    className="rounded-full border-2 border-gray-300 w-44 pl-1 h-8"
                  />
                  <button
                    className="bg-base w-20 h-8 border-2 border-gray-300 rounded-md transition hover:bg-base-hover"
                    onClick={() => {
                      setIsRenameDisplay(false);
                      renameAdapt();
                    }}
                  >
                    変更
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[4.85rem] flex flex-col bg-second space-y-1 pt-1 pl-1">
                <div className="flex">
                  <p className="text-lg overflow-y-hidden">現在のハイスコア:</p>
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

                    <p className="text-black text-lg font-bold max-w-[120px] overflow-hidden whitespace-nowrap overflow-ellipsis pr-1">
                      {username}
                    </p>
                    <button
                      className="bg-base border-2 border-gray-300 rounded-md p-1 transition hover:bg-base-hover"
                      onClick={() => {
                        setIsRenameDisplay(true);
                      }}
                    >
                      <BsPencilSquare size={18} />
                    </button>
                  </div>
                  <button
                    onClick={signOutWithGoogle}
                    className="bg-base mr-2 w-28 h-8 border-2 border-gray-300 rounded-md transition hover:bg-base-hover"
                  >
                    ログアウト
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-[4.85rem] flex flex-col bg-second p-2 space-y-2">
            <p className="overflow-y-hidden">ログインしてランキングに掲載！</p>
            <button
              onClick={signInWithGoogle}
              className="rounded-md w-48 transition bg-base hover:bg-base-hover border-2 border-gray-300 h-8"
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
