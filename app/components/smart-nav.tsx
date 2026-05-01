"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "./nav-bar";

export function SmartNav() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <NavBar />;
}
