"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [league, setLeague] = useState("");

  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
  };

  return (
    <div className="h-full w-full bg-[#1D1D1D] text-white">
      <div className="flex justify-center items-center pt-20 h-full">
        <form className="flex flex-col gap-4" action="">
          <label htmlFor="league" className="font-semibold">
            Select League:
          </label>
          <select
            className="bg-[#1D1D1D] border border-[#727272] rounded-lg py-3 w-80"
            id="league"
            onChange={handleLeagueChange}
          >
            <option value="Serie A">Serie A</option>
            <option value="Premier League">Premier League</option>
          </select>
          <button className="text-black w-1/3 mt-10 mx-auto font-bold py-3 rounded-lg bg-white">
            Play
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
