import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moon from "../assets/moon-svgrepo-com.svg";
import sun from "../assets/icons8-sun.svg";
import { toast } from "sonner";

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

const initialTheme = () => {
  const previousTheme = localStorage.getItem("MERN-chat-app");
  const theme = previousTheme === "light" ? previousTheme : "dark";
  console.log("previousTheme", previousTheme);

  const shouldToggle = theme === "dark" ? true : false;

  if (shouldToggle) {
    document.documentElement.classList.add("dark");
  }

  return shouldToggle;
};

const ThemeToggle = () => {
  const [dark, setdark] = useState<boolean>(initialTheme());

  const toggleTheme = () => {
    setdark((prv) => !prv);
    localStorage.setItem("MERN-chat-app", dark ? "light" : "dark");
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
