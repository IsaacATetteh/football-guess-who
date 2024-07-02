"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

function Login() {
  const { userLoggedIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  if (userLoggedIn) {
    redirect("/Home");
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
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
    <div className="flex flex-col justify-center items-center lg:w-full h-full bg-[#1D1D1D] text-white ">
      <h1 className=" font-extrabold text-4xl">Login to TBD</h1>
      <div className="h-96 border-white">
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
          <button className="text-black font-bold py-3 rounded-lg bg-white">
            Log in
          </button>
        </form>
        <div className="flex flex-col">
          <div class="flex items-center my-4">
            <div class="flex-grow border-t border-[#575757]"></div>
            <span class="px-4 text-gray-600">or continue with</span>
            <div class="flex-grow border-t border-[#575757]"></div>
          </div>
          <button
            className="flex border-2 py-3 text-white rounded-lg border-[#2B2B2B] justify-center"
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
