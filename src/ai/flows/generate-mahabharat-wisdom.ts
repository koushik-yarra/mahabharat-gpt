
// src/ai/flows/generate-mahabharat-wisdom.ts
'use server';

/**
 * @fileOverview An AI agent to generate relevant wisdom from the Mahabharata based on user queries.
 *
 * - generateMahabharatWisdom - A function that generates relevant wisdom.
 * - GenerateMahabharatWisdomInput - The input type for the generateMahabharatWisdom function.
 * - GenerateMahabharatWisdomOutput - The return type for the generateMahabharatWisdom function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMahabharatWisdomInputSchema = z.object({
  query: z
    .string()
    .describe('The user query about a life problem, seeking wisdom from the Mahabharata.'),
});
export type GenerateMahabharatWisdomInput = z.infer<typeof GenerateMahabharatWisdomInputSchema>;

const GenerateMahabharatWisdomOutputSchema = z.object({
  verses: z // "verses" here can mean shlokas, passages, or summaries of teachings
    .string()
    .describe('Relevant passages, teachings, or stories from the Mahabharata that offer guidance or insight.'),
});
export type GenerateMahabharatWisdomOutput = z.infer<typeof GenerateMahabharatWisdomOutputSchema>;

export async function generateMahabharatWisdom(input: GenerateMahabharatWisdomInput): Promise<GenerateMahabharatWisdomOutput> {
  return generateMahabharatWisdomFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMahabharatWisdomPrompt',
  input: {schema: GenerateMahabharatWisdomInputSchema},
  output: {schema: GenerateMahabharatWisdomOutputSchema},
  prompt: `You are an expert on the Mahabharata, one of the two major Sanskrit epics of ancient India. Your knowledge encompasses its characters, stories, philosophical teachings (including the Bhagavad Gita, which is a part of it), and moral dilemmas.
A user presents the following problem or question:
"{{{query}}}"

Your primary goal is to understand the user's query deeply and identify and return relevant passages, teachings, or stories from the Mahabharata that are *most directly applicable* and offer the clearest wisdom, guidance, or insight for this specific situation.
Focus on the core issue presented by the user. If the query is best answered by the Bhagavad Gita, provide verses from it. Otherwise, draw from the broader narratives and teachings of the Mahabharata.
Provide only the relevant text(s) or a concise summary of the teaching/story as a string. If multiple passages/stories are highly relevant, you may include them.
  `,
});

const generateMahabharatWisdomFlow = ai.defineFlow(
  {
    name: 'generateMahabharatWisdomFlow',
    inputSchema: GenerateMahabharatWisdomInputSchema,
    outputSchema: GenerateMahabharatWisdomOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
