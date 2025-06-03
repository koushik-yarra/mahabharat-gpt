
"use client";
/**
 * @fileOverview BookmarkProvider component and context.
 * Manages the state of bookmarked verses, allowing users to add, remove,
 * and check the bookmark status of verses. Bookmarks are persisted
 * to localStorage.
 */
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { LOCAL_STORAGE_BOOKMARKS_KEY } from '@/lib/constants';
import type { Verse } from '@/lib/types';

/**
 * Interface for the BookmarkContext.
 */
interface BookmarkContextType {
  bookmarks: Verse[];
  addBookmark: (verseData: { query: string, verses: string }) => void;
  removeBookmark: (verseId: string) => void;
  isBookmarked: (verseId: string) => boolean; 
  generateVerseId: (query: string, verses: string) => string;
}

export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

/**
 * Generates a consistent ID for a verse based on its query and content.
 * This is a simple hash function and not cryptographically secure, intended for UI uniqueness.
 * @param {string} query - The user query associated with the verse.
 * @param {string} verses - The text content of the verse.
 * @returns {string} A string hash representing the verse ID.
 */
const generateVerseId = (query: string, verses: string): string => {
  let hash = 0;
  const str = query + verses;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

/**
 * BookmarkProvider component.
 * Provides bookmark state and management functions to its children via context.
 * Handles persistence of bookmarks to localStorage.
 * @param {Readonly<{ children: ReactNode }>} props - The props for the component.
 * @param {ReactNode} props.children - The child components to be wrapped by this provider.
 * @returns {JSX.Element} The BookmarkContext.Provider wrapping its children.
 */
export function BookmarkProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [bookmarks, setBookmarks] = useState<Verse[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedBookmarks = localStorage.getItem(LOCAL_STORAGE_BOOKMARKS_KEY);
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
       console.warn("Failed to access localStorage for bookmarks:", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(LOCAL_STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarks));
      } catch (error) {
        console.warn("Failed to save bookmarks to localStorage:", error);
      }
    }
  }, [bookmarks, isMounted]);

  const addBookmark = useCallback((verseData: { query: string, verses: string }) => {
    const newBookmark: Verse = {
      id: generateVerseId(verseData.query, verseData.verses),
      query: verseData.query,
      verses: verseData.verses,
      bookmarkedAt: new Date().toISOString(),
    };
    setBookmarks(prev => {
      if (prev.find(b => b.id === newBookmark.id)) {
        return prev; 
      }
      return [newBookmark, ...prev];
    });
  }, []);

  const removeBookmark = useCallback((verseId: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== verseId));
  }, []);

  const isBookmarked = useCallback((verseId: string) => {
    return bookmarks.some(bookmark => bookmark.id === verseId);
  }, [bookmarks]);
  
  const value = useMemo(() => ({
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    generateVerseId, 
  }), [bookmarks, addBookmark, removeBookmark, isBookmarked]);

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}
