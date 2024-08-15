import { cn } from "@udecode/cn";
import z from "zod";
import Avatar from "../components/ui/avatar";
import { getChatMateInfo } from "../functions/getChatMateId";
import { chats_store } from "../store/chats_store";
import { messageLists_store } from "../store/messageLists_store";
import { userInfo_store } from "../store/userInfo_store";
import { MessageSchema } from "../types/chatSchema";

type Message = z.infer<typeof MessageSchema>;

type Props = {
  message: Message;
  currentMessageIndex: number;
};

// ⏭️ component start
const ChatBubble = (props: Props) => {
  const { message, currentMessageIndex } = props;

  // store
  const { _id: currentUserId, name: currentUserName } = userInfo_store();
  const { messageLists } = messageLists_store();
  const { chats } = chats_store();
  const chatMateInfo = getChatMateInfo({
    chats,
    currentUserId: currentUserId!,
    message,
  });

  const isCurrentUser = message.sender._id === currentUserId;
  const isNextMessage = messageLists.length > currentMessageIndex;
  const nextMessage = isNextMessage
    ? messageLists[currentMessageIndex + 1]
    : undefined;

  const hasNextMessageFromSameUser = nextMessage
    ? nextMessage.sender._id === message.sender._id
      ? true
      : false
    : false;

  return (
    <div className={`flex w-full font-[Inter]`}>
      <div
        className={cn("flex justify-start w-full", {
          "justify-end": isCurrentUser,
          "order-1": !isCurrentUser,
        })}
      >
        {/* content */}
        <div
          className={cn(
            "flex flex-col p-2 2xl:max-w-[400px] max-w-[200px] rounded-lg",
            {
              "rounded-br-none bg-zinc-200 dark:bg-slate-700 text-black dark:text-white": isCurrentUser,
              "rounded-bl-none bg-purple-500 dark:bg-purple-800 text-white": !isCurrentUser,
              "rounded-lg": hasNextMessageFromSameUser,
            }
          )}
        >
          {message.content}
        </div>
        {/* -- content -- */}
        {/* avatar */}
        <span
          className={cn("flex items-end w-4", {
            "order-first mr-2": !isCurrentUser,
            "ml-2": isCurrentUser,
          })}
        >
          {hasNextMessageFromSameUser ? null : (
            <Avatar
              className={cn("w-4 h-4 text-xs dark:bg-white dark:text-black")}
            >
              {isCurrentUser
                ? currentUserName![0]
                : chatMateInfo.userInfo.name[0]}
            </Avatar>
          )}
        </span>
        {/* -- avatar -- */}
      </div>
    </div>
  );
};

export default ChatBubble;
