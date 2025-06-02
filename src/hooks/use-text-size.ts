"use client";

import { useContext } from 'react';
import { TextSizeContext } from '@/providers/text-size-provider';

export function useTextSize() {
  const context = useContext(TextSizeContext);
  if (context === undefined) {
    throw new Error('useTextSize must be used within a TextSizeProvider');
  }
  return context;
}
