/**
 * @fileOverview Utility functions for the application.
 * Includes helper functions like `cn` for conditional class names.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, resolving Tailwind CSS conflicts.
 * @param {...ClassValue[]} inputs - Class names to combine.
 * @returns {string} A string of combined and merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
