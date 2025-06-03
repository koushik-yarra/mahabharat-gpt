
"use client";
/**
 * @fileOverview VerseCard component for displaying AI-generated verses or wisdom.
 * This component shows the user's query and the corresponding verses/teachings.
 * It also provides a button to bookmark or unbookmark the verse.
 */
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Star } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";

/**
 * Props for the VerseCard component.
 * @interface VerseCardProps
 * @property {object} verseData - The data for the verse.
 * @property {string} verseData.query - The user's query that led to this verse.
 * @property {string} verseData.verses - The AI-generated verse or wisdom text.
 * @property {string} id - A unique identifier for the verse, used for bookmarking.
 */
interface VerseCardProps {
  verseData: {
    query: string;
    verses: string;
  };
  id: string; 
}

/**
 * VerseCard component.
 * Renders a card displaying a query and its corresponding verses, with a bookmark toggle.
 * @param {VerseCardProps} props - The props for the component.
 * @returns {JSX.Element} The VerseCard UI.
 */
export function VerseCard({ verseData, id }: VerseCardProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(id);

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(verseData);
    }
  };

  return (
    <Card className="mb-6 shadow-lg break-inside-avoid">
      <CardHeader>
        <CardTitle className="font-headline text-lg text-primary">Wisdom for: "{verseData.query}"</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap leading-relaxed">{verseData.verses}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" onClick={handleBookmarkToggle} className="text-accent hover:text-accent-foreground hover:bg-accent/10">
          {bookmarked ? (
            <Star className="h-5 w-5 mr-2 fill-accent" />
          ) : (
            <Bookmark className="h-5 w-5 mr-2" />
          )}
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
      </CardFooter>
    </Card>
  );
}
