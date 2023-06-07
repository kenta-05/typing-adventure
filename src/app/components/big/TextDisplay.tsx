import React from "react";

interface Props {
  text: React.RefObject<string>;
  filled: React.RefObject<string>;
  unfilled: React.RefObject<string>;
  typeSpace: boolean;
}

function TextDisplay({ text, filled, unfilled, typeSpace }: Props) {
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
      <h2 className="text-5xl">{text.current}</h2>
      <div className="flex">
        <p className="text-3xl text-red-400">{filled.current}</p>
        <p className="text-3xl">{unfilled.current}</p>
      </div>
    </div>
  );
}

export default TextDisplay;
