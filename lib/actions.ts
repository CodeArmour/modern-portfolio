'use server'

import { Resend } from 'resend'
import { env } from '@/env.mjs'
import { siteConfig } from './site-config'
import { ContactFormSchema } from './schema'

const resend = new Resend(env.RESEND_API_KEY)

export const sendEmailAction = async (values: ContactFormSchema) => {
  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: siteConfig.contact.email,
      subject: 'Message from contact form | Portfolio',
      replyTo: values.email,
      text: `email: ${values.email} \nmessage: ${values.message}`,
    })
    return {
      data: 'Email sent successfully!',
    }
  } catch {
    return {
      error: `Something went wrong!`,
    }
  }
}