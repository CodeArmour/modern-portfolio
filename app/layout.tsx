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
    "Hello, I'm Omar. I am a full stack developer from Belgium. I enjoy building sites and apps. My focus is React (Next.js).",
  generator: "Next.js",
  applicationName: "Omar Codes",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    title: "Omar Codes | Full Stack Developer",
    description:
      "Hello, I'm Omar. I am a full stack developer from Belgium. I enjoy building sites and apps. My focus is React (Next.js).",
    url: "https://modern-portfolio-red-alpha.vercel.app/",
    siteName: "Omar Codes",
    locale: "en_US",
    images: [
      {
        url: "https://modern-portfolio-red-alpha.vercel.app/logoicon.png",
        width: 1200,
        height: 630,
        alt: "Omar Codes | Full Stack Developer",
        type: "image/png",
      },
    ],
    type: "website",
  },
  other: {
    "fb:app_id": "",
    "og:image:secure_url":
      "https://modern-portfolio-red-alpha.vercel.app/logoicon.png",
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