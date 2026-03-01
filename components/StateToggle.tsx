"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useHugoState, modusConfig, type ModusId } from "./StateContext";

const modus: ModusId[] = ["pressao", "operacional", "flow"];

const intensityColor: Record<string, string> = {
  alta: "#C48BB4",
  média: "#C4A882",
  baixa: "#7C9E8F",
};

export default function StateToggle() {
  const { modus: activeModus, triggerId, setModus, setTrigger, config, patterns } =
    useHugoState();

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {/* ── Modus selector ── */}
      <div className="flex items-center gap-2 bg-surface border border-border rounded-xl p-1">
        {modus.map((m) => {
          const c = modusConfig[m];
          const isActive = activeModus === m;
          return (
            <button
              key={m}
              onClick={() => setModus(m)}
              className="relative flex-1 flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors"
              style={{ color: isActive ? c.color : "#555" }}
            >
              {isActive && (
                <motion.div
                  layoutId="modus-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ backgroundColor: c.colorMuted, border: `1px solid ${c.color}40` }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                />
              )}
              <span className="relative z-10 font-semibold tracking-wide">{c.label}</span>
              <span className="relative z-10 text-[10px] opacity-60">{c.sublabel}</span>
            </button>
          );
        })}
      </div>

      {/* ── Trigger selector ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModus + "-triggers"}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-2"
        >
          <p className="text-[11px] text-muted uppercase tracking-widest">
            Gatilho ativo
          </p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setTrigger(undefined)}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors"
              style={
                !triggerId
                  ? {
                      backgroundColor: config.colorMuted,
                      borderColor: config.color + "60",
                      color: config.color,
                    }
                  : { borderColor: "#333", color: "#555" }
              }
            >
              nenhum
            </button>
            {config.triggers.map((t) => {
              const isActive = triggerId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTrigger(isActive ? undefined : t.id)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors"
                  style={
                    isActive
                      ? {
                          backgroundColor: config.colorMuted,
                          borderColor: config.color + "60",
                          color: config.color,
                        }
                      : { borderColor: "#333", color: "#555" }
                  }
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Active patterns ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModus + "-" + (triggerId ?? "base")}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.22 }}
          className="flex flex-col gap-2"
        >
          <p className="text-[11px] text-muted uppercase tracking-widest">
            Padrões ativos
          </p>
          <div className="flex flex-col gap-1.5">
            {patterns.map((p, i) => (
              <motion.div
                key={p.framework + i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col gap-0.5 bg-surface border border-border rounded-lg px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold text-muted uppercase tracking-wide">
                    {p.framework}
                  </span>
                  <span
                    className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: intensityColor[p.intensity] + "20",
                      color: intensityColor[p.intensity],
                    }}
                  >
                    {p.intensity}
                  </span>
                </div>
                <p className="text-xs text-primary leading-snug">{p.pattern}</p>
                {p.warning && (
                  <p className="text-[10px] mt-0.5 leading-snug" style={{ color: "#C48BB4" }}>
                    ⚠ {p.warning}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Protocol ── */}
      <div className="flex flex-col gap-2">
        <p className="text-[11px] text-muted uppercase tracking-widest">
          Protocolo imediato
        </p>
        <div className="flex flex-col gap-1.5">
          {config.protocol.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-2.5 items-start bg-surface border border-border rounded-lg px-3 py-2"
            >
              <span
                className="text-[10px] font-bold mt-px shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: config.colorMuted,
                  color: config.color,
                }}
              >
                {i + 1}
              </span>
              <p className="text-xs text-primary leading-snug">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Enneagram arrow ── */}
      <p className="text-[11px] text-muted italic" style={{ color: config.color + "99" }}>
        {config.enneagramArrow}
      </p>
    </div>
  );
}
