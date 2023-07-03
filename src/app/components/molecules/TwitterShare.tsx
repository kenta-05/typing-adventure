"use client";
import { BsTwitter } from "react-icons/bs";
import { TwitterShareButton } from "react-share";

function TwitterShare() {
  const shareUrl =
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent("タイピング冒険記 | RPG風タイピングゲーム") +
    "&url=" +
    encodeURIComponent("https://typing-adventure.com/") +
    "&hashtags=" +
    encodeURIComponent("個人開発");

  return (
    <>
      <button onClick={() => window.open(shareUrl, "_blank")}>
        <div className="bg-twitter text-white flex rounded-md p-1 pl-4 items-center space-x-2 w-[18rem] shadow-xl transition hover:bg-twitter-hover">
          <BsTwitter size={28} />
          <p className="text-[1.5rem] font-bold">Twitterで共有</p>
        </div>
      </button>
    </>
  );
}

export default TwitterShare;
