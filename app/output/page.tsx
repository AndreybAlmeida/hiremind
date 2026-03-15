"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { storage } from "@/lib/storage";
import type { GeneratedOutput } from "@/lib/types";

type Tab = "jd" | "interview" | "scorecard";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
          <span className="text-accent font-bold mt-0.5 flex-shrink-0">—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function RiskLabel({ level }: { level: string }) {
  const labels: Record<string, string> = {
    high: "Alto", moderate: "Moderado", medium: "Médio", low: "Baixo",
  };
  const cfg: Record<string, { cls: string; dot: string }> = {
    high: { cls: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" },
    moderate: { cls: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
    medium: { cls: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
    low: { cls: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-500" },
  };
  const c = cfg[level] ?? cfg.low;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${c.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {labels[level] ?? level}
    </span>
  );
}

function LockedContent({ title, description, items }: { title: string; description: string; items: string[] }) {
  return (
    <div className="animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-10 py-14 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
            <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
          <ul className="space-y-2 mb-8 text-left">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <button className="bg-gradient-to-r from-primary to-accent text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-md shadow-primary/20">
            Fazer upgrade para acessar
          </button>
        </div>
      </div>
    </div>
  );
}

const LOADING_PHRASES = [
  "Analisando o diagnóstico do cargo...",
  "Definindo missão e responsabilidades...",
  "Estruturando os resultados esperados...",
  "Escrevendo as habilidades necessárias...",
  "Finalizando sua Job Description...",
];

function LoadingState() {
  const [step, setStep] = useState(0);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep((s) => Math.min(s + 1, LOADING_PHRASES.length - 1));
    }, 2200);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((d) => (d + 1) % 4);
    }, 400);
    return () => clearInterval(dotsInterval);
  }, []);

  const progress = Math.round(((step + 1) / LOADING_PHRASES.length) * 100);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-center max-w-md px-6 w-full">
        {/* Logo animado */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-20 animate-ping" style={{ animationDuration: "1.8s" }} />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Preparando sua Job Description
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          {LOADING_PHRASES[step]}{".".repeat(dots)}
        </p>

        {/* Barra de progresso */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-2.5 text-left">
          {LOADING_PHRASES.map((phrase, i) => (
            <div
              key={phrase}
              className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                i < step ? "text-slate-400" : i === step ? "text-slate-800 font-medium" : "text-slate-300"
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                i < step ? "bg-green-100" : i === step ? "bg-primary/10 ring-2 ring-primary/20" : "bg-slate-100"
              }`}>
                {i < step ? (
                  <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i === step ? (
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                )}
              </div>
              <span>{phrase}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OutputPage() {
  const router = useRouter();
  const [output, setOutput] = useState<GeneratedOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("jd");
  const [copied, setCopied] = useState(false);
  const hasFetched = useRef(false);
  const setupRef = useRef(storage.getRoleSetup());

  const generate = useCallback(async () => {
    const roleSetup = storage.getRoleSetup();
    const messages = storage.getMessages();
    const diagnostic = storage.getDiagnostic();

    if (!roleSetup || messages.length === 0) {
      router.push("/setup");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleSetup,
          messages,
          diagnosticSummary: diagnostic ? JSON.stringify(diagnostic) : "Sem resumo de diagnóstico disponível",
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Falha na geração");
      }

      const data: GeneratedOutput = await response.json();
      setOutput(data);
      storage.setOutput(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha na geração");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const cached = storage.getOutput();
    if (cached) {
      setOutput(cached);
      setIsLoading(false);
      return;
    }
    if (!hasFetched.current) {
      hasFetched.current = true;
      generate();
    }
  }, [generate]);

  const copyToClipboard = () => {
    if (!output) return;
    const jd = output.jobDescription;
    const text = [
      jd.roleMission,
      "",
      "SOBRE A EMPRESA",
      jd.companyOverview,
      "",
      "PRINCIPAIS RESPONSABILIDADES",
      ...jd.keyResponsibilities.map((r) => `• ${r}`),
      "",
      "RESULTADOS ESPERADOS (Primeiros 90 Dias)",
      ...jd.expectedOutcomes.map((o) => `• ${o}`),
      "",
      "HABILIDADES NECESSÁRIAS",
      ...jd.requiredSkills.map((s) => `• ${s}`),
      "",
      "DIFERENCIAIS",
      ...jd.niceToHaveSkills.map((s) => `• ${s}`),
      "",
      "PERFIL COMPORTAMENTAL",
      ...jd.behavioralTraits.map((t) => `• ${t}`),
      "",
      "ESTRUTURA DA EQUIPE",
      jd.teamStructure,
      "",
      "MÉTRICAS DE SUCESSO",
      ...jd.successMetrics.map((m) => `• ${m}`),
      "",
      `Remuneração: ${jd.salaryRange}`,
      `Modelo de Trabalho: ${jd.workModel}`,
      `Tipo de Contrato: ${jd.employmentType}`,
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleStartNew = () => {
    storage.clear();
    router.push("/setup");
  };

  if (isLoading) return <LoadingState />;

  if (error) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Algo deu errado</h2>
          <p className="text-sm text-slate-500 mb-6">{error}</p>
          <button
            onClick={() => { setError(null); setIsLoading(true); hasFetched.current = false; generate(); }}
            className="bg-primary text-white font-medium px-5 py-2.5 rounded-xl hover:bg-primary-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!output) return null;

  const { jobDescription: jd, candidateSuccessProfile, diagnosticInsights } = output;
  const setup = setupRef.current;

  const tabs: { id: Tab; label: string; locked?: boolean }[] = [
    { id: "jd", label: "Job Description" },
    { id: "interview", label: "Perguntas de Entrevista", locked: true },
    { id: "scorecard", label: "Scorecard", locked: true },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 no-print">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-slate-900">HireMind</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-white hover:border-slate-300 transition-all"
            >
              {copied ? (
                <><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copiado!</>
              ) : (
                <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copiar Vaga</>
              )}
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-white hover:border-slate-300 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Imprimir / PDF
            </button>
            <button
              onClick={handleStartNew}
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-600 transition-all"
            >
              + Nova Vaga
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Pacote de contratação pronto
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{setup?.roleTitle ?? "Cargo"}</h1>
          <p className="text-slate-500">
            {setup?.companyName}
            {setup?.department ? ` · ${setup.department}` : ""}
            {setup?.workModel ? ` · ${setup.workModel}` : ""}
            {jd.salaryRange ? ` · ${jd.salaryRange}` : ""}
          </p>
        </div>

        {/* Insights do Diagnóstico */}
        {diagnosticInsights && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 no-print">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-sm font-semibold text-slate-700">Insights do Diagnóstico:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Clareza do Cargo</span>
                <RiskLabel level={diagnosticInsights.roleClarity} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Escopo</span>
                <RiskLabel level={diagnosticInsights.scopeComplexity} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Risco de Contratação</span>
                <RiskLabel level={diagnosticInsights.hiringRisk} />
              </div>
            </div>
            {diagnosticInsights.recommendations?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {diagnosticInsights.recommendations.map((rec, i) => (
                  <span key={i} className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-full">{rec}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Abas */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-8 no-print w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.locked && setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab.locked
                  ? "text-slate-400 cursor-default"
                  : activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.locked && (
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Descrição da Vaga */}
        {activeTab === "jd" && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-8">
              <div className="mb-8 pb-8 border-b border-slate-100">
                <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Missão do Cargo</div>
                <p className="text-lg font-medium text-slate-800 leading-relaxed">{jd.roleMission}</p>
              </div>
              <Section title="Sobre a Empresa">
                <p className="text-sm text-slate-600 leading-relaxed">{jd.companyOverview}</p>
              </Section>
              <Section title="Principais Responsabilidades">
                <BulletList items={jd.keyResponsibilities} />
              </Section>
              <Section title="Resultados Esperados — Primeiros 90 Dias">
                <BulletList items={jd.expectedOutcomes} />
              </Section>
              <Section title="Habilidades Necessárias">
                <BulletList items={jd.requiredSkills} />
              </Section>
              <Section title="Diferenciais">
                <BulletList items={jd.niceToHaveSkills} />
              </Section>
              <Section title="Perfil Comportamental">
                <div className="flex flex-wrap gap-2">
                  {jd.behavioralTraits.map((t, i) => (
                    <span key={i} className="text-sm bg-accent/5 text-accent border border-accent/20 px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </Section>
              <Section title="Métricas de Sucesso">
                <BulletList items={jd.successMetrics} />
              </Section>
              <Section title="Estrutura da Equipe">
                <p className="text-sm text-slate-600 leading-relaxed">{jd.teamStructure}</p>
              </Section>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Detalhes do Cargo</div>
                <div className="space-y-3">
                  {[
                    { label: "Remuneração", value: jd.salaryRange },
                    { label: "Modelo de Trabalho", value: jd.workModel },
                    { label: "Tipo de Contrato", value: jd.employmentType },
                    { label: "Departamento", value: setup?.department },
                    { label: "Localização", value: setup?.location },
                  ].map((item) => item.value && (
                    <div key={item.label}>
                      <div className="text-xs text-slate-400 mb-0.5">{item.label}</div>
                      <div className="text-sm font-medium text-slate-700">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Perfil Ideal do Candidato</div>
                <p className="text-sm text-slate-700 leading-relaxed">{candidateSuccessProfile}</p>
              </div>
            </div>
          </div>
        )}

        {/* Perguntas de Entrevista — bloqueado */}
        {activeTab === "interview" && (
          <LockedContent
            title="Perguntas de Entrevista"
            description="Receba perguntas comportamentais, técnicas e de fit cultural geradas especificamente para esse cargo."
            items={["Perguntas comportamentais (STAR)", "Validação técnica por competência", "Fit cultural e valores"]}
          />
        )}

        {/* Scorecard — bloqueado */}
        {activeTab === "scorecard" && (
          <LockedContent
            title="Scorecard de Contratação"
            description="Avalie candidatos de forma objetiva com critérios de excelência e sinais de alerta por competência."
            items={["Competências com peso personalizado", "Critérios de excelência por área", "Sinais de alerta para cada perfil"]}
          />
        )}

        {/* Rodapé da página */}
        <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <p className="text-sm text-slate-400">
            Gerado pelo HireMind ·{" "}
            {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <div className="flex items-center gap-3">
            <button onClick={handleStartNew} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-white transition-all">
              + Nova Vaga
            </button>
            <button onClick={copyToClipboard} className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-primary-600 transition-all">
              {copied ? "Copiado!" : "Copiar Descrição de Vaga"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
