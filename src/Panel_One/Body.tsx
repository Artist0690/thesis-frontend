import React, { useEffect } from "react";
import ChatCard from "../mini-components/chatCard";
import { userInfo_store } from "../store/userInfo_store";
import useFetchAllChats from "../hooks/useFetchAllChats";
import { chats_store } from "../store/chats_store";
import { fetchAllChats_controller } from "../controllers/fetchAllChats_controller";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Body = () => {
  // store
  const { id, setUserInfo } = userInfo_store();
  const { setAllChats, chats } = chats_store();

  const fetcher = useAxiosPrivate();

  useEffect(() => {
    if (id)
      fetchAllChats_controller({
        userId: id,
        setChatLists: setAllChats,
        fetcher: fetcher,
      });
  }, [id]);

  console.log("Chat Lists:", chats);

  return (
    <div className="flex flex-col h-auto py-4 px-3 gap-y-3">
      <ChatCard name="alice" email="alice@gmail.com" disabled={true} />
      <ChatCard name="bob" email="bob@gmail.com" disabled={false} />
      <ChatCard name="joe" email="joe00&@gmail.com" disabled={false} />
    </div>
  );
};

export default Body;
