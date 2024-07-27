import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";
import TypingAnimation from "../animation/TypingAnimation";
import useFetchAllMessages from "../hooks/useFetchAllMessages";
import ChatBubble from "../mini-components/chatBubble";
import { currentChat_store } from "../store/currentChat_store";
import { messageLists_store } from "../store/messageLists_store";
import { socket_store } from "../store/socket_store";
import { userInfo_store } from "../store/userInfo_store";

const URL = "http://localhost:5000";
const socket = io(URL);

const MessageContainer = () => {
  const { currentChat, setPassphrase } = currentChat_store();
  const { messageLists } = messageLists_store();
  const { isTyping } = socket_store();
  const { _id: currentUserId, rsa_private_key } = userInfo_store();

  const messageEndRef = useRef<HTMLDivElement>(null);
  const typingIndicatorRef = useRef<HTMLDivElement>(null);

  // use a hook that fetches messages assciated with chat
  const { msgLists } = useFetchAllMessages();

  const scrollToEnd = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (currentChat?.users) {
      setPassphrase({
        privateKey: rsa_private_key!,
        currentUserId: currentUserId!,
      });
    }
  }, [currentChat]);

  useEffect(() => {
    socket.emit("setup", { userId: currentUserId });
    socket.on("receive_msg", scrollToEnd);

    return () => {
      socket.off("receive_msg");
      socket.disconnect();
    };
  }, [currentUserId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messageLists]);

  if (!currentChat)
    return (
      <div className="flex-1 flex items-center max-h-[calc(100%-2rem)] justify-center">
        <p className="text-lg font-[Inter]">No current chat here...</p>
      </div>
    );

  return (
    <>
      {/* <div className="flex-1 flex sm:mx-2 max-h-[calc(100%-2rem)] rounded-lg bg-zinc-200 bg-opacity-40 dark:bg-opacity-10 shadow-inner dark:shadow-none shadow-zinc-300"> */}
      {messageLists == null ? (
        <p>Loading</p>
      ) : (
        <div className="flex-1 flex px-2 py-2 overflow-y-auto flex-col gap-y-3 2xl:border border-zinc-300 border-y 2xl:border-l-0 dark:border-slate-700">
          {messageLists.map((message, index) => (
            <ChatBubble
              key={uuid()}
              message={message}
              currentMessageIndex={index}
            />
          ))}
          {/* TODO: play typing animation */}

          <div className="mt-auto" ref={typingIndicatorRef}>
            {isTyping ? <TypingAnimation /> : null}
          </div>

          <div ref={messageEndRef} />
        </div>
      )}

      {/* </div> */}
    </>
  );
};

export default MessageContainer;
