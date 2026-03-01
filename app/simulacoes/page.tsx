"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import ModusBanner from "@/components/ModusBanner";
import { useHugoState } from "@/components/StateContext";
import {
  scenarios,
  decisionDimensions,
  calculateEngagement,
  criticScenarios,
  interpretCriticScore,
  type Scenario,
} from "@/lib/simulations";

// ─── Category badge ────────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  liderança: "#C4A882",
  conflito: "#C48BB4",
  feedback: "#7C9E8F",
  decisão: "#8B9CC4",
  relacionamento: "#C4A882",
  trabalho: "#666666",
};

const stressColors = { low: "#7C9E8F", medium: "#C4A882", high: "#C48BB4" };
const stressLabels = { low: "Baixo", medium: "Médio", high: "Alto" };

// ─── MODULE TABS ───────────────────────────────────────────────────────────
const modules = [
  { id: "cenarios", label: "Cenários Reais" },
  { id: "decisao", label: "Simulador de Decisão" },
  { id: "critico", label: "O Crítico Interno" },
];

// ─── SCENARIO CARD ─────────────────────────────────────────────────────────
function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const [open, setOpen] = useState(false);
  const [frame, setFrame] = useState<"disc" | "enneagram" | "mbti">("disc");

  const frameConfig = {
    disc: { label: "DISC", color: "#C4A882" },
    enneagram: { label: "Eneagrama", color: "#C48BB4" },
    mbti: { label: "MBTI", color: "#7C9E8F" },
  };

  const reaction = scenario.reactions[frame];

  return (
    <motion.div
      layout
      className="bg-surface border border-border rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <button
        className="w-full text-left p-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className="font-mono text-xs px-2 py-0.5 rounded border"
              style={{
                color: categoryColors[scenario.category],
                borderColor: `${categoryColors[scenario.category]}30`,
                background: `${categoryColors[scenario.category]}10`,
              }}
            >
              {scenario.category}
            </span>
            <span
              className="font-mono text-xs px-2 py-0.5 rounded border"
              style={{
                color: stressColors[reaction.stressLevel ?? "medium"],
                borderColor: `${stressColors[reaction.stressLevel ?? "medium"]}30`,
                background: `${stressColors[reaction.stressLevel ?? "medium"]}10`,
              }}
            >
              estresse {stressLabels[reaction.stressLevel ?? "medium"]}
            </span>
          </div>
          <h3 className="text-primary font-semibold text-sm leading-snug">{scenario.title}</h3>
          <p className="text-muted text-xs mt-1 leading-relaxed">{scenario.context}</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted text-xl leading-none shrink-0 mt-1"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 pb-5 pt-4">

              {/* Framework selector */}
              <div className="flex gap-1 mb-4">
                {(Object.keys(frameConfig) as Array<keyof typeof frameConfig>).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrame(f)}
                    className="relative px-3 py-1.5 rounded text-xs font-medium transition-colors"
                    style={{ color: frame === f ? frameConfig[f].color : "#666" }}
                  >
                    {frame === f && (
                      <motion.div
                        layoutId={`frame-pill-${scenario.id}`}
                        className="absolute inset-0 rounded bg-elevated"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                      />
                    )}
                    <span className="relative z-10">{frameConfig[f].label}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={frame}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="bg-elevated rounded p-3">
                    <p className="font-mono text-xs text-muted mb-1 uppercase tracking-widest">Reação instintiva</p>
                    <p className="text-sm text-primary leading-relaxed">{reaction.instinct}</p>
                  </div>
                  <div className="bg-elevated rounded p-3">
                    <p className="font-mono text-xs text-muted mb-1 uppercase tracking-widest">O que passa na cabeça</p>
                    <p className="text-sm text-primary/80 leading-relaxed italic">{reaction.thought}</p>
                  </div>
                  <div
                    className="rounded p-3 border"
                    style={{
                      borderColor: `${stressColors[reaction.stressLevel ?? "medium"]}30`,
                      background: `${stressColors[reaction.stressLevel ?? "medium"]}08`,
                    }}
                  >
                    <p
                      className="font-mono text-xs mb-1 uppercase tracking-widest"
                      style={{ color: stressColors[reaction.stressLevel ?? "medium"] }}
                    >
                      Risco
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: stressColors[reaction.stressLevel ?? "medium"] }}>
                      {reaction.risk}
                    </p>
                  </div>
                  <div className="bg-elevated rounded p-3 border border-[#7C9E8F]/20">
                    <p className="font-mono text-xs text-accent-alt mb-1 uppercase tracking-widest">Como agir melhor</p>
                    <p className="text-sm text-primary/80 leading-relaxed">{reaction.growth}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Synthesis */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-mono text-xs text-muted mb-1 uppercase tracking-widest">Síntese cross-framework</p>
                <p className="text-xs text-primary/70 leading-relaxed">{scenario.reactions.synthesis}</p>
              </div>

              {/* Growth action */}
              <div className="mt-3 pt-3 border-t border-border">
                <p className="font-mono text-xs text-accent mb-1 uppercase tracking-widest">Ação de crescimento</p>
                <p className="text-sm text-primary font-medium leading-relaxed">{scenario.growthAction}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── DECISION SIMULATOR ────────────────────────────────────────────────────
function DecisionSimulator() {
  const [scores, setScores] = useState<Record<string, number>>(() =>
    Object.fromEntries(decisionDimensions.map((d) => [d.id, 5]))
  );

  const result = calculateEngagement(scores);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          Ajuste os 5 sliders para descrever uma situação real ou hipotética.
          O sistema calcula seu provável nível de engajamento baseado no perfil integrado.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="space-y-5">
          {decisionDimensions.map((dim) => (
            <div key={dim.id}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="text-sm text-primary font-medium">{dim.label}</span>
                  <span className="text-xs text-muted ml-2">({dim.source})</span>
                </div>
                <span className="font-mono text-sm text-accent font-semibold">{scores[dim.id]}</span>
              </div>
              <p className="text-xs text-muted mb-2">{dim.description}</p>
              <input
                type="range"
                min={1}
                max={10}
                value={scores[dim.id]}
                onChange={(e) => setScores((s) => ({ ...s, [dim.id]: Number(e.target.value) }))}
                className="w-full accent-[#C4A882] cursor-pointer"
                style={{ accentColor: "#C4A882" }}
              />
              <div className="flex justify-between text-xs text-muted mt-0.5">
                <span>{dim.low}</span>
                <span>{dim.high}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Result panel */}
        <div className="sticky top-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={result.level}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-surface border rounded-lg p-6"
              style={{ borderColor: `${result.color}30` }}
            >
              <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: result.color }}>
                {result.label}
              </p>

              {/* Score ring */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center border-2 shrink-0"
                  style={{ borderColor: result.color, background: `${result.color}10` }}
                >
                  <span className="font-mono text-2xl font-bold" style={{ color: result.color }}>
                    {result.total}
                  </span>
                </div>
                <p className="text-sm text-primary/80 leading-relaxed">{result.description}</p>
              </div>

              {/* Flow conditions */}
              {result.flowConditions.length > 0 && (
                <div className="mb-4">
                  <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">Condições presentes</p>
                  <ul className="space-y-1">
                    {result.flowConditions.map((c, i) => (
                      <li key={i} className="text-xs text-accent-alt">{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Blindspots */}
              {result.blindspots.length > 0 && (
                <div className="border-t border-border pt-4">
                  <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">⚠ Alertas</p>
                  <ul className="space-y-1.5">
                    {result.blindspots.map((b, i) => (
                      <li key={i} className="text-xs text-primary/60 leading-relaxed">→ {b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── INNER CRITIC ACTIVITY ──────────────────────────────────────────────────
function InnerCriticActivity() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState(false);

  const allAnswered = criticScenarios.every((s) => scores[s.id] !== undefined);
  const result = revealed && allAnswered ? interpretCriticScore(scores) : null;

  const labels = ["1 — Quase nada", "2 — Leve", "3 — Moderado", "4 — Intenso", "5 — Muito intenso"];

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg p-5">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-2">Como funciona</p>
        <p className="text-sm text-primary/80 leading-relaxed">
          Para cada situação, avalie de 1 a 5 a intensidade do seu{" "}
          <span className="text-accent">crítico interno</span> — a voz que te julga, critica
          ou cria desconforto. Sem julgamento sobre as respostas. O objetivo é apenas mapear onde o Eneagrama 1 está mais ativo.
        </p>
      </div>

      <div className="space-y-4">
        {criticScenarios.map((scenario, idx) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="bg-surface border border-border rounded-lg p-5"
          >
            <div className="mb-3">
              <p className="text-sm text-primary font-semibold mb-1">{scenario.situation}</p>
              <p className="text-xs text-muted leading-relaxed">{scenario.context}</p>
            </div>

            <p className="text-xs text-muted mb-3 font-mono">
              Intensidade do crítico interno nessa situação:
            </p>

            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => setScores((s) => ({ ...s, [scenario.id]: val }))}
                  className="w-10 h-10 rounded border text-sm font-mono transition-all"
                  style={{
                    borderColor: scores[scenario.id] === val ? "#C4A882" : "#2A2A2A",
                    background: scores[scenario.id] === val ? "#C4A88220" : "transparent",
                    color: scores[scenario.id] === val ? "#C4A882" : "#666",
                  }}
                >
                  {val}
                </button>
              ))}
            </div>

            {scores[scenario.id] !== undefined && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-muted mt-2"
              >
                {labels[(scores[scenario.id] ?? 1) - 1]}
              </motion.p>
            )}

            {revealed && scores[scenario.id] !== undefined && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="border-t border-border mt-3 pt-3"
              >
                <p className="text-xs text-muted mb-1">Padrão Tipo 1:</p>
                <p className="text-xs text-primary/70 leading-relaxed">{scenario.type1Pattern}</p>
                {(scores[scenario.id] ?? 1) <= 2 && (
                  <p className="text-xs text-accent-alt mt-1">
                    ✓ Você está respondendo de forma integrada aqui
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Action */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setRevealed(true)}
          disabled={!allAnswered}
          className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: allAnswered ? "#C4A882" : "#2A2A2A",
            color: allAnswered ? "#0A0A0A" : "#666",
          }}
        >
          {allAnswered ? "Ver meu padrão" : `${Object.keys(scores).length}/${criticScenarios.length} respondidos`}
        </button>
        {revealed && (
          <button
            onClick={() => { setScores({}); setRevealed(false); }}
            className="text-xs text-muted hover:text-primary transition-colors"
          >
            Resetar
          </button>
        )}
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border rounded-lg p-6"
            style={{ borderColor: `${result.color}30`, background: `${result.color}06` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0"
                style={{ borderColor: result.color, background: `${result.color}15` }}
              >
                <span className="font-mono text-lg font-bold" style={{ color: result.color }}>
                  {result.average.toFixed(1)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-primary">{result.level}</p>
                <p className="text-xs text-muted font-mono">média das 6 situações</p>
              </div>
            </div>

            <p className="text-sm text-primary/80 leading-relaxed mb-4">{result.description}</p>

            <div className="border-t border-border pt-4 mb-4">
              <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">O que isso significa</p>
              <p className="text-sm text-primary/70 leading-relaxed">{result.insight}</p>
            </div>

            <div className="border-t border-border pt-4">
              <p className="font-mono text-xs text-accent-alt uppercase tracking-widest mb-2">Prática recomendada</p>
              <p className="text-sm text-primary leading-relaxed">{result.practice}</p>
            </div>

            {/* Per-scenario breakdown */}
            <div className="border-t border-border pt-4 mt-4">
              <p className="font-mono text-xs text-muted uppercase tracking-widest mb-3">Mapa por situação</p>
              <div className="space-y-1.5">
                {criticScenarios.map((s) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <span className="text-xs text-muted flex-1 truncate">{s.situation}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <div
                          key={v}
                          className="w-3 h-3 rounded-sm"
                          style={{
                            background: v <= (scores[s.id] ?? 0) ? result.color : "#2A2A2A",
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs w-4 text-right" style={{ color: result.color }}>
                      {scores[s.id]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function Simulacoes() {
  const [activeModule, setActiveModule] = useState("cenarios");
  const { modus, config } = useHugoState();

  // Filter scenarios based on modus
  const filteredScenarios = modus === "pressao"
    ? [...scenarios].sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.reactions.disc.stressLevel ?? "medium"] - order[b.reactions.disc.stressLevel ?? "medium"];
      })
    : modus === "flow"
    ? scenarios.filter((s) => s.category === "liderança" || s.category === "relacionamento" || s.category === "decisão")
    : scenarios;

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-mono text-xs text-muted mb-3 tracking-widest uppercase">
            Explorable Explanations
          </p>
          <h1 className="font-display text-4xl text-primary font-semibold mb-3">
            Como você pensa em situações reais
          </h1>
          <p className="text-muted text-sm max-w-2xl leading-relaxed">
            3 módulos interativos baseados no perfil integrado. Não são respostas certas ou erradas —
            são radiografias de como os seus padrões psicométricos operam quando a vida acontece.
          </p>
        </motion.div>

        <ModusBanner />

        {/* Module tabs */}
        <div className="flex gap-1 bg-surface border border-border rounded-lg p-1 mb-8 w-fit">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className="relative px-4 py-2 rounded text-sm font-medium transition-colors"
              style={{ color: activeModule === m.id ? "#E8E0D5" : "#666" }}
            >
              {activeModule === m.id && (
                <motion.div
                  layoutId="module-pill"
                  className="absolute inset-0 rounded bg-elevated"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{m.label}</span>
            </button>
          ))}
        </div>

        {/* Module content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeModule === "cenarios" && (
              <div className="space-y-4">
                <p className="text-xs text-muted mb-4">
                  {filteredScenarios.length} cenários
                  {modus === "pressao" && " · ordenados por intensidade de estresse"}
                  {modus === "flow" && " · filtrados para contexto de flow e oportunidade"}
                  {" · Clique para ver como o perfil reage · Alterne entre DISC, Eneagrama e MBTI"}
                </p>
                {filteredScenarios.map((s) => (
                  <ScenarioCard key={s.id} scenario={s} />
                ))}
              </div>
            )}

            {activeModule === "decisao" && <DecisionSimulator />}
            {activeModule === "critico" && <InnerCriticActivity />}
          </motion.div>
        </AnimatePresence>

      </div>
    </main>
  );
}
