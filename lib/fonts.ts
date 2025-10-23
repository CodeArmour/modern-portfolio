import { Bricolage_Grotesque, Darker_Grotesque } from "next/font/google";

export const fontSans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontHeading = Darker_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const fonts = [fontSans.variable, fontHeading.variable];