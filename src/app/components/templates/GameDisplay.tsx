import React, { useEffect, useRef, useState } from "react";
import { Monster } from "../../class";
import MonsterDisplay from "../../components/organisms/MonsterDisplay";
import TextDisplay from "../../components/organisms/TextDisplay";
import HpBar from "../../components/atoms/HpBar";
import AttackDisplay from "../../components/atoms/AttackDisplay";
import LoseModal from "../../components/molecules/LoseModal";
import keygraph from "../../lib/keygraph";
import sentences from "../../sentences.json";

function GameDisplay() {
  const [playing, setPlaying] = useState<boolean>(false); // ゲーム中か否か
  const [hp, setHp] = useState<number>(100); // プレイヤーのHP
  const [monster, setMonster] = useState<Monster | null>(null); // 現在セットされているモンスター
  const [prevMonster, setPrevMonster] = useState<Monster | null>(null); // 限界戦っていたモンスター
  const [monsterHp, setMonsterHp] = useState<number>(0); // 上記モンスターのHP
  const [attackDisplay, setAttackDisplay] = useState<boolean>(false); // モンスターの攻撃文字の表示/非表示
  const text = useRef("スペースキーでスタート"); // 基本的なテキスト+問題文
  const unfilled = useRef(""); // 未入力ローマ字
  const filled = useRef(""); // 入力済みローマ字
  const attackPosition = useRef({ top: "", left: "" }); // アタックモーダルの位置
  const [typeSpcae, setTypeSpace] = useState<boolean>(false); // 「スペースで進む」の表示/非表示
  const monsterAtack = useRef<NodeJS.Timeout | null>(null); // モンスター攻撃時タイマー
  const typeHandler = useRef<((e: KeyboardEvent) => void) | null>(null); // 攻撃時ハンドラー
  const [loseModal, setLoseModal] = useState<boolean>(false); // 敗北時モーダルの表示/非表示
  const [currentType, setCurrentType] = useState<number>(0); // 正解のタイプ数
  const [wrongType, setWrongType] = useState<number>(0); // 不正解のタイプ数
  const [stageNum, setStageNum] = useState<string>("stage-1"); // 現在のステージ

  const [kanjiText, setKanjiText] = useState<string>("スペースキーでスタート"); // 現在の漢字込みテキスト
  const [keyCandidate, setKeyCandidate] = useState(""); // 未入力
  const [keyDone, setKeyDone] = useState(""); // 既入力
  // キーの複数入力ライブラリのインスタンス
  const disp = () => {
    setKeyCandidate(keygraph.key_candidate());
    setKeyDone(keygraph.key_done());
  };

  // モンスター攻撃のハンドラー除去
  const stopHandler = () => {
    if (monsterAtack.current) {
      clearInterval(monsterAtack.current);
      monsterAtack.current = null;
    }
    if (typeHandler.current) {
      document.removeEventListener("keydown", typeHandler.current);
      typeHandler.current = null;
    }
  };

  useEffect(() => {
    // HPが0以下になるとgame_stop()
    if (hp <= 0) {
      game_stop();
      setLoseModal(true);
    }
    // ホーム画面でのキーイベント
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // スクロールを防ぐ
        if (!playing) {
          game_start();
          console.log("反応しています");
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
    const index = Math.floor(Math.random() * sentences.length);
    keygraph.build(sentences[index].kana);
    setKanjiText(sentences[index].kanji);
    disp();
  };

  // ゲームストップ(f)
  const game_stop = () => {
    setPlaying(false);
    text.current = "";
    filled.current = "";
    unfilled.current = "";
    setHp(100);
    setPrevMonster(monster);
    setMonster(null);
    setAttackDisplay(false);

    stopHandler();
  };

  // テキストの表示(f)
  const write = (_text: string) => {
    return new Promise<void>((resolve) => {
      setTypeSpace(true);
      setKanjiText(_text);
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
      typeHandler.current = (e: KeyboardEvent) => {
        const isNextKey = keygraph.next(e.key);
        if (isNextKey) {
          // 正解のタイプ数を++
          setCurrentType((prev) => prev + 1);
          setMonsterHp((prevHp) => {
            // 正解ならHPを減らして、Filledを移動
            const newHp = prevHp - 1;

            // 敵HPが無くなると、win関数
            if (newHp <= 0) {
              setAttackDisplay(false);
              stopHandler();

              win().then(resolve);
            }
            return newHp;
          });
        } else if (!isNextKey) {
          // 不正解ならHPを-2する
          setHp((prev) => prev - 1);
          // 不正解のタイプ数を++
          setWrongType((prev) => prev + 1);
        }

        if (keygraph.is_finished()) {
          fill_new();
        }
        disp();
      };

      document.addEventListener("keydown", typeHandler.current);
    });
  };

  const win = () => {
    return new Promise<void>((resolve) => {
      // モンスターが消えるのを待つ
      setTimeout(() => {
        setMonsterHp(0);
        setPrevMonster(monster);
        setMonster(null);
        stopHandler();

        setKanjiText("");
        setKeyCandidate("");
        setKeyDone("");
        resolve(); // モンスターが消えた
      }, 0); // 消えるアニメ実装
    });
  };

  const ririppo = new Monster("リリッポ", 55, "ririppo", "つつく", 2, 3000);
  const tokotoko = new Monster("トコトコ", 200, "tokotoko", "かむ", 3, 5000);
  const torubo = new Monster("トルボ", 300, "torubo", "突進", 3, 5000);
  // ゲーム進行(f)
  const game_start = async () => {
    setPlaying(true);
    text.current = "";
    await delay(200);
    await fight(ririppo);
    await write("リリッポを倒した！");
    await write("次に出てくる敵に対策しよう");
    await write("タイピングで倒すことができます");
    await write("ミスをするとHPが減ってしまいます");
    await fight(tokotoko);
    await fight(torubo);
  };

  return (
    <div className="bg-gray-100 w-[64rem] h-144 flex justify-center relative">
      {loseModal && (
        <LoseModal
          prevMonster={prevMonster}
          setLoseModal={setLoseModal}
          game_start={game_start}
          currentType={currentType}
          wrongType={wrongType}
        />
      )}
      <div
        className={`bg-${stageNum} bg-cover w-full flex flex-col justify-center items-center relative z-0`}
      >
        <HpBar hp={hp} />
        {attackDisplay && (
          <AttackDisplay attackPosition={attackPosition} monster={monster} />
        )}
        <MonsterDisplay monster={monster} monsterHp={monsterHp} />
        <TextDisplay
          keyCandidate={keyCandidate}
          keyDone={keyDone}
          kanjiText={kanjiText}
          typeSpace={typeSpcae}
        />
      </div>
    </div>
  );
}

export default GameDisplay;
