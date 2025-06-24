import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { AppSidebar } from "@/components/common/Sidebar/AppSidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 min-h-screen">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
