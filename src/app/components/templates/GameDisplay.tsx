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

  const slime = new Monster("スライム", 35, "slime", "たいあたり", 7, 3000);
  const yakarabati = new Monster(
    "ヤカラバチ",
    40,
    "yakarabati",
    "刺す",
    12,
    3200
  );
  const ririppo = new Monster("リリッポ", 100, "ririppo", "つつく", 3, 1200);
  const torubo = new Monster("トルボ", 140, "torubo", "突進", 19, 3500);
  const baranda = new Monster(
    "バランビルダ",
    275,
    "baranbiruda",
    "呪い",
    32,
    3000
  );
  const garagara = new Monster("ガラガラ", 210, "garagara", "激突", 10, 3200);
  const korio = new Monster("コリオ", 310, "korio", "ちゅんちゅん", 15, 3000);
  const wyvernChild = new Monster(
    "ワイバーンの幼生",
    465,
    "wyvernChild",
    "ぼぼぼぼぼ",
    27,
    3000
  );
  const moegame = new Monster("モエガメ", 270, "moegame", "火炎放射", 13, 4000);
  const bi = new Monster("び", 395, "bi", "びびび", 20, 3000);
  const bomuzikiru = new Monster(
    "ボムジキル",
    435,
    "bomuzikiru",
    "暴れまわる",
    22,
    3300
  );
  const wyvern = new Monster("ワイバーン", 750, "wyvern", "灼熱熱波", 45, 2000);
  const invincible_slime = new Monster(
    "無敵スライム君",
    10000,
    "slime",
    "ぷにぷに",
    10,
    3000
  );

  const pimo = new Monster("ピモ", 210, "pimo", "電気ショック", 10, 3200);
  const temi_ru = new Monster("テミール", 310, "temi_ru", "電磁法", 15, 3000);
  const siromaro = new Monster(
    "しろまろ",
    465,
    "siromaro",
    "かみつき",
    27,
    3000
  );
  const question = new Monster("？？？", 270, "question", "でんじは", 13, 4000);
  const kureiina = new Monster(
    "クレイイナ",
    395,
    "kureiina",
    "スターマグナム",
    20,
    3000
  );
  const miku = new Monster("ミク", 435, "miku", "◇〇☆△", 22, 3300);
  const griffon = new Monster(
    "グリフォン",
    750,
    "griffon",
    "疾風破烈斬",
    45,
    2000
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
    await fight(slime);
    await write("スライムを倒した！");

    await write("その調子！");
    await write("先へ進もう");

    await appear(yakarabati);
    await write("この一帯で一番大きい女王バチだ");
    await write("(スペースキーで戦闘が開始します)");
    await fight(yakarabati);
    await write("ヤカラバチを倒した！");
    await write("近隣の住民から感謝されるだろう");
    await write("…");

    await write("あ！");
    await find("iron_sword", "鉄の剣を発見した！");
    await write("攻撃力が 1→2 しました");
    await write("これはラッキーだ");
    damage.current = 2;
    unfind();

    await write("先へ進もう");
    await appear(ririppo);
    await write("小ダメージで何度も攻撃してくる鳥だ");
    await write("(スペースキーで戦闘が開始します)");
    await fight(ririppo);
    await write("リリッポを倒した！");
    await write("なるべく正確に素早く撃破することでHPを温存しよう");
    await write("この世界には三体のドラゴンがいると言われていて");
    await write("彼らを倒すことが目標だ");

    setStage("stage-2");
    await write("沼地だ");
    await write("敵も強くなってくるだろう");

    await appear(torubo);
    await write("(スペースキーで戦闘が開始します)");
    await fight(torubo);
    await write("トルボを倒した！");
    await find("portion_green", "トルボは回復薬を落とした");
    cure(50);
    await write("HPを50回復した");
    await write("先へ進もう");
    unfind();
    await write("さて、先へ進もう");

    setStage("stage-2-dark");
    await write("…");
    await write("…あれ？");
    await write("まずい");
    await write("あたりが暗くなってきた");
    await write("あ！");
    await appear(baranda);
    await write("こいつは強敵だ");
    await write("数々の勇者がここで倒れてきた");
    await write("勝とう");
    await write("(スペースキーで戦闘が開始します)");
    await fight(baranda);
    await write("バランビルダを倒した！");

    setStage("stage-2");
    await write("あたりが明るくなった");
    await write("あ！");
    await find("portion_green", "回復薬を落としたぞ");
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
    await write("工場だ");
    await write("空気は冷えている");

    await write("あ！");
    await write("機械の部品が動き出した");
    await write("コチラへ向かってくる…");
    await appear(pimo);
    await write("戦う気のようだ");
    await write("(スペースキーで戦闘が開始します)");
    await fight(pimo);
    await write("ピモを倒した！");
    await write("お！");
    await find("light", "部品の一部を落としていった");
    damage.current = 3;
    await write("攻撃力が 2→3 しました");
    await write("先へ進もう");

    await write("…");
    await write("…！！");
    await appear(temi_ru);
    await write("機械に操られているようだ…");
    await fight(temi_ru);
    await write("テミールを倒した！");
    await find("fire_red", "電気の欠片を落とした");
    damage.current = 4;
    await write("攻撃力が 3→4 しました");
    await find("portion_green", "回復薬を落とした");
    cure(150);
    await write("HPを150回復した");

    await write("あれ");
    await write("倒したテミールがまだ生きている…");
    await write("あ！");
    await write("中から本体が出てきた！");
    await appear(siromaro);
    await write("弱っている");
    await write("だが怒っているようだ…");
    await write("(スペースキーで戦闘が開始します)");
    await fight(siromaro);
    await write("しろまろを倒した！");

    await write("先へ進もう");
    await write("…");
    await write("…！");
    await appear(question);
    await write("機械が動いたり");
    await write("操られたりしていたのも");
    await write("こいつが原因のようだ");
    await fight(question);
    await write("(スペースキーで戦闘が開始します)");
    await write("？？？を倒した！");

    await write("先へ進もう");
    setStage("stage-5-dark");
    await write("…");
    await write("暗い");
    await write("工場の最深部のようだ");
    await write("…");
    await write("あれ");
    await write("よくわからない機械がある");
    await write("触ってみようかな…");
    await write("…");
    await write("レバーを動かした");
    await write("…");
    await write("ボタンを押した");
    await write("もう一度ボタンを押した");
    setStage("stage-5-light");
    await write("あ！");
    await write("機械が光り出した！！");
    await write("…");
    await write("……！！！！！！！");

    setStage("stage-space");
    await write("宇宙だ");
    await write("宇宙に飛ばされてしまった");
    await write("周りは星々で満ちている");
    await appear(kureiina);
    await write("宇宙馬だ");
    await write("(スペースキーで戦闘が開始します)");
    await write("クレイイナを倒した！");
    await find("portion_green", "あ、回復薬だ");
    cure(65);
    await write("HPを65回復した");

    await write("クレイイナの甲高い声が響いた");
    await write("よし、先へ進もう");
    await write("…");
    await write("あ！");
    appear(miku);
    await write("ミクは宇宙に住むドラゴンの守護神だ");
    await write("これ以上進むには");
    await write("ミクを倒さなければならない");
    await write("ミクはこちらを睨んでいる…");
    await write("(スペースキーで戦闘が開始します)");
    fight(miku);
    await write("ミクを倒した！");
    await write("ミクは粒子となって消えてしまった…");
    await find("crystal", "ミクの魂を手に入れた");
    damage.current = 6;
    await write("攻撃力が 4→6 しました");
    await find("star", "星屑を手に入れた");
    cure(150);
    await write("HPを150回復した");

    await write("…");
    await write("重々しい羽音が聞こえる");
    await write("周囲の星が光り出した");
    await appear(griffon);
    await write("凛とした表情でコチラを見つめている…！");
    await write("(スペースキーで戦闘が開始します)");
    await fight(griffon);
    await write("グリフォンを倒した！");
    await write("星たちは輝きを失ってしまった");
    await write("…");
    await write("ゲームクリア！");

    await write("まさかラスボスを倒すとは…");
    await write("開発者はここまで想定していませんでした…");
    await write("…");
    await write("……");
    await write("…");
    await write("………");
    await write("…では");
    await write("念のため用意している「無敵スライム君」がいるので…");
    await write("そいつと戦って追加のスコア測定してください…");
    appear(invincible_slime);
    await write("(スペースキーで戦闘が開始します)");
    fight(invincible_slime);
  };

  const desert_course = async () => {
    setCourseModal(false);
    setStage("stage-4");
    await write("砂漠地帯だ");
    await write("空気が乾燥している…");
    await write("…あ！");

    await appear(garagara);
    await write("岩でできた怪物だ");
    await write("(スペースキーで戦闘が開始します)");
    await fight(garagara);
    await write("ガラガラを倒した！");
    await write("お！");
    await find("bronze_sword", "銀の剣だ！");
    damage.current = 3;
    await write("攻撃力が 2→3 しました");
    await write("先へ進もう");

    setStage("stage-4-dark");
    await write("あれ？");
    await write("あたりの様子がおかしい…");
    await write("…");
    await write("…あ！");
    await appear(wyvernChild);
    await write("伝説のドラゴンの内の1匹だが");
    await write("まだ幼生のようだ");
    await write("こちらと戦闘しようとしている…");
    await write("(スペースキーで戦闘が開始します)");
    await fight(wyvernChild);
    await write("ワイバーンの幼生を倒した！");
    await write("遠くの空へ逃げていく…");
    setStage("stage-4");
    await write("あたりが元に戻った");
    await find("fire_red", "ワイバーンの炎の欠片を見つけた");
    damage.current = 4;
    await write("攻撃力が 3→4 しました");
    await find("portion_red", "ドラゴンの息吹を見つけた");
    cure(150);
    await write("HPを150回復した");
    await write("もうすぐで火山地帯につくぞ");
    await write("先へ進もう…");

    appear(moegame);
    await write("(スペースキーで戦闘が開始します)");
    await fight(moegame);
    await write("モエガメを倒した！");
    await write("よし、先へ進もう");
    await write("ここから先は、より暑くなっていく");

    setStage("stage-6");
    await write("…");
    await write("火山地帯だ");
    await write("焼けるような暑さだ…");
    await appear(korio);
    await write("見た目はかわいいがHPは高いぞ");
    await write("(スペースキーで戦闘が開始します)");
    await fight(korio);
    await write("コリオを倒した！");

    await appear(bi);
    await write("普段はマグマの中で暮らしているモンスターだ");
    await write("(スペースキーで戦闘が開始します)");
    await fight(bi);
    await write("びを倒した！");
    await find("portion_green", "あ、回復薬だ");
    cure(65);
    await write("HPを65回復した");

    await write("さて、先へ進もう");
    await write("どんどん深く進んでいく…");
    setStage("stage-6-dark");
    await write("あたりが暗くなってきた");
    await write("ここが火山の最深部だ");

    await write("あ！");
    await appear(bomuzikiru);
    await write("火山地帯最深部の番人だ");
    await write("こちらを睨んでいる…");
    await write("(スペースキーで戦闘が開始します)");
    await fight(bomuzikiru);
    await write("ボムジキルを倒した！");
    await find("fire_blue", "ボムジキルの炎の欠片を見つけた");
    damage.current = 6;
    await write("攻撃力が 4→6 しました");
    await find("portion_special", "ボムジキルのエキスを見つけた");
    cure(150);
    await write("HPを150回復した");

    await write("ボムジキルの倒れこむ音が響き渡る");
    await write("地面が揺れている…");
    await write("恐ろしい轟音が鳴った");
    await write("…");

    await write("…あ！");
    await appear(wyvern);
    await write("さっきより成長している…");
    await write("ワイバーンは怒りに燃えているようだ");
    await write("(スペースキーで戦闘が開始します)");
    await fight(wyvern);
    await write("ワイバーンを倒した！");
    await write("ワイバーンの巨大な体が崩れ落ち、静寂が戻ってきた…");
    await write("…");
    await write("ゲームクリア！");

    await write("まさかラスボスを倒すとは…");
    await write("開発者はここまで想定していませんでした…");
    await write("…");
    await write("……");
    await write("…");
    await write("………");
    await write("…では");
    await write("念のため用意している「無敵スライム君」がいるので…");
    await write("そいつと戦って追加のスコア測定してください…");
    appear(invincible_slime);
    await write("(スペースキーで戦闘が開始します)");
    fight(invincible_slime);
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
