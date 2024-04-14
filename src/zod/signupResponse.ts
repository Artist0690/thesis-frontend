import z from "zod";

export const signupResponseSchema = z.object({
  name: z.string(),
  email: z.string(),
  id: z.string(),
});
