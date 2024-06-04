import z from "zod";
import { ChatSchema } from "../zod/chatSchema";
import { userInfo_store } from "../store/userInfo_store";
import { currentChat_store } from "../store/currentChat_store";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Avatar from "../components/ui/avatar";

const variants = {
  initial: {
    x: "-100%",
  },
  hover: {
    x: 0,
    transition: { type: "tween", duration: 0.3 },
  },
};

type Chat = z.infer<typeof ChatSchema>;

type Props = {
  chat: Chat;
  index: number;
};

const ChatCard = (props: Props) => {
  const { chat, index } = props;

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
    <motion.button
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 * index, when: "once" },
      }}
      onClick={handleClick}
      disabled={chat._id == currentChat?._id}
      className={`relative py-2 grid grid-cols-12 items-center focus:ring-1 focus:ring-purple-500 focus:outline-none disabled:bg-zinc-200 dark:disabled:bg-zinc-700 text-zinc-500 dark:text-white disabled:cursor-not-allowed`}
    >
      {/* avatar */}
      <div className="h-full grid col-span-3 items-center justify-center">
        <Avatar>{chatMate.userInfo.name.charAt(0)}</Avatar>
      </div>
      {/* name & email & latest message */}
      <div className="h-full grid col-span-7 gap-1 font-[inter thin]">
        <span className="flex w-full capitalize font-semibold text-black dark:text-white">
          {chatMate.userInfo.name}
        </span>
        <span className="flex w-full">{chatMate.userInfo.email}</span>
        <span className="flex w-full">latestMessage:</span>
      </div>
      {/* arrow */}
      <div className="h-full grid col-span-2 items-center justify-center">
        <motion.span
          initial="initial"
          animate="initial"
          whileHover="hover"
          className="flex justify-center items-center relative w-10 h-10 p-3 rounded-full border z-10 overflow-hidden border-slate-300"
        >
          {/* absolute child */}
          {currentChat?._id !== chat._id && (
            <motion.div
              className="absolute w-full h-full bg-purple-400 rounded-full top-0 left-0"
              key={"child"}
              variants={variants}
            ></motion.div>
          )}
          <ArrowRight className="w-12 z-20" />
        </motion.span>
      </div>
    </motion.button>
  );
};

export default ChatCard;
