import React from "react";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { userInfo_store } from "../store/userInfo_store";
import ironman from "../assets/icons8-iron-man.svg";
import hulk from "../assets/icons8-hulk.svg";
import { messageLists_store } from "../store/messageLists_store";
import { getChatMateInfo } from "../functions/getChatMateId";
import { chats_store } from "../store/chats_store";

type Message = z.infer<typeof MessageSchema>;

type Props = {
  message: Message;
  currentMessageIndex: number;
};

// ⏭️ component start
const ChatBubble = (props: Props) => {
  const { message, currentMessageIndex } = props;

  // store
  const { _id: currentUserId } = userInfo_store();
  const { messageLists } = messageLists_store();
  const { chats } = chats_store();
  const chatMateInfo = getChatMateInfo({
    chats,
    currentUserId: currentUserId!,
    message,
  });

  // check next message
  const nextMessage =
    currentMessageIndex !== messageLists.length - 1
      ? messageLists[currentMessageIndex + 1]
      : null;

  // chat bubble scheme
  let schemeA = {
    position: "justify-start",
    bgColor: "bg-white",
    txColor: "text-black",
    iconPosition: "flex-row-reverse",
  };
  let schemeB = {
    position: "justify-start",
    bgColor: "bg-purple-500",
    txColor: "text-white",
    iconPosition: "",
  };
  let scheme = message.sender._id == currentUserId ? schemeA : schemeB;

  // determine seen indicator
  const seenIndicator =
    message.sender._id == currentUserId && message.readBy ? "seen" : "unseen";

  // determine to add sender icon
  const isIcon =
    currentMessageIndex == messageLists.length - 1
      ? true
      : nextMessage?.sender._id == message.sender._id
      ? false
      : true;

  const icon = message.sender._id == currentUserId ? hulk : ironman;

  return (
    <div className={`flex w-full ${scheme.position} ${scheme.iconPosition}`}>
      <div className="min-w-[30px] flex justify-start items-end">
        {isIcon && <img src={icon} className="flex w-6" />}
      </div>
      <div className="flex flex-col max-w-[300px]">
        <span
          className={`w-fit ${scheme.bgColor} ${scheme.txColor} rounded-2xl px-3 py-2 font-[inter thin] font-normal shadow-sm`}
        >
          {message.content}
        </span>
        <span className="flex justify-start text-zinc-400 dark:text-white">
          {message.sender._id == currentUserId && seenIndicator}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
