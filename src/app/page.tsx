import Link from "next/link";
import RightDesplay from "./components/templates/RightDesplay";
import Description from "./components/templates/Description";
import HomeDisplay from "./components/templates/HomeDisplay";

export default function Home() {
  return (
    <>
      <main>
        <div className="relative px-8 pt-16 pb-12 flex flex-col bg-base min-h-screen shadow-xl">
          <div className="flex space-x-8">
            <HomeDisplay />
            <RightDesplay />
          </div>
          <div className="flex space-x-8 pt-12">
            <Description />
            <div className="min-w-[18rem]"></div>
          </div>
        </div>
      </main>
    </>
  );
}
