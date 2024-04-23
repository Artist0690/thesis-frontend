import React, { useEffect, useState } from "react";
import { currentChat_store } from "../store/currentChat_store";
import PlayAnimation from "../mini-components/playAnimation";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";

const MessageContainer = () => {
  // store
  const { currentChat } = currentChat_store();

  // local state
  type Message = z.infer<typeof MessageSchema>;
  const [messageLists, setmessageLists] = useState<Message[] | null>(null);

  // use a hook that fetches messages assciated with chat

  if (!currentChat)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <PlayAnimation />
      </div>
    );

  return (
    <div className="w-full h-full rounded-lg bg-white bg-opacity-40 dark:bg-opacity-10">
      {currentChat._id}
      {/* iterate messages */}
    </div>
  );
};

export default MessageContainer;
