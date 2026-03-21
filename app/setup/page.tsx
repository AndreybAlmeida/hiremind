"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { storage } from "@/lib/storage";
import type { RoleSetup } from "@/lib/types";

const INDUSTRIES = [
  "Tecnologia",
  "Finanças e Bancos",
  "Saúde",
  "E-commerce e Varejo",
  "Marketing e Publicidade",
  "Educação",
  "Indústria e Manufatura",
  "Imobiliário",
  "Consultoria",
  "Mídia e Entretenimento",
  "Logística e Cadeia de Suprimentos",
  "Outro",
];

const COMPANY_SIZES = [
  "1–10 funcionários",
  "11–50 funcionários",
  "51–200 funcionários",
  "201–500 funcionários",
  "501–2.000 funcionários",
  "2.000+ funcionários",
];

const WORK_MODELS = ["Remoto", "Híbrido", "Presencial"];
const EMPLOYMENT_TYPES = ["CLT", "PJ", "Estágio", "Temporário"];

export default function SetupPage() {
  const router = useRouter();
  const [form, setForm] = useState<RoleSetup>({
    companyName: "",
    industry: "",
    companySize: "",
    roleTitle: "",
    department: "",
    location: "",
    workModel: "",
    employmentType: "",
    companyWebsite: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid = Object.entries(form)
    .filter(([key]) => key !== "companyWebsite")
    .every(([, v]) => v.trim() !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    storage.clear();
    storage.setRoleSetup(form);
    router.push("/diagnostic");
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-slate-900">HireMind</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Etapa 1 de 2
            </span>
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-2xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Vamos definir o cargo.
            </h1>
            <p className="text-slate-500">
              Preencha os dados básicos. A IA cuida do resto.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6"
          >
            {/* Linha 1 */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Empresa Exemplo Ltda."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Site da Empresa
                  <span className="ml-1.5 text-xs font-normal text-slate-400">(opcional — enriquece a JD)</span>
                </label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={form.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://suaempresa.com.br"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Linha 1b */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Setor
                </label>
                <select
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none"
                  required
                >
                  <option value="">Selecione o setor</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tamanho da Empresa
                </label>
                <select
                  name="companySize"
                  value={form.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none"
                  required
                >
                  <option value="">Selecione o tamanho</option>
                  {COMPANY_SIZES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Linha 2 */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Título do Cargo
                </label>
                <input
                  type="text"
                  name="roleTitle"
                  value={form.roleTitle}
                  onChange={handleChange}
                  placeholder="Gerente de Produto Sênior"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Linha 3 */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Departamento
                </label>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="Produto e Tecnologia"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Localização
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="São Paulo, SP"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Linha 4 */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Modelo de Trabalho
                </label>
                <div className="flex gap-2">
                  {WORK_MODELS.map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, workModel: model }))}
                      className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                        form.workModel === model
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de Contrato
                </label>
                <select
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  {EMPLOYMENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isValid}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-4 rounded-xl hover:bg-primary-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20"
              >
                Iniciar Diagnóstico de IA
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <p className="text-center text-xs text-slate-400 mt-3">
                Leva menos de 3 minutos. Nenhum cadastro necessário.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
