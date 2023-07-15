import React from "react";

interface Props {
  factory_course: () => void;
  desert_course: () => void;
  ocean_course: () => void;
}

function CourseModal({ factory_course, desert_course, ocean_course }: Props) {
  return (
    <div className="items-center bg-white rounded-md absolute top-20 p-6 flex flex-col justify-between space-y-2">
      <button
        onClick={factory_course}
        className="w-[26rem] h-20 flex items-center justify-center bg-gray-300 text-[1.8rem] border-2 border-black rounded-md transition hover:bg-gray-400"
      >
        工場コース
      </button>
      <button
        onClick={desert_course}
        className="w-[26rem] h-20 flex items-center justify-center bg-brown text-[1.8rem] border-2 border-black rounded-md transition hover:bg-brown-dark"
      >
        砂漠コース
      </button>
      <button
        onClick={ocean_course}
        className="w-[26rem] h-20 flex items-center justify-center bg-indigo-300 text-[1.8rem] border-2 border-black rounded-md transition hover:bg-indigo-400"
      >
        海洋コース
      </button>
    </div>
  );
}

export default CourseModal;
