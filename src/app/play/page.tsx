"use client";
import Link from "next/link";
import React, {
  ChangeEvent,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";

function Page() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [kanji, setKanji] = useState("スペースボタンでスタート");
  const [unfilled, setUnfilled] = useState("");
  const [filled, setFilled] = useState("");
  const [hp, setHp] = useState<number>(100);
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

  const fill_new = () => {
    setPlaying(true);
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const randomSentence = sentences[randomIndex];
    setFilled("");
    setKanji(randomSentence.main);
    setUnfilled(randomSentence.sub);
  };
  const game_stop = () => {
    setPlaying(false);
    setKanji("スペースボタンでスタート");
    setUnfilled("");
    setFilled("");
  };

  useEffect(() => {
    // すべて入力すると書き換える
    if (unfilled === "" && playing) {
      fill_new();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      // スペースキーでスタート
      if (e.code === "Space") {
        if (playing) {
          return;
        }
        fill_new();
      }
      // ESPキーで中断
      if (e.code === "Escape") {
        game_stop();
        setHp(100);
      }
      // 入力キーの判定
      if (e.key === unfilled.charAt(0)) {
        setFilled((prevFilled) => prevFilled + e.key);
        setUnfilled((prevUnfilled) => prevUnfilled.slice(1));
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

  // HPバーの割合の計算
  const hpBarStyle = {
    width: `${hp}%`,
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
                  style={hpBarStyle}
                >
                  <p className="text-white">{hp}</p>
                </div>
              </div>
            </div>

            <div className="w-full h-full flex justify-center items-end">
              <div className="mb-24">
                {/* <img className="w-56" src="/opponents/kione.png" alt="" /> */}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center border-2 border-black opacity-80 rounded-md w-full h-72 border-spacing-2 bg-slate-200">
              <h2 className="text-5xl">{kanji}</h2>
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
