"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { profile } from "@/lib/profile";

const subfactorMap: Record<string, { name: string; subfactors: { name: string; score: number }[]; paradox?: string }> = {};
profile.bigFive.details.forEach((f) => {
  subfactorMap[f.code] = { name: f.factor, subfactors: f.subfactors, paradox: f.paradox };
});

const data = [
  { factor: "E", fullName: "Extroversão", code: "E", value: profile.bigFive.overall.extraversion },
  { factor: "C", fullName: "Conscienciosidade", code: "C", value: profile.bigFive.overall.conscientiousness },
  { factor: "A", fullName: "Amabilidade", code: "A", value: profile.bigFive.overall.agreeableness },
  { factor: "O", fullName: "Abertura", code: "O", value: profile.bigFive.overall.openness },
  { factor: "N*", fullName: "Estabilidade (inv. N)", code: "N", value: 100 - profile.bigFive.overall.neuroticism },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof data[0] }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const info = subfactorMap[d.code];
  const realScore = d.code === "N" ? profile.bigFive.overall.neuroticism : d.value;

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 text-xs max-w-[220px] shadow-xl">
      <p className="text-[#C4A882] font-semibold mb-1">{d.fullName}</p>
      <p className="text-[#E8E0D5] font-mono text-base mb-2">{realScore}</p>
      {info?.subfactors && (
        <div className="space-y-1.5 border-t border-[#2A2A2A] pt-2">
          {info.subfactors.map((sf) => (
            <div key={sf.name} className="flex items-center gap-2">
              <span className="text-[#666] w-20 truncate">{sf.name}</span>
              <div className="flex-1 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#C4A882]/60"
                  style={{ width: `${(sf.score / 20) * 100}%` }}
                />
              </div>
              <span className="text-[#E8E0D5] font-mono w-4 text-right">{sf.score}</span>
            </div>
          ))}
        </div>
      )}
      {info?.paradox && (
        <p className="text-[#C4A882]/70 mt-2 border-t border-[#2A2A2A] pt-2 leading-relaxed">{info.paradox}</p>
      )}
    </div>
  );
}

export default function OceanRadar() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius={85}>
          <PolarGrid stroke="#2A2A2A" />
          <PolarAngleAxis
            dataKey="factor"
            tick={{ fill: "#666666", fontSize: 11, fontFamily: "JetBrains Mono" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="OCEAN"
            dataKey="value"
            stroke="#C4A882"
            fill="#C4A882"
            fillOpacity={0.12}
            strokeWidth={1.5}
            dot={{ fill: "#C4A882", r: 3, strokeWidth: 0 }}
            activeDot={{ fill: "#C4A882", r: 5, strokeWidth: 0 }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-muted mt-1">Hover nos vértices para ver subfatores</p>
    </div>
  );
}
