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

export function TextSizeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [textSize, setTextSizeState] = useState<TextSizeType>(defaultTextSize);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
    try {
      const storedSize = localStorage.getItem(LOCAL_STORAGE_TEXT_SIZE_KEY) as TextSizeType | null;
      if (storedSize && availableSizes.includes(storedSize)) {
        setTextSizeState(storedSize); 
      }
    } catch (error) {
      console.warn("Failed to access localStorage for text size on mount:", error);
    }
  }, []); 

  useEffect(() => {
    if (isMounted) { 
      document.body.classList.remove(...availableSizes);
      document.body.classList.add(textSize);
      try {
        localStorage.setItem(LOCAL_STORAGE_TEXT_SIZE_KEY, textSize);
      } catch (error) {
        console.warn("Failed to save text size to localStorage:", error);
      }
    }
  }, [textSize, isMounted]); 

  const setTextSize = useCallback((size: TextSizeType) => {
    if (availableSizes.includes(size)) {
      setTextSizeState(size); 
    }
  }, []); 

  const increaseTextSize = useCallback(() => {
    const currentIndex = availableSizes.indexOf(textSize);
    if (currentIndex < availableSizes.length - 1) {
      setTextSize(availableSizes[currentIndex + 1]);
    }
  }, [textSize, setTextSize]);

  const decreaseTextSize = useCallback(() => {
    const currentIndex = availableSizes.indexOf(textSize);
    if (currentIndex > 0) {
      setTextSize(availableSizes[currentIndex - 1]);
    }
  }, [textSize, setTextSize]); 

  const value = useMemo(() => ({
    textSize,
    setTextSize,
    increaseTextSize,
    decreaseTextSize,
  }), [textSize, setTextSize, increaseTextSize, decreaseTextSize]);

  return (
    <TextSizeContext.Provider value={value}>
      {children}
    </TextSizeContext.Provider>
  );
}
