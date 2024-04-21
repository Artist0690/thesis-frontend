import React, { useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { userInfo_store } from "../store/userInfo_store";
import { ChatSchema } from "../zod/chatSchema";
import { chats_store } from "../store/chats_store";
import z from "zod";

const useFetchAllChats = () => {
  const axiosPrivate = useAxiosPrivate();

  const userInfo = userInfo_store();
  const { setAllChats, chats } = chats_store();

  const fetchAllChats = async () => {
    axiosPrivate
      .post("chats/get_all_chats", {
        headers: { Authorization: `Bearer ${userInfo.accessToken}` },
      })
      .then((response) => {
        // --------------------
        // set to global state
        // --------------------
        const zCheck = z.array(ChatSchema).safeParse(response.data);
        if (!zCheck.success) {
          console.log("Chat Type Mismatch.");
          return;
        }
        setAllChats(zCheck.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllChats();
  }, [userInfo.id]);
};

export default useFetchAllChats;
