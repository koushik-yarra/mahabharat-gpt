/**
 * @fileOverview Initializes and configures the Genkit AI instance.
 * This file sets up the Genkit AI object with necessary plugins (e.g., Google AI)
 * and defines a default model for AI operations.
 */
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
