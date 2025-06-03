/**
 * @fileOverview FluteIcon SVG component.
 * Represents a simple flute icon.
 */
import type { SVGProps } from 'react';

/**
 * FluteIcon SVG component.
 * @param {SVGProps<SVGSVGElement>} props - SVG properties.
 * @returns {JSX.Element} The FluteIcon SVG.
 */
export function FluteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 10c0-2 2-2 4-2s4 2 4 2" />
      <path d="M10 14c0 2-2 2-4 2s-4-2-4-2" />
      <path d="M17 3S10 6 10 12s7 9 7 9" />
      <path d="M10 12c8 0 8-2 8-2" />
      <path d="M10 12c8 0 8 2 8 2" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}
