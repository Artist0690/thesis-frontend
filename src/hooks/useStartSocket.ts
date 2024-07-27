import React, { useEffect } from "react";
import { Socket } from "socket.io-client";
import { currentChat_store } from "../store/currentChat_store";
import { messageLists_store } from "../store/messageLists_store";
import { socket_store } from "../store/socket_store";

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

  const join_room_listener = (data: string) => {
    console.log(data);
  };

  useEffect(() => {
    socket.emit("join_room", { roomId: roomId });

    socket.on("join_room", (data: string) => {
      console.log(data);
    });

    socket.on("listen_typing", (data: boolean) => {
      console.log("listening typing: ", data);
      data == true ? startTyping() : stopTyping();
    });

    return () => {
      socket.off("join_room");
      socket.off("listen_typing");
    };
  }, [socket]);

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    socket.emit("isTyping", { isTyping: true, roomId });
  };

  const handleStopTyping = () => {
    socket.emit("isTyping", { isTyping: false, roomId });
  };

  return { handleTyping, handleStopTyping };
};

export default useStartSocket;
