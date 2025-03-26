// sidebar-items.ts
import { LayoutDashboard, UsersIcon, DollarSignIcon, Car, Book, CheckCheckIcon, Phone, HeadsetIcon } from "lucide-react";


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
  {
    title: "Veículos",
    icon: Car,
    href: "/veiculos"
  },
  {
    title: "Notas",
    icon: Book,
    href: "/notas"
  },
  {
    title: "Tarefas",
    icon: CheckCheckIcon,
    href: "/tarefas"
  },
  {
    title: "Ligações",
    icon: Phone,
    href: "/ligacoes"
  },
  {
    title: "Vendedores",
    icon: HeadsetIcon,
    href: "/vendedores",
  },
];
