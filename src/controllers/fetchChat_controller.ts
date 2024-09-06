import z, { ZodError } from "zod";
import { ChatSchema } from "../types/chatSchema";
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

    console.log("chat data", response.data);
    const chat = ChatSchema.parse(response.data);

    addToChatLists(chat);
    setCurrentChat(chat);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("Chat type error from fetchat_controller:::", error.message);
      toast(
        `Chat Type Mismatch from fetchChat_controller::: ${JSON.stringify(
          error.message
        )}`,
        {
          position: "top-center",
        }
      );
      return;
    }
    console.log(error);
  }
};
