import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text, tone } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "bad_request", message: "text is required" },
        { status: 400 }
      );
    }

    if (!tone || !["casual", "professional", "viral"].includes(tone)) {
      return NextResponse.json(
        { error: "bad_request", message: "tone must be casual, professional, or viral" },
        { status: 400 }
      );
    }

    const toneDesc =
      tone === "casual"
        ? "conversational, friendly, and relatable"
        : tone === "professional"
          ? "polished, authoritative, and business-focused"
          : "high-energy, attention-grabbing, and shareable";

    const prompt = `You are an expert content repurposer. The user's tone style: ${toneDesc}.

Given this input content:
"""
${text}
"""

Generate ALL of the following in a single JSON object with exactly these keys:
- "tweets": array of exactly 5 engaging tweets (each under 280 characters)
- "linkedin": a professional LinkedIn post with storytelling (300-500 words)
- "blog": a detailed SEO-friendly blog article with markdown headings (600-900 words)
- "hooks": array of exactly 5 viral attention-grabbing hooks
- "captions": array of exactly 3 Instagram captions with relevant emojis

Return ONLY valid JSON, no markdown code blocks, no extra text.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4000,
      temperature: 0.8,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    let parsed: {
      tweets: string[];
      linkedin: string;
      blog: string;
      hooks: string[];
      captions: string[];
    };

    try {
      parsed = JSON.parse(raw);
    } catch {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return NextResponse.json(
          { error: "parse_error", message: "Failed to parse AI response" },
          { status: 500 }
        );
      }
      parsed = JSON.parse(jsonMatch[0]);
    }

    return NextResponse.json({
      tweets: parsed.tweets ?? [],
      linkedin: parsed.linkedin ?? "",
      blog: parsed.blog ?? "",
      hooks: parsed.hooks ?? [],
      captions: parsed.captions ?? [],
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "server_error", message: "Failed to generate content" },
      { status: 500 }
    );
  }
}
