import z from "zod";
import { UserSchema } from "./userSchema";

export const MessageSchema = z.object({
  _id: z.string(),
  sender: UserSchema,
  content: z.string(),
  chat: z.string(),
  readBy: z.string(),
});

const Passphrase = z.object({ passphrase: z.string() });
const UserArray = z.object({
  id: UserSchema.merge(Passphrase),
});

export const ChatSchema = z.object({
  _id: z.string(),
  chatName: z.string(),
  isGroupChat: z.boolean(),
  users: z.array(UserArray),
  latestMessage: MessageSchema,
  groupAdmin: UserSchema,
});
