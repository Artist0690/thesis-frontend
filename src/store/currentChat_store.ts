import z from "zod";
import { create } from "zustand";
import { ChatSchema } from "../zod/chatSchema";

type ChatSchema = z.infer<typeof ChatSchema>;

type Chat = {
  currentChat: ChatSchema | null;
};

type Methods = {
  setCurrentChat: (payload: ChatSchema) => void;
};

type Store = Chat & Methods;

export const currentChat_store = create<Store>((set) => ({
  currentChat: null,
  setCurrentChat: (payload) => {
    set((state) => ({ currentChat: payload }));
  },
}));
