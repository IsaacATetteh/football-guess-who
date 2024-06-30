"use client";
import React, { useState } from "react";
import Modal from "../components/Modal";
import { FaSearch } from "react-icons/fa";
const Game = ({ playerDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const { name, position, age, shirtNumber, nationality, image, team } =
    playerDetails;
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <div className="h-full w-full bg-[#1D1D1D] text-white pt-20">
      <div className="flex justify-center items-center flex-col">
        <div className="flex items-center relative  w-96">
          <FaSearch className="w-5 h-5 absolute ml-3 pointer-events-none" />
          <input
            className="border border-[#575757] pl-10 bg-transparent rounded-lg py-3 w-full"
            type="text"
            placeholder="Search for a player"
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <h1>test</h1>
      </Modal>
    </div>
  );
};

export default Game;
