"use client";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import OceanRadar from "@/components/OceanRadar";
import MotivatorBar from "@/components/MotivatorBar";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useHugoState } from "@/components/StateContext";
import { profile } from "@/lib/profile";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const instruments = [
  { code: "DISC", value: "Assessor DI/IC", color: "#C4A882", description: "Tony Robbins / ASI Certified" },
  { code: "MBTI", value: "ENTP-A", color: "#7C9E8F", description: "O Debatedor Assertivo" },
  { code: "OCEAN", value: "E:93 C:91 A:84 O:80", color: "#8B9CC4", description: "Big Five — 5 fatores" },
  { code: "ENEAGRAMA", value: "Tipo 1w2 · 1-3-7", color: "#C48BB4", description: "O Visionário Realizador" },
];

const oceanScores = [
  { code: "E", score: 93, label: "Ext" },
  { code: "C", score: 91, label: "Con" },
  { code: "A", score: 84, label: "Ama" },
  { code: "O", score: 80, label: "Abe" },
  { code: "N", score: 47, label: "Neu" },
];

// What to highlight per modus
const overviewFocus: Record<string, { label: string; items: string[] }> = {
  pressao: {
    label: "Pontos cegos agora — o que proteger",
    items: [
      "Raiva reprimida vaza como crítica antes de ser percebida",
      "Decisões sob exaustão têm qualidade reduzida",
      "Conflitos menores escalam para disputas de princípio",
      "Workaholic mode ativo — burnout risk",
    ],
  },
  operacional: {
    label: "Visão balanceada — estado base",
    items: [
      "Motor de qualidade ativo — alto padrão como aliado",
      "Gerador de ideias ENTP precisa de âncora de foco",
      "DISC DI balanceando resultados e pessoas",
      "Conscienciosidade 91 — confiabilidade em alta",
    ],
  },
  flow: {
    label: "Oportunidades de impacto agora",
    items: [
      "Capturar ideias — o ENTP em flow gera ouro irreproduzível",
      "Usar para conversas difíceis que vem adiando",
      "Magnetismo social no pico — liderança relacional",
      "Autoconfiança calibrada — decisivo sem rigidez",
    ],
  },
};

export default function Home() {
  const { modus, config } = useHugoState();
  const focus = overviewFocus[modus];

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        {/* Hero — full width */}
        <motion.div
          className="mb-10"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={fadeUp} className="font-mono text-xs text-muted mb-3 tracking-widest uppercase">
            Perfil Psicométrico Integrado
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl text-primary font-semibold mb-3 leading-tight">
            {profile.meta.coreIdentity}
          </motion.h1>
          <motion.p variants={fadeUp} className="font-mono text-sm text-muted max-w-xl">
            {profile.meta.headline}
          </motion.p>
        </motion.div>

        {/* Modus reactive banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={modus}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="mb-8 border rounded-xl p-5"
            style={{ borderColor: `${config.color}30`, background: `${config.color}08` }}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1">
                  Modus Operandi Ativo
                </p>
                <p className="font-display text-xl font-semibold" style={{ color: config.color }}>
                  {config.label}
                </p>
                <p className="text-xs text-muted mt-0.5">{focus.label}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-end max-w-sm">
                {config.traits.slice(0, 5).map((t) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[11px] px-2 py-0.5 rounded border"
                    style={{ borderColor: `${config.color}30`, color: config.color, background: `${config.color}10` }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {focus.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-2"
                >
                  <span className="mt-1 shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: config.color }} />
                  <p className="text-xs text-primary/80 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Instrument badges */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {instruments.map((inst) => (
            <motion.div
              key={inst.code}
              variants={fadeUp}
              className="bg-surface border border-border rounded-lg p-4 card-hover cursor-default"
            >
              <p className="font-mono text-xs font-semibold tracking-widest mb-2" style={{ color: inst.color }}>
                {inst.code}
              </p>
              <p className="text-primary text-sm font-semibold leading-tight mb-1">{inst.value}</p>
              <p className="text-muted text-xs">{inst.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* OCEAN Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-surface border border-border rounded-lg p-6"
          >
            <p className="font-mono text-xs text-accent tracking-widest uppercase mb-1">Big Five</p>
            <h2 className="font-display text-lg text-primary font-semibold mb-4">OCEAN Profile</h2>
            <OceanRadar />
            <div className="grid grid-cols-5 gap-2 mt-4">
              {oceanScores.map((f) => (
                <div key={f.code} className="text-center">
                  <p className="font-mono text-xs text-muted">{f.label}</p>
                  <AnimatedCounter value={f.score} className="font-mono text-sm font-semibold text-primary" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Motivators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-surface border border-border rounded-lg p-6"
          >
            <p className="font-mono text-xs text-disc tracking-widest uppercase mb-1">DISC Motivators</p>
            <h2 className="font-display text-lg text-primary font-semibold mb-4">7 Motivadores</h2>
            <MotivatorBar />
          </motion.div>
        </div>

        {/* Superpowers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-surface border border-border rounded-lg p-6 mb-6"
        >
          <p className="font-mono text-xs text-accent-alt tracking-widest uppercase mb-1">Strengths Map</p>
          <h2 className="font-display text-lg text-primary font-semibold mb-5">5 Superpoderes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.superpowers.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                whileHover={{ borderColor: "#3A3A3A", backgroundColor: "#1A1A1A" }}
                className="border border-border rounded p-4 transition-colors cursor-default"
              >
                <p className="font-mono text-xs text-accent mb-2 font-semibold">{s.name}</p>
                <p className="text-xs text-muted mb-3 leading-relaxed">{s.evidence}</p>
                <div className="border-t border-border pt-2">
                  <p className="text-xs text-primary/70">
                    <span className="text-accent-alt font-medium">↗ </span>{s.leverage}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom cards — Eneagrama / Tritype / MBTI */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {[
            {
              label: "Eneagrama", code: "Tipo 1w2", sub: "O Perfeccionista",
              detail: "Match", val: 98, color: "#C48BB4",
            },
            {
              label: "Tritipo", code: "1-3-7", sub: "The Visionary Achiever",
              detail: "Tipo 3", val: 97, color: "#C48BB4",
            },
            {
              label: "MBTI", code: "ENTP-A", sub: "O Debatedor Assertivo",
              detail: "Extraversão", val: 67, color: "#7C9E8F",
            },
          ].map((card) => (
            <motion.div
              key={card.code}
              variants={fadeUp}
              whileHover={{ borderColor: "#3A3A3A" }}
              className="bg-surface border border-border rounded-lg p-5 transition-colors"
            >
              <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: card.color }}>
                {card.label}
              </p>
              <p className="font-display text-2xl text-primary font-semibold">{card.code}</p>
              <p className="text-sm text-muted mt-1">{card.sub}</p>
              <p className="font-mono text-xs text-muted mt-3">
                {card.detail}:{" "}
                <AnimatedCounter value={card.val} suffix="%" className="text-primary font-semibold" />
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}
