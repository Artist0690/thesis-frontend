import React, { useEffect } from "react";
import z from "zod";
import { ChatSchema } from "../zod/chatSchema";
import ChatCard from "../mini-components/chatCard";
import { v4 } from "uuid";
import ScrollableFeed from "react-scrollable-feed";
import { motion } from "framer-motion";
import { cn } from "@udecode/cn";

type Chat = z.infer<typeof ChatSchema>;

type Props = {
  chatLists: Chat[];
  className?: string;
};

const ChatListTemplate = (props: Props) => {
  const { chatLists, className } = props;

  useEffect(() => {
    console.log("chat list template re-render");
  }, []);

  if (chatLists == null || chatLists.length < 1)
    return (
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { delay: 0.2, when: "once" } }}
        className="flex w-full h-full justify-center items-center font-[inter thin] font-semibold text-xl"
      >
        No chats yet!
      </motion.div>
    );

  return (
    <div className="h-full flex flex-col">
      <div
        className={cn(
          "flex flex-col h-fit overflow-y-auto max-h-[480px] min-h-[400px] py-4 px-3 divide-y divide-zinc-200 dark:divide-zinc-600",
          className
        )}
      >
        {chatLists.map((chat, index) => (
          <ChatCard key={v4()} chat={chat} index={index} />
        ))}
      </div>
      <div className="flex-1 backdrop-blur-sm bg-white/30 dark:bg-slate-900 -mt-10 z-20"></div>
    </div>
  );
};

export default ChatListTemplate;
