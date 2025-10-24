// server-only: do NOT export with 'use server'
import { Inngest } from 'inngest';

export const inngestClient = new Inngest({
  id: 'career-coach',
  name: 'Career Coach',
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
