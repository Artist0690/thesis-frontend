import useGainAccess from "../hooks/useGainAccess";
import PanelOne from "../Panel_One/PanelOne";
import PanelTwo from "../Panel_Two/PanelTwo";
import { accessToken_store } from "../store/accessToken_store";

const Chat_landing = () => {
  // check user is logged in.
  // how to check - do refresh token process
  // if refresh token is invalid or absent, user need to login again.
  // if user got new access token, user dont need to login

  const { message } = useGainAccess();

  const { accessToken } = accessToken_store();

  console.log("accesstoken: ", accessToken);

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
