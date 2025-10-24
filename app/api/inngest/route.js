import { serve } from 'inngest/next';
import { inngestClient } from '@/lib/inngest/client';
import { generateIndustryInsights } from '@/lib/inngest/function';

export const { GET, POST, PUT } = serve({
  client: inngestClient,
  functions: [generateIndustryInsights],
});
