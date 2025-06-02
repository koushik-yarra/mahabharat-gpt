"use server";

import { generateRelevantVerses, type GenerateRelevantVersesInput, type GenerateRelevantVersesOutput } from "@/ai/flows/generate-relevant-verses";
import { z } from "zod";

const inputSchema = z.object({
  query: z.string().min(3, "Query must be at least 3 characters long.").max(200, "Query must be at most 200 characters long."),
});

interface ActionResult {
  data?: GenerateRelevantVersesOutput;
  error?: string;
}

export async function handleGenerateVerse(formData: FormData): Promise<ActionResult> {
  const query = formData.get("query");

  const validatedFields = inputSchema.safeParse({
    query: query,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.query?.join(", ") || "Invalid input.",
    };
  }
  
  const input: GenerateRelevantVersesInput = {
    query: validatedFields.data.query,
  };

  try {
    const output = await generateRelevantVerses(input);
    return { data: output };
  } catch (e) {
    console.error("Error generating verses:", e);
    return { error: "Failed to generate verses. Please try again." };
  }
}
