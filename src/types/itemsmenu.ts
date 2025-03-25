// sidebar-items.ts
import { LayoutDashboard, UsersIcon, DollarSignIcon } from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/Dashboard",
  },
  {
    title: "Clientes",
    icon: UsersIcon,
    href: "/clientes",
  },
  {
    title: "Vendas",
    icon: DollarSignIcon,
    href: "/vendas",
  },
];
