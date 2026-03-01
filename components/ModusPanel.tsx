"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useHugoState } from "./StateContext";
import StateToggle from "./StateToggle";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ModusPanel({ open, onClose }: Props) {
  const { config } = useHugoState();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            key="panel"
            className="fixed top-0 right-0 bottom-0 z-50 w-[420px] max-w-[95vw] bg-bg border-l border-border overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-bg/95 backdrop-blur-sm"
              style={{ borderBottomColor: `${config.color}30` }}
            >
              <div>
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-0.5">
                  Modus Operandi
                </p>
                <p className="font-display text-lg font-semibold" style={{ color: config.color }}>
                  {config.label}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted hover:text-primary transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <StateToggle />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
