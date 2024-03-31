import { create } from "zustand";

type Store = {
  accessToken: string | null;
  setAccessToken: (payload: string) => void;
};

export const accessToken_store = create<Store>((set) => ({
  accessToken: null,
  setAccessToken: (payload: string) =>
    set((state) => ({
      ...state,
      accessToken: payload,
    })),
}));
