"use client";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";

const DarkModeToggle = () => {
  const { mode, toggleMode } = useContext(ThemeContext);

  return (
    <div
      className="w-11 h-6 px-1
     border border-[#53c28b70] rounded-full flex justify-between items-center gap-2 relative cursor-pointer"
      onClick={toggleMode}
    >
      <div className="text-[12px]">🌙</div>
      <div className="text-[12px]">☀️</div>
      <div
        className={`size-[15px] bg-[#53c28b] rounded-full absolute ${
          mode === "light" ? "left-6" : "left-1"
        }`}
      />
    </div>
  );
};

export default DarkModeToggle;
