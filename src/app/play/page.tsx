"use client";
import Link from "next/link";
import React, {
  ChangeEvent,
  ReactEventHandler,
  use,
  useEffect,
  useRef,
  useState,
} from "react";

class Monster {
  name: string;
  hp: number;
  image: string;
  attack: string;
  damage: number;
  duration: number;

  constructor(
    n: string,
    hp: number,
    img: string,
    a: string,
    da: number,
    du: number
  ) {
    this.name = n;
    this.hp = hp;
    this.image = img;
    this.attack = a;
    this.damage = da;
    this.duration = du;
  }
}

function Page() {
  const [playing, setPlaying] = useState<boolean>(false); //ゲーム中か否か
  const text = useRef("スペースキーでスタート"); //基本的なテキスト+問題文
  const unfilled = useRef(""); //未入力ローマ字
  const filled = useRef(""); //入力済みローマ字
  const [hp, setHp] = useState<number>(100); //プレイヤーのHP
  const [monster, setMonster] = useState<Monster | null>(null); //現在セットされているモンスター
  const [monsterHp, setMonsterHp] = useState<number>(0); //上記モンスターのHP
  const [attackModal, setAttack] = useState<boolean>(false);

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

  // 主にゲーム以外でのキーイベント
  useEffect(() => {
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
  }, [playing, unfilled, filled]);

  // 指定した時間、待機(f)
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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
    window.location.reload();
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

      // 定期的な攻撃のセット
      const intervalId = setInterval(() => {
        setAttack(true);
        setTimeout(function () {
          setAttack(false);
        }, 900);
        setHp((prevHp) => prevHp - _monster.damage);
      }, _monster.duration);

      // ダメージ処理のハンドラ
      const damageHandler = (e: KeyboardEvent) => {
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
              document.removeEventListener("keydown", damageHandler);
              clearInterval(intervalId);
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

      document.addEventListener("keydown", damageHandler);
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

  const ririppo = new Monster("リリッポ", 30, "ririppo", "つつく", 3, 5000);
  const tokotoko = new Monster("トコトコ", 200, "tokotoko", "かむ", 3, 5000);
  const torubo = new Monster("トルボ", 300, "torubo", "突進", 3, 5000);
  // ゲーム進行(f)
  const game_start = async () => {
    setPlaying(true);
    text.current = "";
    await delay(600);
    await fight(ririppo);
    await fight(tokotoko);
    await fight(torubo);
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
            {/* モーダルの表示3種類 */}
            {attackModal && (
              <div className="absolute top-36 px-1 left-6 bg-slate-100 border-black font-bold border-4 text-4xl rounded-md">
                {monster?.name}の{monster?.attack}!
              </div>
            )}

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
              <h2 className="text-5xl">{text.current}</h2>
              <div className="flex">
                <p className="text-3xl text-red-400">{filled.current}</p>
                <p className="text-3xl">{unfilled.current}</p>
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
