import { ThemeProvider } from "./ThemeProvider"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  )
}
