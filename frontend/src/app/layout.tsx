import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "BeeMusic",
  description: "Share your music with the world",
  icons: { icon: "/icons/bee-icon.png" },
  authors: [
    {
      name: "Kutaui",
      url: "https://www.kutaybekleric.com/",
    },
  ],
  keywords: [
    "music",
    "sharing",
    "social",
    "media",
    "bee",
    "bee music",
    "beemusic",
    "nextjs",
    "graphql",
  ],
  creator: "Kutaui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className=" mx-auto">
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
