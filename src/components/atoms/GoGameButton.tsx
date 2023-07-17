import Link from "next/link";

export const GoGameButton = () => {
  return (
    <>
      <Link href="/play">
        <button className="text-[2.75rem] bg-first rounded-lg px-1 border-4 border-black transition hover:bg-third">
          プレイ画面へ
        </button>
      </Link>
    </>
  );
};
