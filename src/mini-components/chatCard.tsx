import React from "react";
import { GiEgyptianProfile } from "react-icons/gi";

type PropsType = {
  name: string;
  email: string;
  disabled: boolean;
};

const ChatCard = ({ name, email, disabled }: PropsType) => {
  return (
    <button
      className={`grid grid-cols-6 gap-5 border border-slate-400 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-500 hover:bg-opacity-10 dark:border-white px-2 py-3 focus:ring-1 focus:ring-purple-500 focus:outline-none rounded-lg ${disabled}`}
    >
      <div className="grid col-span-2 items-center justify-center">
        <span className="flex w-fit h-fit rounded-full overflow-hidden border border-slate-400 dark:border-white">
          <GiEgyptianProfile className="w-16 h-16 text-black dark:text-white" />
        </span>
      </div>
      <div className="grid col-span-4 gap-2">
        <span className="flex w-full text-slate-500 dark:text-white">
          {name}
        </span>
        <span className="flex w-full text-slate-500 dark:text-white">
          {email}
        </span>
      </div>
    </button>
  );
};

export default ChatCard;
