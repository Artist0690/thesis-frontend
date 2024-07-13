import { useEffect } from "react";
import { currentChat_store } from "../store/currentChat_store";
import PlayAnimation from "../animation/playAnimation";
import useFetchAllMessages from "../hooks/useFetchAllMessages";
import ScrollableFeed from "react-scrollable-feed";
import { v4 as uuid } from "uuid";
import ChatBubble from "../mini-components/chatBubble";
import { messageLists_store } from "../store/messageLists_store";
import TypingAnimation from "../animation/TypingAnimation";
import { socket_store } from "../store/socket_store";
import { userInfo_store } from "../store/userInfo_store";

const MessageContainer = () => {
  // store
  const { currentChat, setPassphrase } = currentChat_store();
  const { messageLists } = messageLists_store();
  const { isTyping } = socket_store();
  const { _id: currentUserId, rsa_private_key } = userInfo_store();

  // use a hook that fetches messages assciated with chat
  const { msgLists } = useFetchAllMessages();

  useEffect(() => {
    if (currentChat?.users) {
      setPassphrase({
        privateKey: rsa_private_key!,
        currentUserId: currentUserId!,
      });
    }
  }, [currentChat]);

  if (!currentChat)
    return (
      <div className="flex-1 flex items-center max-h-[calc(100%-2rem)] justify-center">
        <PlayAnimation />
      </div>
    );

  return (
    <>
      {/* <div className="flex-1 flex sm:mx-2 max-h-[calc(100%-2rem)] rounded-lg bg-zinc-200 bg-opacity-40 dark:bg-opacity-10 shadow-inner dark:shadow-none shadow-zinc-300"> */}
      {messageLists == null ? (
        <p>Loading</p>
      ) : (
        <div className="flex-1 flex px-2 py-2 overflow-y-auto flex-col gap-y-3 2xl:border 2xl:border-zinc-300 2xl:mx-2 2xl:rounded-lg xs:border-y xs:border-zinc-300 dark:sm:border-slate-700">
          {messageLists.map((message, index) => (
            <ChatBubble
              key={uuid()}
              message={message}
              currentMessageIndex={index}
            />
          ))}
          {/* TODO: play typing animation */}
          {isTyping && (
            <div className="mt-auto">
              <TypingAnimation />
            </div>
          )}
        </div>
      )}

      {/* </div> */}
    </>
  );
};

export default MessageContainer;
