"use client";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import ModusBanner from "@/components/ModusBanner";
import { profile } from "@/lib/profile";
import { useHugoState } from "@/components/StateContext";
import { instrumentosPorModus, type InstrumentStatus } from "@/lib/modusAdaptations";

function SubfactorRow({ name, score, max = 20 }: { name: string; score: number; max?: number }) {
  const pct = (score / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted w-36 shrink-0">{name}</span>
      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-accent/60"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-xs text-primary w-6 text-right">{score}</span>
    </div>
  );
}

const statusStyles: Record<InstrumentStatus["status"], { bg: string; text: string; border: string }> = {
  dominante: { bg: "rgba(196,139,180,0.08)", text: "#C48BB4", border: "rgba(196,139,180,0.3)" },
  pico:      { bg: "rgba(124,158,143,0.1)",  text: "#7C9E8F", border: "rgba(124,158,143,0.4)" },
  balanceado:{ bg: "rgba(196,168,130,0.08)", text: "#C4A882", border: "rgba(196,168,130,0.3)" },
  suprimido: { bg: "rgba(80,80,80,0.08)",    text: "#555",    border: "rgba(80,80,80,0.2)"   },
  distorcido:{ bg: "rgba(200,100,80,0.08)",  text: "#C86450", border: "rgba(200,100,80,0.25)" },
};

export default function Instrumentos() {
  const { modus, config } = useHugoState();
  const instruments = instrumentosPorModus[modus];

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <ModusBanner />
        <div className="mb-12">
          <p className="font-mono text-xs text-muted mb-3 tracking-widest uppercase">4 Instrumentos</p>
          <h1 className="font-display text-4xl text-primary font-semibold">Quatro lentes. Uma mente.</h1>
        </div>

        {/* Modus-reactive instrument status */}
        <AnimatePresence mode="wait">
          <motion.div
            key={modus}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="mb-8 rounded-lg border p-6"
            style={{ borderColor: `${config.color}25`, background: `${config.color}05` }}
          >
            <p className="font-mono text-xs mb-1" style={{ color: config.color }}>
              {config.label} — Estado dos instrumentos
            </p>
            <p className="text-sm text-primary/70 mb-5">
              Como os frameworks psicométricos se comportam neste modus
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {instruments.map((inst, i) => {
                const s = statusStyles[inst.status];
                return (
                  <motion.div
                    key={inst.code}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-lg border p-4"
                    style={{ background: s.bg, borderColor: s.border }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold" style={{ color: s.text }}>
                        {inst.code}
                      </span>
                      <span className="font-mono text-xs" style={{ color: s.text }}>
                        {inst.statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-primary font-medium mb-1">{inst.what}</p>
                    <p className="text-xs text-muted leading-relaxed">{inst.why}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="space-y-6">

          {/* DISC */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="font-mono text-xs text-disc tracking-widest uppercase mb-1">DISC & Motivators</p>
                <h2 className="font-display text-2xl text-primary font-semibold">Estilo Assessor</h2>
                <p className="text-sm text-muted font-mono mt-1">DI/IC · Tony Robbins / ASI Certified</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-3">Traços Primários</p>
                <ul className="space-y-2">
                  {profile.disc.primaryTraits.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-primary/80">
                      <span className="text-disc mt-0.5">·</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="bg-elevated rounded p-4">
                  <p className="font-mono text-xs text-muted mb-1">Sob pressão</p>
                  <p className="text-sm text-primary/80">{profile.disc.underStress}</p>
                </div>
                <div className="bg-elevated rounded p-4">
                  <p className="font-mono text-xs text-muted mb-1">Manter em mente</p>
                  <p className="text-sm text-primary/80">{profile.disc.keepInMind}</p>
                </div>
              </div>
            </div>
          </div>

          {/* MBTI */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="mb-5">
              <p className="font-mono text-xs text-mbti tracking-widest uppercase mb-1">16 Personalities</p>
              <h2 className="font-display text-2xl text-primary font-semibold">ENTP-A — O Debatedor</h2>
            </div>
            <div className="space-y-3 mb-6">
              {profile.mbti.dimensions.map((d) => (
                <div key={d.name} className="flex items-center gap-4">
                  <span className="text-xs text-muted w-24 shrink-0">{d.name}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-mbti/70"
                        style={{ width: `${d.score}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-primary w-16 shrink-0">{d.preference}</span>
                    <span className="font-mono text-xs text-muted w-8">{d.score}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-3">Forças</p>
                <ul className="space-y-1.5">
                  {profile.mbti.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-primary/80">
                      <span className="text-mbti font-medium">{s.name}</span>
                      <span className="text-muted"> — {s.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-3">Desafios</p>
                <ul className="space-y-1.5">
                  {profile.mbti.weaknesses.map((w, i) => (
                    <li key={i} className="text-xs text-primary/80">
                      <span className="text-primary/60 font-medium">{w.name}</span>
                      <span className="text-muted"> — {w.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Big Five */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="mb-5">
              <p className="font-mono text-xs text-bigfive tracking-widest uppercase mb-1">Big Five</p>
              <h2 className="font-display text-2xl text-primary font-semibold">OCEAN — Subfatores Detalhados</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.bigFive.details.map((f) => (
                <div key={f.code} className="border border-border rounded p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold" style={{ color: f.color }}>{f.code}</span>
                    <span className="text-sm text-primary font-medium">{f.factor}</span>
                    <span className="ml-auto font-mono text-xs text-primary">{f.score}</span>
                  </div>
                  <p className="text-xs text-muted mb-3">{f.level}</p>
                  <div className="space-y-2 mb-3">
                    {f.subfactors.map((sf) => (
                      <SubfactorRow key={sf.name} name={sf.name} score={sf.score} />
                    ))}
                  </div>
                  {f.paradox && (
                    <div className="border-t border-border pt-3 mt-3">
                      <p className="text-xs text-accent/80 leading-relaxed">{f.paradox}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Eneagrama */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="mb-5">
              <p className="font-mono text-xs text-enneagram tracking-widest uppercase mb-1">Eneagrama</p>
              <h2 className="font-display text-2xl text-primary font-semibold">Tipo 1w2 · Tritipo 1-3-7</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="bg-elevated rounded p-4">
                  <p className="font-mono text-xs text-muted mb-1">Medo Central</p>
                  <p className="text-sm text-primary/80">{profile.enneagram.coreFear}</p>
                </div>
                <div className="bg-elevated rounded p-4">
                  <p className="font-mono text-xs text-muted mb-1">Desejo Central</p>
                  <p className="text-sm text-primary/80">{profile.enneagram.coreDesire}</p>
                </div>
                <div className="bg-elevated rounded p-4">
                  <p className="font-mono text-xs text-muted mb-1">Tritipo 1-3-7</p>
                  <p className="text-sm text-primary/80">{profile.enneagram.tritypeInterpretation}</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <p className="text-xs text-muted uppercase tracking-widest mb-3">Scores por Tipo</p>
                  <div className="space-y-2">
                    {profile.enneagram.typeScores
                      .sort((a, b) => b.score - a.score)
                      .map((t) => (
                        <div key={t.type} className="flex items-center gap-3">
                          <span className="font-mono text-xs text-muted w-4">{t.type}</span>
                          <span className="text-xs text-primary/70 w-24">{t.label}</span>
                          <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-enneagram/60"
                              style={{ width: `${t.score}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs text-primary w-8 text-right">{t.score}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-accent-alt uppercase tracking-widest mb-2">Florescendo</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.enneagram.thriving.map((t, i) => (
                    <span key={i} className="text-xs bg-elevated border border-border rounded px-2 py-0.5 text-primary/80">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-primary/40 uppercase tracking-widest mb-2">Sob Estresse</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.enneagram.underStress.map((t, i) => (
                    <span key={i} className="text-xs bg-elevated border border-border rounded px-2 py-0.5 text-muted">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
