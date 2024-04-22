import z from "zod";
import { ChatSchema } from "../zod/chatSchema";
import { axiosPrivate } from "../api/axios";
import { AxiosInstance } from "axios";

type Chat = z.infer<typeof ChatSchema>;

type Props = {
  setChatLists: (payload: Chat[]) => void;
  fetcher: AxiosInstance;
};

export const fetchAllChats_controller = async (payload: Props) => {
  const { setChatLists, fetcher } = payload;
  fetcher
    .post("chats/get_all_chats")
    .then((response) => {
      console.log(response.data);
      const check_chatLists = z.array(ChatSchema).safeParse(response.data);
      if (!check_chatLists.success) {
        console.log("Chat Lists Type Mismatch!");
        console.log("ChatList Type error:", check_chatLists.error);
        return;
      }
      const chatLists = check_chatLists.data;
      setChatLists(chatLists);
    })
    .catch((error) => {
      console.log(error);
    });
};
