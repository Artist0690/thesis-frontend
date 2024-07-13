import z from "zod";
import { ChatSchema } from "../zod/chatSchema";
import { userInfo_store } from "../store/userInfo_store";
import { currentChat_store } from "../store/currentChat_store";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Avatar from "../components/ui/avatar";
import { cn } from "@udecode/cn";

type Chat = z.infer<typeof ChatSchema>;

type Props = {
  chat: Chat;
  index: number;
  numberOfNotification: number;
};

const ChatCard = (props: Props) => {
  const { chat, index, numberOfNotification } = props;

  // store
  const { _id: currentUserId } = userInfo_store();
  const { setCurrentChat, currentChat } = currentChat_store();

  const chatMate = chat.users.filter(
    (user) => user.userInfo._id !== currentUserId
  )[0];

  const handleClick = () => {
    setCurrentChat(chat);
    // console.log("current chat is:", currentChat);
  };

  useEffect(() => {
    console.log("chat card re-rendered");
  }, []);

  return (
    <button
      onClick={handleClick}
      disabled={chat._id == currentChat?._id}
      className={`relative w-full py-5 grid grid-cols-12 items-center focus:ring-1 focus:ring-purple-500 focus:outline-none disabled:bg-zinc-400/30 disabled:rounded-lg dark:disabled:bg-zinc-700/30 text-zinc-500 dark:text-white disabled:cursor-not-allowed`}
    >
      {/* avatar */}
      <div className="h-full grid col-span-3 items-center justify-center z-20">
        <Avatar className="bg-purple-300 dark:bg-purple-300 text-purple-600">
          {chatMate.userInfo.name.charAt(0)}
        </Avatar>
      </div>
      {/* name & email & latest message */}
      <div className="h-full grid col-span-7 gap-1 font-[Inter] text-sm 2xl:font-normal">
        <span
          className={cn(
            "flex w-full capitalize font-semibold text-base text-black dark:text-white",
            {
              "text-indigo-600 dark:text-purple-400":
                chat._id === currentChat?._id,
            }
          )}
        >
          {chatMate.userInfo.name}
        </span>
        <span
          className={cn("flex w-full text-sm", {
            "text-indigo-600 dark:text-purple-400":
              chat._id === currentChat?._id,
          })}
        >
          {chatMate.userInfo.email}
        </span>
        {/* <span className="flex w-full">latestMessage:</span> */}
      </div>
      {/* arrow */}
      <div className="h-full grid col-span-2 items-center justify-center">
        <span className="flex justify-center items-center relative w-10 h-10 p-3 rounded-full border-2 z-10 overflow-hidden border-slate-300">
          <ArrowRight className="w-12 z-20 scale-125 hover:text-white" />
        </span>
      </div>
      {numberOfNotification > 0 ? (
        <span className="absolute bg-purple-500 rounded-full justify-center items-center right-0 top-0 flex w-4 h-4 text-xs text-white">
          {numberOfNotification}
        </span>
      ) : null}
    </button>
  );
};

export default ChatCard;
