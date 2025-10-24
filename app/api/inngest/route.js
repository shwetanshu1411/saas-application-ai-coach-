// app/api/inngest/route.js
import { serve } from "inngest/next";
import { inngestClient } from "@/lib/inngest/client";
import { generateIndustryInsights } from "@/lib/inngest/function";

// export an async handler instead of top-level serve
export async function GET(req) {
  const handler = serve({
    client: inngestClient,
    functions: [generateIndustryInsights],
  });
  return handler.GET(req);
}

export async function POST(req) {
  const handler = serve({
    client: inngestClient,
    functions: [generateIndustryInsights],
  });
  return handler.POST(req);
}

export async function PUT(req) {
  const handler = serve({
    client: inngestClient,
    functions: [generateIndustryInsights],
  });
  return handler.PUT(req);
}
