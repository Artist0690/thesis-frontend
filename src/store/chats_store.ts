import z from "zod";
import { ChatSchema } from "../zod/chatSchema";
import { create } from "zustand";

type Chat = z.infer<typeof ChatSchema>;

type Attributes = {
  chats: Chat[];
};

type Methods = {
  setAllChats: (payload: Chat[]) => void;
  updateChat: (payload: Chat) => void;
};

type Store = Attributes & Methods;

export const chats_store = create<Store>((set) => ({
  chats: [],
  setAllChats: (payload) => {
    set((state) => ({ chats: [...payload] }));
  },
  updateChat: (payload) => {},
}));
