import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";

const HamburgerMenu = () => {
  const [open, setopen] = useState<boolean>(false);

  const handleToggle = () => {
    setopen(!open);
  };

  return (
    <div>
      <button
        onClick={() => handleToggle()}
        className="p-2 border rounded-lg border-slate-300 dark:border-slate-500 focus:ring-1 focus:ring-purple-500 ring-offset-1"
      >
        <RxHamburgerMenu className="relative w-6 h-6 text-slate-400 dark:text-slate-500" />
      </button>

      {open && (
        <AnimatePresence>
          <motion.div
            key={"hamburger-menu"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.1, duration: 0.3, when: "once" },
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute transform -translate-x-1/3 translate-y-3 w-auto h-auto px-3 overflow-hidden shadow-lg cursor-pointer bg-zinc-200 dark:bg-gray-900 dark:text-white divide-y divide-slate-300 dark:divide-zinc-600 rounded-lg"
            id="dropdown"
            aria-labelledby="dropdownButton"
          >
            <span className="flex justify-center items-center w-full px-6 py-2 capitalize text-black dark:text-white hover:bg-purple-500 hover:bg-opacity-10">
              profile
            </span>
            <span className="flex justify-center items-center w-full px-6 py-2 capitalize text-black dark:text-white hover:bg-purple-500 hover:bg-opacity-10">
              logout
            </span>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default HamburgerMenu;
