"use client";

import { useState, useTransition, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, Lightbulb } from "lucide-react";
import { handleGenerateVerse } from "./actions";
import type { GenerateRelevantVersesOutput } from "@/ai/flows/generate-relevant-verses";
import { VerseCard } from "@/components/verse-card";
import { useBookmarks } from "@/hooks/use-bookmarks"; // For generating ID

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [generatedVerse, setGeneratedVerse] = useState<GenerateRelevantVersesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const { generateVerseId } = useBookmarks(); // Access the ID generation utility

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setGeneratedVerse(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await handleGenerateVerse(formData);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setGeneratedVerse(result.data);
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-center text-primary">
            Seek Wisdom from the Gita
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Share your life's challenge or question, and find relevant guidance from the Bhagavad Gita.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea
                name="query"
                placeholder="Describe your situation or question (e.g., 'I am feeling lost and without purpose', 'How to deal with difficult people?')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={4}
                className="text-base"
                disabled={isPending}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto" disabled={isPending || query.trim().length < 3}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Find Verses
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {generatedVerse && query && (
         <VerseCard 
            verseData={{ query, verses: generatedVerse.verses }} 
            id={generateVerseId(query, generatedVerse.verses)} 
          />
      )}
    </div>
  );
}
