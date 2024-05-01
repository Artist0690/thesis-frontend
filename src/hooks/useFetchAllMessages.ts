import React, { useEffect, useState } from "react";
import { currentChat_store } from "../store/currentChat_store";
import { axiosPrivate } from "../api/axios";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { messageLists_store } from "../store/messageLists_store";

type Message = z.infer<typeof MessageSchema>;

const useFetchAllMessages = () => {
  // store
  const { setMessageLists } = messageLists_store();
  const { currentChat } = currentChat_store();

  // local state
  const [msgLists, setmsgLists] = useState<Message[] | null>(null);

  // fetcher function
  const fetchAllMessages = async () => {
    axiosPrivate
      .get(`messages/getAllMessages/${currentChat?._id}`)
      .then((response) => {
        const checkMessages = z.array(MessageSchema).safeParse(response.data);
        if (!checkMessages.success) {
          console.log("Message Type Mismatch!", checkMessages.error);
          return;
        }

        // TODO: set message lists
        setMessageLists(checkMessages.data);
        setmsgLists(checkMessages.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (currentChat && currentChat?._id) {
      fetchAllMessages();
    }
  }, [currentChat?._id]);

  return { msgLists };
};

export default useFetchAllMessages;
