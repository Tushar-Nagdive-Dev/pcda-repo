import { z } from "zod";

export const otpValidation = z.object({
    otp: z.string().min(6)
});
