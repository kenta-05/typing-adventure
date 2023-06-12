"use client";
import React from "react";

import RightDesplay from "../components/templates/RightDesplay";
import GameDisplay from "../components/templates/GameDisplay";
import Description from "../components/templates/Description";

function Page() {
  return (
    <>
      <div className="px-8 pt-24 flex flex-col bg-gray-400 minH-screen shadow-xl">
        <div className="flex space-x-8">
          <GameDisplay />
          <RightDesplay />
        </div>
        <div className="pt-16">
          <Description />
        </div>
      </div>
    </>
  );
}

export default Page;
