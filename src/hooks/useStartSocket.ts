import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { socket_store } from "../store/socket_store";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { messageLists_store } from "../store/messageLists_store";
import { currentChat_store } from "../store/currentChat_store";

type Props = {
  roomId: string;
  input: string;
  socket: Socket;
  setinput: React.Dispatch<React.SetStateAction<string>>;
};

const useStartSocket = (props: Props) => {
  const { input, setinput, roomId, socket } = props;

  const { startTyping, stopTyping } = socket_store();
  const { currentChat } = currentChat_store();
  const { addMessage } = messageLists_store();

  useEffect(() => {
    socket.emit("join_room", { roomId: roomId });

    socket.on("join_room", (data: any) => {
      console.log(data);
    });

    socket.on("listen_typing", (data: boolean) => {
      console.log("listening typing: ", data);
      data == true ? startTyping() : stopTyping();
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, [socket]);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    socket.emit("isTyping", { isTyping: true, roomId });
  };

  const handleStopTyping = () => {
    socket.emit("isTyping", { isTyping: false, roomId });
  };

  return { handleTyping, handleStopTyping };
};

export default useStartSocket;
