import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import Head from "next/head";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "タイピング冒険記",
//   description:
//     "タイピングしながら敵とバトルして冒険していく無料のタイピングゲームです。面白い対戦をしながら練習にもなります",
//   keywords: "タイピングゲーム, タイピング練習, 対戦, 冒険, 無料",
//   openGraph: {
//     type: "website",
//     title: "タイピング冒険記",
//     description:
//       "タイピングしながら敵とバトルして冒険していく無料のタイピングゲームです。面白い対戦をしながら練習にもなります",
//     siteName: "タイピング冒険記",
//     url: "https://typing-adventure.com",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "タイピング冒険記",
//     description:
//       "タイピングしながら敵とバトルして冒険していく無料のタイピングゲームです。面白い対戦をしながら練習にもなります",
//     site: "@sotetu79",
//     creator: "@sotetu79",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div
        className={`${inter.className} bg-main shadow-lg min-h-screen w-full flex justify-center`}
      >
        <FirebaseProvider>
          <div className="w-320">{children}</div>
        </FirebaseProvider>
      </div>
    </>
  );
}
