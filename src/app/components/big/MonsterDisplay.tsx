import { Monster } from "@/app/class";
import React from "react";

interface Props {
  monster: Monster | null;
  monsterHp: number;
}

function MonsterDisplay({ monster, monsterHp }: Props) {
  return (
    <div className="w-full h-full flex justify-center items-end">
      {monster && (
        <div className="mb-12">
          <img
            className="w-64"
            src={`/opponents/${monster.image}.png`}
            alt=""
          />
          <div className="w-56 mb-3 h-6 bg-slate-200 rounded-sm">
            <div
              className="flex items-center h-6 bg-red-600 rounded-sm text-2xl font-bold pl-1"
              style={{ width: `${100}%` }}
            >
              <p className="text-white">{monsterHp}</p>
            </div>
            <p className="mt-1 text-2xl font-bold">{monster.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonsterDisplay;
