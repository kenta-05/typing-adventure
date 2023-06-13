import React from "react";

function RankPlayer() {
  return (
    <div className="py-2 bg-second border-b border-gray-200">
      <div className="flex justify-between px-1">
        <div className="flex">
          <p>1:</p>
          <p>プレイヤー名</p>
        </div>
        <p>スコア:1239</p>
      </div>
      <div>「キオネ」に倒された</div>
    </div>
  );
}

export default RankPlayer;
