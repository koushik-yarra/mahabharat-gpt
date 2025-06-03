
"use server";

import { generateMahabharatWisdom, type GenerateMahabharatWisdomInput, type GenerateMahabharatWisdomOutput } from "@/ai/flows/generate-mahabharat-wisdom";
import { z } from "zod";

const inputSchema = z.object({
  query: z.string().min(3, "Query must be at least 3 characters long.").max(200, "Query must be at most 200 characters long."),
});

interface ActionResult {
  data?: GenerateMahabharatWisdomOutput;
  error?: string;
}

export async function handleGenerateVerse(formData: FormData): Promise<ActionResult> { // Name kept for simplicity, but calls Mahabharat flow
  const query = formData.get("query");

  const validatedFields = inputSchema.safeParse({
    query: query,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.query?.join(", ") || "Invalid input.",
    };
  }
  
  const input: GenerateMahabharatWisdomInput = {
    query: validatedFields.data.query,
  };

  try {
    const output = await generateMahabharatWisdom(input);
    return { data: output };
  } catch (e) {
    console.error("Error generating response:", e);
    return { error: "Failed to generate response. Please try again." };
  }
}
