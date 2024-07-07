"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { redirect, useRouter } from "next/navigation";
import { getUserData } from "../firebase/auth";
import Game from "../Game/page";
import {
  getMostValuableTeams,
  getClubSquad,
  getPlayerTransfers,
} from "../api/transfermarkt";

const Home = () => {
  const [playButtonClicked, setPlayButtonClicked] = useState(false);

  const [league, setLeague] = useState("");
  const [userData, setUserData] = useState(null);
  const [showGame, setShowGame] = useState(false); // State to control rendering of Game component
  const [playerDetails, setPlayerDetails] = useState(null); // State to store player details
  const [competitionId, setCompetitionId] = useState(""); // State to store competition ID
  const [transferHistory, setTransferHistory] = useState(null);
  const { userLoggedIn, currentUser } = useAuth();

  if (!userLoggedIn) {
    redirect("/Login");
  }

  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
  };

  const handlePlayButtonClick = async (event) => {
    event.preventDefault();

    if (league == "") {
      console.log("Invalid league selected");
      return;
    }
    setPlayButtonClicked(true);
    const leagueToCompetitionIdMap = {
      "Serie A": "IT1",
      "Premier League": "GB1",
      "Champions League": "CL",
      "La Liga": "ES1",
    };

    const competitionId = leagueToCompetitionIdMap[league];
    setCompetitionId(competitionId);

    try {
      const teams = await getMostValuableTeams(competitionId);

      // Get top 5 most valuable teams
      const top7Teams = teams.slice(0, 7);

      const randomTeam =
        top7Teams[Math.floor(Math.random() * top7Teams.length)];

      const players = await getClubSquad(randomTeam.id);

      const filteredPlayers = players.filter(
        (player) => player.marketValue && player.marketValue.value > 30000000
      );

      if (filteredPlayers.length === 0) {
        console.log("No players found, please try again.");
        setPlayButtonClicked(false);
        return;
      }

      const randomPlayer =
        filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];

      // const randomPlayer = {
      //   id: "28003",
      //   firstName: "Lionel",
      //   lastName: "Messi",
      //   position: "Foward",
      //   age: 37,
      //   shirtNumber: 10,
      //   nationality: "Argentina",
      //   playerImage:
      //     "https://img.a.transfermarkt.technology/portrait/medium/28003-1710080339.jpg?lm=1",
      //   club: "Inter Miami",
      // };
      // setPlayerDetails(randomPlayer);

      console.log(randomPlayer);
      setPlayerDetails({
        id: randomPlayer.id,
        name: randomPlayer.name,
        position: randomPlayer.positions.first,
        age: randomPlayer.age,
        shirtNumber: randomPlayer.shirtNumber,
        nationality: randomPlayer.nationality,
        image: randomPlayer.image,
        nationImage: randomPlayer.nationalities[0]?.image,
      });
      const transfers = await getPlayerTransfers(randomPlayer.id);
      // const transfers = {
      //   share: {
      //     title: "Lionel Messi - Transferhistorie",
      //     url: "https://www.transfermarkt.de/lionel-messi/transfers/spieler/28003",
      //     description:
      //       "Hier werden alle Transfers von Lionel Messi angezeigt. Neben dem Zeitpunkt eines Transfers, den beteiligten Vereinen und der Ablösesumme, wird auch der Marktwert zum Zeitpunkt des Transfers angegeben.",
      //   },
      //   futureTransfer: [],
      //   transferHistory: [
      //     {
      //       playerID: "28003",
      //       oldClubID: "583",
      //       oldClubName: "Paris SG",
      //       oldClubImage:
      //         "https://tmssl.akamaized.net/images/wappen/medium/583.png?lm=1522312728",
      //       newClubID: "69261",
      //       newClubName: "Inter Miami",
      //       newClubImage:
      //         "https://tmssl.akamaized.net/images/wappen/medium/69261.png?lm=1573561237",
      //       transferFeeValue: "ablösefrei",
      //       transferFeeCurrency: "",
      //       transferFeeNumeral: "",
      //       playerName: "Lionel Messi",
      //       playerImage:
      //         "https://img.a.transfermarkt.technology/portrait/medium/28003-1710080339.jpg?lm=1",
      //       countryID: "9",
      //       countryImage:
      //         "https://tmssl.akamaized.net/images/flagge/verysmall/9.png?lm=1520611569",
      //       loan: "",
      //       date: "15.07.2023",
      //       season: "23/24",
      //       newClubCountryName: "Vereinigte Staaten",
      //       newClubCountryImage:
      //         "https://tmssl.akamaized.net/images/flagge/verysmall/184.png?lm=1520611569",
      //     },
      //   ],
      // };
      setTransferHistory(transfers.transferHistory);
      console.log(transferHistory);
      setPlayButtonClicked(false);
      setShowGame(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] justify-center items-center w-full bg-[#1D1D1D] text-white">
      {showGame ? (
        <Game
          playerDetails={playerDetails}
          transferHistory={transferHistory}
          setShowGame={setShowGame}
          setPlayerDetails={setPlayerDetails}
          setTransferHistory={setTransferHistory}
          competitionId={competitionId}
        />
      ) : (
        <div className="flex flex-col items-center mb-2">
          <img className="h-72 lg:h-80 animate-spin " src="/logo.png"></img>
          <form
            className="flex flex-col gap-4 mt-3 lg:mt-6"
            onSubmit={handlePlayButtonClick}
          >
            <label htmlFor="difficulty" className="font-semibold text-lg">
              Select A Difficulty: (coming soon!)
            </label>
            <select
              className="bg-[#1D1D1D] border border-[#727272] rounded-lg min-h-10 py-3 w-80 px-2"
              id="difficulty"
            >
              <option value="">Regular</option>
            </select>
            <label htmlFor="league" className="font-semibold text-lg">
              Select League:
            </label>
            <select
              className="bg-[#1D1D1D] border border-[#727272] rounded-lg min-h-10 py-3 w-80 px-2"
              id="league"
              value={league}
              onChange={handleLeagueChange}
            >
              <option value="" disabled hidden>
                Select a league
              </option>

              <option value="Serie A">Serie A</option>
              <option value="Premier League">Premier League</option>
              <option value="La liga">La Liga</option>
              <option value="Champions League">Champions League</option>
            </select>
            <button
              className="text-black w-1/3 mt-3 md:mt-7 mx-auto font-bold py-3 rounded-lg shadow-sm shadow-white transform transition duration-75 ease-in-out active:shadow-none active:translate-y-1 bg-[#E9E3DA] hover:bg-white"
              type="submit"
              disabled={playButtonClicked}
            >
              {playButtonClicked ? (
                <svg
                  className="spin-slow h-5 w-5 text-black mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Play"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
