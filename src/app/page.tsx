import Link from "next/link";
import RightDesplay from "./components/templates/RightDesplay";

export default function Home() {
  return (
    <>
      <main>
        <div className="space-x-8 px-8 flex pt-24 h-screen bg-gray-400 shadow-xl">
          <div className="bg-gray-100 w-[64rem] h-144 flex justify-center relative">
            <div className="space-y-20 flex flex-col justify-center items-center">
              <h1 className="text-6xl">タイピング冒険者</h1>
              <Link href="/play">
                <button className="text-5xl bg-blue-500 px-6 py-2 text-white">
                  ゲームスタート
                </button>
              </Link>
              <div className="pt-8 space-x-10">
                <button className="text-3xl bg-gray-500 rounded-full px-6 py-2 text-white">
                  記録
                </button>
                <button className="text-3xl bg-gray-500 rounded-full px-6 py-2 text-white">
                  遊び方
                </button>
                <button className="text-3xl bg-gray-500 rounded-full px-6 py-2 text-white">
                  設定
                </button>
              </div>
            </div>
          </div>
          <RightDesplay />
        </div>
      </main>
    </>
  );
}
