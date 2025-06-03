
"use server";
/**
 * @fileOverview Server Actions for the Gita Insights application.
 * This file contains server-side functions that can be called from client components,
 * primarily for handling form submissions and invoking AI flows.
 */

import { generateMahabharatWisdom, type GenerateMahabharatWisdomInput, type GenerateMahabharatWisdomOutput } from "@/ai/flows/generate-mahabharat-wisdom";
import { z } from "zod";

/**
 * Zod schema for validating the input to the verse generation action.
 */
const inputSchema = z.object({
  query: z.string().min(3, "Query must be at least 3 characters long.").max(200, "Query must be at most 200 characters long."),
});

/**
 * Interface for the result of the server action.
 * Contains either the generated data or an error message.
 */
interface ActionResult {
  data?: GenerateMahabharatWisdomOutput;
  error?: string;
}

/**
 * Handles the generation of verses/wisdom from the Mahabharata based on user input.
 * This function validates the input, calls the Genkit AI flow, and returns the result
 * or an error message.
 * @param {FormData} formData - The form data containing the user's query.
 * @returns {Promise<ActionResult>} An object containing the generated verses or an error.
 */
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
