import z from "zod";
import { ChatSchema } from "../zod/chatSchema";
import ironMan from "../assets/icons8-iron-man.svg";
import { userInfo_store } from "../store/userInfo_store";
import { currentChat_store } from "../store/currentChat_store";

type Chat = z.infer<typeof ChatSchema>;

type Props = {
  chat: Chat;
};

const ChatCard = (props: Props) => {
  const { chat } = props;

  // store
  const { _id: currentUserId } = userInfo_store();
  const { setCurrentChat, currentChat } = currentChat_store();

  const chatMate = chat.users.filter(
    (user) => user.userInfo._id !== currentUserId
  )[0];

  const handleClick = () => {
    setCurrentChat(chat);
    // console.log("current chat is:", currentChat);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative grid grid-cols-6 gap-5 items-center border border-slate-400 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-400 hover:bg-opacity-10 dark:border-white px-2 py-3 focus:ring-1 focus:ring-purple-500 focus:outline-none rounded-lg disabled:bg-purple-300 disabled:border-0 text-zinc-500 dark:text-white disabled:cursor-not-allowed`}
      disabled={chat._id == currentChat?._id}
    >
      <div className="grid col-span-2 items-center justify-center">
        <span className="flex w-fit h-fit p-1 rounded-full overflow-hidden border border-slate-400 hover:border-purple-500 dark:hover:border-purple-500 dark:border-white">
          <img src={ironMan} className="w-16 h-16" />
        </span>
      </div>
      <div className="grid col-span-4 gap-2">
        <span className="flex w-full uppercase text-xl font-semibold">
          {chatMate.userInfo.name}
        </span>
        <span className="flex w-full">{chatMate.userInfo.email}</span>
        <span className="flex w-full">latestMessage:</span>
      </div>
    </button>
  );
};

export default ChatCard;
