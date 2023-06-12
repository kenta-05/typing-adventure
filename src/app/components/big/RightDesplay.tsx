import React from "react";
import Developer from "../middle/Developer";
import Ranking from "../middle/Ranking";

function RightDesplay() {
  return (
    <div className="bg-gray-100 w-1/5 h-144 mr-8 flex flex-col justify-between">
      <Ranking />
      <Developer />
    </div>
  );
}

export default RightDesplay;
