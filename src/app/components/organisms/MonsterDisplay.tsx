import { Monster } from "@/app/class";
import Image from "next/image";
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
          <Image
            src={`/opponents/${monster.image}.png`}
            alt="モンスター"
            width={256}
            height={256}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
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
          <Image
            src={`/item/${item}.png`}
            alt="アイテム"
            width={256}
            height={256}
          />
        </div>
      )}
    </div>
  );
}

export default MonsterDisplay;
