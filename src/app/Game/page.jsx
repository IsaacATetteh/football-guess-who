"use client";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import Modal from "../components/Modal";
import { FaSearch } from "react-icons/fa";
import GameOver from "../components/GameOver";
import { toast } from "react-toastify";
import {
  getMostValuableTeams,
  getClubSquad,
  getPlayerTransfers,
} from "../api/transfermarkt";

const Game = ({
  playerDetails,
  transferHistory,
  setShowGame,
  setPlayerDetails,
  setTransferHistory,
  competitionId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const NEXT_PUBLIC_RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

  const correct = () => toast.success("Correct");
  const incorrect = () => toast.error("Incorrect");

  const handleGameOverClose = () => {
    setGameOver(false);
    setShowGame(false);
  };

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

  const handlePlayerClick = (player) => {
    if (player.id === playerDetails.id) {
      correct();
      setScore(score + 50);
      fetchRandomPlayerAndTransfers(competitionId);
    } else {
      console.log(playerDetails);
      incorrect();
      setShowModal(false);
      setGameOver(true);
    }
  };

  const fetchRandomPlayerAndTransfers = async (competitionId) => {
    try {
      const teams = await getMostValuableTeams(competitionId);
      const ids = teams.map((team) => team.id);
      const randomClubId = ids[Math.floor(Math.random() * ids.length)];

      const players = await getClubSquad(randomClubId);
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      console.log(randomPlayer);
      setPlayerDetails({
        id: randomPlayer.id,
        name: randomPlayer.firstName + " " + randomPlayer.lastName,
        position: randomPlayer.position,
        age: randomPlayer.age,
        shirtNumber: randomPlayer.shirtNumber,
        nationality: randomPlayer.nationality,
        image: randomPlayer.playerImage,
        team: randomPlayer.club,
      });
      const transfers = await getPlayerTransfers(randomPlayer.id);
      transfers.transferHistory;
      setTransferHistory(transfers.transferHistory);
      console.log(transferHistory);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center lg:w-full h-[calc(100vh-80px)] bg-[#1D1D1D] text-white ">
      <div className="flex items-center flex-col h-full pt-4">
        <div className="flex justify-between px-5 items-center bg-transparent rounded-lg py-4 w-72 md:w-96 mb-4 shadow-md shadow-[#121212] bg-[#1f1f1f]">
          <FaHome
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowGame(false)}
          />
          <p className="font-semibold">
            Score: <span className="text-yellow-300">{score}</span>
          </p>
        </div>
        <div className="flex flex-col mb-4 border-[#575757] shadow-md shadow-[#121212] bg-[#1f1f1f] px-2  items-center min-h-32 w-72 md:w-96 max-h-[70%] overflow-y-scroll ">
          <ul className="py-5">
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
                    <span className="font-semibold md:font-bold uppercase">
                      {transfer.newClubName}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center relative w-72 md:w-96">
            <FaSearch className="w-5 h-5 absolute ml-3 pointer-events-none" />
            <input
              className="border border-[#3c3c3c] pl-10 bg-transparent rounded-lg py-3 w-full shadow-md shadow-[#1c1c1c] bg-[#1f1f1f]"
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
          <ul className="">
            {searchResults.map((player) => (
              <li key={player.id} className="">
                <div
                  className="flex items-center h-24 hover:bg-[#1D1D1D] py-10"
                  onClick={() => handlePlayerClick(player)}
                >
                  <img
                    src={player.playerImage}
                    alt={player.playerName}
                    className="w-20 h-20 object-cover px-1 mr-2"
                  />
                  <div className="flex items-center gap-2">
                    <strong>{`${player.firstName} ${player.lastName}`}</strong>
                    <img
                      src={player.nationImage}
                      alt="Nationality"
                      className="w-3 h-3 mr-2"
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
      <GameOver
        playerDetails={playerDetails}
        isVisible={gameOver}
        onClose={handleGameOverClose}
      >
        <div className="flex flex-col justify-center px-4 gap-4">
          <h1 className="mt-6 text-4xl font-semibold">Game Over ❌</h1>
          <p className="text-lg">
            Thank you for playing! Your final score was:{" "}
            <span className="font-bold">{score}</span>
          </p>
          <p className="text-lg">The correct player was:</p>
          <div className="flex items-center text-lg font-bold">
            <img
              src={playerDetails.image}
              alt={playerDetails.name}
              className="w-20 h-20 object-cover px-1 mr-2"
            />
            <p>{playerDetails.name}</p>
          </div>
        </div>
      </GameOver>
    </div>
  );
};

export default Game;
