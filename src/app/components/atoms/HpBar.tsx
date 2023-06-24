import React from "react";

interface Props {
  hp: number;
}

function HpBar({ hp }: Props) {
  return (
    <div className="absolute top-2 left-2">
      <div className="w-72 h-8 bg-slate-200 rounded-sm relative">
        <p className="overflow-y-hidden text-white absolute left-1  text-2xl font-bold">
          {hp}
        </p>
        <div
          className="flex items-center h-8 bg-red-600 rounded-sm pl-1"
          style={{ width: `${hp / 5}%` }}
        ></div>
      </div>
    </div>
  );
}

export default HpBar;
