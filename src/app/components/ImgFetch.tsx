function ImgFetch() {
  // 画像の読み込み
  const imageUrls = [
    "/background/stage-desert.jpg",
    "/background/stage-desert-dark.jpg",
    "/background/stage-factory.jpg",
    "/background/stage-factory-dark.jpg",
    "/background/stage-factory-light.jpg",
    "/background/stage-frozen.jpg",
    "/background/stage-frozen-dark.jpg",
    "/background/stage-ocean.jpg",
    "/background/stage-plains.jpg",
    "/background/stage-swaps.jpg",
    "/background/stage-swaps-dark.jpg",
    "/background/stage-universe.jpg",
    "/background/stage-volcano.jpg",
    "/background/stage-volcano-dark.jpg",

    "/opponents/baranbiruda.png",
    "/opponents/bi.png",
    "/opponents/bomuzikiru.png",
    "/opponents/buzerere.png",
    "/opponents/garagara.png",
    "/opponents/griffon.png",
    "/opponents/kione.png",
    "/opponents/kodora.png",
    "/opponents/korio.png",
    "/opponents/kureina.png",
    "/opponents/miku.png",
    "/opponents/moegame.png",
    "/opponents/odoshio.png",
    "/opponents/pimo.png",
    "/opponents/question.png",
    "/opponents/ririppo.png",
    "/opponents/sentori.png",
    "/opponents/seziru.png",
    "/opponents/siromaro.png",
    "/opponents/slime.png",
    "/opponents/temi_ru.png",
    "/opponents/tokotoko.png",
    "/opponents/torubo.png",
    "/opponents/wyvern.png",
    "/opponents/wyvernChild.png",
    "/opponents/yakarabati.png",
    "/opponents/zakiraru.png",

    "/sounds/cure.mp3",
    "/sounds/find.mp3",
    "/sounds/missType.mp3",
    "/sounds/monsterAttack.mp3",
    "/sounds/start.mp3",
    "/sounds/text.mp3",
    "/sounds/type.mp3",

    "/item/bronze_sword.png",
    "/item/buzerere_piece.png",
    "/item/cocktail_blue.png",
    "/item/crystal.png",
    "/item/fire_blue.png",
    "/item/fire_red.png",
    "/item/iron_sword.png",
    "/item/light.png",
    "/item/milk.png",
    "/item/ocean_sword.png",
    "/item/portion_blue.png",
    "/item/portion_green.png",
    "/item/portion_red.png",
    "/item/portion_special.png",
    "/item/star.png",
    "/item/thunder.png",
    "/item/yumi.png",
  ];

  return (
    <>
      {imageUrls.map((url, index) => (
        <img src={url} key={index} className="hidden" />
      ))}
    </>
  );
}
export default ImgFetch;
