import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayakrishna Solutions | Learning Studio",
  description: "Live learning for markets, software and professional skills.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
