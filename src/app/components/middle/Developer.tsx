import React from "react";
import { BsTwitter } from "react-icons/bs";

function Developer() {
  return (
    <div>
      <div className="bg-gray-500">開発者情報</div>
      <div className="flex items-center bg-slate-600 p-2 space-x-2">
        <img
          src="/sotetu.png"
          alt="Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="text-white text-xl font-bold">ソテツ</p>
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
              <button className="ml-2 px-1 py-1 bg-gray-800 text-white rounded-md text-md transition hover:bg-twitter-hover">
                プロフィール
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Developer;
