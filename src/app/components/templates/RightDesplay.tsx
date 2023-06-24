import React from "react";
import Ranking from "../organisms/Ranking";
import Account from "../molecules/Account";

function RightDesplay() {
  return (
    <div className="bg-gray-100 min-w-[18rem] h-144 flex flex-col justify-between border-2 border-black rounded-md">
      <Ranking />
      <Account />
    </div>
  );
}

export default RightDesplay;
