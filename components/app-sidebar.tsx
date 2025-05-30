"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Layers } from "lucide-react";
import { useTokenUser } from "@/hooks/useTokenUser";

const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    {
      title: "Projects",
      url: "/projects",
      icon: IconFolder,
    },
    {
      title: "Ideas",
      url: "/ideas",
      icon: IconChartBar,
      itemsSub: [
        {
          title: "Brainstorm idea",
          url: "/projects/brainstorm-idea",
          icon: IconFolder,
        },
        { title: "See your ideas", url: "/ideas", icon: IconFolder },
      ],
    },
    { title: "Teams", url: "/teams", icon: IconUsers },
    { title: "Analytics", url: "/analytics", icon: IconChartBar },
  ],
  navSecondary: [
    { title: "Settings", url: "/settings", icon: IconSettings },
    { title: "Help", url: "/help", icon: IconHelp },
    { title: "Search", url: "/search", icon: IconSearch },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading, error } = useTokenUser();
  const userFixed =
    user != null
      ? {
          userId: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar ?? "https://github.com/shadcn.png",
        }
      : { userId: "", name: "Guest", email: "", avatar: "" };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <Layers className="h-8 w-8" />
                <span className="text-base font-semibold">Pulse</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userFixed} />
      </SidebarFooter>
    </Sidebar>
  );
}
