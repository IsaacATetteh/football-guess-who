"use client";
import React from "react";
import Link from "next/link";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";

const Signup = () => {
  const { userLoggedIn } = useAuth();
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      await doCreateUserWithEmailAndPassword(email, password, username);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center lg:w-full lg:h-full h-screen  bg-[#1D1D1D] text-white ">
      <h1 className=" font-extrabold text-4xl">Sign up to TBD</h1>
      <div className="border-0 h-96 border-white">
        <form
          className="flex flex-col gap-5 text-white py-10"
          onSubmit={onSubmit}
        >
          <input
            className="py-3 w-80 bg-[#2B2B2B] rounded-lg"
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input
            className="py-3 w-80 bg-[#2B2B2B] rounded-lg"
            type="password"
            placeholder="Confirm Password"
            name="password"
            required
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          <Link
            href="/Login"
            className="underline text-right text-sm text-[#575757]"
          >
            Already have an account?
          </Link>
          <button className="text-black font-bold py-3 rounded-lg bg-white">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
