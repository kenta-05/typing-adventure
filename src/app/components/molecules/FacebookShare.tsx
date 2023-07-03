"use client";
import { BsFacebook } from "react-icons/bs";

function FacebookShare() {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    "https://typing-adventure.com/"
  )}`;

  return (
    <>
      <button onClick={() => window.open(shareUrl, "_blank")}>
        <div className="bg-facebook text-white flex rounded-md p-1 pl-4 items-center space-x-2 w-[18rem] shadow-xl transition hover:bg-facebook-hover">
          <BsFacebook size={28} />
          <p className="text-[1.5rem] font-bold">Facebookで共有</p>
        </div>
      </button>
    </>
  );
}

export default FacebookShare;
