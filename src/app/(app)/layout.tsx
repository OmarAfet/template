import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={"flex min-h-screen flex-col antialiased"}>
      <Header />
      <main className="container flex-1 p-6">{children}</main>
      <Footer />
    </div>
  );
}
