import { MessageCircleX } from "lucide-react";
import Avatar from "../components/ui/avatar";
import HamburgerMenu from "../mini-components/hamburgerMenu";
import { currentChat_store } from "../store/currentChat_store";
import { userInfo_store } from "../store/userInfo_store";
import ThemeToggle from "../theme/ThemeToggle";

const Header = () => {
  // store
  const currentUser = userInfo_store();
  const { currentChat, resetCurrentChat } = currentChat_store();

  const chatMate = currentChat?.users.filter(
    (user) => user.userInfo._id !== currentUser._id
  )[0].userInfo;

  const clearCurrentChat = () => {
    resetCurrentChat();
  };

  return (
    <div className="flex flex-shrink-0 min-h-20 px-3 justify-between items-center">
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
          <span onClick={clearCurrentChat}>
            <MessageCircleX className="w-6 h-6 text-gray-400 hover:text-red-500" />
          </span>
        </div>
      ) : null}

      <HamburgerMenu />
    </div>
  );
};

export default Header;
