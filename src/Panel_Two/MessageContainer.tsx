import React, { useEffect, useState } from "react";
import { currentChat_store } from "../store/currentChat_store";
import PlayAnimation from "../mini-components/playAnimation";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import useFetchAllMessages from "../hooks/useFetchAllMessages";
import ScrollableFeed from "react-scrollable-feed";
import { v4 as uuid } from "uuid";
import ChatBubble from "../mini-components/chatBubble";
import { messageLists_store } from "../store/messageLists_store";

const MessageContainer = () => {
  // store
  const { currentChat } = currentChat_store();

  // store
  const { messageLists } = messageLists_store();

  // use a hook that fetches messages assciated with chat
  const { msgLists } = useFetchAllMessages();

  useEffect(() => {
    if (msgLists) console.log("msg lists from hook: ", msgLists);
    if (messageLists) console.log("msg lists from store: ", messageLists);
    if (currentChat && currentChat.latestMessage)
      console.log("latest msg ID: ", currentChat.latestMessage._id);
  }, [msgLists, messageLists]);

  if (!currentChat)
    return (
      <div className="w-full h-full flex justify-center items-center rounded-lg bg-white bg-opacity-40 dark:bg-opacity-10">
        <PlayAnimation />
      </div>
    );

  return (
    <div className="w-full max-h-[520px] rounded-lg bg-white bg-opacity-40 dark:bg-opacity-10">
      {currentChat && currentChat.latestMessage?._id
        ? currentChat.latestMessage._id
        : "no id"}
      {messageLists == null ? (
        <p>Loading</p>
      ) : (
        <ScrollableFeed className="flex flex-col gap-y-2 pt-2 px-2 min-h-[490px] max-h-[490px]">
          {messageLists.map((message) => (
            <ChatBubble key={uuid()} message={message} />
          ))}
        </ScrollableFeed>
      )}
    </div>
  );
};

export default MessageContainer;
