"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { redirect, useRouter } from "next/navigation";
import Game from "../Game/page";
const Home = () => {
  const NEXT_PUBLIC_GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const [league, setLeague] = useState("");
  const [clubIds, setClubIds] = useState([]);
  const [showGame, setShowGame] = useState(false); // State to control rendering of Game component
  const [playerDetails, setPlayerDetails] = useState(null); // State to store player details
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

    /* const leagueToCompetitionIdMap = {
      "Serie A": "IT1",
      "Premier League": "GB1",
      // Add more mappings as needed
    };

    const competitionId = leagueToCompetitionIdMap[league];

    if (!competitionId) {
      console.error("Invalid league selected");
      return;
    }

    const options = {
      method: "GET",
      url: "https://transfermarkt-db.p.rapidapi.com/v1/competitions/most-valuable-teams",
      params: {
        locale: "DE",
        competition_id: competitionId,
      },
      headers: {
        "x-rapidapi-key": NEXT_PUBLIC_GOOGLE_API_KEY,
        "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const teams = response.data.data;

      const ids = teams.map((team) => team.id);
      const randomClubId = ids[Math.floor(Math.random() * ids.length)];

      const squadOptions = {
        method: "GET",
        url: `https://transfermarkt-db.p.rapidapi.com/v1/clubs/squad`,
        params: {
          season_id: "2021",
          locale: "DE",
          club_id: randomClubId,
        },
        headers: {
          "x-rapidapi-key":
            NEXT_PUBLIC_GOOGLE_API_KEY,
          "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
        },
      };

      const squadResponse = await axios.request(squadOptions);
      const players = squadResponse.data.data;
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
*/
    setPlayerDetails({
      name: "Cristiano Biraghi",
      position: "Left Back",
      age: "31",
      shirtNumber: "3",
      nationality: "Italy",
      image:
        "https://img.a.transfermarkt.technology/portrait/medium/324690-1697179025.jpg?lm=1",
      team: "AC Milan", // Ensure team information is available
    });

    setShowGame(true);
    /* 
    } catch (error) {
      console.error(error);
    }*/
  };

  return (
    <div className="h-full w-full bg-[#1D1D1D] text-white">
      {showGame ? (
        <Game playerDetails={playerDetails} /> // Pass playerDetails as props
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
