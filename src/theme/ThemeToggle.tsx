import React, { useState } from "react";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

const ThemeToggle = () => {
  const [dark, setdark] = useState<boolean>(false);

  const toggleTheme = () => {
    setdark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  if (dark)
    return (
      <IoSunny
        className="w-6 h-6 text-white hover:rotate-45 transition duration-300"
        onClick={() => toggleTheme()}
      />
    );
  else
    return (
      <IoMoon
        className="w-6 h-6 text-black hover:rotate-45 transition duration-300"
        onClick={() => toggleTheme()}
      />
    );
};

export default ThemeToggle;
