import { send } from "process";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { socket_store } from "../store/socket_store";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { messageLists_store } from "../store/messageLists_store";
import { data } from "autoprefixer";

type Props = {
  roomId: string;
  sender: string;
  input: string;
  // setmessage: React.Dispatch<any>;
  setinput: React.Dispatch<React.SetStateAction<string>>;
};

type Message = z.infer<typeof MessageSchema>;

// socket
const URL = "http://localhost:5000";
const socket = io(URL);

const useStartSocket = (props: Props) => {
  // props param
  const { input, setinput, sender, roomId } = props;

  // store
  const { startTyping, stopTyping } = socket_store();
  const { addMessage } = messageLists_store();

  useEffect(() => {
    // connect event
    socket.on("connection", (data: any) => {
      console.log(data);
    });
    // join event
    socket.emit("join_room", { roomId: roomId });
    // event
    socket.on("join_room", (data: any) => {
      console.log(data);
    });
    socket.on("receive_msg", (data: Message) => {
      console.log("receive_msg event:", data);
      addMessage(data);
    });
    // event
    socket.on("listen_typing", (data: boolean) => {
      console.log("listening typing: ", data);
      data == true ? startTyping() : stopTyping();
    });
  }, [socket]);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setinput(e.target.value);
    console.log("typing");
    socket.emit("isTyping", { isTyping: true, roomId });
  };

  const handleStopTyping = () => {
    console.log("stop tying");
    socket.emit("isTyping", { isTyping: false, roomId });
  };

  return { handleTyping, handleStopTyping };
};

export default useStartSocket;
