import React from "react";
import RightDesplay from "./RightDesplay";
import Link from "next/link";

function HomeDisplay() {
  return (
    <main>
      <div
        className="bg-home bg-bottom
w-full h-144 space-y-12 flex justify-center overflow-x-hidden"
      >
        <div className="space-y-10 w-full min-w-[64rem] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center bg-[rgba(252,252,252,0.8)] space-y-2 rounded-lg px-3 py-10">
            <h1 className="text-[4rem]">タイピング冒険記</h1>
            <div className="flex">
              {/* <img src="/main/background.png" alt="モンスター画像" />
            <img src="/main/background.png" alt="モンスター画像" />
            <img src="/main/background.png" alt="モンスター画像" />
            <img src="/main/background.png" alt="モンスター画像" /> */}
            </div>
            <Link href="/play">
              <button className="text-[2.75rem] bg-first rounded-lg px-1 border-4 border-black transition hover:bg-third">
                プレイ画面へ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomeDisplay;
