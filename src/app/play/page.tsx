"use client";
import Link from "next/link";
import React, {
  ChangeEvent,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";

function Page() {
  return (
    <div className="flex pt-32 bg-gray-400 h-screen shadow-xl">
      <div className="bg-gray-100 w-4/5 h-144 mx-8 flex justify-center">
        <div className="bg-red-100 w-full flex flex-col justify-center items-center">
          <div className="w-full h-full flex justify-center items-end">
            <div className="mb-24">
              <img
                className="w-52"
                src="/opponents/ririppo.png"
                alt="opponent"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center border-2 border-black opacity-80 my-4 rounded-md w-11/12 h-80 border-spacing-2 bg-slate-200">
            <h2 className="text-5xl">隣の客はよく柿食う客だ</h2>
            <p className="text-3xl">tonarinokyakuhayokukakikuukyakuda</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-1/5 h-144 mr-8 flex justify-center">
        <img
          src="/sotetu.png"
          alt="Avatar"
          className="w-20 h-20 rounded-full"
        />
      </div>
    </div>
  );
}

export default Page;
