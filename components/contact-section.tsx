"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { Button } from "./ui/button";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Icons } from "./icons";
import { useSectionInView } from "@/hooks/use-section-in-view";
import apiClient from "@/lib/apiClient";
import {
  Form as UIForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be between 10 and 5000 characters")
    .max(5000, "Message must be between 10 and 5000 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Custom validation resolver
const customResolver = async (values: unknown) => {
  try {
    const validatedData = contactFormSchema.parse(values);
    return { values: validatedData, errors: {} };
  } catch (error: unknown) {
    const errors: Record<string, { type: string; message: string }> = {};
    if (error instanceof z.ZodError) {
      error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string") {
          errors[path] = {
            type: "manual",
            message: issue.message,
          };
        }
      });
    }
    return { values: {}, errors };
  }
};

export default function ContactSection() {
  const { ref } = useSectionInView("Contact");

  const form = useForm<ContactFormValues>({
    resolver: customResolver,
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    shouldFocusError: false,
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await apiClient.post("/portfolio/message/create", {
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });

      toast.success("Message sent successfully!");
      form.reset();
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      const errorMessage =
        error instanceof Error && "response" in error
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? (error as any).response?.data?.message ||
            "Failed to send message. Please try again."
          : "Failed to send message. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="my-10 w-full scroll-mt-28 md:mb-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
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

      <UIForm {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full max-w-xl">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className="rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full max-w-xl">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="hello@gmail.com"
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className="rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full max-w-xl">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Hello! What's up?"
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className="rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="rounded-lg"
          >
            {form.formState.isSubmitting ? (
              <>
                Sending...{" "}
                <Icons.loadComponents className="ml-2 size-4 animate-spin" />
              </>
            ) : (
              <>
                Submit <Icons.arrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </form>
      </UIForm>
    </motion.section>
  );
}