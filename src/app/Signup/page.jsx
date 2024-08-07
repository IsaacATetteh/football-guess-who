"use client";
import React from "react";
import Link from "next/link";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const Signup = () => {
  const { userLoggedIn } = useAuth();
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (userLoggedIn) {
    redirect("/Home");
  }
  const success = () => toast.success("Account created successfully!");
  const info = () => toast.info("Passwords must match");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      info();
      return;
    }
    if (!isSigningUp) {
      setIsSigningUp(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password, username);
        success();
      } catch (error) {
        throw error;
      } finally {
        setIsSigningUp(false);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] justify-center items-center lg:w-full py-20 bg-[#1D1D1D] text-white ">
      <div className="flex h-[28rem] items-center flex-col">
        <h1 className=" font-extrabold text-5xl">Sign Up</h1>
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
            className="underline text-right text-blue-400 hover:text-blue-300 text-sm"
          >
            Already have an account?
          </Link>
          <button className="text-black font-bold py-3 rounded-lg transform transition duration-75 ease-in-out active:shadow-none active:translate-y-1 bg-[#E9E3DA] hover:bg-white">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
