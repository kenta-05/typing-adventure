import { Monster } from "@/app/class";
import Link from "next/link";
import React, { useContext } from "react";
import { FirebaseContext } from "@/app/providers/FirebaseProvider";
import Image from "next/image";

interface Props {
  prevMonster: Monster | null;
  currectType: number;
  wrongType: number;
  prevScore: number;
  game_reset: () => void;
}

function LoseModal({
  prevMonster,
  currectType,
  wrongType,
  prevScore,
  game_reset,
}: Props) {
  const firebaseContext = useContext(FirebaseContext || {});
  if (!firebaseContext) {
    return null;
  }

  const shareUrl =
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(
      `タイピング冒険記 | ${prevMonster?.name}に敗北しました…【スコア${
        prevScore || 0
      }】`
    ) +
    "&url=" +
    encodeURIComponent("https://typing-adventure.com/") +
    "&hashtags=" +
    encodeURIComponent("個人開発");

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
            <div className="mb-4 flex items-center">
              <p className="text-[1.5rem] font-bold">スコア:{currectType}</p>
              {currectType > prevScore && (
                <p className="text-[1rem] pl-2 font-bold text-red-500">
                  (ハイスコア更新！)
                </p>
              )}
            </div>
            <p className="text-lg">正解のタイプ数:{currectType}</p>
            <p className="text-lg">ミスタイプ数:{wrongType}</p>
            <p className="text-lg">
              正解率:
              {((currectType / (currectType + wrongType)) * 100).toFixed(2)}%
            </p>
          </div>
          <Image
            src={`/opponents/${prevMonster?.image}.png`}
            alt="モンスター"
            width={96}
            height={96}
            className="mr-3"
          />
        </div>
        <div className="mt-6 space-x-12">
          <Link href="/">
            <button
              onClick={() => window.open(shareUrl, "_blank")}
              className="bg-twitter px-4 py-2 rounded-full transition-all text-white hover:bg-twitter-hover"
            >
              ツイートする
            </button>
          </Link>
          <button
            onClick={game_reset}
            className="bg-first px-8 py-2 rounded-full transition-all 
              hover:bg-third"
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoseModal;
