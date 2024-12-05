import { z } from 'zod'

export const TestimonialValidation = z.object({
 imageId: z.string(),
 name: z.string().min(5),
 position: z.string(),
 testimonial_brief: z.string(),
 isActive: z.boolean(),
 status: z.string(),
})
