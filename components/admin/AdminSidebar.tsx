"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  Clock,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { Store } from "lucide-react";

// Primary menu
const menu = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    icon: ShoppingBag,
    children: [
      { label: "All Products", url: "/admin/products" },
      { label: "Add Product", url: "/admin/products/create" },
    ],
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: Package,
  },
  {
    title: "Fulfillment",
    url: "/admin/fulfillment",
    icon: Package,
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: Users,
  },
  {
    title: "Reviews",
    url: "/admin/reviews",
    icon: MessageSquare,
  },
  {
    title: "Store",
    url: "/admin/store",
    icon: Store,
  },
  {
    title: "Deals of the Day",
    url: "/admin/deals",
    icon: Clock,
  },
];

const otherItems = [
  { title: "Settings", url: "/admin/settings", icon: Settings },
  { title: "Logout", url: "#", icon: LogOut },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const { isStoreSetup } = useStore();

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Sidebar
      collapsible="icon"
      className={`w-72 group-data-[collapsible=icon]:w-20 flex-shrink-0 ${
        !isStoreSetup ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <SidebarContent>
        {/* HEADER */}
        <SidebarHeader className="px-4 py-4 text-xl font-bold flex-row justify-between items-center">
          <div className="group-data-[collapsible=icon]:hidden">L090</div>

          <div className="hidden group-data-[collapsible=icon]:block">
            <SidebarRail className="bg-transparent hover:bg-transparent rounded-r " />
            L
          </div>
          <SidebarTrigger className=" group-data-[collapsible=icon]:hidden" />
        </SidebarHeader>

        {/* MENU */}
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            MENU
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* Items with children → collapsible */}
                  {item.children ? (
                    <>
                      {/* Parent button */}
                      <button
                        onClick={() => toggleSection(item.title)}
                        className="
                          w-full flex items-center gap-2 px-2 py-2 
                          hover:bg-sidebar-accent rounded-md transition
                          group-data-[collapsible=icon]:justify-center
                          group-data-[collapsible=icon]:px-0
                        "
                      >
                        <item.icon size={18} />

                        {/* Hide text when collapsed */}
                        <span className="text-sm group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>

                        {/* Collapse chevron: hide when collapsed */}
                        <ChevronDown
                          size={16}
                          className={`
                            ml-auto transition-transform 
                            ${openSections[item.title] ? "rotate-180" : ""}
                            group-data-[collapsible=icon]:hidden
                          `}
                        />
                      </button>

                      {/* Submenu items */}
                      {openSections[item.title] && (
                        <div
                          className="
                            ml-8 mt-1 flex flex-col gap-1
                            group-data-[collapsible=icon]:ml-0
                          "
                        >
                          {item.children.map((sub) => (
                            <Link
                              key={sub.url}
                              href={sub.url}
                              className={`
                                text-sm px-2 py-1 rounded 
                                hover:bg-sidebar-accent
                                group-data-[collapsible=icon]:hidden
                                ${
                                  pathname === sub.url
                                    ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                                    : "text-sidebar-foreground"
                                }
                              `}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                      className="
                        group-data-[collapsible=icon]:justify-center
                        group-data-[collapsible=icon]:px-0
                      "
                    >
                      <Link href={item.url}>
                        <item.icon size={18} />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* OTHER SECTION */}
        <SidebarGroup className="mt-10">
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            OTHER
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="
                      group-data-[collapsible=icon]:justify-center
                      group-data-[collapsible=icon]:px-0
                    "
                  >
                    <Link href={item.url}>
                      <item.icon size={18} />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 text-center text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
        © 2025 L090
      </SidebarFooter>
    </Sidebar>
  );
}
