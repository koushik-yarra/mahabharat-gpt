
"use client";
/**
 * @fileOverview Custom hook `useTextSize`.
 * Provides easy access to the TextSizeContext, allowing components
 * to interact with text size state and functions.
 */
import { useContext } from 'react';
import { TextSizeContext } from '@/providers/text-size-provider';

/**
 * Custom hook to access the TextSizeContext.
 * @returns {TextSizeContextType} The text size context value.
 * @throws {Error} If used outside of a TextSizeProvider.
 */
export function useTextSize() {
  const context = useContext(TextSizeContext);
  if (context === undefined) {
    throw new Error('useTextSize must be used within a TextSizeProvider');
  }
  return context;
}
