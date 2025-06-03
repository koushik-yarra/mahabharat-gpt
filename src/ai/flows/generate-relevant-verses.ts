// src/ai/flows/generate-relevant-verses.ts
'use server';

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
  prompt: `You are an expert on the Bhagavad Gita, tasked with providing profound wisdom and guidance to users facing life's challenges.
A user presents the following problem or question:
"{{{query}}}"

Your primary goal is to identify and return verses from the Bhagavad Gita that are *most directly applicable* and offer the clearest insight or guidance for this specific situation.
Focus on the core issue presented by the user.
Provide only the verse text(s) as a string. If multiple verses are highly relevant, you may include them.
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
