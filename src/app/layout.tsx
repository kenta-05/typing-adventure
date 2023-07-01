import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "タイピング冒険記",
  description:
    "タイピングしながら敵とバトルして冒険していく無料のタイピングゲームです。面白い対戦をしながら練習にもなります",
  keywords: "タイピングゲーム, タイピング練習, 対戦, 冒険, 無料",
  author: "ソテツ",
  image: "/main/thumbnail.png",
  url: "https://typing-adventure.com",
  type: "website",
  locale: "ja_JP",

  // Twitter用のメタデータ
  twitterCard: "summary_large_image",
  twitterSite: "@sotetu79",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <Head>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:keywords" content={metadata.keywords} />
        <meta property="og:author" content={metadata.author} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:type" content={metadata.type} />
        <meta property="og:locale" content={metadata.locale} />

        <meta property="og:twitterCard" content={metadata.twitterCard} />
        <meta property="og:twitterSite" content={metadata.twitterSite} />
      </Head>
      <body
        className={`${inter.className} bg-main shadow-lg min-h-screen w-full flex justify-center`}
      >
        <FirebaseProvider>
          <div className="w-320">{children}</div>
        </FirebaseProvider>
      </body>
    </html>
  );
}
