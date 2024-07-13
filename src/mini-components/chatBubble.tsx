import React from "react";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { userInfo_store } from "../store/userInfo_store";
import ironman from "../assets/icons8-iron-man.svg";
import hulk from "../assets/icons8-hulk.svg";
import { messageLists_store } from "../store/messageLists_store";
import { getChatMateInfo } from "../functions/getChatMateId";
import { chats_store } from "../store/chats_store";
import Avatar from "../components/ui/avatar";
import { cn } from "@udecode/cn";

type Message = z.infer<typeof MessageSchema>;

type Props = {
  message: Message;
  currentMessageIndex: number;
};

// ⏭️ component start
const ChatBubble = (props: Props) => {
  const { message, currentMessageIndex } = props;

  // store
  const { _id: currentUserId, name: currentUserName } = userInfo_store();
  const { messageLists } = messageLists_store();
  const { chats } = chats_store();
  const chatMateInfo = getChatMateInfo({
    chats,
    currentUserId: currentUserId!,
    message,
  });

  const isCurrentUser = message.sender._id === currentUserId;
  const isNextMessage = messageLists.length > currentMessageIndex;
  const nextMessage = isNextMessage
    ? messageLists[currentMessageIndex + 1]
    : undefined;

  const hasNextMessageFromSameUser = nextMessage
    ? nextMessage.sender._id === message.sender._id
      ? true
      : false
    : false;

  return (
    <div className={`flex w-full font-[Inter]`}>
      <div
        className={cn("flex justify-start w-full", {
          "justify-end": isCurrentUser,
          "order-1": !isCurrentUser,
        })}
      >
        <div
          className={cn(
            "flex p-2 2xl:max-w-[400px] max-w-[200px] rounded-lg shadow-lg dark:shadow-none",
            {
              "rounded-br-none bg-zinc-200 dark:bg-slate-700 text-black dark:text-white": isCurrentUser,
              "rounded-bl-none bg-purple-500 text-white": !isCurrentUser,
              "rounded-lg": hasNextMessageFromSameUser,
            }
          )}
        >
          {message.content}
        </div>
        <span
          className={cn("flex items-end w-4", {
            "order-first mr-2": !isCurrentUser,
            "ml-2": isCurrentUser,
          })}
        >
          {hasNextMessageFromSameUser ? null : (
            <Avatar className={cn("w-4 h-4 text-xs dark:bg-black")}>
              {isCurrentUser
                ? currentUserName![0]
                : chatMateInfo.userInfo.name[0]}
            </Avatar>
          )}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
