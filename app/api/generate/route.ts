import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buildGeneratePrompt } from "@/lib/prompts";
import type { RoleSetup, Message } from "@/lib/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      roleSetup,
      messages,
      diagnosticSummary,
    }: {
      roleSetup: RoleSetup;
      messages: Message[];
      diagnosticSummary: string;
    } = body;

    if (!roleSetup || !messages) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const prompt = buildGeneratePrompt(roleSetup, messages, diagnosticSummary);

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textContent = response.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    const text = textContent.text;

    // Extract JSON — handle cases where the model wraps in markdown
    let jsonText = text.trim();
    const fenceMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      jsonText = fenceMatch[1].trim();
    }

    // Find the outermost JSON object
    const startIdx = jsonText.indexOf("{");
    const endIdx = jsonText.lastIndexOf("}");
    if (startIdx === -1 || endIdx === -1) {
      throw new Error("No valid JSON found in response");
    }
    jsonText = jsonText.slice(startIdx, endIdx + 1);

    const parsed = JSON.parse(jsonText);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Generate API error:", error);
    const message =
      error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
