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

const MessageContainer = () => {
  // store
  const { currentChat } = currentChat_store();
  const { messageLists } = messageLists_store();
  const { isTyping } = socket_store();

  // use a hook that fetches messages assciated with chat
  const { msgLists } = useFetchAllMessages();

  // useEffect(() => {
  //   if (msgLists) console.log("msg lists from hook: ", msgLists);
  //   if (messageLists) console.log("msg lists from store: ", messageLists);
  //   if (currentChat && currentChat.latestMessage)
  //     console.log("latest msg ID: ", currentChat.latestMessage._id);
  // }, [msgLists, messageLists]);

  if (!currentChat)
    return (
      <div className="w-full h-full flex justify-center items-center rounded-lg bg-white bg-opacity-40 dark:bg-opacity-10">
        <PlayAnimation />
      </div>
    );

  return (
    <div className="w-full max-h-[520px] rounded-lg bg-white bg-opacity-40 dark:bg-opacity-10 shadow-inner dark:shadow-none shadow-zinc-300">
      {/* {currentChat && currentChat.latestMessage?._id
        ? currentChat.latestMessage._id
        : "no id"} */}
      {messageLists == null ? (
        <p>Loading</p>
      ) : (
        <ScrollableFeed className="flex flex-col gap-y-2 pt-2 px-2 min-h-[490px] max-h-[490px]">
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
        </ScrollableFeed>
      )}
    </div>
  );
};

export default MessageContainer;
