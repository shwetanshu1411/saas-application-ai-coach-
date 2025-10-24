'use server'; // server-only

import { Inngest } from 'inngest';

export async function getInngestClient() {
  return new Inngest({
    id: 'career-coach',          // Unique app ID
    name: 'Career Coach',
    credentials: {
      gemini: {
        apiKey: process.env.GEMINI_API_KEY,
      },
    },
  });
}
