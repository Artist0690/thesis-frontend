import z from "zod";
import { ChatSchema, MessageSchema } from "../zod/chatSchema";

type Chat = z.infer<typeof ChatSchema>;
type Message = z.infer<typeof MessageSchema>;

type Props = {
  chats: Chat[];
  message: Message;
  currentUserId: string;
};

export const getChatMateInfo = (props: Props) => {
  const { chats, currentUserId, message } = props;
  const currentChat = chats.filter((chat) => chat._id == message.chat)[0];
  const chatMate = currentChat.users.filter(
    (user) => user.userInfo._id !== currentUserId
  );

  return chatMate[0];
};
