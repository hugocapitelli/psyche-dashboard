"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHugoState, modusConfig, type ModusId } from "./StateContext";
import ModusPanel from "./ModusPanel";
import { useState } from "react";

const links = [
  { href: "/", label: "Visão Geral" },
  { href: "/instrumentos", label: "Instrumentos" },
  { href: "/paradoxos", label: "Paradoxos" },
  { href: "/comunicacao", label: "Comunicação" },
  { href: "/aprendizado", label: "Aprendizado" },
  { href: "/simulacoes", label: "Simulações" },
];

const modus: ModusId[] = ["pressao", "operacional", "flow"];

export default function Nav() {
  const pathname = usePathname();
  const { modus: activeModus, setModus, config } = useHugoState();
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14 gap-6">
          {/* Logo */}
          <span className="font-display text-sm text-accent font-semibold tracking-wide shrink-0">HC</span>

          {/* Page links */}
          <div className="flex items-center gap-0.5 flex-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap",
                  pathname === l.href
                    ? "text-primary bg-elevated"
                    : "text-muted hover:text-primary"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Modus compact switcher */}
          <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1 shrink-0">
            {modus.map((m) => {
              const c = modusConfig[m];
              const isActive = activeModus === m;
              return (
                <button
                  key={m}
                  onClick={() => setModus(m)}
                  className="relative px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap"
                  style={{ color: isActive ? c.color : "#555" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-modus-pill"
                      className="absolute inset-0 rounded"
                      style={{ backgroundColor: c.colorMuted, border: `1px solid ${c.color}40` }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                    />
                  )}
                  <span className="relative z-10">{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* Panel toggle button */}
          <button
            onClick={() => setPanelOpen(true)}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors hover:bg-surface"
            style={{ borderColor: `${config.color}40`, color: config.color }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: config.color }}
            />
            {config.sublabel}
          </button>
        </div>

        {/* Modus color bar */}
        <motion.div
          className="h-px w-full"
          animate={{ backgroundColor: config.color + "60" }}
          transition={{ duration: 0.4 }}
        />
      </nav>

      <ModusPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
