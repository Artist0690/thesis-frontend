import React, { useEffect, useState } from "react";
import { currentChat_store } from "../store/currentChat_store";
import { axiosPrivate } from "../api/axios";
import z, { string } from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { messageLists_store } from "../store/messageLists_store";
import { decrypt_cipher } from "../crypto/AES/aes_crypto";

type Message = z.infer<typeof MessageSchema>;

const useFetchAllMessages = () => {
  // store
  const { setMessageLists } = messageLists_store();
  const { currentChat, passphrase } = currentChat_store();

  // local state
  // this state value is returned
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

        const messageLists = checkMessages.data;

        // TODO: decrypt messages
        const decrypted_message_lists = messageLists.map((msg) => {
          const decipher = decrypt_cipher({
            cipher: msg.content,
            passphrase: passphrase!,
          });
          return { ...msg, content: decipher };
        });

        // TODO: set message lists
        setMessageLists(decrypted_message_lists);
        setmsgLists(decrypted_message_lists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (currentChat && currentChat?._id) {
      fetchAllMessages();
    }
  }, [currentChat?._id, passphrase]);

  return { msgLists };
};

export default useFetchAllMessages;
