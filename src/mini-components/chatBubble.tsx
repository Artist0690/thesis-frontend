import React from "react";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { userInfo_store } from "../store/userInfo_store";

type Message = z.infer<typeof MessageSchema>;

type Props = {
  message: Message;
};

const ChatBubble = (props: Props) => {
  const { message } = props;

  // store
  const { _id: currentUserId } = userInfo_store();

  // chat bubble scheme
  let schemeA = {
    position: "justify-end",
    bgColor: "bg-zinc-300",
    txColor: "text-black",
  };
  let schemeB = {
    position: "justify-start",
    bgColor: "bg-purple-400",
    txColor: "text-white",
  };
  let scheme = message.sender._id == currentUserId ? schemeA : schemeB;

  return (
    <div className={`flex w-full ${scheme.position}`}>
      <span
        className={`w-fit ${scheme.bgColor} ${scheme.txColor} rounded-2xl px-3 py-2 font-[poppins]`}
      >
        {message.content}
      </span>
    </div>
  );
};

export default ChatBubble;
