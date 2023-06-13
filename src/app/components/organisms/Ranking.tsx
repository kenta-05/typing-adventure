"use client";
import React from "react";
import RankPlayer from "../molecules/RankPlayer";

function Ranking() {
  return (
    <div className="max-h-[30.1rem] min-w-full">
      <div className="bg-first text-black">ランキング</div>
      <RankPlayer />
      <RankPlayer />
      <RankPlayer />
      <RankPlayer />
      <RankPlayer />
      <RankPlayer />
      <RankPlayer />
      <RankPlayer />
      <RankPlayer />
      <RankPlayer />
    </div>
  );
}

export default Ranking;
