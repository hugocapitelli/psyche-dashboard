"use client";
import { profile } from "@/lib/profile";
import AnimatedBar from "./AnimatedBar";

const levelColors = {
  HIGH: "#C4A882",
  NEUTRAL: "#666666",
  LOW: "#3A3A3A",
};

const levelLabels = {
  HIGH: "ALTO",
  NEUTRAL: "NEUTRO",
  LOW: "BAIXO",
};

export default function MotivatorBar() {
  return (
    <div className="space-y-3">
      {profile.motivators.map((m, i) => (
        <div key={m.name}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-primary font-medium">{m.name}</span>
            <span className="text-xs font-mono font-medium" style={{ color: levelColors[m.level] }}>
              {levelLabels[m.level]}
            </span>
          </div>
          <AnimatedBar value={m.score} color={levelColors[m.level]} delay={i * 0.07} />
          <p className="text-xs text-muted mt-0.5">{m.description}</p>
        </div>
      ))}
    </div>
  );
}
