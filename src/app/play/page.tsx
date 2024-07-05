import RightDisplay from "@/components/templates/RightDisplay";
import GameDisplay from "@/components/templates/GameDisplay";
import Description from "@/components/templates/Description";
import Developer from "@/components/organisms/Developer";
import ShareSns from "@/components/organisms/ShareSns";

function Page() {
  return (
    <>
      <main>
        <div className="relative px-8 pt-16 pb-12 flex flex-col bg-base min-h-screen shadow-xl">
          <div className="block bg-orange-300 mb-3 rounded-lg p-1 sm:hidden">
            当サイトはPCでの利用を想定しています
          </div>
          <div className="flex">
            <GameDisplay />
            <RightDisplay big={true} />
          </div>

          <div className="items-start space-x-0 pt-10 flex flex-col space-y-5 sm:flex-row sm:space-x-8 sm:space-y-0">
            <Description />
            <div className="min-w-[18rem] space-y-4">
              <ShareSns />
              {/* <Developer /> */}
              <RightDisplay big={false} />
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

export default Page;
