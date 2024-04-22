import { create } from "zustand";
import z from "zod";

export const UserInfoSchema = z.object({
  accessToken: z.string().nullable(),
  _id: z.string().nullable(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  rsa_private_key: z.string().nullable(),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;

type Setter = {
  setUserInfo: (payload: Partial<UserInfo>) => void;
};

type Store = UserInfo & Setter;

export const userInfo_store = create<Store>((set) => ({
  accessToken: null,
  email: null,
  _id: null,
  name: null,
  rsa_private_key: null,
  setUserInfo: (payload: Partial<UserInfo>) =>
    set((state) => ({
      ...state,
      ...payload,
    })),
}));
