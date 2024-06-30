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
      <div className="flex flex-col w-[600px]">
        <button className="text-xl place-self-end" onClick={() => onClose()}>
          X
        </button>
        <div className="bg-[#3e3e3e] p-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
