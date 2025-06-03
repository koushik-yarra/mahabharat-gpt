"use client";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { VerseCard } from "@/components/verse-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookmarkX } from "lucide-react";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">
            My Bookmarked Verses
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookmarkX className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">No verses bookmarked yet.</p>
              <p className="text-muted-foreground">Explore and save wisdom that resonates with you!</p>
            </div>
          ) : (
            <div className="column-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {bookmarks.map((bookmark) => (
                <VerseCard
                  key={bookmark.id}
                  verseData={{ query: bookmark.query, verses: bookmark.verses }}
                  id={bookmark.id} 
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
