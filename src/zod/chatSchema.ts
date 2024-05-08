import z, { boolean } from "zod";
import { UserSchema } from "./userSchema";

export const MessageSchema = z.object({
  _id: z.string(),
  sender: UserSchema,
  content: z.string(),
  chat: z.string(),
  readBy: z.boolean(),
});

const UserArray = z.object({
  userInfo: UserSchema,
  passphrase: z.string(),
});

export const ChatSchema = z.object({
  _id: z.string(),
  chatName: z.string(),
  isGroupChat: z.boolean(),
  users: z.array(UserArray),
  latestMessage: MessageSchema.nullable(),
  // groupAdmin: UserSchema,
});
