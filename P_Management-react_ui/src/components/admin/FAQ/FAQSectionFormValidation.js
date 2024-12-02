import { z } from 'zod'

export const faqformValidation = z.object({
 section_name: z.string().min(2),
 active: z.string(),
})