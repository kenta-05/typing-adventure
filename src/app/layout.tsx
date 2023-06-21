import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { FirebaseProvider } from "./providers/FirebaseProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "タイピング冒険記",
  description:
    "タイピングしながら敵とバトルして冒険していく無料のタイピングゲームです。面白い対戦をしながら練習にもなります",
  keywords: [
    "タイピングゲーム",
    "タイピング練習",
    "対戦ゲーム",
    "冒険ゲーム",
    "無料",
  ],
  author: "ソテツ",
  image: "/path/to/image.jpg", // ゲームのイメージ画像へのパス
  url: "https://example.com/typing-game", // ゲームの公式ウェブサイトのURL
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
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
