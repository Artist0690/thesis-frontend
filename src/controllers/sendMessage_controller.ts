import z from "zod";
import { toast } from "sonner";
import { MessageSchema } from "../zod/chatSchema";
import { AxiosInstance } from "axios";
import { Socket } from "socket.io-client";

type Message = z.infer<typeof MessageSchema>;

type Props = {
  chatId: string;
  content: string;
  receiver: string;
  addMessage: (payload: Message) => void;
  updateLatestMsg: (payload: { chatId: string; msgId: string }) => void;
  fetcher: AxiosInstance;
  socket: Socket;
};

export const sendMessage_controller = async (props: Props) => {
  const {
    updateLatestMsg,
    addMessage,
    chatId,
    content,
    fetcher,
    socket,
    receiver,
  } = props;

  fetcher
    .post("messages/send", { chatId, content })
    .then((response) => {
      //
      const checkMessage = MessageSchema.safeParse(response.data);
      if (!checkMessage.success) {
        console.log("Message Type Mismatch!", checkMessage.error);
        return;
      }
      const { _id: newMsgId, chat } = checkMessage.data;

      // TODO: update latestMessage of current chat & chat lists

      console.log("Trying to update latest message id");
      updateLatestMsg({ chatId: chat, msgId: newMsgId });

      // TODO: add new message to local state

      console.log("Trying to update msg lists: ");
      addMessage(checkMessage.data);
      // TODO: emit socket event

      socket.emit("chat", { ...checkMessage.data, receiver });

      // TODO: listen test event
      socket.on("test", (data: string) => {
        toast.success(data, { position: "top-right", duration: 2000 });
      });
    })
    .catch((err) => {
      toast.error("Failed to send message!");
    });
};
