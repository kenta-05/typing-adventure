import Image from "next/image";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { GrMail } from "react-icons/gr";

function Developer() {
  return (
    <div className="border-2 border-black rounded-lg">
      <div className="bg-first">開発者情報</div>
      <div className="flex items-start bg-second p-2 space-x-2">
        <Image
          src="/main/sotetu.png"
          alt="Avatar"
          className="mt-1 rounded-full shadow-lg"
          width={64}
          height={64}
        />
        <div>
          <div className="flex">
            <p className="text-black text-2.4rem font-bold">ソテツ</p>
          </div>
          <div className="flex items-center mt-1 space-x-2">
            <a href="mailto:sotetu79@gmail.com">
              <button className="p-1 bg-twitter text-white rounded-md text-lg transition hover:bg-twitter-hover">
                <BsTwitter className="" size={24} />
              </button>
            </a>
            <a
              href="https://twitter.com/sotetu79"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="p-1 bg-red-400 text-white rounded-md text-lg transition hover:bg-red-600">
                <GrMail className="" size={24} color="white" />
              </button>
            </a>
            <a
              href="http://sotetu-portfolio.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-1 py-1 bg-teal-600 text-white rounded-md text-md transition hover:bg-teal-700">
                プロフィール
              </button>
            </a>
          </div>
          <div className="pt-1">
            <p>↑ご意見はメールかDMに</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Developer;
