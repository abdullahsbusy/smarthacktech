"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

/**
 * Mirrors the original static site's theme toggle: data-theme attribute
 * on <html>, persisted to localStorage under "ht-theme", dark by default.
 * The actual pre-paint application lives in <ThemeScript>; this hook just
 * keeps React state in sync with what's already on the DOM and exposes
 * a setter for the toggle button.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // Reads what <ThemeScript>'s pre-paint script already applied to the DOM.
    // Must stay an effect (not a useState lazy initializer): running this
    // during render would read `document` on the server too and desync the
    // SSR-rendered markup from the client's first paint, breaking hydration.
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(current === "light" ? "light" : "dark");
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ht-theme", next);
    } catch {
      // localStorage unavailable — theme still applies for this load
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", next === "light" ? "#eaf5fc" : "#021826");
    setThemeState(next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return { theme, setTheme, toggle };
}
