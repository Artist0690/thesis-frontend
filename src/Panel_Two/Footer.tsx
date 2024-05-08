import { ChangeEvent, useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { sendMessage_controller } from "../controllers/sendMessage_controller";
import { currentChat_store } from "../store/currentChat_store";
import { messageLists_store } from "../store/messageLists_store";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Socket } from "socket.io-client";
import useStartSocket from "../hooks/useStartSocket";
import { userInfo_store } from "../store/userInfo_store";
import { toast } from "sonner";
import { encrypt_msg } from "../crypto/AES/aes_crypto";

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

  const buttonColor =
    input.trim().length > 0
      ? "text-purple-700 hover:text-purple-500"
      : "text-purple-300 hover:cursor-not-allowed dark:text-zinc-700";

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setinput(e.target.value);
  };

  // hook : axios instance
  const fetcher = useAxiosPrivate();

  const sendMessage = async () => {
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
    <div className="flex gap-x-4 justify-start items-center py-3 px-3">
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => handleInput(e)}
          onFocus={(e) => handleTyping(e)}
          onBlur={handleStopTyping}
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
