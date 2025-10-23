"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { Button } from "./ui/button";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormSchema } from "@/lib/schema";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { ErrorLine } from "./ui/error-line";
import { Textarea } from "./ui/textarea";
import { Icons } from "./icons";
import { useSectionInView } from "@/hooks/use-section-in-view";

export default function ContactSection() {
  const { ref } = useSectionInView("Contact");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormSchema>({ 
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (values: ContactFormSchema) => {
    try {
      // محاكاة إرسال البيانات
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Form values:', values)
      toast.success('Message sent successfully!')
      reset()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="my-10 w-full scroll-mt-28 md:mb-20"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading
        heading="Get In Touch"
        content={
          <>
            Please contact me directly at{" "}
            <Button
              variant="link"
              className="text-muted-foreground hover:text-foreground h-fit p-0 font-medium underline transition-colors"
              asChild
            >
              <Link href={siteConfig.links.mailTo}>
                {siteConfig.contact.email}
              </Link>
            </Button>{" "}
            or through this form.
          </>
        }
      />
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-5"
      >
        <div className="w-full max-w-xl">
          <Label
            htmlFor="email"
            className={cn("mb-2", errors.email?.message && 'text-destructive')}
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="hello@gmail.com"
            {...register('email')}
            className={cn(errors.email?.message && 'border-destructive')}
            disabled={isSubmitting}
          />
          <ErrorLine message={errors.email?.message} />
        </div>
        
        <div className="w-full max-w-xl">
          <Label
            htmlFor="message"
            className={cn("mb-2", errors.message?.message && 'text-destructive')}
          >
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Hello! What's up?"
            {...register('message')}
            className={cn(errors.message?.message && 'border-destructive')}
            disabled={isSubmitting}
          />
          <ErrorLine message={errors.message?.message} />
        </div>
        
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              Sending... <Icons.loadComponents className="ml-2 size-4 animate-spin" />
            </>
          ) : (
            <>
              Submit <Icons.arrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>
      </form>
    </motion.section>
  );
}