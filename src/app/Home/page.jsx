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
  const [league, setLeague] = useState("");
  const [userData, setUserData] = useState(null);
  const [showGame, setShowGame] = useState(false); // State to control rendering of Game component
  const [playerDetails, setPlayerDetails] = useState(null); // State to store player details
  const [competitionId, setCompetitionId] = useState(""); // State to store competition ID
  const [transferHistory, setTransferHistory] = useState(null);
  const { userLoggedIn, currentUser } = useAuth();
  const router = useRouter();

  if (!userLoggedIn) {
    redirect("/Login");
  }

  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
  };

  useEffect(() => {
    getUserData(currentUser.uid)
      .then((userData) => {
        setUserData(userData);
        console.log(userData.username);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }),
    [];

  const handleButtonClick = async (event) => {
    getUserData(currentUser.uid)
      .then((userData) => {
        setUserData(userData);
        console.log(userData.username);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handlePlayButtonClick = async (event) => {
    const leagueToCompetitionIdMap = {
      "Serie A": "IT1",
      "Premier League": "GB1",
    };

    const competitionId = leagueToCompetitionIdMap[league];
    setCompetitionId(competitionId);

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
      setShowGame(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full w-full bg-[#1D1D1D] text-white">
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
        <div className="flex flex-col justify-center items-center h-full">
          {userData ? (
            <div className="mb-20">
              <h1 className="text-4xl">Welcome, {userData.username}</h1>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <form className="flex flex-col gap-4 ">
            <label htmlFor="difficulty" className="font-semibold text-lg">
              Select A Difficulty: (coming soon!)
            </label>
            <select
              className="bg-[#1D1D1D] border border-[#727272] rounded-lg py-3 w-80 px-2"
              id="difficulty"
              onChange={handleLeagueChange}
            >
              <option value="">Regular</option>
            </select>
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
              className="text-black w-1/3 mt-10 mx-auto font-bold py-3 rounded-lg bg-white  shadow-sm shadow-white"
              type="submit"
              onClick={handlePlayButtonClick}
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
