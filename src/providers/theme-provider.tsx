
"use client";
/**
 * @fileOverview ThemeProvider component.
 * Wraps the application with `next-themes` ThemeProvider to enable
 * light/dark/system theme switching.
 */
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

/**
 * ThemeProvider component.
 * Configures and provides theme context to the application using `next-themes`.
 * @param {ThemeProviderProps} props - Props for the NextThemesProvider.
 * @returns {JSX.Element} The NextThemesProvider wrapping its children.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
