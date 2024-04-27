import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainProvider from "@/providers/MainProvider";
import { Toaster } from "@/components/ui/toaster";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Template", // %s will be replaced with the page title
    default: "Template",
  },
  description: "A Sstraightforward NextJS Template Made by @OmarAfet",
  keywords: ["Template", "Keyword 2", "Keyword 3"],
  metadataBase: new URL("https://template.omarafet.vercel.app"),
  authors: { url: "https://github.com/OmarAfet", name: "OmarAfet" },
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        url: "/icon-dark.png",
        href: "/icon-dark.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/icon-light.png",
        href: "/icon-light.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body className={font.className}>
        <MainProvider>
          <div className="h-screen">{children}</div>
          <Toaster />
        </MainProvider>
      </body>
    </html>
  );
}
