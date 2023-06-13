import { Monster } from "@/app/class";
import React from "react";

interface Props {
  attackPosition: React.RefObject<
    { top: string; left: string } | { top: string; right: string }
  >;
  monster: Monster | null;
}

function AttackDisplay({ attackPosition, monster }: Props) {
  return (
    <div
      className="absolute px-2 bg-slate-100 border-black font-bold border-4 text-[2rem] rounded-md"
      style={attackPosition.current || {}}
    >
      {monster?.name}の{monster?.attack}!
    </div>
  );
}

export default AttackDisplay;
