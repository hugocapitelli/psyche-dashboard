"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import ModusBanner from "@/components/ModusBanner";
import { profile } from "@/lib/profile";
import { useHugoState } from "@/components/StateContext";
import { paradoxosPorModus } from "@/lib/modusAdaptations";

const paradoxStatusConfig = {
  explode:    { label: "Explode",           color: "#C86450", bg: "rgba(200,100,80,0.08)",  border: "rgba(200,100,80,0.25)",  icon: "⚡" },
  tensao:     { label: "Tensão produtiva",  color: "#C4A882", bg: "rgba(196,168,130,0.06)", border: "rgba(196,168,130,0.25)", icon: "⟷" },
  superpoder: { label: "Superpoder",        color: "#7C9E8F", bg: "rgba(124,158,143,0.08)", border: "rgba(124,158,143,0.3)",  icon: "✦" },
};

export default function Paradoxos() {
  const [active, setActive] = useState<number | null>(null);
  const { modus, config } = useHugoState();
  const modusParadoxes = paradoxosPorModus[modus];

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <ModusBanner />
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-xs text-muted mb-3 tracking-widest uppercase">Síntese Cross-Framework</p>
          <h1 className="font-display text-4xl text-primary font-semibold mb-3">
            Onde as contradições fazem sentido
          </h1>
          <p className="text-muted text-sm max-w-2xl leading-relaxed">
            Nenhum ser humano é completamente consistente. Esses paradoxos não são falhas —
            são a assinatura de uma personalidade complexa.{" "}
            <span className="text-accent">Clique em qualquer paradoxo para explorar.</span>
          </p>
        </motion.div>

        {/* Modus-reactive paradox highlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={modus}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="mb-8 rounded-lg border p-6"
            style={{ borderColor: `${config.color}25`, background: `${config.color}05` }}
          >
            <p className="font-mono text-xs mb-1" style={{ color: config.color }}>
              {config.label} — Paradoxos em destaque
            </p>
            <p className="text-sm text-primary/70 mb-5">
              Como as contradições se comportam neste modus
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {modusParadoxes.map((mp, i) => {
                const sc = paradoxStatusConfig[mp.status];
                return (
                  <motion.div
                    key={mp.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-lg border p-4"
                    style={{ background: sc.bg, borderColor: sc.border }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm" style={{ color: sc.color }}>{sc.icon}</span>
                      <span className="text-sm text-primary font-medium">{mp.label}</span>
                      <span
                        className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full border"
                        style={{ color: sc.color, borderColor: sc.border }}
                      >
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-xs text-primary/70 leading-relaxed">{mp.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* All paradoxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.paradoxes.map((p, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                onClick={() => setActive(isActive ? null : i)}
                className="bg-surface border rounded-lg p-6 cursor-pointer select-none"
                style={{
                  borderColor: isActive ? "#C4A882" : "#2A2A2A",
                  boxShadow: isActive ? "0 0 20px rgba(196,168,130,0.08)" : "none",
                }}
                whileHover={{ borderColor: isActive ? "#C4A882" : "#3A3A3A" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-display text-lg text-primary font-semibold">{p.name}</h2>
                  <motion.span
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted ml-4 shrink-0 text-lg leading-none"
                  >
                    +
                  </motion.span>
                </div>

                <p className="font-mono text-xs text-accent mb-3 leading-relaxed">{p.frameworks}</p>
                <p className="text-sm text-primary/80 leading-relaxed">{p.description}</p>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border pt-4 mt-4">
                        <p className="text-xs text-muted uppercase tracking-widest mb-2">Insight profundo</p>
                        <p className="text-sm text-accent-alt leading-relaxed">{p.insight}</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {p.frameworks.split(" + ").map((f, fi) => (
                            <span
                              key={fi}
                              className="text-xs px-2 py-1 rounded border border-border text-muted font-mono"
                            >
                              {f.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Synthesis */}
        <motion.div
          className="mt-10 border border-border rounded-lg p-8 bg-surface"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Identidade Síntese</p>
          <blockquote className="font-display text-xl text-primary font-semibold leading-relaxed mb-4">
            "{profile.meta.coreIdentity}"
          </blockquote>
          <p className="text-sm text-muted leading-relaxed max-w-3xl">
            Hugo é uma combinação rara: um perfeccionista intelectualmente movido (Eneagrama 1)
            que também é extrovertido e carismático (ENTP-A, Big Five E:93).
            Vê o ideal de tudo E tem poder intelectual para articular por que e como.
            Genuinamente se importa com pessoas MAS precisa dirigir.
            Altamente criativo MAS focado em resultados práticos.
            Intelectualmente aberto MAS valoricamente conservador.
          </p>
        </motion.div>

      </div>
    </main>
  );
}
