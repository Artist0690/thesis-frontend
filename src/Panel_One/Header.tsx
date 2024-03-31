import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import SideDrawer from "../mini-components/sideDrawer";

const Header = () => {
  const [openSideDrawer, setopenSideDrawer] = useState<boolean>(false);

  const toggleSideDrawer = () => {
    setopenSideDrawer(!openSideDrawer);
  };

  return (
    <div className="flex px-3 py-4 justify-between">
      <span onClick={() => toggleSideDrawer()}>
        <IoIosSearch className="w-8 h-8 text-black dark:text-white" />
      </span>
      <SideDrawer open={openSideDrawer} setOpen={toggleSideDrawer} />
    </div>
  );
};

export default Header;
