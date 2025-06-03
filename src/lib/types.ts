/**
 * @fileOverview Defines shared TypeScript types and interfaces used across the application.
 */

/**
 * Represents a bookmarked verse.
 * @interface Verse
 * @property {string} id - A unique identifier for the bookmark, typically generated from query and verse content.
 * @property {string} query - The user's query that prompted the verse.
 * @property {string} verses - The text content of the verse or wisdom.
 * @property {string} bookmarkedAt - ISO string date representing when the verse was bookmarked.
 */
export interface Verse {
  id: string;
  query: string;
  verses: string;
  bookmarkedAt: string;
}
