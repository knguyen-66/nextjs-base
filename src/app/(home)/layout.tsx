"use client"

import { GlobalContextProvider } from "@/context/GlobalContextProvider";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <GlobalContextProvider>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-screen">
                    <AppHeader />
                    <div className="w-full h-auto p-5 overflow-y-auto">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </GlobalContextProvider>
    )
}