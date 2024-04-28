import { produce } from "immer";
import { create } from "zustand";
import z from "zustand";

type Props = {
  isTyping: boolean;
};

type Action = {
  startTyping: () => void;
  stopTyping: () => void;
};

type Store = Props & Action;

export const socket_store = create<Store>((set) => ({
  isTyping: false,

  startTyping() {
    set((state) => ({ isTyping: true }));
  },

  stopTyping() {
    set((state) => ({ isTyping: false }));
  },
}));
