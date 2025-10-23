import type { Metadata } from "next";
import "./globals.css";
import { fonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { ActionSectionProvider } from "@/components/context/active-section-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://modern-portfolio-red-alpha.vercel.app"),
  title: "Omar Codes | Full Stack Developer",
  description:
    "Hello, I'm Omar. I am a full stack developer In Belgium. I enjoy building sites and apps. My focus is React (Next.js).",
  generator: "Next.js",
  applicationName: "Omar Codes",
  openGraph: {
    title: "Omar Codes | Full Stack Developer",
    description:
      "Hello, I'm Omar. I am a full stack developer In Belgium. I enjoy building sites and apps. My focus is React (Next.js).",
    url: "https://modern-portfolio-red-alpha.vercel.app/",
    siteName: "Omar Codes",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png", // Changed from logoicon.png
        width: 1200,
        height: 630,
        alt: "Omar Codes | Full Stack Developer",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Codes | Full Stack Developer",
    description:
      "Hello, I'm Omar. I am a full stack developer In Belgium. I enjoy building sites and apps. My focus is React (Next.js).",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans antialiased", fonts)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ActionSectionProvider>{children}</ActionSectionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}