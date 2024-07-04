import Description from "@/components/templates/Description";
import React from "react";

function Loading() {
  return (
    <div className="w-320">
      <div className="relative px-8 pt-16 pb-12 flex flex-col bg-base min-h-screen shadow-xl">
        <div className="flex space-x-8 pr-4">
          <div className="bg-gray-200 w-full h-144 space-y-12 flex justify-center overflow-x-hidden">
            <div className="space-y-10 w-full min-w-[64rem] flex flex-col items-center justify-center"></div>
          </div>

          <div className="bg-gray-100 min-w-[18rem] h-144 flex flex-col justify-between border-2 border-black rounded-md"></div>
        </div>
        <div className="flex space-x-8 pt-12">
          <Description />
          <div className="min-w-[18rem]"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
