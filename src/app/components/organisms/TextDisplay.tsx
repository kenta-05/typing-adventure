import React from "react";

interface Props {
  keyCandidate: string;
  keyDone: string;
  kanjiText: string | undefined;
  typeSpace: boolean;
}

function TextDisplay({ keyCandidate, keyDone, kanjiText, typeSpace }: Props) {
  return (
    <div
      className="relative flex flex-col justify-center items-center border-2 border-black opacity-80 rounded-md h-64 mb-2 border-spacing-2 bg-slate-200"
      style={{ width: "98%" }}
    >
      {typeSpace && (
        <div className="absolute bottom-2 right-2 bg-slate-300 rounded-sm px-1">
          スペースキーで次へ↓
        </div>
      )}
      <div className="flex">
        <h2 className="text-[3rem] overflow-y-hidden">{kanjiText}</h2>
      </div>
      <div className="flex">
        <p className="text-[1.85rem] text-red-400">{keyDone}</p>
        <p className="text-[1.85rem]">{keyCandidate}</p>
      </div>
    </div>
  );
}

export default TextDisplay;
