import { z } from 'zod'

export const GalleryFormValidation = z.object({
 event_name: z.string(),
 type: z.string(),
 active: z.boolean(),
 gallery: z.array(
  z.object({
   image: z.any().nullable(), // Allows `null` for image
  }),
 ).nonempty('Gallery must have at least one item'), // Ensures the array is not empty
 year: z.number()
})
