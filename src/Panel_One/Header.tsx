import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import SideDrawer from "../mini-components/sideDrawer";
import { Link } from "react-router-dom";

const Header = () => {
  const [openSideDrawer, setopenSideDrawer] = useState<boolean>(false);

  const toggleSideDrawer = () => {
    setopenSideDrawer(!openSideDrawer);
  };

  return (
    <div className="flex px-3 py-4 justify-between">
      <span
        onClick={() => toggleSideDrawer()}
        className="flex flow-row w-full h-full justify-between items-center"
      >
        <IoIosSearch className="w-8 h-8 text-black dark:text-white cursor-pointer" />
        <Link to={"/"}>
          <IoIosHome className="w-8 h-8 text-black dark:text-white cursor-pointer" />
        </Link>
      </span>
      <SideDrawer open={openSideDrawer} setOpen={toggleSideDrawer} />
    </div>
  );
};

export default Header;
