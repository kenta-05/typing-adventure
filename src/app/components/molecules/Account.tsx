"use client";
import React, { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { provider } from "../../lib/firebase";

function Account() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        alert("ログインに失敗しました。もう一度お試しください。");
      });
  };

  return (
    <>
      <div>
        <div className="bg-first">アカウント</div>
        {user ? (
          <div className="flex items-center bg-second p-2 space-x-2">
            <img
              src={user.photoURL || "/main/background.png"}
              alt="Avatar"
              className="w-16 h-16 rounded-full shadow-lg"
            />
            <div>
              <p className="text-black text-2.4rem font-bold">ソテツ</p>
              <div className="flex items-center mt-1">
                <a
                  href="https://twitter.com/sotetu79"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="p-1 bg-twitter text-white rounded-md text-lg transition hover:bg-twitter-hover">
                    <BsTwitter className="" size={24} />
                  </button>
                </a>
                <a
                  href="http://sotetu-portfolio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="ml-2 px-1 py-1 bg-gray-500 text-white rounded-md text-md transition hover:bg-gray-700">
                    プロフィール
                  </button>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center bg-second p-2 space-x-2">
            <img
              src={"/main/background.png"}
              alt="Avatar"
              className="w-16 h-16 rounded-full shadow-lg"
            />
            <div>
              <p className="text-black text-2.4rem font-bold">ソテツ</p>
              <div className="flex items-center mt-1">
                <a
                  href="https://twitter.com/sotetu79"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="p-1 bg-twitter text-white rounded-md text-lg transition hover:bg-twitter-hover">
                    <BsTwitter className="" size={24} />
                  </button>
                </a>
                <a
                  href="http://sotetu-portfolio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="ml-2 px-1 py-1 bg-gray-500 text-white rounded-md text-md transition hover:bg-gray-700">
                    プロフィール
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Account;
