import React from "react";
import Developer from "../molecules/Developer";
import Ranking from "../organisms/Ranking";

function RightDesplay() {
  return (
    <div className="bg-gray-100 w-[18rem] h-144 flex flex-col justify-between">
      <Ranking />
      <Developer />
    </div>
  );
}

export default RightDesplay;
