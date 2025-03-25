import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { sidebarItems } from "@/types/itemsmenu";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";


export function AppSidebar(){
    return(
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xl font-black">CRM Veículos</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <SidebarMenuItem key={item.title} className="p-1 ml-4 text-lg text-gray-900">
                                <Link href={item.href} className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    <span>{item.title}</span>
                                </Link>
                                </SidebarMenuItem>
                            );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </SidebarFooter>
        </Sidebar>
    )
}