import z from "zod";
import { axiosPrivate } from "../api/axios";
import { toast } from "sonner";
import { MessageSchema } from "../zod/chatSchema";
import { messageLists_store } from "../store/messageLists_store";
import { currentChat_store } from "../store/currentChat_store";
import { log } from "console";
import { AxiosInstance } from "axios";

type Message = z.infer<typeof MessageSchema>;

type Props = {
  chatId: string;
  content: string;
  addMessage: (payload: Message) => void;
  updateLatestMsg: (payload: { chatId: string; msgId: string }) => void;
  fetcher: AxiosInstance;
};

export const sendMessage_controller = async (props: Props) => {
  const { updateLatestMsg, addMessage, chatId, content, fetcher } = props;

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
      // --------------------------------------------------
      // |update latestMessage of current chat & chat lists ⛔
      // --------------------------------------------------
      console.log("Trying to update latest message id");
      updateLatestMsg({ chatId: chat, msgId: newMsgId });
      // -------------------------------
      // |add new message to local state
      // -------------------------------
      console.log("Trying to update msg lists: ");
      addMessage(checkMessage.data);
    })
    .catch((err) => {
      toast.error("Failed to send message!");
    });
};
