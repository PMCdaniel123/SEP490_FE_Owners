"use client";

import { SidebarItemProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function SidebarItem({
  icon: Icon,
  label,
  href,
  collapsed,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <Link
      href={href}
      className={`flex text-sm items-center gap-2 px-4 py-4 rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-gradient-to-r from-primary to-secondary text-white"
          : "text-fourth hover:bg-primary hover:text-white"
      }`}
    >
      <Icon className="w-5 h-5" />
      <motion.span
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className={`font-medium ${collapsed ? "hidden" : "block"}`}
      >
        {label}
      </motion.span>
    </Link>
  );
}
