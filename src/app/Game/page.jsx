"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
const Game = ({ playerDetails }) => {
  const { name, position, age, shirtNumber, nationality, image, team } =
    playerDetails;

  return (
    <div className="h-full w-full bg-[#1D1D1D] text-white pt-20">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <div className="flex items-center mb-2">
          <img
            src={image}
            alt={name}
            className="w-20 h-20 object-cover rounded-full mr-4"
          />
          <div>
            <p>
              <strong>Position:</strong> {position}
            </p>
            <p>
              <strong>Age:</strong> {age}
            </p>
            <p>
              <strong>Shirt Number:</strong> {shirtNumber}
            </p>
            <p>
              <strong>Nationality:</strong> {nationality}
            </p>
            <p>
              <strong>Team:</strong> {team}
            </p>
          </div>
        </div>

        <div className="flex items-center relative">
          <FaSearch className="w-5 h-5 absolute ml-3 pointer-events-none" />
          <input
            className="border border-[#575757] pl-10 bg-transparent rounded-lg py-3"
            type="text"
            placeholder="Search for a player"
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
