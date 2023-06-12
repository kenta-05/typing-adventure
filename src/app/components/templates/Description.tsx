import React from "react";

function Description() {
  return (
    <div className="space-y-6 px-4 py-5 bg-gray-300 w-[58rem] border-2 border-black rounded-lg">
      <div>
        <h2 className="border-b-2 pb-1 border-black font-bold text-lg">
          タイピング冒険記とは
        </h2>
        <p className="">
          敵を倒しながら冒険していくタイピングゲームです
          <br />
          複雑な操作は不要で、とにかく速くて正確なタイピングをすることで遠くまで進めます
        </p>
      </div>
      <div>
        <h2 className="border-b-2 pb-1 border-black font-bold text-lg">
          戦闘システムについて
        </h2>
        <p className="">
          1タイピングにつき1ダメージを敵に与えられ、敵のHPを削りきると撃破です
          <br />
          プレイヤーのHPはミスタイプと定期的なモンスターの攻撃によって減っていくため、速度と正確性の両方が求められます
        </p>
      </div>
      <div>
        <h2 className="border-b-2 pb-1 border-black font-bold text-lg">
          スコアについて
        </h2>
        <p className="">
          正しくタイピング出来た数がそのままスコアに反映されます
          <br />
          タイピングが上手いとより長くプレイできるため、スコアも伸びていきます
        </p>
      </div>
    </div>
  );
}

export default Description;
