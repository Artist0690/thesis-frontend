import { useEffect } from "react";
import { currentChat_store } from "../store/currentChat_store";
import MessageContainer from "./MessageContainer";
import { userInfo_store } from "../store/userInfo_store";

const Body = () => {
  // store
  const { currentChat, setPassphrase } = currentChat_store();
  const { _id: currentUserId, rsa_private_key } = userInfo_store();

  // hook that store passphrase of current chat
  // hook will be triggered every current chat changes
  useEffect(() => {
    // if (currentChat?.latestMessage)
    // console.log("current chat:", currentChat.latestMessage._id);
    if (currentChat?.users) {
      setPassphrase({
        privateKey: rsa_private_key!,
        currentUserId: currentUserId!,
      });
    }
  }, [currentChat]);

  return (
    <div className="w-full min-h-[520px] max-h-full flex px-2">
      <MessageContainer />
    </div>
  );
};

export default Body;
