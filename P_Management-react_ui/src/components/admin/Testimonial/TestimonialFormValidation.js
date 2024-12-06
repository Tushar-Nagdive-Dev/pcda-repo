import { z } from 'zod'

// export const TestimonialValidation = z.object({
//  name: z.string().min(5),
//  position: z.string(),
//  testimonial_brief: z.string(),
//  isActive: z.boolean(),
//  status: z.string(),
// })

export const TestimonialValidation = z.object({
    profile_picture: z
      .any()
      .optional(), // File is optional
    name: z.string().min(1, "Name is required"),
    position: z.string().min(1, "Position is required"),
    testimonial_brief: z.string().min(1, "Testimonial brief is required"),
    status: z.enum(["Active", "In-Active"], "Status is required"),
    new: z.boolean(),
  });
