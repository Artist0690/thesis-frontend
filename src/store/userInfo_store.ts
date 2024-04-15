import { create } from "zustand";

type UserInfo = {
  name: string | null;
  email: string | null;
  id: string | null;
  accessToken: string | null;
  rsa_private_key: string | null;
};

type Setter = {
  setUserInfo: (payload: Partial<UserInfo>) => void;
};

type Store = UserInfo & Setter;

export const userInfo_store = create<Store>((set) => ({
  accessToken: null,
  email: null,
  id: null,
  name: null,
  rsa_private_key: null,
  setUserInfo: (payload: Partial<UserInfo>) =>
    set((state) => ({
      ...state,
      ...payload,
    })),
}));
