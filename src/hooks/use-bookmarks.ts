
"use client";
/**
 * @fileOverview Custom hook `useBookmarks`.
 * Provides easy access to the BookmarkContext, allowing components
 * to interact with bookmark state and functions.
 */
import { useContext } from 'react';
import { BookmarkContext } from '@/providers/bookmark-provider';

/**
 * Custom hook to access the BookmarkContext.
 * @returns {BookmarkContextType} The bookmark context value.
 * @throws {Error} If used outside of a BookmarkProvider.
 */
export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
