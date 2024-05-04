import z from "zod";
import { ChatSchema } from "../zod/chatSchema";
import { AxiosInstance } from "axios";
import { toast } from "sonner";

type Chat = z.infer<typeof ChatSchema>;

type Params = {
  chatMateId: string;
  fetcher: AxiosInstance;
  setCurrentChat: (payload: Chat) => void;
  addToChatLists: (payload: Chat) => void;
};

export const fetchChat_controller = async (params: Params) => {
  const { addToChatLists, fetcher, setCurrentChat, chatMateId } = params;

  try {
    const response = await fetcher.post("chats/chat", { chatMateId });

    const chat = ChatSchema.safeParse(response.data);
    if (!chat.success) {
      toast.error("chat type mismatch", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    setCurrentChat(chat.data);
  } catch (error) {
    console.log(error);
  }
};
