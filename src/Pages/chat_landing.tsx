import { useEffect } from "react";
import useGainAccess from "../hooks/useGainAccess";
import useRetrievePrvkey from "../hooks/useRetrievePrvkey";
import PanelOne from "../Panel_One/PanelOne";
import PanelTwo from "../Panel_Two/PanelTwo";
import { userInfo_store } from "../store/userInfo_store";
import { useLiveQuery } from "dexie-react-hooks";
import { dexie_db } from "../dexie_db/db";

const Chat_landing = () => {
  // check user is logged in.
  // how to check - do refresh token process
  // if refresh token is invalid or absent, user need to login again.
  // if user got new access token, user dont need to login

  const { message } = useGainAccess();

  const { id, name, email, accessToken, rsa_private_key } = userInfo_store();

  // retrieve associated private key from indexed db
  const retrievePrvKey = useRetrievePrvkey();

  console.log("UserInfo: ", { id, email, accessToken, rsa_private_key, name });

  return (
    <div className="grid grid-cols-3 gap-3 py-3 px-10 items-center min-h-screen text-slate-400 dark:text-white bg-white dark:bg-black">
      <div className="grid h-full bg-zinc-200 dark:bg-zinc-800 rounded-lg shadow-lg">
        <PanelOne />
      </div>
      <div className="grid col-span-2 h-full bg-zinc-200 dark:bg-zinc-800 rounded-lg shadow-lg">
        <PanelTwo />
      </div>
    </div>
  );
};

export default Chat_landing;
