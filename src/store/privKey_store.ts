import { create } from "zustand";

type Store = {
  prvKey: string;
  setPrvKey: (key: string) => void;
};

export const prvKey_store = create<Store>((set) => ({
  prvKey: "",
  setPrvKey: (key: string) => {
    set((state) => ({
      ...state,
      prvKey: key,
    }));
  },
}));
