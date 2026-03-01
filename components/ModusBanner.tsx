"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useHugoState } from "./StateContext";

export default function ModusBanner() {
  const { modus, triggerId, config } = useHugoState();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modus + (triggerId ?? "")}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.2 }}
        className="mb-8 flex items-center gap-3 px-4 py-2.5 rounded-lg border text-xs"
        style={{ borderColor: `${config.color}25`, background: `${config.color}06` }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
          style={{ backgroundColor: config.color }}
        />
        <span style={{ color: config.color }} className="font-mono font-semibold uppercase tracking-wider">
          {config.label}
        </span>
        {triggerId && (
          <>
            <span className="text-muted">·</span>
            <span className="text-muted">
              {config.triggers.find((t) => t.id === triggerId)?.label}
            </span>
          </>
        )}
        <span className="text-muted ml-auto hidden md:block">{config.description}</span>
      </motion.div>
    </AnimatePresence>
  );
}
