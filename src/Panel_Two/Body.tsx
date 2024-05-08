import React, { useEffect } from "react";
import { currentChat_store } from "../store/currentChat_store";
import MessageContainer from "./MessageContainer";
import { userInfo_store } from "../store/userInfo_store";
import { string } from "zod";
import { toast } from "sonner";

const Body = () => {
  // store
  const { currentChat, setPassphrase } = currentChat_store();
  const { _id: currentUserId, rsa_private_key } = userInfo_store();

  useEffect(() => {
    // if (currentChat?.latestMessage)
    // console.log("current chat:", currentChat.latestMessage._id);
    if (currentChat?.users) {
      setPassphrase({
        privateKey: rsa_private_key!,
        currentUserId: currentUserId!,
      });
    }
  }, [currentChat]);

  return (
    <div className="w-full flex-1 p-2 overflow-hidden">
      <MessageContainer />
    </div>
  );
};

export default Body;
