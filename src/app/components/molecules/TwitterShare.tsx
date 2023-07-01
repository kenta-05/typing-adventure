"use client";
import { BsTwitter } from "react-icons/bs";
import { TwitterShareButton } from "react-share";

function TwitterShare() {
  return (
    <>
      <TwitterShareButton
        url={"typing-adventure.com"}
        title={"タイピング冒険記！"}
      >
        <div className="bg-twitter text-white flex rounded-md p-1 pl-4 items-center space-x-2 w-[18rem] shadow-xl transition hover:bg-twitter-hover">
          <BsTwitter size={28} />
          <p className="text-[1.5rem] font-bold">Twitterで共有</p>
        </div>
      </TwitterShareButton>
    </>
  );
}

export default TwitterShare;
