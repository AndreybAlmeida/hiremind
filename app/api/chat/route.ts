import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { buildDiagnosticSystemPrompt } from "@/lib/prompts";
import type { RoleSetup, Message } from "@/lib/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, roleSetup }: { messages: Message[]; roleSetup: RoleSetup } = body;

    if (!roleSetup) {
      return new Response(JSON.stringify({ error: "Missing roleSetup" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = buildDiagnosticSystemPrompt(roleSetup);

    // Anthropic requires at least one message — seed with a trigger when starting fresh
    const anthropicMessages: Anthropic.Messages.MessageParam[] =
      messages.length === 0
        ? [{ role: "user", content: "Olá, pode iniciar o diagnóstico." }]
        : messages.map((m) => ({ role: m.role, content: m.content }));

    // Use TransformStream so errors inside the async loop propagate as visible text
    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    // Run async — errors are forwarded as text so the UI can display them
    (async () => {
      try {
        const stream = client.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: systemPrompt,
          messages: anthropicMessages,
        });

        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            await writer.write(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("Anthropic stream error:", err);
        const msg = err instanceof Error ? err.message : "Erro desconhecido";
        await writer.write(
          encoder.encode(
            `Desculpe, ocorreu um erro: ${msg}. Verifique se a chave de API está configurada corretamente no arquivo .env.local.`
          )
        );
      } finally {
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
