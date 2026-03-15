"use client";

import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Clareza do Cargo",
    description: "Pare de contratar para uma ideia vaga. O HireMind força a clareza antes de você escrever uma única palavra da vaga.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Diagnóstico de IA",
    description: "Uma conversa guiada que identifica riscos ocultos — cargos misturados, incompatibilidade de senioridade e expectativas salariais erradas.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Pacote Completo",
    description: "Descrição de vaga, perguntas de entrevista e scorecard de contratação — tudo o que você precisa para contratar certo.",
  },
];

const steps = [
  {
    number: "01",
    title: "Preencha os dados básicos",
    description: "Nome da empresa, título do cargo, departamento, localização e modelo de trabalho. Leva menos de 30 segundos.",
  },
  {
    number: "02",
    title: "Diagnóstico com IA",
    description: "Responda 6 a 8 perguntas objetivas. A IA valida suas expectativas e aponta riscos em tempo real.",
  },
  {
    number: "03",
    title: "Receba seu pacote de contratação",
    description: "Descrição de vaga profissional, perguntas comportamentais de entrevista e scorecard ponderado.",
  },
];

const risks = [
  "Misturar múltiplos cargos em uma única vaga",
  "Desalinhar senioridade e responsabilidades",
  "Definir faixa salarial incompatível com o mercado",
  "Criar descrições de vaga vagas e genéricas",
  "Ignorar fit cultural no processo seletivo",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Navegação */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-slate-900 text-lg">HireMind</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#como-funciona" className="text-sm text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
              Como funciona
            </Link>
            <Link href="#planos" className="text-sm text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
              Planos
            </Link>
            <Link href="/setup" className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Começar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-8">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            Inteligência de Contratação com IA
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold text-slate-900 leading-none tracking-tight mb-6">
            Contrate melhor.
            <br />
            <span className="text-gradient">Decida mais rápido.</span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            HireMind ajuda gestores e equipes de RH a definir vagas com clareza, validar expectativas e gerar descrições profissionais em menos de 3&nbsp;minutos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/setup"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-primary-600 transition-all hover:shadow-lg hover:shadow-primary/20 text-base"
            >
              Criar Descrição de Vaga
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 text-slate-600 font-medium px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-white transition-all text-base"
            >
              Ver como funciona
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Preview do Chat */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-400 font-medium">HireMind — Diagnóstico do Cargo</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">HM</span>
                </div>
                <div className="bg-slate-50 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-700 max-w-sm">
                  Vou fazer algumas perguntas para definir esse cargo corretamente. Qual problema específico essa pessoa deve resolver nos próximos 6 a 12 meses?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white max-w-sm">
                  Precisamos de alguém para liderar nossa estratégia de aquisição e escalar de 10 mil para 50 mil usuários esse ano.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">HM</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-700 max-w-sm">
                  <span className="font-semibold text-amber-700">⚠ Atenção:</span>{" "}
                  As responsabilidades descritas parecem combinar estratégia e execução operacional — áreas que normalmente são separadas por senioridade. Deseja ajustar o escopo ou manter como está?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof of value */}
      <section className="py-14 px-6 border-y border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {[
            {
              stat: "3 minutos",
              description: "É o tempo médio para criar uma vaga clara e pronta para publicar.",
            },
            {
              stat: "IA que pensa como um Business Partner",
              description: "Detecta erros de escopo, senioridade e salário antes que eles virem problema.",
            },
            {
              stat: "Tudo pronto para contratar",
              description: "Job description, perguntas de entrevista e scorecard — em uma única sessão.",
            },
          ].map((item) => (
            <div key={item.stat} className="flex flex-col justify-center px-10 py-8 md:py-4 first:pl-0 last:pr-0">
              <div className="text-xl font-bold text-slate-900 mb-2 leading-snug">{item.stat}</div>
              <div className="text-sm text-slate-500 leading-relaxed">{item.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* O Problema */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">O Problema</div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                A maioria das contratações erradas começa antes da primeira entrevista.
              </h2>
              <p className="text-lg text-slate-500 mb-8">
                Contratações ruins raramente são um problema de recrutamento — são um problema de definição do cargo. O HireMind te força a pensar o cargo corretamente antes de contratar.
              </p>
              <Link href="/setup" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                Iniciar diagnóstico
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="text-sm font-semibold text-slate-900 mb-5">Erros comuns que o HireMind detecta:</div>
              <ul className="space-y-3">
                {risks.map((risk) => (
                  <li key={risk} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-slate-600">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">O Que Você Recebe</div>
            <h2 className="text-4xl font-bold text-slate-900">Tudo para contratar da forma certa.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-8 rounded-2xl border border-slate-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Como Funciona</div>
            <h2 className="text-4xl font-bold text-slate-900">Do zero ao pacote de contratação em 3&nbsp;minutos.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-slate-200 to-transparent -z-0" />
                )}
                <div className="text-4xl font-black text-slate-100 mb-4">{step.number}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/setup" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-primary-600 transition-all hover:shadow-lg hover:shadow-primary/20">
              Criar Descrição de Vaga
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-24 px-6 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Planos</div>
            <h2 className="text-4xl font-bold text-slate-900">Escolha o plano certo para o seu ritmo.</h2>
            <p className="text-slate-500 mt-3 text-base">Pagamento mensal via cartão de crédito ou PIX. Cancele quando quiser.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mt-14 items-stretch">

            {/* Gratuito */}
            <div className="flex flex-col p-7 rounded-2xl border border-slate-200 bg-white">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Gratuito</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-extrabold text-slate-900">R$0</span>
              </div>
              <div className="text-sm text-slate-400 mb-6">para sempre</div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "3 job descriptions por mês",
                  "Diagnóstico de cargo com IA",
                  "Análise de riscos do cargo",
                  "Copiar e exportar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/setup" className="block text-center bg-slate-100 text-slate-700 font-semibold px-5 py-3 rounded-xl hover:bg-slate-200 transition-colors text-sm">
                Começar grátis
              </Link>
            </div>

            {/* Starter — decoy */}
            <div className="flex flex-col p-7 rounded-2xl border border-slate-200 bg-white">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Starter</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-extrabold text-slate-900">R$199</span>
              </div>
              <div className="text-sm text-slate-400 mb-6">por mês</div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "10 job descriptions por mês",
                  "Tudo do plano Gratuito",
                  "Comprar créditos extras avulsos",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
                {[
                  "Perguntas de entrevista",
                  "Scorecard de contratação",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-slate-200 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/setup" className="block text-center bg-slate-100 text-slate-700 font-semibold px-5 py-3 rounded-xl hover:bg-slate-200 transition-colors text-sm">
                Assinar Starter
              </Link>
            </div>

            {/* Pro — destaque */}
            <div className="flex flex-col p-7 rounded-2xl border-2 border-primary bg-primary relative overflow-hidden shadow-xl shadow-primary/20">
              <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">MELHOR ESCOLHA</div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary-200 mb-3">Pro</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-extrabold text-white">R$249</span>
              </div>
              <div className="text-sm text-primary-200 mb-2">por mês</div>
              <div className="text-xs text-accent-300 font-semibold mb-6">Só R$50 a mais — com tudo incluso</div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "10 job descriptions por mês",
                  "Tudo do plano Starter",
                  "Perguntas comportamentais de entrevista",
                  "Scorecard de contratação",
                  "Perfil ideal do candidato",
                  "Comprar créditos extras avulsos",
                  "Exportar em PDF",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-primary-100">
                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/setup" className="block text-center bg-white text-primary font-bold px-5 py-3 rounded-xl hover:bg-primary-50 transition-colors text-sm">
                Assinar Pro
              </Link>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col p-7 rounded-2xl border border-slate-200 bg-slate-900">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Enterprise</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-extrabold text-white">R$999</span>
              </div>
              <div className="text-sm text-slate-400 mb-6">por mês</div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "Uso ilimitado",
                  "Até 5 usuários simultâneos",
                  "Para empresas com 30+ vagas/mês",
                  "Todas as features Pro",
                  "Suporte prioritário",
                  "Onboarding dedicado",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:contato@hiremind.com.br" className="block text-center bg-slate-700 text-white font-semibold px-5 py-3 rounded-xl hover:bg-slate-600 transition-colors text-sm">
                Falar com time comercial
              </a>
            </div>

          </div>

          {/* Nota rodapé */}
          <p className="text-center text-xs text-slate-400 mt-8">
            Créditos não utilizados expiram ao final do mês. Créditos extras podem ser adquiridos a qualquer momento dentro da plataforma.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary to-accent">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Defina o cargo antes de contratar.</h2>
          <p className="text-lg text-primary-200 mb-8">
            A maioria das contratações erradas é evitável. O HireMind te dá clareza para contratar certo na primeira tentativa.
          </p>
          <Link href="/setup" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-7 py-3.5 rounded-xl hover:bg-primary-50 transition-all">
            Criar Descrição de Vaga — É Grátis
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs">H</span>
            </div>
            <span className="font-semibold text-white">HireMind</span>
            <span className="text-slate-500 text-sm ml-2">Contrate melhor. Decida mais rápido.</span>
          </div>
          <div className="text-sm text-slate-500">© 2025 HireMind. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
