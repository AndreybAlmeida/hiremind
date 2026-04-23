"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { storage } from "@/lib/storage";
import type { Message, DiagnosticSummary, RoleSetup } from "@/lib/types";

const DIAGNOSTIC_COMPLETE_REGEX =
  /\[DIAGNOSTIC_COMPLETE\]\s*(\{[\s\S]*?\})\s*\[\/DIAGNOSTIC_COMPLETE\]/;

function extractDiagnostic(text: string): DiagnosticSummary | null {
  const match = text.match(DIAGNOSTIC_COMPLETE_REGEX);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function cleanMessageContent(content: string): string {
  return content.replace(DIAGNOSTIC_COMPLETE_REGEX, "").trim();
}

function RiskBadge({ level }: { level: string }) {
  const labels: Record<string, string> = {
    high: "Alto",
    moderate: "Moderado",
    medium: "Médio",
    low: "Baixo",
  };
  const colors: Record<string, string> = {
    high: "bg-red-50 text-red-600 border-red-200",
    moderate: "bg-amber-50 text-amber-600 border-amber-200",
    medium: "bg-amber-50 text-amber-600 border-amber-200",
    low: "bg-green-50 text-green-600 border-green-200",
  };
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border ${colors[level] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
      {labels[level] ?? level}
    </span>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-bold">HM</span>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" />
        </div>
      </div>
    </div>
  );
}

function renderMarkdown(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[\s\S]+?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function AssistantMessage({ content }: { content: string }) {
  const isWarning =
    content.includes("⚠") ||
    content.toLowerCase().includes("atenção") ||
    content.toLowerCase().includes("percebi") ||
    content.toLowerCase().includes("normalmente associad") ||
    content.toLowerCase().includes("pode dificultar");

  return (
    <div className="flex items-start gap-3 animate-slide-up">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-white text-xs font-bold">HM</span>
      </div>
      <div className={`rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed max-w-lg ${
        isWarning
          ? "bg-amber-50 border border-amber-200 text-slate-700"
          : "bg-white border border-slate-200 text-slate-700"
      }`}>
        {isWarning && (
          <span className="font-semibold text-amber-600 block mb-1">⚠ Atenção:</span>
        )}
        <span className="whitespace-pre-wrap">{renderMarkdown(content)}</span>
      </div>
    </div>
  );
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end animate-slide-up">
      <div className="bg-primary rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white max-w-lg leading-relaxed">
        <span className="whitespace-pre-wrap">{content}</span>
      </div>
    </div>
  );
}

export default function DiagnosticPage() {
  const router = useRouter();
  const [roleSetup, setRoleSetup] = useState<RoleSetup | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [diagnostic, setDiagnostic] = useState<DiagnosticSummary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  // abortRef persists across StrictMode remounts — prevents double API calls
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const setup = storage.getRoleSetup();
    if (!setup) {
      router.push("/setup");
      return;
    }
    setRoleSetup(setup);
  }, [router]);

  useEffect(() => {
    if (!roleSetup) return;
    // Cancel any in-flight request (handles React StrictMode double-fire)
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    startConversation(roleSetup, controller.signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleSetup]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const startConversation = async (setup: RoleSetup, signal: AbortSignal) => {
    setIsTyping(true);
    setMessages([]);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [], roleSetup: setup }),
        signal,
      });
      if (signal.aborted) return;
      if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
      await streamResponse(response, [], signal);
    } catch (err) {
      if (signal.aborted) return; // Ignore aborted requests (StrictMode cleanup)
      setIsTyping(false);
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setMessages([{
        role: "assistant",
        content: `Ocorreu um erro ao iniciar o diagnóstico: ${msg}. Verifique se a chave de API está configurada corretamente no arquivo .env.local.`,
      }]);
    }
  };

  const streamResponse = async (response: Response, currentMessages: Message[], signal?: AbortSignal) => {
    if (!response.body) {
      setIsTyping(false);
      return;
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    setIsTyping(false);
    setIsStreaming(true);

    const newMessages: Message[] = [...currentMessages, { role: "assistant", content: "" }];
    setMessages(newMessages);

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (signal?.aborted) { reader.cancel(); return; }
        fullText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: cleanMessageContent(fullText),
          };
          return updated;
        });
      }
    } catch {
      // Stream was cancelled or errored — don't update state if aborted
      if (signal?.aborted) return;
    }

    if (signal?.aborted) return;

    const diag = extractDiagnostic(fullText);
    if (diag) {
      setDiagnostic(diag);
      storage.setDiagnostic(diag);
    }

    const finalMessages: Message[] = [
      ...currentMessages,
      { role: "assistant", content: cleanMessageContent(fullText) },
    ];
    setMessages(finalMessages);
    storage.setMessages(finalMessages);
    setIsStreaming(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isStreaming || isTyping || !roleSetup) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, roleSetup }),
      });
      if (!response.ok) throw new Error("Erro na API");
      await streamResponse(response, updatedMessages);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Algo deu errado. Por favor, tente novamente." },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleGenerateJD = () => {
    if (!roleSetup) return;
    setIsGenerating(true);
    storage.setMessages(messages);
    router.push("/output");
  };

  if (!roleSetup) return null;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-slate-900">HireMind</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-semibold text-slate-900">{roleSetup.roleTitle}</div>
              <div className="text-xs text-slate-400">{roleSetup.companyName} · {roleSetup.department}</div>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full px-3 py-1 text-sm text-slate-400">
              <span className={`w-1.5 h-1.5 rounded-full ${diagnostic ? "bg-green-500" : "bg-accent animate-pulse"}`} />
              {diagnostic ? "Diagnóstico concluído" : "Etapa 2 de 2"}
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Diagnóstico do Cargo</h1>
          <p className="text-sm text-slate-500 mt-1">
            Responda algumas perguntas para definir o cargo corretamente.
          </p>
        </div>

        {/* Mensagens */}
        <div className="flex-1 space-y-4 mb-6 min-h-0 overflow-y-auto chat-scroll pr-1">
          {messages.map((msg, i) =>
            msg.role === "assistant" ? (
              <AssistantMessage key={i} content={msg.content} />
            ) : (
              <UserMessage key={i} content={msg.content} />
            )
          )}
          {isTyping && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* Resumo do Diagnóstico */}
        {diagnostic && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-900">Resumo do Diagnóstico</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-400 mb-1.5">Clareza do Cargo</div>
                <RiskBadge level={diagnostic.roleClarity} />
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-400 mb-1.5">Escopo</div>
                <RiskBadge level={diagnostic.scopeComplexity} />
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-400 mb-1.5">Risco de Contratação</div>
                <RiskBadge level={diagnostic.hiringRisk} />
              </div>
            </div>
            {diagnostic.risks?.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Riscos Identificados
                </div>
                <ul className="space-y-1.5">
                  {diagnostic.risks.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-amber-500 mt-0.5">⚠</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {diagnostic.insights?.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Principais Insights
                </div>
                <ul className="space-y-1.5">
                  {diagnostic.insights.map((ins, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-primary mt-0.5">→</span>
                      {ins}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Gerar ou Input */}
        {diagnostic ? (
          <button
            onClick={handleGenerateJD}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-accent text-white font-semibold px-6 py-4 rounded-xl hover:opacity-95 transition-all disabled:opacity-60 shadow-lg shadow-primary/20"
          >
            {isGenerating ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Preparando sua Job Description...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Gerar Job Description
              </>
            )}
          </button>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua resposta aqui..."
              rows={2}
              disabled={isStreaming || isTyping}
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 resize-none focus:outline-none disabled:opacity-50"
            />
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">
                Enter para enviar · Shift+Enter para nova linha
              </span>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming || isTyping}
                className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Enviar
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
