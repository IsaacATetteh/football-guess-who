"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import { redirect } from "next/navigation";
import errorHandler from "../firebase/errorHandler";

function Login() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (userLoggedIn) {
    redirect("/Home");
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      setIsSigningIn(false);
      errorHandler(error);
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] justify-center items-center lg:w-full py-20 bg-[#1D1D1D] text-white ">
      <div className="flex h-[28rem] items-center flex-col">
        <h1 className=" font-extrabold text-5xl">Login</h1>
        <form
          className="flex flex-col gap-5 text-white py-10"
          onSubmit={onSubmit}
        >
          <input
            className="py-3 w-80 bg-[#2B2B2B] rounded-lg"
            type="email"
            placeholder="Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="py-3 w-80 bg-[#2B2B2B] rounded-lg"
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            href="/Signup"
            className="underline text-right text-sm text-[#575757]"
          >
            {`Don't have an account?`}
          </Link>
          <button className="text-black font-bold py-3 rounded-lg transform transition duration-75 ease-in-out active:shadow-none active:translate-y-1 bg-[#E9E3DA] hover:bg-white">
            Log in
          </button>
        </form>
        <div className="flex flex-col w-full">
          <div class="flex items-center my-4">
            <div class="flex-grow border-t border-[#575757]"></div>
            <span class="px-4 text-gray-600">or continue with</span>
            <div class="flex-grow border-t border-[#575757]"></div>
          </div>
          <button
            className="flex py-3 border-2 text-white rounded-lg border-[#2B2B2B] justify-center"
            disabled={isSigningIn}
            onClick={(e) => {
              onGoogleSignIn(e);
            }}
          >
            <img
              src="/google-icon.png"
              alt="Google logo"
              class="w-6 h-6 mr-3"
            />
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
