import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import { currentChat_store } from "../store/currentChat_store";
import { io } from "socket.io-client";
import { userInfo_store } from "../store/userInfo_store";
import { toast } from "sonner";
import z from "zod";
import { MessageSchema } from "../types/chatSchema";
import { messageLists_store } from "../store/messageLists_store";
import { chats_store } from "../store/chats_store";
import { fetchAllChats_controller } from "../controllers/fetchAllChats_controller";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { decrypt_cipher } from "../crypto/AES/aes_crypto";
import MessageContainer from "./MessageContainer";

const URL = "http://localhost:5000";
const socket = io(URL);

const PanelTwo = () => {
  // store
  const { currentChat, passphrase } = currentChat_store();
  const { _id: currentUserId } = userInfo_store();
  const { addMessage } = messageLists_store();
  const { chats, setAllChats } = chats_store();

  const axiosPrivate = useAxiosPrivate();

  type Message = z.infer<typeof MessageSchema>;

  useEffect(() => {
    if (currentUserId) {
      // TODO: Join setup event, entering own room
      socket.emit("setup", { userId: currentUserId });

      socket.on("setup", (data: string) => {
        // toast.info(data, { position: "top-right", duration: 3000 });
      });
    }

    return () => {
      socket.off("setup");
    };
  }, [currentUserId]);

  // hook for events that listen messages
  useEffect(() => {
    socket.on("receive_msg", (data: Message) => {
      console.log("receive_msg event:", data);

      const isChat = chats.filter((chat) => chat._id == data.chat)[0];
      if (!isChat) {
        fetchAllChats_controller({
          fetcher: axiosPrivate,
          setChatLists: setAllChats,
        });
        return;
      }

      if (!currentChat || data.chat !== currentChat._id) {
        // toast.success(`Someone sent you a message.`, {
        //   position: "top-right",
        //   duration: 2000,
        // });
        return;
      } else {
        if (passphrase) {
          const decipher = decrypt_cipher({
            cipher: data.content,
            passphrase,
          });
          const payload: Message = { ...data, content: decipher };
          addMessage(payload);
        }
      }
    });

    return () => {
      socket.off("receive_msg");
    };
  }, [currentChat, passphrase]);

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      {/* <Body /> */}
      <MessageContainer />
      {currentChat && <Footer socket={socket} />}
    </div>
  );
};

export default PanelTwo;
