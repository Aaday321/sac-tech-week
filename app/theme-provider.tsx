"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * next-themes: syncs with system preference, persists to localStorage,
 * and applies the `dark` class on <html> when resolved theme is dark.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="stw-theme"
      themes={["light", "dark"]}
    >
      {children}
    </NextThemesProvider>
  );
}
