"use client";
import React, { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { FaSearch } from "react-icons/fa";

const Game = ({ playerDetails, transferHistory }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const NEXT_PUBLIC_RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

  const { name, position, age, shirtNumber, nationality, image, team } =
    playerDetails;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.length > 0) {
      const options = {
        method: "GET",
        url: "https://transfermarkt-db.p.rapidapi.com/v1/search/quick-search",
        params: {
          locale: "DE",
          query: searchQuery,
        },
        headers: {
          "x-rapidapi-key": NEXT_PUBLIC_RAPID_API_KEY,
          "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
        },
      };

      try {
        console.log("API call initiated");
        const response = await axios.request(options);
        console.log("API response:", response.data);
        const players = response.data.data.players;
        setSearchResults(players);
        setShowModal(true);
      } catch (error) {
        console.error("API call error:", error);
      }
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-full w-full bg-[#1D1D1D] text-white pt-20">
      <div className="flex w-full h-full justify-center items-center flex-col">
        <div className="flex flex-col mb-4 border-[#575757] justify-center  items-center border rounded-lg py-4 md:py-10 w-64 md:w-96  overflow-y-auto">
          <ul>
            {transferHistory.map((transfer, index) => (
              <li key={index} className="mb-5 ">
                <div className="flex items-center mb-1 gap-2">
                  <div className="text-sm text-gray-400 w-10">
                    <span>{transfer.date.slice(-4)}</span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={transfer.newClubImage}
                      alt={transfer.newClubName}
                      className="w-10 h-12  mr-2 "
                    />
                    <span className="font-bold uppercase">
                      {transfer.newClubName}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center relative w-64 md:w-96">
            <label htmlFor=""></label>
            <FaSearch className="w-5 h-5 absolute ml-3 pointer-events-none" />
            <input
              className="border border-[#575757] pl-10 bg-transparent rounded-lg py-3 w-full"
              type="text"
              placeholder="Guess the player..."
              onChange={handleInputChange}
              value={searchQuery}
            />
          </div>
        </form>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((player) => (
              <li key={player.id} className="">
                <div className="flex items-center  h-24 hover:bg-[#1D1D1D] py-10">
                  <img
                    src={player.playerImage}
                    alt={player.playerName}
                    className="w-20 h-20 object-cover px-1 mr-2"
                  />
                  <div className="flex items-center gap-2">
                    <p>{`${player.firstName} ${player.lastName}`}</p>
                    <img
                      src={player.nationImage}
                      alt="Nationality"
                      className="w-3 h-3  mr-2"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </Modal>
    </div>
  );
};

export default Game;
