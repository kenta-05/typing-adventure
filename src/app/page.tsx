import RightDesplay from "./components/templates/RightDesplay";
import Description from "./components/templates/Description";
import HomeDisplay from "./components/templates/HomeDisplay";
import Developer from "./components/organisms/Developer";
import Article from "./components/organisms/Article";
import ShareSns from "./components/organisms/ShareSns";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>タイピング冒険記</title>
        <meta
          name="description"
          content="タイピングしながら敵とバトルして冒険していく無料のタイピングゲームです。面白い対戦をしながら練習にもなります"
        />
        <meta
          name="keywords"
          content="タイピングゲーム, タイピング練習, 対戦, 冒険, 無料"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="タイピング冒険記" />
        <meta
          property="og:description"
          content="タイピングしながら敵とバトルして冒険していく無料のタイピングゲームです。面白い対戦をしながら練習にもなります"
        />
        <meta property="og:site_name" content="タイピング冒険記" />
        <meta property="og:url" content="https://typing-adventure.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="タイピング冒険記" />
        <meta
          name="twitter:description"
          content="タイピングしながら敵とバトルして冒険していく無料のタイピングゲームです。面白い対戦をしながら練習にもなります"
        />
        <meta name="twitter:site" content="@sotetu79" />
        <meta name="twitter:creator" content="@sotetu79" />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/twitter.png`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/opengraph.png`}
        />
      </Head>
      <main>
        <div className="relative px-8 pt-16 pb-12 flex flex-col bg-base min-h-screen shadow-xl">
          <div className="block bg-orange-300 mb-3 rounded-lg p-1 sm:hidden">
            当サイトはPCでの利用を想定しています
          </div>
          <div className="flex space-x-0 lg:space-x-8">
            <HomeDisplay />
            <RightDesplay big={true} />
          </div>

          <div className="items-start space-x-0 pt-10 flex flex-col space-y-5 sm:flex-row sm:space-x-8 sm:space-y-0">
            <Description />
            <div className="min-w-[18rem] space-y-4">
              <ShareSns />
              <Developer />
              <RightDesplay big={false} />
            </div>
          </div>

          <div className="flex space-x-8 pt-8">
            <div className="min-w-[64rem]"></div>
            <div className="min-w-[18rem]"></div>
          </div>
        </div>
      </main>
    </>
  );
}
