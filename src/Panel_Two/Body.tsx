import React, { useEffect } from "react";
import { currentChat_store } from "../store/currentChat_store";
import MessageContainer from "./MessageContainer";

const Body = () => {
  // store
  const { currentChat } = currentChat_store();

  useEffect(() => {
    if (currentChat?.latestMessage)
      console.log("current chat:", currentChat.latestMessage._id);
  }, [currentChat]);

  return (
    <div className="w-full flex-1 p-2 overflow-hidden">
      <MessageContainer />
    </div>
  );
};

export default Body;
