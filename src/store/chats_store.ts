import z from "zod";
import { ChatSchema } from "../zod/chatSchema";
import { create } from "zustand";
import { produce } from "immer";

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
  updateChat: (payload) => {
    set(
      produce((draft: Store) => {
        let chats = draft.chats.filter((chat) => chat._id == payload._id);
        draft.chats = [...chats, payload];
      })
    );
  },
}));
