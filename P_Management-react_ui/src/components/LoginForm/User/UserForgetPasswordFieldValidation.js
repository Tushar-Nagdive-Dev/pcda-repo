import { z } from "zod";

export const ForgetPasswordValidation = z.object({
    userid: z.string().min(2).max(50),
    captcha: z.string().min(6)
});
