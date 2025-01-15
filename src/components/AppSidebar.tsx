import { Calendar, Home, CircleHelp, ChartColumn } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Statistic", url: "/statistic", icon: ChartColumn },
    { title: "Schedule", url: "/schedule", icon: Calendar },
    { title: "Support", url: "/support", icon: CircleHelp },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>GRAC</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <div className="flex flex-row gap-2 items-center">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}