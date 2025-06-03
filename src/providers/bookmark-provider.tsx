"use client";
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { LOCAL_STORAGE_BOOKMARKS_KEY } from '@/lib/constants';
import type { Verse } from '@/lib/types';

interface BookmarkContextType {
  bookmarks: Verse[];
  addBookmark: (verseData: { query: string, verses: string }) => void;
  removeBookmark: (verseId: string) => void;
  isBookmarked: (verseId: string) => boolean; 
  generateVerseId: (query: string, verses: string) => string;
}

export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const generateVerseId = (query: string, verses: string): string => {
  let hash = 0;
  const str = query + verses;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; 
  }
  return hash.toString();
};

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
