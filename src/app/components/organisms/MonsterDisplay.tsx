import { Monster } from "@/app/class";
import React from "react";

interface Props {
  monster: Monster | null;
  monsterHp: number;
  item: string;
}

function MonsterDisplay({ monster, monsterHp, item }: Props) {
  return (
    <div className="w-full h-full flex justify-center items-end overflow-y-hidden">
      {monster && (
        <div className="mb-8">
          <img
            className="w-64"
            src={`/opponents/${monster.image}.png`}
            alt="モンスター"
          />
          <div className="w-56 bg-slate-300 rounded-sm relative h-7 flex items-center overflow-y-hidden">
            <p className="text-white absolute text-[1.5rem] left-1 font-bold overflow-y-hidden">
              {monsterHp}
            </p>
            <div
              className="flex items-center h-7 bg-red-600 rounded-sm pl-1 overflow-y-hidden"
              style={{
                width: `${monster ? (monsterHp / monster.hp) * 100 : 0}%`,
              }}
            ></div>
          </div>
          <p className="text-[1.5rem] font-bold">{monster.name}</p>
        </div>
      )}
      {item && (
        <div className="mb-8">
          <img className="w-64" src={`/item/${item}.png`} alt="アイテム" />
        </div>
      )}
    </div>
  );
}

export default MonsterDisplay;
