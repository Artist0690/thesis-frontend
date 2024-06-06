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
    // chat landing page
    <div className="py-5 px-10 items-center w-full h-full text-slate-400 dark:text-white bg-zinc-300 dark:bg-black">
      {/* panel wrapper */}
      <div className="grid 2xl:grid-cols-4 grid-rows-4 h-full rounded-2xl bg-white dark:bg-slate-900 overflow-hidden dark:divide-zinc-700">
        {/* panel one container */}
        <div className="hidden 2xl:grid h-full bg-white dark:bg-gray-900">
          <PanelOne />
        </div>
        {/* panel two container */}
        <div className="grid col-span-3 row-span-3 h-full bg-white dark:bg-gray-900">
          <PanelTwo />
        </div>
      </div>
    </div>
  );
};

export default Chat_landing;
