import { db } from '@/lib/prisma';
import { inngestClient } from './client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateIndustryInsights = inngestClient.createFunction(
  { name: 'Generate Industry Insights' },
  { cron: '0 0 * * 0' },
  async ({ event, step }) => {
    const industries = await step.run('Fetch industries', async () => {
      return await db.industryInsight.findMany({ select: { industry: true } });
    });

    for (const { industry } of industries) {
      const prompt = `...`; // your full prompt

      const res = await step.ai.wrap(
        'gemini',
        async (p) => await model.generateContent(p),
        prompt
      );

      const text = res.response.candidates[0].content.parts[0].text || '';
      const cleanedText = text.replace(/```(?:json)?\n?/g, '').trim();
      const insights = JSON.parse(cleanedText);

      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);
