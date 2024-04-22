import React, { Fragment, useEffect } from "react";
import ChatCard from "../mini-components/chatCard";
import { userInfo_store } from "../store/userInfo_store";
import useFetchAllChats from "../hooks/useFetchAllChats";
import { chats_store } from "../store/chats_store";
import { fetchAllChats_controller } from "../controllers/fetchAllChats_controller";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ChatListTemplate from "./ChatListTemplate";

const Body = () => {
  // store
  const { _id } = userInfo_store();
  const { setAllChats, chats } = chats_store();

  const fetcher = useAxiosPrivate();

  useEffect(() => {
    if (_id) {
      console.log("we fetch all chats 3️⃣");
      fetchAllChats_controller({
        setChatLists: setAllChats,
        fetcher: fetcher,
      });
    }
  }, [_id]);

  console.log("Chat Lists:", chats);

  return (
    <Fragment>
      <ChatListTemplate chatLists={chats} />
    </Fragment>
    // <div className="flex flex-col h-auto py-4 px-3 gap-y-3">

    // </div>
  );
};

export default Body;
