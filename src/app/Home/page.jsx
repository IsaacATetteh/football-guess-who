"use client";
import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { redirect, useRouter } from "next/navigation";
import Game from "../Game/page";
import {
  getMostValuableTeams,
  getClubSquad,
  getPlayerTransfers,
} from "../api/transfermarkt";

const Home = () => {
  const [league, setLeague] = useState("");
  const [clubIds, setClubIds] = useState([]);
  const [showGame, setShowGame] = useState(false); // State to control rendering of Game component
  const [playerDetails, setPlayerDetails] = useState(null); // State to store player details
  const [transferHistory, setTransferHistory] = useState(null);
  const { userLoggedIn } = useAuth();
  const router = useRouter();

  if (!userLoggedIn) {
    redirect("/Login");
  }

  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
  };

  const handlePlayButtonClick = async (event) => {
    event.preventDefault();

    const leagueToCompetitionIdMap = {
      "Serie A": "IT1",
      "Premier League": "GB1",
    };

    const competitionId = leagueToCompetitionIdMap[league];

    if (!competitionId) {
      console.error("Invalid league selected");
      return;
    }

    try {
      const teams = await getMostValuableTeams(competitionId);
      const ids = teams.map((team) => team.id);
      const randomClubId = ids[Math.floor(Math.random() * ids.length)];

      const players = await getClubSquad(randomClubId);
      const randomPlayer = players[Math.floor(Math.random() * players.length)];

      console.log(randomPlayer);
      setPlayerDetails({
        name: randomPlayer.firstName + " " + randomPlayer.lastName,
        position: randomPlayer.position,
        age: randomPlayer.age,
        shirtNumber: randomPlayer.shirtNumber,
        nationality: randomPlayer.nationality,
        image: randomPlayer.playerImage,
        team: randomPlayer.club,
      });
      const transfers = await getPlayerTransfers(randomPlayer.id);
      setTransferHistory(transfers.transferHistory);
      console.log(transferHistory);
      setShowGame(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full w-full bg-[#1D1D1D] text-white">
      {showGame ? (
        <Game playerDetails={playerDetails} transferHistory={transferHistory} />
      ) : (
        <div className="flex justify-center items-center pt-20 h-full">
          <form
            className="flex flex-col gap-4"
            onSubmit={handlePlayButtonClick}
          >
            <label htmlFor="league" className="font-semibold text-lg">
              Select League:
            </label>
            <select
              className="bg-[#1D1D1D] border border-[#727272] rounded-lg py-3 w-80 px-2"
              id="league"
              value={league}
              onChange={handleLeagueChange}
            >
              <option value="">Select a league</option>
              <option value="Serie A">Serie A</option>
              <option value="Premier League">Premier League</option>
            </select>
            <button
              className="text-black w-1/3 mt-10 mx-auto font-bold py-3 rounded-lg bg-white"
              type="submit"
            >
              Play
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
