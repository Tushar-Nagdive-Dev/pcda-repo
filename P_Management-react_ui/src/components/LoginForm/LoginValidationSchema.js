import { z } from "zod";

export const LoginValidation = z.object({
  userid: z.string().min(2).max(50),
  password: z.string().min(4),
  captcha: z.string().min(6)
});
