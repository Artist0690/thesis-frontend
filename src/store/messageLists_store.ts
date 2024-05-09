import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import { create } from "zustand";
import { produce } from "immer";
import { toast } from "sonner";

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
    set(
      produce((draft: Store) => {
        const previous_message_lists = draft.messageLists;
        const isMessage = previous_message_lists.filter(
          (msg) => msg._id == payload._id
        );

        // check whether message is present in message lists
        // try to prevent adding message multiple times
        if (!isMessage.length) {
          draft.messageLists = [...previous_message_lists, payload];
          return;
        } else {
          draft.messageLists = previous_message_lists;
        }
      })
    );
  },

  setMessageLists: (payload) => {
    set((state) => ({
      messageLists: payload,
    }));
  },
}));
