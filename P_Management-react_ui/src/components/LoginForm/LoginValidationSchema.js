import { z } from "zod";

export const LoginValidation = z.object({
  userid: z.string().nonempty("User ID is required"),
  password: z.string().nonempty("Password is required"),
  captcha: z.string().nonempty("Captcha is required"), // Add captcha validation
});
