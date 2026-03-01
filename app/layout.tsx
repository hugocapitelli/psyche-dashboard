import type { Metadata } from "next";
import "./globals.css";
import { StateProvider } from "@/components/StateContext";

export const metadata: Metadata = {
  title: "Hugo Capitelli — Perfil Psicométrico",
  description: "Dashboard pessoal de análise psicométrica — DISC, MBTI, Big Five, Eneagrama",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-bg text-primary antialiased">
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
