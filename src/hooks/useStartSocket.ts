import { send } from "process";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { socket_store } from "../store/socket_store";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { messageLists_store } from "../store/messageLists_store";
import { current } from "immer";
import { currentChat_store } from "../store/currentChat_store";
import { toast } from "sonner";

type Props = {
  roomId: string;
  input: string;
  socket: Socket;
  setinput: React.Dispatch<React.SetStateAction<string>>;
};

type Message = z.infer<typeof MessageSchema>;

const useStartSocket = (props: Props) => {
  // props param
  const { input, setinput, roomId, socket } = props;

  // store
  const { startTyping, stopTyping } = socket_store();
  const { currentChat } = currentChat_store();
  const { addMessage } = messageLists_store();

  useEffect(() => {
    // TODO: join room and listen
    socket.emit("join_room", { roomId: roomId });

    socket.on("join_room", (data: any) => {
      console.log(data);
    });

    // FIXME: listen message
    // socket.on("receive_msg", (data: Message) => {
    //   console.log("receive_msg event:", data);
    //   if (data.chat == currentChat?._id) {
    //     addMessage(data);
    //     return;
    //   }
    //   toast.success("Someone sent you a message", {
    //     duration: 3000,
    //     position: "top-right",
    //   });
    // });

    // TODO: listen typing indicator
    socket.on("listen_typing", (data: boolean) => {
      console.log("listening typing: ", data);
      data == true ? startTyping() : stopTyping();
    });
  }, [socket]);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("typing");
    // TODO: Emit typing
    socket.emit("isTyping", { isTyping: true, roomId });
  };

  const handleStopTyping = () => {
    console.log("stop tying");
    // TODO: Emit stop typing
    socket.emit("isTyping", { isTyping: false, roomId });
  };

  return { handleTyping, handleStopTyping };
};

export default useStartSocket;
