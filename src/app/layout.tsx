import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM Para Vendedores de carro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <head />
        <body className="flex min-h-screen bg-zinc-900 text-zinc-100">
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">{children}</main>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
