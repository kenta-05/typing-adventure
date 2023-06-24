import React, { useState } from "react";

import RightDesplay from "../components/templates/RightDesplay";
import GameDisplay from "../components/templates/GameDisplay";
import Description from "../components/templates/Description";
import Developer from "../components/templates/Developer";

function Page() {
  return (
    <>
      <main>
        <div className="relative px-8 pt-16 pb-12 flex flex-col bg-base min-h-screen shadow-xl">
          <div className="flex">
            <GameDisplay />
            <RightDesplay />
          </div>
          <div className="flex items-start space-x-8 pt-10">
            <Description />
            <Developer />
          </div>
          <div className="flex space-x-8 pt-8">
            <div className="min-w-[64rem]"></div>
            <div className="min-w-[18rem]"></div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Page;
