import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import home from "../assets/icons8-home.svg";
import SideDrawer from "../mini-components/sideDrawer";
import { Link } from "react-router-dom";
import Home_icon from "../mini-components/home_icon";
import { motion } from "framer-motion";

const Header = () => {
  const [openSideDrawer, setopenSideDrawer] = useState<boolean>(false);

  const toggleSideDrawer = () => {
    setopenSideDrawer(!openSideDrawer);
  };

  return (
    <div className="hidden 2xl:flex px-3 py-4 justify-between">
      {/* search icon */}
      <motion.span
        whileHover={{ scale: 1.2 }}
        onClick={() => toggleSideDrawer()}
        className="flex flow-row w-fit h-full justify-between items-center"
      >
        <IoIosSearch className="w-8 h-8 text-black dark:text-slate-400 cursor-pointer" />
      </motion.span>
      {/* home icon */}
      <Link to={"/"}>
        <motion.div whileHover={{ scale: 1.2 }}>
          <Home_icon />
        </motion.div>
      </Link>
      {/* CUSTOM: */}
      <SideDrawer open={openSideDrawer} setOpen={toggleSideDrawer} />
    </div>
  );
};

export default Header;
