import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-[50px] flex justify-between items-center">
      <div className="flex justify-center items-center gap-3 w-full">
        <Link className="p-2 rounded-lg cursor-pointer bg-yellow-400 text-black" href={'/werehouse'}>склад</Link>
        <Link className="p-2 rounded-lg cursor-pointer bg-yellow-400 text-black" href={'/'}>ферма</Link>
        <Link className="p-2 rounded-lg cursor-pointer bg-yellow-400 text-black" href={'/production'}>виробництво</Link>
      </div>
    </div>
  );
};

export default Footer;
