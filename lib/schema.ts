import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
   message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be between 10 and 5000 characters')
    .max(5000, 'Message must be between 10 and 5000 characters'),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;