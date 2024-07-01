"use client";
import axios from "axios";

const NEXT_PUBLIC_RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

const getMostValuableTeams = async (competitionId) => {
  const options = {
    method: "GET",
    url: "https://transfermarkt-db.p.rapidapi.com/v1/competitions/most-valuable-teams",
    params: {
      locale: "DE",
      competition_id: competitionId,
    },
    headers: {
      "x-rapidapi-key": NEXT_PUBLIC_RAPID_API_KEY,
      "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getClubSquad = async (clubId) => {
  const options = {
    method: "GET",
    url: `https://transfermarkt-db.p.rapidapi.com/v1/clubs/squad`,
    params: {
      season_id: "2024",
      locale: "DE",
      club_id: clubId,
    },
    headers: {
      "x-rapidapi-key": NEXT_PUBLIC_RAPID_API_KEY,
      "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPlayerTransfers = async (playerId) => {
  const options = {
    method: "GET",
    url: "https://transfermarkt-db.p.rapidapi.com/v1/players/transfers",
    params: {
      player_id: playerId,
      locale: "DE",
    },
    headers: {
      "x-rapidapi-key": NEXT_PUBLIC_RAPID_API_KEY,
      "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export { getMostValuableTeams, getClubSquad, getPlayerTransfers };
