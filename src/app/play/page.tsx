import React from "react";

import RightDesplay from "../components/templates/RightDesplay";
import GameDisplay from "../components/templates/GameDisplay";
import Description from "../components/templates/Description";
import Link from "next/link";
import Feedback from "../components/templates/Feedback";

function Page() {
  return (
    <>
      <div className="relative px-8 pt-16 pb-12 flex flex-col bg-base min-h-screen shadow-xl">
        <Link
          href="/"
          className="text-lg absolute top-5 left-5 hover: underline"
        >
          ←ホーム画面に戻る
        </Link>
        <div className="flex space-x-8">
          <GameDisplay />
          <RightDesplay />
        </div>
        <div className="flex space-x-8 pt-12">
          <Description />
          <div className="min-w-[18rem]"></div>
        </div>
        <div className="flex space-x-8 pt-12">
          <Feedback />
          <div className="min-w-[18rem]"></div>
        </div>
      </div>
    </>
  );
}

export default Page;
