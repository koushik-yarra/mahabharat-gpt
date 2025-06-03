/**
 * @fileOverview Development entry point for Genkit.
 * This file is used to load environment variables and import Genkit flows
 * so they can be discovered and managed by the Genkit development tools.
 */
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-mahabharat-wisdom.ts';
import '@/ai/flows/generate-relevant-verses.ts';
