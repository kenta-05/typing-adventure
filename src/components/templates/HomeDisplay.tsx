import React from "react";
import Link from "next/link";

function HomeDisplay() {
  return (
    <>
      <div
        className="bg-home bg-bottom
w-full h-144 space-y-12 flex justify-center overflow-x-hidden"
      >
        <div className="space-y-10 w-full flex-1 flex flex-col items-center justify-center w-[64rem] sm:min-w-[64rem]">
          <div className="flex flex-col items-center bg-[rgba(252,252,252,0.8)] space-y-2 rounded-lg px-3 py-10 mx-5 sm:mx-0">
            <h1 className="text-[4rem]">タイピング冒険記</h1>
            <div className="flex"></div>
            <Link href="/play">
              <button className="text-[2.75rem] bg-first rounded-lg px-1 border-4 border-black transition hover:bg-third">
                プレイ画面へ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeDisplay;
