import React from "react";
import ThemeToggle from "../theme/ThemeToggle";
import HamburgerMenu from "../mini-components/hamburgerMenu";
import hulk from "../assets/icons8-hulk.svg";
import { userInfo_store } from "../store/userInfo_store";

const Header = () => {
  // store
  const { name } = userInfo_store();

  return (
    <div className="flex h-auto px-3 py-2 justify-between items-center">
      <ThemeToggle />
      <div className="h-full flex gap-x-4">
        <img src={hulk} className="w-10" />
        <span className="font-[poppins] text-zinc-500 dark:text-zinc-300 font-extrabold capitalize flex justify-center items-center">
          hi, {name}
        </span>
      </div>
      <HamburgerMenu />
    </div>
  );
};

export default Header;
