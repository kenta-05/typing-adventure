import { Monster } from "@/app/class";
import Link from "next/link";
import React from "react";

interface Props {
  prevMonster: Monster | null;
  setLoseModal: React.Dispatch<React.SetStateAction<boolean>>;
  game_start: () => void;
  currentType: number;
  wrongType: number;
}

function loseModal({
  prevMonster,
  setLoseModal,
  game_start,
  currentType,
  wrongType,
}: Props) {
  return (
    <div className="bg-gray-500 bg-opacity-50 absolute inset-0 flex items-center justify-center z-10">
      <div className="rounded-xl p-4 w-96 flex flex-col justify-center items-center bg-slate-300">
        <p className="text-4xl font-bold">タイピング終了</p>
        <div className="flex items-end mt-2">
          <p className="text-3xl font-bold text-red-500">
            「{prevMonster?.name}」
          </p>
          <p className="text-2xl">に負けました…</p>
        </div>
        <div className="bg-gray-400 p-2 w-full rounded-sm mt-4">
          <p className="text-2xl mb-4 font-bold">スコア:{currentType}</p>
          <p className="text-lg">正確なタイプ数:{currentType}</p>
          <p className="text-lg">ミスタイプ数:{wrongType}</p>
          {/* <p className="text-lg">タイピング速度:{"aaaa"}</p> */}
        </div>
        <div className="mt-6 space-x-7">
          <Link href="/">
            <button
              onClick={() => {
                setLoseModal(false);
              }}
              className="bg-gray-400 p-2 rounded-sm transition-all hover:bg-gray-500"
            >
              ホーム画面
            </button>
          </Link>
          <button
            onClick={() => {
              setLoseModal(false);
              game_start();
            }}
            className="bg-gray-400 p-2 rounded-sm transition-all hover:bg-gray-500"
          >
            もう一度プレイ
          </button>
        </div>
      </div>
      <div className="absolute left-10">
        <img
          className="w-48"
          src={`/opponents/${prevMonster?.image}.png`}
          alt="モンスター"
        />
      </div>
    </div>
  );
}

export default loseModal;
