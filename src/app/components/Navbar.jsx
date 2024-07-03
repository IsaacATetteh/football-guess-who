"use client";
import React from "react";
import { MdLeaderboard } from "react-icons/md";
import Link from "next/link"; // Import Link from next/link
import { doSignOut } from "../firebase/auth";

const Navbar = () => {
  const handleSignOut = async () => {
    try {
      await doSignOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    <nav className="flex z-2000  h-20 w-full items-center justify-between py-5 px-5 md:px-10 shadow-lg bg-[#272626]">
      <h1 className="text-white font-extrabold text-md md:text-xl">
        Football Guess Who
      </h1>
      <div className="flex gap-4 text-white items-center">
        <MdLeaderboard className="cursor-pointer h-8 w-8" />
        <button
          onClick={handleSignOut}
          className="py-2 px-3 text-white rounded-lg border-2 border-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
