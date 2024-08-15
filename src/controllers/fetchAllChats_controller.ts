import z, { ZodError } from "zod";
import { ChatSchema } from "../types/chatSchema";
import { AxiosInstance } from "axios";

type Chat = z.infer<typeof ChatSchema>;

type Props = {
  setChatLists: (payload: Chat[]) => void;
  fetcher: AxiosInstance;
};

export const fetchAllChats_controller = async (payload: Props) => {
  const { setChatLists, fetcher } = payload;
  try {
    const response = fetcher.post("chats/get_all_chats");

    const chatLists = z.array(ChatSchema).parse((await response).data);
    setChatLists(chatLists);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("Chat list type mismatch", error.message);
    }

    console.log("Fail to load chats. Axios Error");
  }
};
