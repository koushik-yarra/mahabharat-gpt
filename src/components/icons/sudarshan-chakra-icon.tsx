/**
 * @fileOverview SudarshanChakraIcon SVG component.
 * Represents a simplified Sudarshana Chakra, the divine discus of Lord Vishnu/Krishna.
 */
import type { SVGProps } from 'react';

/**
 * SudarshanChakraIcon SVG component.
 * @param {SVGProps<SVGSVGElement>} props - SVG properties.
 * @returns {JSX.Element} The SudarshanChakraIcon SVG.
 */
export function SudarshanChakraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="none" /> {/* Outer ring */}
      <circle cx="12" cy="12" r="2.5" /> {/* Central hub */}
      {/* 8 Spokes/Blades pointing outwards */}
      <line x1="12" y1="2" x2="12" y2="5.5" /> {/* Top */}
      <line x1="12" y1="22" x2="12" y2="18.5" /> {/* Bottom */}
      <line x1="2" y1="12" x2="5.5" y2="12" /> {/* Left */}
      <line x1="22" y1="12" x2="18.5" y2="12" /> {/* Right */}
      <line x1="4.929" y1="4.929" x2="7.758" y2="7.758" /> {/* Top-Left */}
      <line x1="19.071" y1="19.071" x2="16.242" y2="16.242" /> {/* Bottom-Right */}
      <line x1="4.929" y1="19.071" x2="7.758" y2="16.242" /> {/* Bottom-Left */}
      <line x1="19.071" y1="4.929" x2="16.242" y2="7.758" /> {/* Top-Right */}
    </svg>
  );
}
