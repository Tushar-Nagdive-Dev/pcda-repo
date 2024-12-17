import { z } from 'zod'

export const NewsandNotificationValidation = z.object({
 title: z.string().min(5),
 title_hindi: z.string().min(5),
 status: z.string(),
 order: z.number(),
 wing: z.string(),
})
