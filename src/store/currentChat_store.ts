import z from "zod";
import { create, useStore } from "zustand";
import { ChatSchema } from "../types/chatSchema";
import { produce } from "immer";
import { PassphraseSchema } from "../types/passphrase";
import { decrypt_RSA_cipher } from "../crypto/RSA/rsa_crypto";

type ChatSchema = z.infer<typeof ChatSchema>;

type Passphrase = z.infer<typeof PassphraseSchema>;

type Chat = {
  currentChat: ChatSchema | null;
  passphrase: Passphrase;
};

type Methods = {
  setCurrentChat: (payload: ChatSchema) => void;
  resetCurrentChat: () => void;
  updateLatestMsg: (payload: { chatId: string; msgId: string }) => void;
  setPassphrase: (payload: {
    privateKey: string;
    currentUserId: string;
  }) => void;
};

type Store = Chat & Methods;

export const currentChat_store = create<Store>((set) => ({
  currentChat: null,
  setCurrentChat: (payload) => {
    set((state) => ({ currentChat: payload }));
  },

  resetCurrentChat() {
    set((state) => ({ currentChat: null }));
  },

  passphrase: null,

  setPassphrase(payload) {
    const { privateKey, currentUserId } = payload;
    set(
      produce((draft: Store) => {
        // FIXME: encrypt passphrase and set passphrase

        if (draft.currentChat) {
          // retrieve associated passphrase
          const userInfoArr = draft.currentChat.users;
          // filter current user
          const currentUser = userInfoArr.filter(
            (user) => user.userInfo._id == currentUserId
          )[0];
          const encrypted_passphrase = currentUser.passphrase;
          const passphrase = decrypt_RSA_cipher(
            encrypted_passphrase,
            privateKey
          );
          draft.passphrase = passphrase;
          console.warn("passphrase", draft.passphrase);
        }
      })
    );
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
