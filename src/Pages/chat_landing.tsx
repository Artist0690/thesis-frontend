import { useEffect } from "react";
import useGainAccess from "../hooks/useGainAccess";
import PanelOne from "../Panel_One/PanelOne";
import PanelTwo from "../Panel_Two/PanelTwo";
import { userInfo_store } from "../store/userInfo_store";
import { retrievePrvKey_controller } from "../controllers/retrievePrvKey_controller";

const Chat_landing = () => {
  // store
  const userStore = userInfo_store();

  // checking whether user need to login or not 1️⃣
  const { id } = useGainAccess();

  useEffect(() => {
    if (id) console.log("we retrieve prv key 2️⃣");
    retrievePrvKey_controller({
      userId: id as string,
      setKey: userStore.setUserInfo,
    });
  }, [id]);

  return (
    // page
    <div className="flex h-full w-full items-center justify-center text-slate-400 dark:text-white bg-white dark:bg-slate-900 ">
      {/* container */}
      <div className="md:w-[calc(100%-5rem)] md:h-[calc(100%-5rem)] w-full h-full flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 overflow-hidden 2xl:divide-x divide-zinc-200 dark:divide-slate-700">
        {/* left panel */}
        <div className="2xl:block hidden w-[calc(40%)] h-full bg-white dark:bg-gray-900">
          <PanelOne />
        </div>
        {/* right panel */}
        <div className="flex flex-col w-full h-full bg-white dark:bg-gray-900">
          <PanelTwo />
        </div>
      </div>
    </div>
  );
};

export default Chat_landing;
