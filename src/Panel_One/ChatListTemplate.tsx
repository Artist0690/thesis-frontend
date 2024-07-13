import React, { useEffect, useState } from "react";
import z from "zod";
import { ChatSchema, MessageSchema } from "../zod/chatSchema";
import ChatCard from "../mini-components/chatCard";
import { v4 } from "uuid";
import ScrollableFeed from "react-scrollable-feed";
import { motion } from "framer-motion";
import { cn } from "@udecode/cn";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { userInfo_store } from "../store/userInfo_store";
import { currentChat_store } from "../store/currentChat_store";

type Chat = z.infer<typeof ChatSchema>;

type Message = z.infer<typeof MessageSchema>;

type Props = {
  chatLists: Chat[];
  className?: string;
};

const URL = "http://localhost:5000";
const socket = io(URL);

const ChatListTemplate = (props: Props) => {
  const { chatLists, className } = props;
  const { _id: currentUserId } = userInfo_store();
  const { currentChat } = currentChat_store();
  const [Notification, setNotification] = useState<Message[]>([]);

  const pushNotification = (data: any) => {
    try {
      const notification = MessageSchema.parse(data);
      const shouldNotify = currentChat?._id !== notification.chat;
      if (shouldNotify) {
        setNotification((prv) => [...prv, notification]);
      }
      return;
    } catch (error) {
      console.log("notification error!");
    }
  };

  useEffect(() => {
    if (currentChat) {
      const filteredNotification = Notification.filter(
        (noti) => noti.chat !== currentChat._id
      );
      setNotification(filteredNotification);
    }
  }, [currentChat]);

  useEffect(() => {
    socket.emit("setup", { userId: currentUserId });

    socket.on("receive_msg", pushNotification);

    return () => {
      socket.off("receive_msg", pushNotification);
    };
  }, [currentUserId, currentChat]);

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
        {chatLists.map((chat, index) => {
          const numberOfNotification = Notification.filter((noti) => {
            return noti.chat === chat._id;
          }).length;

          return (
            <ChatCard
              key={v4()}
              numberOfNotification={numberOfNotification}
              chat={chat}
              index={index}
            />
          );
        })}
      </div>
      <div className="flex-1 backdrop-blur-sm bg-white/30 dark:bg-slate-900 -mt-10 z-20"></div>
    </div>
  );
};

export default ChatListTemplate;
