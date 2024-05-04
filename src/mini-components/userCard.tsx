import React from "react";
import avatar from "../assets/icons8-iron-man.svg";
import z from "zod";
import { UserSchema } from "../zod/userSchema";
import { toast } from "sonner";
import { currentChat_store } from "../store/currentChat_store";
import { fetchChat_controller } from "../controllers/fetchChat_controller";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { chats_store } from "../store/chats_store";

type User = z.infer<typeof UserSchema>;

type Props = {
  user: User;
};

const UserCard = (props: Props) => {
  const { user } = props;

  // store
  const { setCurrentChat } = currentChat_store();
  const { updateChat } = chats_store();

  // hook for axios private
  const axiosPrivate = useAxiosPrivate();

  // TODO: handle button click
  // TODO: add to chat lists & set as current chat
  const handleClick = () => {
    fetchChat_controller({
      chatMateId: user._id,
      fetcher: axiosPrivate,
      addToChatLists: updateChat,
      setCurrentChat: setCurrentChat,
    });
  };

  return (
    <button
      className="w-full h-fit flex flex-row items-center gap-x-5 rounded-lg p-2 border border-zinc-400 dark:border-white outline-none ring-0 focus:ring-1 focus:ring-purple-400 hover:bg-purple-400 hover:bg-opacity-25 hover:border-purple-400 dark:hover:border-purple-400"
      onClick={handleClick}
    >
      <div>
        <img src={avatar} className="w-12" />
      </div>
      <div className="flex flex-col">
        <span className="block text-zinc-600 dark:text-white text-start">
          {user.name}
        </span>
        <span className="text-zinc-600 dark:text-white text-start">
          {user.email}
        </span>
      </div>
    </button>
  );
};

export default UserCard;
