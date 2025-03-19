import { AppSidebar } from "@/components/common/Sidebar/AppSidebar";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
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
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 p-6 min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
