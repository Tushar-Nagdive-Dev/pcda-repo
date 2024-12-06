import { z } from 'zod'

export const NewsandNotificationValidation = z.object({
 title: z.string().min(5),
 title_hindi: z.string().min(5),
 url: z.string(),
 status: z.string(),
 type: z.string(),
 isNew: z.boolean(),
 order: z.string(),
})
