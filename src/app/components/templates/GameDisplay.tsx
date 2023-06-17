"use client";
import React, { useEffect, useRef, useState } from "react";
import { Monster } from "../../class";
import MonsterDisplay from "../../components/organisms/MonsterDisplay";
import TextDisplay from "../../components/organisms/TextDisplay";
import HpBar from "../../components/atoms/HpBar";
import AttackDisplay from "../../components/atoms/AttackDisplay";
import LoseModal from "../../components/molecules/LoseModal";
import keygraph from "../../lib/keygraph";
import sentences from "../../sentences.json";
import CourseModal from "../organisms/CourseModal";

function GameDisplay() {
  const [playing, setPlaying] = useState<boolean>(false); // ゲーム中か否か
  const [isFight, setIsFight] = useState<boolean>(false);
  const [hp, setHp] = useState<number>(500); // プレイヤーのHP
  const [monster, setMonster] = useState<Monster | null>(null); // 現在セットされているモンスター
  const [item, setItem] = useState<string>(""); // 現在セットされているアイテム
  const [prevMonster, setPrevMonster] = useState<Monster | null>(null); // 前回戦っていたモンスター
  const damage = useRef(1); // 現在の攻撃力
  const [monsterHp, setMonsterHp] = useState<number>(0); // 上記モンスターのHP
  const [attackDisplay, setAttackDisplay] = useState<boolean>(false); // モンスターの攻撃文字の表示/非表示
  const attackPosition = useRef<
    { top: string; left: string } | { top: string; right: string }
  >({ top: "", left: "" }); // アタックモーダルの位置
  const [typeSpcae, setTypeSpace] = useState<boolean>(false); // 「スペースで進む」の表示/非表示
  const monsterAtack = useRef<NodeJS.Timeout | null>(null); // モンスター攻撃時タイマー
  const typeHandler = useRef<((e: KeyboardEvent) => void) | null>(null); // 攻撃時ハンドラー
  const [loseModal, setLoseModal] = useState<boolean>(false); // 敗北時モーダルの表示/非表示
  const [currentType, setCurrentType] = useState<number>(0); // 正解のタイプ数
  const [wrongType, setWrongType] = useState<number>(0); // 不正解のタイプ数

  const [stage, setStage] = useState<string>("stage-1"); // 現在のステージ
  const [courseModal, setCourseModal] = useState<boolean>(false); // コース選択モーダルの表示/非表示

  const [text, setText] = useState<string>("");
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
        window.location.reload();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playing, hp]);

  // 指定した時間、待機(f)
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  //攻撃モーダルの位置を抽選する(f)
  const modalLocate = () => {
    const positions = [
      { top: "130px", left: "25px" },
      { top: "200px", left: "25px" },
      { top: "130px", right: "25px" },
      { top: "200px", right: "25px" },
      { top: "270px", right: "25px" },
    ];
    const randomIndex = Math.floor(Math.random() * positions.length);
    attackPosition.current = positions[randomIndex];
  };

  // 文章書き換え(f)
  const fill_new = () => {
    setText("");
    const index = Math.floor(Math.random() * sentences.length);
    keygraph.build(sentences[index].kana);
    setKanjiText(sentences[index].kanji);
    disp();
  };

  // ゲームストップ(f)
  const game_stop = () => {
    setPlaying(false);
    setHp(1000);
    setPrevMonster(monster);
    setMonster(null);
    setAttackDisplay(false);
    setIsFight(false);
    setKanjiText("スペースキーでスタート");
    setText("");
    setKeyCandidate("");
    setKeyDone("");
    stopHandler();
  };

  // テキストの表示(f)
  const write = (_text: string) => {
    return new Promise<void>((resolve) => {
      setTypeSpace(true);
      setKanjiText("");
      setText(_text);
      const damageHandler = (e: KeyboardEvent) => {
        if (e.code === "Space") {
          document.removeEventListener("keydown", damageHandler);
          setText("");
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
      setIsFight(true);
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
            const newHp = prevHp - damage.current;

            // 敵HPが無くなると、win関数
            if (newHp <= 0) {
              setAttackDisplay(false);
              stopHandler();

              win().then(resolve);
            }
            return newHp;
          });
        } else if (!isNextKey) {
          // 不正解ならHPを-9する
          setHp((prev) => prev - 9);
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
        setAttackDisplay(false);

        setKanjiText("");
        setKeyCandidate("");
        setKeyDone("");
        setIsFight(false);
        resolve(); // モンスターが消えた
      }, 0); // 消えるアニメ実装
    });
  };

  const appear = (_monster: Monster) => {
    return new Promise<void>((resolve) => {
      setText("");
      setTypeSpace(true);
      setMonster(_monster);
      setMonsterHp(_monster.hp);
      setKanjiText(`${_monster.name}が現れた！`);
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

  const cure = (points: number) => {
    setHp((prev) => prev + points);
  };

  const find = (item: string, _text: string) => {
    return new Promise<void>((resolve) => {
      setTypeSpace(true);
      setKanjiText("");
      setText(_text);
      setItem(item);
      const damageHandler = (e: KeyboardEvent) => {
        if (e.code === "Space") {
          document.removeEventListener("keydown", damageHandler);
          setTypeSpace(false);
          setItem("");
          resolve();
        }
      };
      document.addEventListener("keydown", damageHandler);
    });
  };

  const unfind = () => {
    setItem("");
  };

  const slime = new Monster("スライム", 25, "slime", "たいあたり", 8, 3000);
  const yakarabati = new Monster(
    "ヤカラバチ",
    35,
    "yakarabati",
    "刺す",
    14,
    3200
  );
  const ririppo = new Monster("リリッポ", 80, "ririppo", "つつく", 3, 1200);
  const torubo = new Monster("トルボ", 140, "torubo", "突進", 17, 3500);
  const buruton = new Monster("ブルトン", 170, "buruton", "激怒", 19, 3200);
  const baranda = new Monster(
    "バランビルダ",
    250,
    "baranbiruda",
    "呪い",
    30,
    3000
  );
  // ゲーム進行(f)
  const game_start = async () => {
    setPlaying(true);
    await delay(400);

    await write("冒険の始まりだ");
    await write("戦闘の勝敗はタイピング力によって決まる！");
    await write("ミスをするとHPが減ってしまうし");
    await write("遅いと攻撃をたくさん食らってしまう");
    await write("高スコアを目指して頑張ろう");

    await appear(slime);
    await write("(スペースキーで戦闘が開始します)");
    // await fight(slime);
    await write("スライムを倒した！");

    await write("その調子！");
    await write("先へ進もう");

    await appear(yakarabati);
    await write("(スペースキーで戦闘が開始します)");
    // await fight(yakarabati);
    await write("ヤカラバチを倒した！");

    await write("あ！");
    await find("iron_sword", "鉄の剣を発見した！");
    await write("攻撃力が 1→2 しました");
    damage.current = 2;
    unfind();

    await write("先へ進もう");
    await appear(ririppo);
    await write("小ダメージで何度も攻撃してくる鳥だ");
    await write("(スペースキーで戦闘が開始します)");
    // await fight(ririppo);
    await write("リリッポを倒した！");

    await write("先へ進もう");
    await appear(torubo);
    await write("(スペースキーで戦闘が開始します)");
    // await fight(torubo);
    await write("トルボを倒した！");
    await write("先へ進もう");

    await find("portion1", "回復薬を発見した");
    cure(100);
    await write("HPを100回復した");
    await write("先へ進もう");
    unfind();

    setStage("stage-2");
    await write("沼地だ");
    await write("敵も強くなってくるだろう");

    await appear(buruton);
    await write("(スペースキーで戦闘が開始します)");
    // await fight(buruton);
    await write("ブルトンを倒した！");
    await write("なるべく正確に素早く撃破することでHPを温存しよう");
    await write("この世界には三体のドラゴンがいると言われていて");
    await write("彼らを倒すことが目標だ");
    await write("さて、先へ進もう");

    setStage("stage-2-dark");
    await write("まずい");
    await write("あたりが暗くなってきた");
    await write("あ！");
    await appear(baranda);
    await write("こいつは強敵だ");
    await write("ここが山場");
    await write("勝とう");
    await write("(スペースキーで戦闘が開始します)");
    // await fight(baranda);
    await write("バランビルダを倒した！");

    setStage("stage-2");
    await write("あたりが明るくなった");
    await write("あ！");
    await find("portion1", "回復薬を落としたぞ");
    cure(150);
    await write("HPが150回復した");
    await write("よし、先へ進もう");
    await write("お、分かれ道だ");
    await write("どの方向に進もう？");
    setCourseModal(true);
  };

  const factory_course = async () => {
    setCourseModal(false);
    setStage("stage-5");
  };

  const garagara = new Monster("ガラガラ", 170, "garagara", "激突", 12, 3200);
  const korio = new Monster("コリオ", 350, "korio", "ちゅんちゅん", 24, 3000);
  const desert_course = async () => {
    setCourseModal(false);
    setStage("stage-4");
    await write("砂漠地帯だ");
    await write("空気が乾燥している…");
    await write("…あ！");

    await appear(garagara);
    await write("HPは高いが攻撃力は低いぞ");
    await write("(スペースキーで戦闘が開始します)");
    // await fight(garagara);
    await write("ガラガラを倒した！");
    await write("お！");
    await find("bronze_sword", "銀の剣だ！");
    damage.current = 3;
    await write("攻撃力が 2→3 しました");
    await write("先へ進もう");

    await appear(korio);
    await write("見た目はかわいいがHPは高いぞ");
    await write("(スペースキーで戦闘が開始します)");
    // await fight(korio);
    await write("コリオを倒した！");
  };

  const marine_course = async () => {
    setCourseModal(false);
    setStage("stage-9");
  };

  return (
    <>
      <div
        className="bg-gray-100 flex justify-center relative overflow-y-hidden
        w-[64rem] h-144"
      >
        {loseModal && (
          <LoseModal
            prevMonster={prevMonster}
            setLoseModal={setLoseModal}
            currentType={currentType}
            wrongType={wrongType}
          />
        )}
        <div
          style={{
            backgroundImage: `url(/background/${stage}.jpg)`,
          }}
          className={
            "bg-cover w-full flex flex-col justify-center items-center relative z-0 overflow-y-hidden"
          }
        >
          {/* コース選択 */}
          {courseModal && (
            <CourseModal
              factory_course={factory_course}
              desert_course={desert_course}
              marine_course={marine_course}
            />
          )}

          <HpBar hp={hp} />
          {attackDisplay && (
            <AttackDisplay attackPosition={attackPosition} monster={monster} />
          )}
          <MonsterDisplay monster={monster} monsterHp={monsterHp} item={item} />
          <TextDisplay
            keyCandidate={keyCandidate}
            keyDone={keyDone}
            kanjiText={kanjiText}
            text={text}
            typeSpace={typeSpcae}
            isFight={isFight}
          />
        </div>
      </div>
    </>
  );
}

export default GameDisplay;
