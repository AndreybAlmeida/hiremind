import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HireMind — Contrate melhor. Decida mais rápido.",
  description:
    "HireMind ajuda gestores e equipes de RH a definir vagas com clareza, validar expectativas e gerar descrições de cargos profissionais em minutos.",
  keywords:
    "descrição de vaga, IA para RH, recrutamento inteligente, talent acquisition, gestão de pessoas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
