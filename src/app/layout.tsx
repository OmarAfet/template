import Providers from "@/providers";
import { cn } from "@/utils";
import type { Metadata } from "next";
import { Rubik as Font } from "next/font/google";
import "./globals.css";

const font = Font({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Title",
  description: "Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={cn("antialiased flex", font.className)}>
        <Providers>
          <div className="size-full *:size-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
