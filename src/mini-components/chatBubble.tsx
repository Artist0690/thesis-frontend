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

  const avatarName =
    message.sender._id == currentUserId
      ? currentUserName
      : chatMateInfo.userInfo.name;

  return (
    <div className={`flex w-full ${scheme.position} ${scheme.iconPosition}`}>
      {/* avatar */}
      <div className="min-w-[30px] flex justify-start items-end">
        {isIcon && (
          <Avatar className="w-6 h-6 bg-zinc-300">
            {avatarName?.charAt(0)}
          </Avatar>
        )}
      </div>
      {/* content & seen indicator */}
      <div className="flex flex-col max-w-[300px]">
        <span
          className={`w-fit ${scheme.bgColor} ${scheme.txColor} rounded-2xl px-3 py-2 font-[Inter] font-normal shadow-sm`}
        >
          {message.content}
        </span>
        <span className="flex justify-start text-zinc-400 dark:text-white">
          {/* {message.sender._id == currentUserId && seenIndicator} */}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
