import React from "react";
import ThemeToggle from "../theme/ThemeToggle";
import HamburgerMenu from "../mini-components/hamburgerMenu";

const Header = () => {
  return (
    <div className="flex h-auto px-3 py-2 justify-between items-center">
      <ThemeToggle />
      <HamburgerMenu />
    </div>
  );
};

export default Header;
