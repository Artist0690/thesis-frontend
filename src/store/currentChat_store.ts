import z from "zod";
import { create, useStore } from "zustand";
import { ChatSchema } from "../zod/chatSchema";
import { produce } from "immer";

type ChatSchema = z.infer<typeof ChatSchema>;

type Chat = {
  currentChat: ChatSchema | null;
};

type Methods = {
  setCurrentChat: (payload: ChatSchema) => void;
  updateLatestMsg: (payload: { chatId: string; msgId: string }) => void;
};

type Store = Chat & Methods;

export const currentChat_store = create<Store>((set) => ({
  currentChat: null,
  setCurrentChat: (payload) => {
    set((state) => ({ currentChat: payload }));
  },
  updateLatestMsg: (payload) => {
    const { chatId, msgId } = payload;
    const currentChat: Chat | null = null;
    // update currentChat.latestMessage.id ⛔
    set(
      produce((draft: Store) => {
        if (draft.currentChat && draft.currentChat.latestMessage)
          draft.currentChat.latestMessage._id = msgId;
      })
    );
  },
}));
