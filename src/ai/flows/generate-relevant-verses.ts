// src/ai/flows/generate-relevant-verses.ts
'use server';

/**
 * @fileOverview An AI agent to generate relevant verses from the Bhagavad Gita based on user queries about life problems.
 *
 * - generateRelevantVerses - A function that generates relevant verses.
 * - GenerateRelevantVersesInput - The input type for the generateRelevantVerses function.
 * - GenerateRelevantVersesOutput - The return type for the generateRelevantVerses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRelevantVersesInputSchema = z.object({
  query: z
    .string()
    .describe('The user query about a life problem.'),
});
export type GenerateRelevantVersesInput = z.infer<typeof GenerateRelevantVersesInputSchema>;

const GenerateRelevantVersesOutputSchema = z.object({
  verses: z
    .string()
    .describe('Relevant verses from the Bhagavad Gita that offer guidance or insight.'),
});
export type GenerateRelevantVersesOutput = z.infer<typeof GenerateRelevantVersesOutputSchema>;

export async function generateRelevantVerses(input: GenerateRelevantVersesInput): Promise<GenerateRelevantVersesOutput> {
  return generateRelevantVersesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRelevantVersesPrompt',
  input: {schema: GenerateRelevantVersesInputSchema},
  output: {schema: GenerateRelevantVersesOutputSchema},
  prompt: `You are a knowledgeable guide to the Bhagavad Gita.

  A user has the following life problem: {{{query}}}

  Generate relevant verses from the Bhagavad Gita that offer guidance or insight related to the problem. Return the verses as a string.
  `,
});

const generateRelevantVersesFlow = ai.defineFlow(
  {
    name: 'generateRelevantVersesFlow',
    inputSchema: GenerateRelevantVersesInputSchema,
    outputSchema: GenerateRelevantVersesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
