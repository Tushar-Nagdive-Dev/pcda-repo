import { z } from "zod";

export const FAQValidation = z.object({
 question: z.string().min(5),
 answer: z.string().min(5),
 wing: z.string({ required_error: "Please select a wing"}),
 section: z.string({ required_error: "Please select a section" }),
 active: z.boolean().nullable(),
});
