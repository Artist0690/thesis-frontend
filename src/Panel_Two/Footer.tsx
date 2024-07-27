import { cn } from "@udecode/cn";
import { Send } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Socket } from "socket.io-client";
import Button from "../components/ui/Button";
import { sendMessage_controller } from "../controllers/sendMessage_controller";
import { encrypt_msg } from "../crypto/AES/aes_crypto";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useStartSocket from "../hooks/useStartSocket";
import { currentChat_store } from "../store/currentChat_store";
import { messageLists_store } from "../store/messageLists_store";
import { userInfo_store } from "../store/userInfo_store";

type Props = {
  socket: Socket;
};

const Footer = (props: Props) => {
  const { socket } = props;

  // local state
  const [input, setinput] = useState<string>("");

  // store
  const { _id: currentUserId } = userInfo_store();
  const { currentChat, updateLatestMsg, passphrase } = currentChat_store();
  const { addMessage } = messageLists_store();

  // hook for socket
  const { handleStopTyping, handleTyping } = useStartSocket({
    input: input,
    setinput: setinput,
    roomId: currentChat?._id as string,

    socket,
  });

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setinput(e.target.value);
  };

  // hook : axios instance
  const fetcher = useAxiosPrivate();

  const sendMessage = async () => {
    // check input values to ensure that are not to space characters
    const validInput = input.trim().length > 0;
    if (validInput) {
      // TODO: encyrpt message before sent
      const cipher = encrypt_msg({ passphrase: passphrase!, plaintext: input });
      // TODO: send message
      sendMessage_controller({
        chatId: currentChat?._id as string,
        passphrase: passphrase!,
        content: cipher,
        addMessage: addMessage,
        updateLatestMsg: updateLatestMsg,
        fetcher,
        socket,
        receiver: currentChat!.users.filter(
          (user) => user.userInfo._id !== currentUserId
        )[0].userInfo._id,
      });
      // reset input
      setinput("");

      return;
    }
  };

  return (
    <div className="flex h-20 shrink-0 gap-x-4 justify-start items-center px-3">
      <div className="w-[calc(80%)] md:w-[400px]">
        {/* <input
          type="text"
          value={input}
          onChange={(e) => handleInput(e)}
          onFocus={(e) => handleTyping(e)}
          onBlur={handleStopTyping}
          placeholder="Type..."
          className="px-2 py-3 w-full font-sans text-sm md:text-base rounded-2xl outline-none focus:ring-[1px] focus:ring-violet-500 ring-offset-1 bg-white dark:bg-zinc-600 text-zinc-600 dark:text-white border border-zinc-300 dark:border-zinc-700 placeholder:text-md"
        /> */}
        <textarea
          placeholder="Type your message..."
          className="min-h-[48px] text-black bg-zinc-300/50 border border-neutral-400 dark:border-neutral-200/50 dark:bg-slate-700 dark:text-white font-[Inter] w-full resize-none rounded-xl px-4 pr-16 pt-1 shadow-sm focus:ring-purple-500 focus:ring-1 outline-none"
          value={input}
          onChange={(e) => handleInput(e)}
          onFocus={(e) => handleTyping(e)}
          onBlur={() => handleStopTyping()}
        />
      </div>
      <div className="flex h-full items-center justify-center">
        <Button
          onClick={() => sendMessage()}
          disabled={input.trim().length < 1}
          className="p-2 disabled:dark:bg-slate-700/50 disabled:bg-zinc-300/50 disabled:hover:cursor-not-allowed disabled:shadow-none"
        >
          <Send
            className={cn(`md:size-8 size-6 text-white`, {
              "text-purple-300 hover:cursor-not-allowed dark:text-purple-700":
                input.trim().length < 1,
            })}
          />
        </Button>
      </div>
    </div>
  );
};

export default Footer;
