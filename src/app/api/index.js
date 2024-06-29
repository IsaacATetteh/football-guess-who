"use client";
import axios from "axios";

const URL =
  "https://transfermarkt-db.p.rapidapi.com/v1/competitions/most-valuable-teams";

const options = {
  params: {
    locale: "DE",
    competition_id: "GB1",
  },
  headers: {
    "x-rapidapi-key": "3078811214msh0e2d3510b9bae4dp191fd0jsndff1f71e08a8",
    "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}

export const getPlayer = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(URL, options);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
