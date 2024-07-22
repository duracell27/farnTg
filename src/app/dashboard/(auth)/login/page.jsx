"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Login = () => {
  const hadleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password, callbackUrl: '/dashboard', } );
  };
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <p>Login</p>
      <form className="p-2 flex flex-col gap-2" onSubmit={hadleSubmit}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="bg-green-300 text-black">
          Login
        </button>
      </form>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-green-300 text-black"
      >
        Continue with google
      </button>
      <Link href={"/dashboard/register"} className="cursor-pointer">
        Dont have an account? Register
      </Link>
    </div>
  );
};

export default Login;
