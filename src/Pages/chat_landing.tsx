import { useEffect } from "react";
import useGainAccess from "../hooks/useGainAccess";
import PanelOne from "../Panel_One/PanelOne";
import PanelTwo from "../Panel_Two/PanelTwo";
import { userInfo_store } from "../store/userInfo_store";
import { chats_store } from "../store/chats_store";
import { retrievePrvKey_controller } from "../controllers/retrievePrvKey_controller";

const Chat_landing = () => {
  // store
  const userStore = userInfo_store();

  // checking whether user need to login or not 1️⃣
  const { id } = useGainAccess();

  useEffect(() => {
    if (id)
      // retrieve private key 2️⃣
      console.log("we retrieve prv key 2️⃣");
    retrievePrvKey_controller({
      userId: id as string,
      setKey: userStore.setUserInfo,
    });
  }, [id]);

  console.log("UserInfo:", userStore);
  // console.log("Chat Lists:", chatStore);

  return (
    <div className="grid grid-cols-3 gap-3 py-3 px-10 items-center min-h-screen max-h-screen overflow-hidden text-slate-400 dark:text-white bg-white dark:bg-black">
      <div className="grid h-full bg-zinc-200 dark:bg-zinc-800 rounded-lg shadow-lg">
        <PanelOne />
      </div>
      <div className="grid col-span-2 h-full bg-zinc-200 dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <PanelTwo />
      </div>
    </div>
  );
};

export default Chat_landing;
