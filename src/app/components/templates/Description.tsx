import React from "react";

function Description() {
  return (
    <div className="flex flex-col items-start w-[64rem] space-y-6 pl-4 py-5 bg-second border-2 border-black rounded-lg">
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
          1タイピングにつき敵に1ダメージを与え、敵のHPを削りきると撃破です
          <br />
          プレイヤーのHPはミスタイプと敵の攻撃によって減っていくため、速度と正確性の両方が求められます
        </p>
      </div>
      <div>
        <h2 className="border-b-2 pb-1 border-black font-bold text-lg">
          スコアによるランキングについて
        </h2>
        <p className="">
          正しくタイピング出来た数がそのままスコアに反映されます
          <br />
          タイピングが上手いとより長くプレイできるため、スコアも伸びていきます
          <br />
          途中分岐点がありますが、どの選択肢を選んでも難易度は変わりません
        </p>
      </div>
    </div>
  );
}

export default Description;
