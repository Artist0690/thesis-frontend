import z from "zod";
import { ChatSchema } from "../types/chatSchema";
import { create } from "zustand";
import { produce } from "immer";
import { toast } from "sonner";

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

  // fetch all chats and set to global state
  setAllChats: (payload) => {
    set((state) => ({ chats: [...payload] }));
  },

  // add a single chat to global chat arrays
  updateChat: (payload) => {
    set(
      produce((draft: Store) => {
        const prvChats = draft.chats.filter((chat) => chat._id !== payload._id);
        draft.chats = [...prvChats, payload];
      })
    );
  },
}));
