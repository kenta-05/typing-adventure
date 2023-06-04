import React from "react";

function Loading() {
  return (
    <div className="flex pt-32 bg-gray-400 h-screen shadow-xl">
      <div className="bg-gray-100 w-4/5 h-144 mx-8 flex justify-center">
        <div className="space-y-20 flex flex-col justify-center items-center">
          Now Loading
        </div>
      </div>
    </div>
  );
}

export default Loading;
