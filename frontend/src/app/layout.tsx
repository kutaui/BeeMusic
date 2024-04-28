import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { __DEV__ } from "@apollo/client/utilities/globals";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
export const metadata: Metadata = {
  title: "BeeMusic",
  description: "Share your music with the world",
  icons: { icon: "/icons/bee-icon.png" },
authors: [
		{
			name: 'kutaui',
			url: 'https://kutay.boo',
		},
		{
			name: 'kutay bekleric',
			url: 'https://kutaybekleric.com',
		},
	],
  keywords: [
    "music",
    "sharing",
    "social",
    "kutaui",
    "kutay",
    "bee music",
    "beemusic",
    "nextjs",
    "graphql",
  ],
  creator: "kutaui",
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

