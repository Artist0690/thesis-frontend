import { Fragment, useEffect } from "react";
import { userInfo_store } from "../store/userInfo_store";
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
    <div className="w-full flex-1 flex-col max-h-[600px] p-2">
      <span className="hidden lg:block ml-2 mb-1 text-zinc-400 dark:text-white select-none">
        Your Chats
      </span>
      <ChatListTemplate chatLists={chats} />
    </div>
  );
};

export default Body;
