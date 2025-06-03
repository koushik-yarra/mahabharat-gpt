"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Removed Card, CardContent
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, AlertTriangle, Send } from "lucide-react";
import { handleGenerateVerse } from "./actions";
import type { GenerateRelevantVersesOutput } from "@/ai/flows/generate-relevant-verses";
import { VerseCard } from "@/components/verse-card";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  // User content is string, AI content includes query for VerseCard
  content: string | { query: string; verses: string }; 
}

export default function HomePage() {
  const [currentQuery, setCurrentQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateVerseId } = useBookmarks();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    if (currentQuery.trim().length === 0) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + Math.random().toString(),
      type: "user",
      content: currentQuery,
    };
    setChatMessages((prev) => [...prev, userMessage]);
    
    const originalQueryForAI = currentQuery;
    setCurrentQuery(""); // Clear input after capturing
    setError(null);

    const formData = new FormData();
    formData.append("query", originalQueryForAI);

    startTransition(async () => {
      const result = await handleGenerateVerse(formData);
      if (result.error) {
        setError(result.error);
        // Optionally add an error message to chat
        // const errorMessage: ChatMessage = {
        //   id: Date.now().toString() + Math.random().toString(),
        //   type: "ai",
        //   content: `Error: ${result.error}`, // Or a generic error message
        // };
        // setChatMessages((prev) => [...prev, errorMessage]);
      } else if (result.data) {
        const aiMessage: ChatMessage = {
          id: Date.now().toString() + Math.random().toString(),
          type: "ai",
          content: { query: originalQueryForAI, verses: result.data.verses },
        };
        setChatMessages((prev) => [...prev, aiMessage]);
      }
    });
  };

  return (
    <div className="flex flex-col h-full flex-1">
      <CardHeader className="text-center pt-0"> {/* Adjusted padding */}
        <CardTitle className="font-headline text-3xl text-primary">
          Chat with Gita GPT
        </CardTitle>
        <CardDescription className="text-lg">
          Ask your questions or share your concerns to receive guidance from the Bhagavad Gita.
        </CardDescription>
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.type === 'user' ? (
              <div className="max-w-xl rounded-lg px-4 py-3 shadow-md bg-primary text-primary-foreground">
                <p className="whitespace-pre-wrap">{msg.content as string}</p>
              </div>
            ) : (
              // AI message uses VerseCard, which has its own padding and structure
              // We might not need an extra div wrapper if VerseCard handles its styling well enough
              <VerseCard
                verseData={msg.content as { query: string; verses: string }}
                id={generateVerseId(
                  (msg.content as { query: string; verses: string }).query,
                  (msg.content as { query: string; verses: string }).verses
                )}
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="p-4 border-t border-border bg-background">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <Textarea
              name="query"
              placeholder="Ask Krishna..."
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              rows={1}
              className="flex-1 resize-none text-base py-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(); // Call directly
                }
              }}
              disabled={isPending}
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10"
              disabled={isPending || currentQuery.trim().length === 0}
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
