import { serve } from 'inngest/next';
import { getInngestClient } from '@/lib/inngest/client';
import { generateIndustryInsightsWrapper } from '@/lib/inngest/function';

export const { GET, POST, PUT } = serve({
  client: await getInngestClient(),
  functions: [await generateIndustryInsightsWrapper()],
});
