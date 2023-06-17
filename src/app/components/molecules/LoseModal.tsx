import { Monster } from "@/app/class";
import Link from "next/link";
import React from "react";

interface Props {
  prevMonster: Monster | null;
  setLoseModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentType: number;
  wrongType: number;
}

function loseModal({
  prevMonster,
  setLoseModal,
  currentType,
  wrongType,
}: Props) {
  return (
    <div className="bg-gray-500 bg-opacity-50 absolute inset-0 flex items-center justify-center z-10">
      <div className="rounded-xl p-4 w-[28rem] flex flex-col justify-center items-center bg-base">
        <p className="text-4xl font-bold overflow-y-hidden">タイピング終了</p>
        <div className="flex items-end mt-2">
          <p className="text-[1.5rem] font-bold text-red-500">
            「{prevMonster?.name}」
          </p>
          <p className="text-[1.5rem]">に負けました…</p>
        </div>
        <div className="bg-second p-2 w-full rounded-sm mt-4 flex justify-between items-end">
          <div>
            <p className="text-[1.5rem] mb-4 font-bold">スコア:{currentType}</p>
            <p className="text-lg">正確なタイプ数:{currentType}</p>
            <p className="text-lg">ミスタイプ数:{wrongType}</p>
          </div>
          <img
            className="w-24 h-24 mr-3"
            src={`/opponents/${prevMonster?.image}.png`}
            alt="モンスター"
          />
        </div>
        <div className="mt-6 space-x-12">
          <Link href="/">
            <button
              onClick={() => {
                setLoseModal(false);
              }}
              className="bg-first p-2 rounded-sm transition-all 
              hover:bg-third"
            >
              ホーム画面へ
            </button>
          </Link>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="bg-first px-8 py-2 rounded-sm transition-all 
              hover:bg-third"
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
}

export default loseModal;
