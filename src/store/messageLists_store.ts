import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { create } from "zustand";

type MessageSchema = z.infer<typeof MessageSchema>;

type Attribute = {
  messageLists: MessageSchema[];
};

type Action = {
  addMessage: (payload: MessageSchema) => void;
  setMessageLists: (payload: MessageSchema[]) => void;
};

type Store = Attribute & Action;

export const messageLists_store = create<Store>((set) => ({
  messageLists: [],
  addMessage: (payload) => {
    set((state) => ({
      messageLists: [...state.messageLists, payload],
    }));
  },

  setMessageLists: (payload) => {
    set((state) => ({
      messageLists: payload,
    }));
  },
}));
