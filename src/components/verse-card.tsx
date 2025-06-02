"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Star } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import type { Verse } from "@/lib/types"; // Assuming Verse type includes id, query, and verses text

interface VerseCardProps {
  verseData: {
    query: string;
    verses: string;
  };
  id: string; // Generated ID for bookmarking
}

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
