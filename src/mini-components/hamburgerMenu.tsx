import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const HamburgerMenu = () => {
  const [open, setopen] = useState<boolean>(false);

  const handleToggle = () => {
    setopen(!open);
  };

  return (
    <div>
      <button
        onClick={() => handleToggle()}
        className="p-2 border rounded-lg border-zinc-500 dark:border-zinc-400 focus:ring-1 focus:ring-purple-500 ring-offset-1"
      >
        <RxHamburgerMenu className="relative w-6 h-6 text-black dark:text-white" />
      </button>

      {open && (
        <div
          className="absolute translate-y-3 -translate-x-1/3 w-auto h-auto overflow-hidden shadow-lg cursor-pointer bg-zinc-200 dark:bg-zinc-800 dark:text-white divide-y divide-slate-400 dark:divide-zinc-600 rounded-lg"
          id="dropdown"
          aria-labelledby="dropdownButton"
        >
          <span className="flex justify-center items-center w-full px-6 py-2 capitalize text-black dark:text-white hover:bg-purple-500 hover:bg-opacity-10">
            profile
          </span>
          <span className="flex justify-center items-center w-full px-6 py-2 capitalize text-black dark:text-white hover:bg-purple-500 hover:bg-opacity-10">
            logout
          </span>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
