import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="flex justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="flex flex-col bg-[#313131] w-[500px] h-[650px] overflow-y-scroll rounded-md">
        <button
          className="text-xl fixed place-self-end mr-2"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className=" p-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
