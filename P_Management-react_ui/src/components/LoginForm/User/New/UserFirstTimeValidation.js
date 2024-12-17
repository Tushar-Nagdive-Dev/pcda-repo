import { z } from 'zod'

export const cdaAccountNoValidaton = z.object({
 cda_account_no: z
  .string()
  .min(7, { message: 'Must be minimum 7 characters CDA Account' }),
})
