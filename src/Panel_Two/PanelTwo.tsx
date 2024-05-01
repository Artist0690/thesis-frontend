import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import { currentChat_store } from "../store/currentChat_store";
import { io } from "socket.io-client";
import { userInfo_store } from "../store/userInfo_store";
import { toast } from "sonner";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { messageLists_store } from "../store/messageLists_store";

const URL = "http://localhost:5000";
const socket = io(URL);

const PanelTwo = () => {
  // store
  const { currentChat } = currentChat_store();
  const { _id: currentUserId } = userInfo_store();
  const { addMessage } = messageLists_store();

  // type
  type Message = z.infer<typeof MessageSchema>;

  useEffect(() => {
    if (currentUserId) {
      // TODO: Join setup event
      socket.emit("setup", { userId: currentUserId });

      socket.on("setup", (data: string) => {
        toast.info(data, { position: "top-right", duration: 3000 });
      });
    }
  }, [currentUserId]);

  useEffect(() => {
    // TODO: Listen chat event
    socket.on("receive_msg", (data: Message) => {
      console.log("receive_msg event:", data);

      if (!currentChat || data.chat !== currentChat._id) {
        toast.success(`Someone sent you a message.`, {
          position: "top-right",
          duration: 2000,
        });
        return;
      }

      addMessage(data);
    });
  }, [currentChat]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header />
      <Body />
      {currentChat && <Footer socket={socket} />}
    </div>
  );
};

export default PanelTwo;
