import avatar from "../assets/icons8-iron-man.svg";
import z from "zod";
import { UserSchema } from "../zod/userSchema";
import { currentChat_store } from "../store/currentChat_store";
import { fetchChat_controller } from "../controllers/fetchChat_controller";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { chats_store } from "../store/chats_store";
import { userInfo_store } from "../store/userInfo_store";
import envelope from "../assets/arrow-thin-right-icon.svg";
import { motion } from "framer-motion";
import { useEffect } from "react";

type User = z.infer<typeof UserSchema>;

type Props = {
  user: User;
  index: number;
};

const UserCard = (props: Props) => {
  const { user, index } = props;

  // store
  const { setCurrentChat, setPassphrase } = currentChat_store();
  const { updateChat } = chats_store();
  const { _id: currentUserId, rsa_private_key } = userInfo_store();

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

    // TODO: decrypt passphrase
    setPassphrase({
      currentUserId: currentUserId!,
      privateKey: rsa_private_key!,
    });
  };

  useEffect(() => {
    console.log("user card re-rendered");
  }, []);

  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: index * 0.3 } }}
      className="grid grid-cols-12 w-full min-h-[50px] px-1 py-3 font-[inter light]"
    >
      {/* avatar */}
      <div className="grid col-span-3">
        <img src={avatar} className="w-12" />
      </div>
      {/* name & email */}
      <div className="grid col-span-7">
        <span className="block text-black font-semibold dark:text-white text-start capitalize">
          {user.name}
        </span>
        <span className="text-zinc-600 dark:text-white text-start">
          {user.email}
        </span>
      </div>
      {/* envelope */}
      <div className="grid col-span-2 items-center justify-center">
        <motion.div
          className="w-8 h-8 flex justify-center items-center rounded-full border border-slate-300"
          whileHover={{
            scale: 1.2,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
            },
          }}
        >
          <img src={envelope} onClick={handleClick} className="w-4" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserCard;
