"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useEffect } from "react";

/** Key storing the user's raw 3-way intent: "light" | "dark" | "auto" */
export const INTENT_KEY = "stw-theme-intent";

/**
 * Resolve the current Sacramento (America/Los_Angeles) hour to a concrete
 * theme.  Daytime = 06:00–18:59 → light; everything else → dark.
 */
export function getSacramentoResolvedTheme(): "light" | "dark" {
  const hour = parseInt(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      hour12: false,
    }),
    10,
  );
  return hour >= 6 && hour < 19 ? "light" : "dark";
}

/**
 * Mounted inside NextThemesProvider.
 * When the user's intent is "auto" (or unset), it resolves the theme to
 * light/dark based on Sacramento clock time — not the OS preference.
 * Re-checks every 60 s so the switch happens live at 06:00 and 19:00.
 */
function SacramentoAutoTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    function applyIfAuto() {
      const intent = localStorage.getItem(INTENT_KEY);
      // null = first visit; treat as "auto"
      if (!intent || intent === "auto") {
        setTheme(getSacramentoResolvedTheme());
      }
    }

    applyIfAuto();
    const id = setInterval(applyIfAuto, 60_000);
    return () => clearInterval(id);
  }, [setTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="stw-theme"
      themes={["light", "dark"]}
    >
      <SacramentoAutoTheme />
      {children}
    </NextThemesProvider>
  );
}
