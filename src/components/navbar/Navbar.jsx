'use client'
import Link from "next/link";
import React from "react";
import DarkModeToggle from "../darkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const {status} = useSession()
  return (
    <div className=" flex justify-between items-center">
      <Link href={"/"} className="font-bold text-[22px]">Farm</Link>
      <div className="flex items-center gap-5">
        {/* <DarkModeToggle/> */}
        {/* <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/blog"}>Blog</Link> */}
      </div>
      {status==='unauthenticated' && (<Link className="p-1 bg-[#53c28b] text-black cursor-pointer rounded" href={"/dashboard/login"}>Login</Link>)}
      {status==='authenticated' && (<button className="p-1 bg-[#53c28b] text-black cursor-pointer rounded" onClick={signOut}>Log out</button>)}
      {/* <button className="p-1 bg-[#53c28b] text-black cursor-pointer rounded" onClick={signOut}>Log out</button> */}
    </div>
  );
};

export default Navbar;
