import z from 'zod'

export const contactFormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>