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
    // chat landing page
    <div className="py-5 px-10 items-center w-full h-full text-slate-400 dark:text-white bg-zinc-300 dark:bg-black">
      {/* panel wrapper */}
      <div className="grid 2xl:grid-cols-4 grid-rows-4 h-full rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
        {/* panel one container */}
        <div className="hidden 2xl:grid 2xl:col-span-1 row-span-1 2xl:row-span-full bg-white dark:bg-gray-900">
          <PanelOne />
        </div>
        {/* panel two container */}
        <div className="h-full grid 2xl:col-span-3 row-span-3 2xl:row-span-full bg-white dark:bg-gray-900">
          <PanelTwo />
        </div>
      </div>
    </div>
  );
};

export default Chat_landing;
