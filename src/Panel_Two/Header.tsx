import React from "react";
import ThemeToggle from "../theme/ThemeToggle";
import HamburgerMenu from "../mini-components/hamburgerMenu";
import hulk from "../assets/icons8-hulk.svg";
import { userInfo_store } from "../store/userInfo_store";
import Avatar from "../components/ui/avatar";
import { currentChat_store } from "../store/currentChat_store";

const Header = () => {
  // store
  const currentUser = userInfo_store();
  const { currentChat } = currentChat_store();

  const chatMate = currentChat?.users.filter(
    (user) => user.userInfo._id !== currentUser._id
  )[0].userInfo;

  return (
    <div className="flex flex-shrink-0 h-20 px-3 justify-between items-center">
      <ThemeToggle />

      {currentChat ? (
        <div className="h-full flex gap-x-4 items-center justify-center">
          <Avatar>{chatMate?.name.charAt(0)}</Avatar>
          {/* name and Email */}
          <div className="flex flex-col font-[Inter] select-none">
            <span className=" text-zinc-500 dark:text-zinc-300 text-xl font-extrabold capitalize select-none">
              {chatMate?.name}
            </span>
            <span className="text-xs">{chatMate?.email}</span>
          </div>
        </div>
      ) : null}

      <HamburgerMenu />
    </div>
  );
};

export default Header;
