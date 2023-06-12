import { Monster } from "@/app/class";
import React from "react";

interface Props {
  monster: Monster | null;
  monsterHp: number;
}

function MonsterDisplay({ monster, monsterHp }: Props) {
  return (
    <div className="w-full h-full flex justify-center items-end overflow-y-hidden">
      {monster && (
        <div className="mb-12">
          <img
            className="w-64"
            src={`/opponents/${monster.image}.png`}
            alt="モンスター"
          />
          <div className="w-56 mb-3 h-6 bg-slate-200 rounded-sm overflow-y-hidden">
            <div
              className="flex items-center h-6 bg-red-600 rounded-sm text-2xl font-bold pl-1 overflow-y-hidden"
              style={{
                width: `${monster ? (monsterHp / monster.hp) * 100 : 0}%`,
              }}
            >
              <p className="text-white">{monsterHp}</p>
            </div>
            <p className="text-2xl font-bold">{monster.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonsterDisplay;
