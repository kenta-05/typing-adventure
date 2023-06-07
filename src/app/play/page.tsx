"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Monster } from "../class";
import MonsterDisplay from "../components/big/MonsterDisplay";
import TextDisplay from "../components/big/TextDisplay";
import HpBar from "../components/small/HpBar";
import AttackDisplay from "../components/small/AttackDisplay";

function Page() {
  const [playing, setPlaying] = useState<boolean>(false); // ゲーム中か否か
  const [hp, setHp] = useState<number>(100); // プレイヤーのHP
  const [monster, setMonster] = useState<Monster | null>(null); // 現在セットされているモンスター
  const [monsterHp, setMonsterHp] = useState<number>(0); // 上記モンスターのHP
  const [attackDisplay, setAttackDisplay] = useState<boolean>(false); // モンスターの攻撃文字の表示/非表示
  const text = useRef("スペースキーでスタート"); // 基本的なテキスト+問題文
  const unfilled = useRef(""); // 未入力ローマ字
  const filled = useRef(""); // 入力済みローマ字
  const attackPosition = useRef({ top: "", left: "" }); // アタックモーダルの位置
  const [typeSpcae, setTypeSpace] = useState<boolean>(false); // 「スペースで進む」の表示/非表示
  const monsterAtack = useRef<NodeJS.Timeout | null>(null);
  const damageHandler = useRef<((e: KeyboardEvent) => void) | null>(null);

  const sentences = [
    {
      main: "隣の客はよく柿食う客だ",
      sub: "tonarinokyakuhayokukakikuukyakuda",
    },
    {
      main: "東京特許許可局",
      sub: "toukyoutokkyokyokakyoku",
    },
    {
      main: "これはテストの文の一部です",
      sub: "korehatesutonobunnnoitibudesu",
    },
    {
      main: "今日はそばが食べたい気分だ",
      sub: "kyouhasobagatabetaikibunda",
    },
    {
      main: "今日は散歩に行こうと思います",
      sub: "kyouhasanponiikoutoomoimasu",
    },
    {
      main: "私の好きな食べ物はハンバーグです",
      sub: "watasinosukinatabemonohahanba-gudesu",
    },
    {
      main: "最近めっきり寒くなりましたね",
      sub: "saikinmekkirisamukunarimasitane",
    },
  ];

  useEffect(() => {
    // HPが0以下になるとgame_stop()
    if (hp <= 0) {
      game_over();
    }
    // ホーム画面でのキーイベント
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (!playing) {
          game_start();
        }
      }
      if (e.code === "Escape") {
        game_stop();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playing, unfilled, filled, hp]);

  // 指定した時間、待機(f)
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  //攻撃モーダルの位置を抽選する(f)
  const modalLocate = () => {
    const positions = [
      { top: "130px", left: "25px" },
      { top: "200px", left: "25px" },
      { top: "130px", left: "610px" },
      { top: "200px", left: "610px" },
      { top: "270px", left: "610px" },
    ];
    const randomIndex = Math.floor(Math.random() * positions.length);
    attackPosition.current = positions[randomIndex];
  };

  // 文章書き換え(f)
  const fill_new = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const randomSentence = sentences[randomIndex];
    filled.current = "";
    text.current = randomSentence.main;
    unfilled.current = randomSentence.sub;
  };

  // ゲームストップ(f)
  const game_stop = () => {
    setPlaying(false);
    text.current = "";
    filled.current = "";
    unfilled.current = "";
    setHp(100);
    setMonster(null);

    setAttackDisplay(false);
    // モンスターの攻撃をストップ
    if (damageHandler.current) {
      document.removeEventListener("keydown", damageHandler.current);
      damageHandler.current = null;
    }
    // タイピングによる攻撃をストップ
    if (monsterAtack.current) {
      clearInterval(monsterAtack.current);
      monsterAtack.current = null;
    }
  };

  // ゲームオーバー(f)
  const game_over = () => {
    setPlaying(false);
    text.current = "";
    filled.current = "";
    unfilled.current = "";
    setHp(100);
    setMonster(null);

    setAttackDisplay(false);
    // モンスターの攻撃をストップ
    if (damageHandler.current) {
      document.removeEventListener("keydown", damageHandler.current);
      damageHandler.current = null;
    }
    // タイピングによる攻撃をストップ
    if (monsterAtack.current) {
      clearInterval(monsterAtack.current);
      monsterAtack.current = null;
    }
  };

  // テキストの表示(f)
  const write = (_text: string) => {
    return new Promise<void>((resolve) => {
      setTypeSpace(true);
      text.current = _text;
      unfilled.current = "";
      filled.current = "";
      const damageHandler = (e: KeyboardEvent) => {
        if (e.code === "Space") {
          document.removeEventListener("keydown", damageHandler);
          setTypeSpace(false);
          resolve();
        }
      };
      document.addEventListener("keydown", damageHandler);
    });
  };

  // モンスターとの戦闘関数(f)
  const fight = (_monster: Monster) => {
    return new Promise<void>((resolve) => {
      // 戦闘開始の下準備
      setMonster(_monster);
      setMonsterHp(_monster.hp);
      fill_new();

      // 待機
      setTimeout(() => {}, 1000); //出現アニメ時間

      // モンスターの定期的な攻撃
      monsterAtack.current = setInterval(() => {
        modalLocate();
        setAttackDisplay(true);
        setTimeout(function () {
          setAttackDisplay(false);
        }, 900);
        setHp((prevHp) => prevHp - _monster.damage);
      }, _monster.duration);

      // ダメージ処理のハンドラ
      damageHandler.current = (e: KeyboardEvent) => {
        if (e.key === unfilled.current.charAt(0)) {
          setMonsterHp((prevHp) => {
            // 正解ならHPを減らして、Filledを移動
            const newHp = prevHp - 1;
            const newFilled = filled.current + unfilled.current.charAt(0);
            const newUnfilled = unfilled.current.slice(1);

            filled.current = newFilled;
            unfilled.current = newUnfilled;

            // 未入力が無くなると、新しい文
            if (unfilled.current.length <= 0) {
              fill_new();
            }

            // 敵HPが無くなると、win関数
            if (newHp <= 0) {
              setAttackDisplay(false);
              // モンスターの攻撃をストップ
              if (damageHandler.current) {
                document.removeEventListener("keydown", damageHandler.current);
                damageHandler.current = null;
              }
              // タイピングによる攻撃をストップ
              if (monsterAtack.current) {
                clearInterval(monsterAtack.current);
                monsterAtack.current = null;
              }
              win().then(resolve);
            }
            return newHp;
          });
        }
        if (e.key !== unfilled.current.charAt(0)) {
          // 不正解ならHPを-2する
          setHp((prev) => prev - 1);
        }
      };

      document.addEventListener("keydown", damageHandler.current);
    });
  };

  const win = () => {
    return new Promise<void>((resolve) => {
      // モンスターが消えるのを待つ
      setTimeout(() => {
        setMonsterHp(0);
        setMonster(null);
        resolve(); // モンスターが消えた
      }, 0); // 消えるアニメ実装
    });
  };

  const ririppo = new Monster("リリッポ", 30, "ririppo", "つつく", 2, 3000);
  const tokotoko = new Monster("トコトコ", 200, "tokotoko", "かむ", 3, 5000);
  const torubo = new Monster("トルボ", 300, "torubo", "突進", 3, 5000);
  // ゲーム進行(f)
  const game_start = async () => {
    setPlaying(true);
    text.current = "";
    await delay(600);
    await fight(ririppo);
    await write("リリッポを倒した！");
    await write("次に出てくる敵に対策しよう");
    await write("タイピングで倒すことができます");
    await write("敵によって攻撃の頻度とダメージが異なります");
    await fight(tokotoko);
    await fight(torubo);
  };

  return (
    <>
      <div className="flex pt-32 bg-gray-400 h-screen shadow-xl">
        <div className="bg-gray-100 w-4/5 h-144 mx-8 flex justify-center">
          <div className="bg-stage1-bg bg-cover w-full flex flex-col justify-center items-center relative">
            <HpBar hp={hp} />
            {attackDisplay && (
              <AttackDisplay
                attackPosition={attackPosition}
                monster={monster}
              />
            )}
            <MonsterDisplay monster={monster} monsterHp={monsterHp} />
            <TextDisplay
              text={text}
              filled={filled}
              unfilled={unfilled}
              typeSpace={typeSpcae}
            />
          </div>
        </div>
        <div className="bg-gray-100 w-1/5 h-144 mr-8 flex justify-center">
          <img
            src="/sotetu.png"
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
        </div>
      </div>
    </>
  );
}

export default Page;
