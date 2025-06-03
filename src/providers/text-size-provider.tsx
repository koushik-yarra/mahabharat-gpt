
"use client";

import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { LOCAL_STORAGE_TEXT_SIZE_KEY } from '@/lib/constants';

type TextSizeType = 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';

interface TextSizeContextType {
  textSize: TextSizeType;
  setTextSize: (size: TextSizeType) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
}

const defaultTextSize: TextSizeType = 'text-base';
const availableSizes: TextSizeType[] = ['text-sm', 'text-base', 'text-lg', 'text-xl'];

export const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSizeState] = useState<TextSizeType>(defaultTextSize);
  const [isMounted, setIsMounted] = useState(false);

  // Effect to run on initial client mount
  useEffect(() => {
    setIsMounted(true); // Mark as mounted
    try {
      const storedSize = localStorage.getItem(LOCAL_STORAGE_TEXT_SIZE_KEY) as TextSizeType | null;
      if (storedSize && availableSizes.includes(storedSize)) {
        setTextSizeState(storedSize); // Update state if valid size found in localStorage
      }
      // If no stored size, `textSize` remains `defaultTextSize`.
      // The useEffect below will handle applying it to document.body after isMounted is true.
    } catch (error) {
      console.warn("Failed to access localStorage for text size on mount:", error);
      // In case of error, textSize is still defaultTextSize.
      // The useEffect below will apply this to document.body.
    }
  }, []); // Empty dependency array: run once on mount

  // Effect to handle side effects when textSize changes or after initial mount
  useEffect(() => {
    if (isMounted) { // Only run on client-side after initial mount setup
      document.body.classList.remove(...availableSizes);
      document.body.classList.add(textSize);
      try {
        localStorage.setItem(LOCAL_STORAGE_TEXT_SIZE_KEY, textSize);
      } catch (error) {
        console.warn("Failed to save text size to localStorage:", error);
      }
    }
  }, [textSize, isMounted]); // Run when textSize changes or after isMounted becomes true

  const setTextSize = useCallback((size: TextSizeType) => {
    if (availableSizes.includes(size)) {
      setTextSizeState(size); // Just update state. Side effects are handled by the useEffect above.
    }
  }, []); // Stable callback, relies only on setTextSizeState and availableSizes

  const increaseTextSize = useCallback(() => {
    const currentIndex = availableSizes.indexOf(textSize);
    if (currentIndex < availableSizes.length - 1) {
      setTextSize(availableSizes[currentIndex + 1]);
    }
  }, [textSize, setTextSize]); // Depends on textSize and stable setTextSize

  const decreaseTextSize = useCallback(() => {
    const currentIndex = availableSizes.indexOf(textSize);
    if (currentIndex > 0) {
      setTextSize(availableSizes[currentIndex - 1]);
    }
  }, [textSize, setTextSize]); // Depends on textSize and stable setTextSize

  const value = useMemo(() => ({
    textSize,
    setTextSize,
    increaseTextSize,
    decreaseTextSize,
  }), [textSize, setTextSize, increaseTextSize, decreaseTextSize]);

  // Always render the Provider.
  // For SSR and initial client render before isMounted=true, children will receive the
  // defaultTextSize via context. The body class will be set by the useEffect after mount.
  return (
    <TextSizeContext.Provider value={value}>
      {children}
    </TextSizeContext.Provider>
  );
}
