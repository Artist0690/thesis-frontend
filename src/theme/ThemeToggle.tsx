import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moon from "../assets/moon-svgrepo-com.svg";
import sun from "../assets/icons8-sun.svg";

const icon_variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    rotateZ: 360,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.5,
    },
  },
  exit: {
    rotateZ: -360,
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const ThemeToggle = () => {
  const [dark, setdark] = useState<boolean>(false);

  const toggleTheme = () => {
    setdark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div onClick={toggleTheme} className="relative p-5">
      {!dark ? (
        <AnimatePresence>
          <motion.img
            key={"moon"}
            src={moon}
            variants={icon_variants}
            initial="initial"
            animate="animate"
            exit={"exit"}
            className="w-8 absolute inset-0 mx-auto my-auto hover:scale-150"
          />
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.img
            key={"sun"}
            src={sun}
            initial="initial"
            animate="animate"
            variants={icon_variants}
            exit={"exit"}
            className="w-8 absolute inset-0 mx-auto my-auto hover:scale-150"
          />
        </AnimatePresence>
      )}
    </div>
  );
};

export default ThemeToggle;
