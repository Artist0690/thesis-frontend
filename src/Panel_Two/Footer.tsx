import React, { ChangeEvent, useState } from "react";
import { IoSendSharp } from "react-icons/io5";

const Footer = () => {
  const [input, setinput] = useState<string>("");
  const buttonColor =
    input.trim().length > 0
      ? "text-purple-700 hover:text-purple-500"
      : "text-purple-300 hover:cursor-not-allowed dark:text-zinc-700";

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setinput(e.target.value);
  };

  const sendMessage = () => {
    const validInput = input.trim().length > 0;
    if (validInput) {
      alert("input : " + input);
      return;
    }
  };

  return (
    <div className="flex gap-x-4 justify-start items-center py-3 px-3">
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => handleInput(e)}
          className="px-2 py-3 min-w-[400px] rounded-lg outline-none bg-white dark:bg-zinc-600 text-zinc-600 dark:text-white border border-zinc-300 dark:border-zinc-500"
        />
      </div>
      <div>
        <IoSendSharp
          className={`size-8 ${buttonColor} `}
          onClick={() => sendMessage()}
        />
      </div>
    </div>
  );
};

export default Footer;
