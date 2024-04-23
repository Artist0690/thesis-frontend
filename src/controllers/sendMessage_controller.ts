import z from "zod";
import { axiosPrivate } from "../api/axios";
import { toast } from "sonner";
import { MessageSchema } from "../zod/chatSchema";

type Props = {
  chatId: string;
  content: string;
  // updateChatLists: () => void
};

export const sendMessage_controller = async (payload: Props) => {
  axiosPrivate
    .post("messages/send", payload)
    .then((response) => {
      //
      const checkMessage = MessageSchema.safeParse(response.data);
      if (!checkMessage.success) {
        console.log("Message Type Mismatch!");
        return;
      }
      const message = checkMessage.data.content;
      toast.info(message);
    })
    .catch((err) => {
      toast.error("Failed to send message!");
    });
};
