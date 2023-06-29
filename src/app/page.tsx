import RightDesplay from "./components/templates/RightDesplay";
import Description from "./components/templates/Description";
import HomeDisplay from "./components/templates/HomeDisplay";
import Developer from "./components/templates/Developer";
import Article from "../app/components/templates/Article";

export default function Home() {
  return (
    <>
      <main>
        <div className="relative px-8 pt-16 pb-12 flex flex-col bg-base min-h-screen shadow-xl">
          <div className="flex space-x-8">
            <HomeDisplay />
            <RightDesplay big={true} />
          </div>

          <div className="flex items-start space-x-8 pt-10">
            <Description />
            <div className="min-w-[18rem]">
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
