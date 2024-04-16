import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import MainProvider from "@/providers/MainProvider";
import { Toaster } from "@/components/ui/toaster";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Title",
    default: "Title",
  },
  description: "Description",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body className={`${font.className} flex h-screen flex-col antialiased`}>
        <MainProvider>
          <Header />
          <main className="container my-8 flex-1 md:my-16">{children}</main>
          <Footer />
          <Toaster />
        </MainProvider>
      </body>
    </html>
  );
}
