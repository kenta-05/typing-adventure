import React from "react";
import Ranking from "../organisms/Ranking";
import Account from "../organisms/Account";

interface Props {
  big: boolean;
}

function RightDisplay({ big }: Props) {
  return (
    <div
      className={`bg-gray-100 min-w-[18rem] h-144 flex-col justify-between border-2 border-black rounded-md ${
        big && "hidden lg:flex"
      } ${big || "flex lg:hidden mt-5"}`}
    >
      <Ranking />
      <Account />
    </div>
  );
}

export default RightDisplay;
