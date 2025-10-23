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
    { url: "/logo.png", sizes: "any" },
    { url: "/logo.png", sizes: "192x192", type: "image/png" },
  ],
  shortcut: "/logo.png",
  apple: "/logo.png",
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
        url: "https://modern-portfolio-red-alpha.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Omar Codes | Full Stack Developer",
        type: "image/png",
      },
    ],
    type: "website",
  },
  other: {
    "fb:app_id": "", // Optional: add your Facebook App ID if available
    "og:image:secure_url":
      "https://modern-portfolio-red-alpha.vercel.app/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={cn("min-h-screen font-sans antialiased", fonts)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ActionSectionProvider>{children}</ActionSectionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
