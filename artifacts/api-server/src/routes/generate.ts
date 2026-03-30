import { Router, type IRouter } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import { db, generationsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/generate", async (req, res) => {
  const { text, tone } = req.body;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    res.status(400).json({ error: "bad_request", message: "text is required" });
    return;
  }

  if (!tone || !["casual", "professional", "viral"].includes(tone)) {
    res.status(400).json({ error: "bad_request", message: "tone must be casual, professional, or viral" });
    return;
  }

  try {
    const toneDesc =
      tone === "casual"
        ? "conversational, friendly, and relatable"
        : tone === "professional"
          ? "polished, authoritative, and business-focused"
          : "high-energy, attention-grabbing, and shareable";

    const prompt = `You are an expert content repurposer. The user's content has this tone style: ${toneDesc}.

Given this input content:
"""
${text}
"""

Generate ALL of the following in a single JSON object with exactly these keys:
- "tweets": array of exactly 5 engaging tweets (each under 280 characters, no hashtags in the tweet text itself)
- "linkedin": a single professional LinkedIn post with storytelling and insights (300-500 words)
- "blog": a detailed SEO-friendly blog article with markdown headings (600-900 words)  
- "hooks": array of exactly 5 viral attention-grabbing hooks or opening lines
- "captions": array of exactly 3 engaging Instagram captions with relevant emojis

Return ONLY valid JSON, no markdown code blocks.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
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
        res.status(500).json({ error: "parse_error", message: "Failed to parse AI response" });
        return;
      }
      parsed = JSON.parse(jsonMatch[0]);
    }

    const [row] = await db
      .insert(generationsTable)
      .values({
        inputText: text,
        tone,
        tweets: parsed.tweets ?? [],
        linkedin: parsed.linkedin ?? "",
        blog: parsed.blog ?? "",
        hooks: parsed.hooks ?? [],
        captions: parsed.captions ?? [],
      })
      .returning();

    res.json({
      id: String(row.id),
      tweets: row.tweets,
      linkedin: row.linkedin,
      blog: row.blog,
      hooks: row.hooks,
      captions: row.captions,
      createdAt: row.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Error generating content");
    res.status(500).json({ error: "server_error", message: "Failed to generate content" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const items = await db
      .select()
      .from(generationsTable)
      .orderBy(desc(generationsTable.createdAt))
      .limit(50);

    res.json({
      items: items.map((item) => ({
        id: String(item.id),
        inputText: item.inputText,
        tone: item.tone,
        tweets: item.tweets,
        linkedin: item.linkedin,
        blog: item.blog,
        hooks: item.hooks,
        captions: item.captions,
        createdAt: item.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching history");
    res.status(500).json({ error: "server_error", message: "Failed to fetch history" });
  }
});

export default router;
