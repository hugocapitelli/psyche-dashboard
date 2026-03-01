"use client";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import { useHugoState } from "@/components/StateContext";
import ModusBanner from "@/components/ModusBanner";
import { profile } from "@/lib/profile";
import { comunicacaoPorModus } from "@/lib/modusAdaptations";

export default function Comunicacao() {
  const { modus, config } = useHugoState();
  const comm = comunicacaoPorModus[modus];

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        <ModusBanner />
        <div className="mb-10">
          <p className="font-mono text-xs text-muted mb-3 tracking-widest uppercase">DISC · MBTI · Big Five</p>
          <h1 className="font-display text-4xl text-primary font-semibold mb-2">Como interagir com Hugo</h1>
          <p className="text-muted text-sm max-w-xl">
            O guia adapta ao Modus Operandi ativo. Use o seletor no topo para mudar o contexto.
          </p>
        </div>

        {/* Modus-reactive protocol */}
        <AnimatePresence mode="wait">
          <motion.div
            key={modus}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="mb-8 rounded-lg border overflow-hidden"
            style={{ borderColor: `${config.color}30` }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 border-b"
              style={{ background: `${config.color}0A`, borderColor: `${config.color}20` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs mb-1" style={{ color: config.color }}>
                    {config.label} — {comm.mode}
                  </p>
                  <p className="font-display text-lg text-primary font-semibold">{comm.headline}</p>
                </div>
              </div>
              <p className="text-xs text-muted mt-2 leading-relaxed max-w-2xl">{comm.neuroscience}</p>
            </div>

            {/* Works / Breaks */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 border-r border-border">
                <p className="font-mono text-xs text-accent-alt tracking-widest uppercase mb-4">Funciona ✓</p>
                <ul className="space-y-2.5">
                  {comm.works.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-accent-alt mt-0.5 text-sm">✓</span>
                      <span className="text-sm text-primary/85 leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="p-6">
                <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Quebra ✗</p>
                <ul className="space-y-2.5">
                  {comm.breaks.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-muted mt-0.5 text-sm">✗</span>
                      <span className="text-sm text-primary/60 leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Receiver experience + tip */}
            <div
              className="px-6 py-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4"
              style={{ borderColor: `${config.color}20`, background: `${config.color}05` }}
            >
              <div>
                <p className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Experiência do receptor</p>
                <p className="text-sm text-primary/80">{comm.receiverExperience}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: config.color }}>
                  Tip prático
                </p>
                <p className="text-sm text-primary/80">{comm.tip}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Baseline communication cards (always visible) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* DO */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <p className="font-mono text-xs text-accent-alt tracking-widest uppercase mb-4">Faça ✓</p>
            <ul className="space-y-3">
              {profile.disc.communicationDo.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-accent-alt mt-0.5 text-sm">✓</span>
                  <span className="text-sm text-primary/85 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* DON'T */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Evite ✗</p>
            <ul className="space-y-3">
              {profile.disc.communicationDont.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-muted mt-0.5 text-sm">✗</span>
                  <span className="text-sm text-primary/60 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Communication style cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Como Hugo dá", content: "Direto, envolvente, visual (cria imagens mentais), lógico com toque pessoal" },
            { label: "Recebe melhor", content: "Estimulante, crível, action-oriented, com ritmo rápido" },
            { label: "Triggers negativos", content: "Dogmatismo, decisões sem closure, impessoalidade, irrealismo" },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-surface border border-border rounded-lg p-5"
            >
              <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">{card.label}</p>
              <p className="text-sm text-primary leading-relaxed">{card.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Stress signals */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface border border-border rounded-lg p-6"
        >
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Eneagrama + DISC</p>
          <h2 className="font-display text-lg text-primary font-semibold mb-4">Sinais de Estresse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted mb-3">Quando estressado, Hugo pode:</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.enneagram.underStress.map((s, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.04 }}
                    className="text-xs bg-elevated border border-border rounded px-2 py-0.5 text-muted"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted mb-3">Como responder ao estresse:</p>
              <ul className="space-y-2">
                {[
                  "Dar closure explícito em decisões",
                  "Evitar confronto direto — trazer dados",
                  "Dar espaço para processar antes de responder",
                  "Focar no resultado compartilhado",
                ].map((item, i) => (
                  <li key={i} className="text-sm text-primary/80">→ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
