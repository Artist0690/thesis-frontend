import { cn } from "@udecode/cn";
import { X } from "lucide-react";
import React, { useState } from "react";

interface Porps {
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, openModal, setOpenModal }: Porps) => {
  return openModal ? (
    <div
      className={cn(
        "w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-white bg-opacity-35 backdrop-blur-md z-40"
      )}
    >
      <span className="absolute top-1 right-1 w-fit h-fit p-1 bg-rose-500 hover:bg-rose-400 rounded-lg">
        <X onClick={() => setOpenModal(false)} className="text-white" />
      </span>
      {children}
    </div>
  ) : null;
};

export default Modal;
