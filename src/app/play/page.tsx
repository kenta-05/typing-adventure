"use client";
import Link from "next/link";
import React, {
  ChangeEvent,
  ReactEventHandler,
  use,
  useEffect,
  useState,
} from "react";

class Monster {
  name: string;
  hp: number;
  image: string;

  constructor(n: string, hp: number, img: string) {
    this.name = n;
    this.hp = hp;
    this.image = img;
  }
}

function Page() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [text, setText] = useState("スペースボタンでスタート");
  const [unfilled, setUnfilled] = useState("");
  const [filled, setFilled] = useState("");
  const [hp, setHp] = useState<number>(100);
  const [monster, setMonster] = useState<Monster | null>(null);
  const [monsterHp, setMonsterHp] = useState<number>(0);
  const [monsterState, setMonsterState] = useState<string | null>(null);
  const [damageHandler, setDamageHandler] = useState<(() => void) | null>(null);

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
    // 入力を終えるとfill_new関数
    if (unfilled === "" && playing) {
      fill_new();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      // スペースキーでgame_start関数
      if (e.code === "Space") {
        if (playing == true) {
          return;
        }
        game_start();
      }
      // ESPキーでgame_stop関数
      if (e.code === "Escape") {
        game_stop();
      }
      // 入力キーの判定
      if (e.key === unfilled.charAt(0)) {
        setFilled((prevFilled) => prevFilled + e.key);
        setUnfilled((prevUnfilled) => prevUnfilled.slice(1));
        setMonsterHp((prev) => prev - 1);
      }
      if (e.key !== unfilled.charAt(0) && e.key !== "Escape") {
        if (playing) {
          setHp((prev) => prev - 2);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playing, unfilled, filled]);

  // 指定した時間、待機(f)
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // 文章書き換え(f)
  const fill_new = () => {
    setPlaying(true);
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const randomSentence = sentences[randomIndex];
    setFilled("");
    setText(randomSentence.main);
    setUnfilled(randomSentence.sub);
  };

  // ゲームストップ(f)
  const game_stop = () => {
    window.location.reload();
    // setPlaying(false);
    // setText("スペースボタンでスタート");
    // setUnfilled("");
    // setFilled("");
    // setHp(100);
  };

  // モンスターとの戦闘関数(f)
  const battle = (_monster: Monster) => {
    return new Promise<void>((resolve) => {
      // モンスターを表示
      setMonster(_monster);
      setMonsterHp(_monster.hp);
      setMonsterState("appearing"); // モンスターが登場するアニメーションを開始

      // モンスターの登場が終わったら戦闘開始
      setTimeout(() => {
        setMonsterState("in_battle");
      }, 1000); //出現アニメ時間

      // タイピングによるダメージ処理の関数をセット
      const win = () => {
        if (monsterHp <= 0) {
          setMonsterState("disappearing"); // モンスターが消えるアニメーションを開始

          // モンスターが消えるのを待つ
          setTimeout(() => {
            setMonsterHp(0);
            setMonster(null);
            setMonsterState(null);
            setDamageHandler(null); // ダメージ処理の関数をリセット
            resolve(); // 戦闘終了
          }, 1000); // 消失アニメ時間
        }
      };
    });
  };

  const ririppo = new Monster("リリッポ", 30, "ririppo");
  const tokotoko = new Monster("トコトコ", 200, "tokotoko");
  const torubo = new Monster("トルボ", 300, "torubo");
  // ゲーム進行(f)
  const game_start = async () => {
    setText("");
    await delay(600);
    await battle(ririppo);
    await battle(tokotoko);
    await battle(torubo);
  };

  return (
    <>
      <div className="flex pt-32 bg-gray-400 h-screen shadow-xl">
        <div className="bg-gray-100 w-4/5 h-144 mx-8 flex justify-center">
          <div className="bg-stage1-bg bg-cover w-full flex flex-col justify-center items-center relative">
            {/* HPバーの表示 */}
            <div className="absolute top-2 left-2">
              <div className="w-72 h-10 bg-slate-200 rounded-sm">
                <div
                  className="flex items-center h-10 bg-red-600 rounded-sm text-2xl font-bold pl-1"
                  style={{ width: `${hp}%` }}
                >
                  <p className="text-white">{hp}</p>
                </div>
              </div>
            </div>

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
            <div
              className="flex flex-col justify-center items-center border-2 border-black opacity-80 rounded-md h-64 mb-2 border-spacing-2 bg-slate-200"
              style={{ width: "98%" }}
            >
              <h2 className="text-5xl">{text}</h2>
              <div className="flex">
                <p className="text-3xl text-red-400">{filled}</p>
                <p className="text-3xl">{unfilled}</p>
              </div>
            </div>
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
