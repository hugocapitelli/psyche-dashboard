"use client";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import ModusBanner from "@/components/ModusBanner";
import { profile } from "@/lib/profile";
import { useHugoState } from "@/components/StateContext";
import { aprendizadoPorModus } from "@/lib/modusAdaptations";

const agesStatusStyles = {
  ativo:     { color: "#7C9E8F", bg: "rgba(124,158,143,0.1)",  border: "rgba(124,158,143,0.3)", dot: "bg-[#7C9E8F]" },
  parcial:   { color: "#C4A882", bg: "rgba(196,168,130,0.08)", border: "rgba(196,168,130,0.3)", dot: "bg-[#C4A882]" },
  bloqueado: { color: "#555",    bg: "rgba(80,80,80,0.06)",    border: "rgba(80,80,80,0.2)",    dot: "bg-[#555]" },
};

const estadoStyles = {
  "Bloqueado":        { color: "#C86450", label: "⛔" },
  "Ótimo":            { color: "#C4A882", label: "✓" },
  "Pico — Absorção Total": { color: "#7C9E8F", label: "⬆⬆" },
};

export default function Aprendizado() {
  const { learningStyle, mbti, enneagram } = profile;
  const { modus, config } = useHugoState();
  const adapt = aprendizadoPorModus[modus];

  const estadoStyle = Object.entries(estadoStyles).find(([k]) => adapt.estado.startsWith(k))?.[1]
    ?? { color: config.color, label: "·" };

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <ModusBanner />
        <div className="mb-12">
          <p className="font-mono text-xs text-muted mb-3 tracking-widest uppercase">Big Five · MBTI · DISC</p>
          <h1 className="font-display text-4xl text-primary font-semibold mb-3">Como esta mente aprende</h1>
          <p className="text-muted text-sm max-w-2xl">
            Estilo de aprendizado derivado da síntese dos 4 instrumentos. Não é um MBTI de learning —
            é uma estimativa baseada em evidência cruzada.
          </p>
        </div>

        {/* Modus-reactive learning state */}
        <AnimatePresence mode="wait">
          <motion.div
            key={modus}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="mb-8 rounded-lg border overflow-hidden"
            style={{ borderColor: `${config.color}30` }}
          >
            {/* Header */}
            <div
              className="px-6 py-5 border-b"
              style={{ background: `${config.color}08`, borderColor: `${config.color}20` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-mono text-xs mb-1" style={{ color: config.color }}>
                    {config.label} — Estado de Aprendizado
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl text-primary font-semibold">{adapt.estado}</span>
                    <span className="font-mono text-sm" style={{ color: estadoStyle.color }}>{estadoStyle.label}</span>
                  </div>
                  <p className="text-sm text-primary/70 mt-1">{adapt.headline}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Kolb estimado</p>
                  <p className="text-sm text-primary/80">{adapt.kolb}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Loop level</p>
                  <p className="text-sm text-primary/80">{adapt.loopLevel}</p>
                </div>
              </div>
              <p className="text-xs text-muted mt-3 leading-relaxed">{adapt.neuroscience}</p>
            </div>

            {/* AGES Model */}
            <div className="p-6 border-b border-border">
              <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">AGES Model (NeuroLeadership Institute)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {adapt.agentModel.map((item, i) => {
                  const s = agesStatusStyles[item.status];
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-lg border p-4"
                      style={{ background: s.bg, borderColor: s.border }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                        <span className="font-mono text-xs font-bold" style={{ color: s.color }}>
                          {item.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{item.note}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Strategies + Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 border-r border-border">
                <p className="font-mono text-xs text-accent-alt uppercase tracking-widest mb-4">Estratégias eficazes</p>
                <ul className="space-y-2.5">
                  {adapt.strategies.map((s, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-accent-alt mt-1 text-xs">→</span>
                      <span className="text-sm text-primary/85 leading-relaxed">{s}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="p-6">
                <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Riscos neste estado</p>
                <ul className="space-y-2.5">
                  {adapt.risks.map((r, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-muted mt-1 text-xs">⚠</span>
                      <span className="text-sm text-primary/60 leading-relaxed">{r}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Kolb baseline */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-6">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-1">Modelo Kolb (estimado)</p>
          <h2 className="font-display text-2xl text-primary font-semibold mb-3">{learningStyle.kolbEstimate}</h2>
          <p className="text-sm text-primary/80 leading-relaxed max-w-3xl">{learningStyle.description}</p>
        </div>

        {/* Optimal vs Poor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface border border-border rounded-lg p-6">
            <p className="font-mono text-xs text-accent-alt uppercase tracking-widest mb-4">Aprende melhor com</p>
            <ul className="space-y-3">
              {learningStyle.optimalEnvironment.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-accent-alt mt-1 text-xs">→</span>
                  <span className="text-sm text-primary/85 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6">
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Não aprende bem com</p>
            <ul className="space-y-3">
              {learningStyle.doesntLearnWell.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-muted mt-1 text-xs">✗</span>
                  <span className="text-sm text-primary/60 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decision style */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-6">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Tomada de Decisão</p>
          <h2 className="font-display text-lg text-primary font-semibold mb-3">
            {learningStyle.decisionStyle.primary}
          </h2>
          <p className="text-sm text-primary/80 leading-relaxed max-w-3xl">
            {learningStyle.decisionStyle.description}
          </p>
        </div>

        {/* Key insights from MBTI growth */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-6">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-1">MBTI · Crescimento Pessoal</p>
          <h2 className="font-display text-lg text-primary font-semibold mb-4">
            Bridging ideas e execução
          </h2>
          <p className="text-sm text-accent mb-4 font-medium">
            Desafio central: Bridging gap entre ideias ilimitadas e implementação prática
          </p>
          <ul className="space-y-2">
            {[
              "Desenvolver disciplina e foco para canalizar energia criativa",
              "Cultivar inteligência emocional — equilibrar intelecto com empatia",
              "Manter hábitos consistentes",
              "Gerenciar tendência a superestimar capacidade",
            ].map((area: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-primary/80">
                <span className="text-accent mt-0.5">·</span>{area}
              </li>
            ))}
          </ul>
        </div>

        {/* Eneagrama arrows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface border border-border rounded-lg p-5">
            <p className="font-mono text-xs text-accent-alt uppercase tracking-widest mb-2">
              Flecha de Crescimento → Tipo {enneagram.arrowGrowth}
            </p>
            <p className="font-display text-lg text-primary font-semibold mb-2">
              Em direção ao Entusiasta
            </p>
            <p className="text-sm text-primary/70 leading-relaxed">
              No crescimento, o Tipo 1 vai em direção ao 7: mais espontâneo, leve, alegre.
              Aprende a aproveitar o processo sem exigir perfeição de cada etapa.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-5">
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
              Flecha de Estresse → Tipo {enneagram.arrowStress}
            </p>
            <p className="font-display text-lg text-primary/60 font-semibold mb-2">
              Em direção ao Individualista
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Sob estresse, vai para o 4: melancólico, autoindulgente, sensação de que ninguém o entende.
              Sinal de alerta para recalibrar e buscar leveza (flecha de crescimento).
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
