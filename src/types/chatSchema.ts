import { z } from "zod";
import { UserSchema } from "./userSchema";

export const MessageSchema = z.object({
  _id: z.string(),
  sender: UserSchema,
  content: z.string(),
  chat: z.string(),
});

export const ChatSchema = z.object({
  _id: z.string(),
  users: z.array(
    z.object({
      userInfo: UserSchema,
      _id: z.string(),
      passphrase: z.string(),
    })
  ),
  latestMessage: MessageSchema.nullable(),
});
