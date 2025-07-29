import z from 'zod'

const passwordSchema = z
  .string()
  .trim()
  .min(8, 'Must be at least 8 characters long')
  .refine(
    (val) => /[A-Z]/.test(val),
    'Must contain at least one uppercase letter',
  )
  .refine(
    (val) => /[a-z]/.test(val),
    'Must contain at least one lowercase letter',
  )
  .refine((val) => /[\d]/.test(val), 'Must contain at least one number')
  .refine(
    (val) => /[^A-Za-z\d]/.test(val),
    'Must contain at least one special character',
  )

export const userSchema = z.object({
  username: z.string().trim().nonempty('Cannot be empty'),
  password: passwordSchema,
})
