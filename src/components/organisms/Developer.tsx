import Image from "next/image";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { GrMail } from "react-icons/gr";

function Developer() {
  return (
    <div className="border-2 border-black rounded-lg">
      <div className="bg-first">開発者情報</div>
      <div className="flex items-start bg-second p-1 space-x-2">
        <Image
          src="/main/sotetu.png"
          alt="Avatar"
          className="mt-1 rounded-full shadow-lg"
          width={60}
          height={60}
        />
        <div>
          <div className="flex">
            <p className="text-black text-2.4rem font-bold">ソテツ</p>
          </div>
          <div className="flex items-center mt-1 space-x-2">
            <a
              href="https://twitter.com/sotetu79"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="p-1 bg-twitter text-white rounded-md text-lg transition hover:bg-twitter-hover flex items-center space-x-1 px-2 h-8 overflow-y-hidden">
                <BsTwitter size={20} />
                <p className="text-[1.14rem]">Twitter</p>
              </button>
            </a>
            <a href="mailto:sotetu79@gmail.com">
              <button className="p-1 bg-red-400 text-white rounded-md text-lg transition hover:bg-red-600 flex items-center space-x-1 px-2 h-8 overflow-y-hidden">
                <GrMail size={20} color="white" />
                <p className="text-[1.14rem]">メール</p>
              </button>
            </a>
            {/* <a
              href="http://sotetu-portfolio.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-1 py-1 bg-teal-600 text-white rounded-md text-md transition hover:bg-teal-700">
                プロフィール
              </button>
            </a> */}
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
