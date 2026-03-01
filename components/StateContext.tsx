"use client";
import { createContext, useContext, useState } from "react";

export type ModusId = "pressao" | "operacional" | "flow";

export interface Trigger {
  id: string;
  label: string;
}

export interface ActivePattern {
  framework: string;
  pattern: string;
  intensity: "alta" | "média" | "baixa";
  warning?: string;
}

export interface ModusConfig {
  id: ModusId;
  label: string;
  sublabel: string;
  color: string;
  colorMuted: string;
  description: string;
  traits: string[];
  triggers: Trigger[];
  activePatterns: (triggerId?: string) => ActivePattern[];
  protocol: string[];
  pageAdaptation: {
    overview: { focus: string; highlight: "strengths" | "blindspots" | "balanced" };
    communication: { mode: "emergency" | "standard" | "expanded"; headline: string };
    simulations: { filter: "high-stress" | "all" | "opportunity" };
  };
  enneagramArrow: string;
}

export const modusConfig: Record<ModusId, ModusConfig> = {
  pressao: {
    id: "pressao",
    label: "Sob Pressão",
    sublabel: "Padrões de estresse ativos",
    color: "#C48BB4",
    colorMuted: "#C48BB420",
    description: "Flecha para o Tipo 4 ativa. DISC D no controle. Crítico interno no máximo.",
    traits: ["Dogmático", "Impaciente", "Controlador", "Repreendendo", "Obsessivo", "Autocrítico", "Fechado"],
    triggers: [
      { id: "conflito", label: "Conflito interpessoal" },
      { id: "prazo", label: "Pressão de prazo" },
      { id: "critica", label: "Crítica recebida" },
      { id: "sobrecarga", label: "Sobrecarga de trabalho" },
      { id: "decisao", label: "Decisão difícil" },
      { id: "microgestao", label: "Microgestão / perda de autonomia" },
    ],
    activePatterns: (triggerId) => {
      const base: ActivePattern[] = [
        {
          framework: "Eneagrama 1 → 4",
          pattern: "Flecha de estresse ativa — melancolia, sensação de não ser compreendido",
          intensity: "alta",
          warning: "Autocrítica severa e fechamento emocional como resposta ao ambiente",
        },
        {
          framework: "DISC D",
          pattern: "Modo fight ativo — resposta instintiva de confronto e controle",
          intensity: "alta",
          warning: "Risco de atropelar processos e pessoas em nome da eficiência",
        },
        {
          framework: "Power HIGH",
          pattern: "Necessidade de controle maximizada — 'não entra no carro se não está dirigindo'",
          intensity: "alta",
        },
        {
          framework: "Raiva reprimida (Tipo 1)",
          pattern: "Vaza como crítica, impaciência e passivo-agressividade",
          intensity: "alta",
          warning: "As pessoas ao redor percebem antes de você",
        },
      ];

      const triggerPatterns: Record<string, ActivePattern[]> = {
        conflito: [
          { framework: "Eneagrama 8 (95%)", pattern: "Acesso fácil à contra-ataque — não solta o argumento", intensity: "alta", warning: "Conflitos menores escalam para disputas de princípio" },
          { framework: "ENTP Escalation", pattern: "Debate a posição mesmo quando não acredita mais nela", intensity: "média" },
        ],
        prazo: [
          { framework: "Realizacao-Esforço 19", pattern: "Workaholic mode — qualidade de decisão cai com exaustão", intensity: "alta", warning: "Burnout risk ativo" },
          { framework: "Ordem 12", pattern: "Sistemas colapsam sob pressão — opera no modo caótico", intensity: "média" },
        ],
        critica: [
          { framework: "Eneagrama 1 — Medo Central", pattern: "Crítica ao trabalho = ameaça à identidade. Defensividade ativa.", intensity: "alta" },
          { framework: "Tipo 3 (97%)", pattern: "Imagem ameaçada — pode racionalizar para provar que o crítico estava errado", intensity: "alta" },
        ],
        sobrecarga: [
          { framework: "ENTP + Easily Distracted", pattern: "Atenção dispersa em múltiplas frentes sem fechar nenhuma", intensity: "alta" },
          { framework: "Atividade 17", pattern: "Múltiplas atividades simultâneas além do limite sustentável", intensity: "média", warning: "Decisões de baixa qualidade aumentam" },
        ],
        decisao: [
          { framework: "Cauatela 12 (neutro)", pattern: "Decide e age sem análise de downside suficiente", intensity: "média" },
          { framework: "Eneagrama 1 Paralisia", pattern: "Se a decisão não é clara e moralmente certa, trava", intensity: "alta" },
        ],
        microgestao: [
          { framework: "Individualístico HIGH", pattern: "Autonomia violada — resistência intensa e imediata", intensity: "alta", warning: "Pode destruir relação importante em reação à perda de controle" },
          { framework: "Power HIGH", pattern: "'Não entra no carro se não está dirigindo' — tensão máxima", intensity: "alta" },
        ],
      };

      return triggerId && triggerPatterns[triggerId]
        ? [...base, ...triggerPatterns[triggerId]]
        : base;
    },
    protocol: [
      "Antes de qualquer resposta: fazer uma pergunta — não uma afirmação",
      "Nomear o estado internamente: 'Estou em pressão. Minha reação atual pode ser distorcida.'",
      "Atrasar 10 minutos qualquer comunicação importante — o DISC D em pressão lança mensagens que o Normal se arrepende",
      "Identificar: isso é fato ou é o crítico interno interpretando como catástrofe?",
    ],
    pageAdaptation: {
      overview: { focus: "O que proteger agora", highlight: "blindspots" },
      communication: { mode: "emergency", headline: "Protocolo de emergência — como interagir com Hugo agora" },
      simulations: { filter: "high-stress" },
    },
    enneagramArrow: "→ Tipo 4: melancolia, fechamento, autocrítica severa",
  },

  operacional: {
    id: "operacional",
    label: "Operacional",
    sublabel: "Estado base funcional",
    color: "#C4A882",
    colorMuted: "#C4A88220",
    description: "Operando no modo base — assertivo, racional, orientado a padrões e resultados.",
    traits: ["Assertivo", "Focado", "Analítico", "Criterioso", "Orientado a resultados", "Confiável"],
    triggers: [
      { id: "neutro", label: "Dia normal de trabalho" },
      { id: "projeto", label: "Projeto em andamento" },
      { id: "reuniao", label: "Série de reuniões" },
    ],
    activePatterns: () => [
      { framework: "DISC Assessor (DI/IC)", pattern: "Balanceando pessoas e controle de qualidade no modo padrão", intensity: "média" },
      { framework: "ENTP-A", pattern: "Gerador de ideias ativo, adapta-se ao contexto conforme necessário", intensity: "média" },
      { framework: "Eneagrama 1", pattern: "Crítico interno presente mas manejável — motor de qualidade", intensity: "média" },
      { framework: "Conscienciosidade 91", pattern: "Drive de realização ativo — produtivo e confiável", intensity: "média" },
    ],
    protocol: [
      "Verificar: há decisões abertas que precisam de closure hoje?",
      "Identificar a tarefa de maior impacto — o ENTP dispersa sem âncora",
      "Checar o estado de quem você vai interagir — adaptar comunicação proativamente",
    ],
    pageAdaptation: {
      overview: { focus: "Visão balanceada", highlight: "balanced" },
      communication: { mode: "standard", headline: "Como interagir com Hugo" },
      simulations: { filter: "all" },
    },
    enneagramArrow: "Estado neutro — acesso tanto ao 4 quanto ao 7",
  },

  flow: {
    id: "flow",
    label: "Flow",
    sublabel: "Alto funcionamento",
    color: "#7C9E8F",
    colorMuted: "#7C9E8F20",
    description: "Flecha de crescimento para o Tipo 7 ativa. Criativo, leve, generoso. Superpoderes no pico.",
    traits: ["Justo", "Ético", "Confiável", "Autoconsciente", "Respeitoso", "Inspirador", "Espontâneo", "Generoso"],
    triggers: [
      { id: "projeto-estimulante", label: "Projeto intelectualmente estimulante" },
      { id: "conquista", label: "Conquista ou resultado recente" },
      { id: "autonomia", label: "Autonomia plena no trabalho" },
      { id: "conexao", label: "Conexão profunda com alguém" },
      { id: "aprendizado", label: "Aprendendo algo novo" },
    ],
    activePatterns: (triggerId) => {
      const base: ActivePattern[] = [
        { framework: "Eneagrama 1 → 7", pattern: "Flecha de crescimento ativa — espontâneo, leve, aproveita o processo", intensity: "alta" },
        { framework: "Intelecto 18 + ENTP", pattern: "Gerador de ideias no pico — conexões criativas e visão estratégica clara", intensity: "alta" },
        { framework: "Simpatia 19 + Emoções Positivas 18", pattern: "Magnetismo social máximo — pessoas se energizam na sua presença", intensity: "alta" },
        { framework: "Autoeficácia 18 + Assertivo 61%", pattern: "Confiança calibrada — decisivo sem rigidez", intensity: "alta" },
      ];

      const triggerPatterns: Record<string, ActivePattern[]> = {
        "projeto-estimulante": [
          { framework: "Teórico HIGH + Intelecto 18", pattern: "Modo de investigação profunda — persiste até resolver completamente", intensity: "alta" },
        ],
        conquista: [
          { framework: "Tipo 3 (97%) saudável", pattern: "Realização integrada — celebra sem ansiedade pelo próximo objetivo", intensity: "média" },
        ],
        autonomia: [
          { framework: "Individualístico HIGH", pattern: "Liberdade de método ativa — performance no máximo quando sem restrições", intensity: "alta" },
        ],
        conexao: [
          { framework: "1w2 — Asa 2", pattern: "Compaixão genuína ativa — liderança relacional no pico", intensity: "alta" },
        ],
        aprendizado: [
          { framework: "Autodevelopment 19/20", pattern: "Estado de absorção total — Quick Learner ativado, foco natural", intensity: "alta" },
        ],
      };

      return triggerId && triggerPatterns[triggerId]
        ? [...base, ...triggerPatterns[triggerId]]
        : base;
    },
    protocol: [
      "Capturar as ideias que surgem agora — o ENTP em flow gera ouro que o Normal não consegue reproduzir",
      "Usar esse estado para as conversas difíceis que você vem adiando",
      "Registrar o que gerou esse estado — para replicar conscientemente",
      "Atenção: em flow o otimismo 19/20 pode exagerar estimativas — calibrar com dados",
    ],
    pageAdaptation: {
      overview: { focus: "Oportunidades de impacto", highlight: "strengths" },
      communication: { mode: "expanded", headline: "Hugo em Flow — como aproveitar esse estado nas relações" },
      simulations: { filter: "opportunity" },
    },
    enneagramArrow: "→ Tipo 7: espontaneidade, leveza, alegria no processo",
  },
};

// ─── Context ────────────────────────────────────────────────────────────────

interface ModusState {
  modus: ModusId;
  triggerId?: string;
  setModus: (m: ModusId) => void;
  setTrigger: (t: string | undefined) => void;
  config: ModusConfig;
  patterns: ActivePattern[];
}

const ModusContext = createContext<ModusState>({
  modus: "operacional",
  triggerId: undefined,
  setModus: () => {},
  setTrigger: () => {},
  config: modusConfig.operacional,
  patterns: modusConfig.operacional.activePatterns(),
});

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [modus, setModusState] = useState<ModusId>("operacional");
  const [triggerId, setTriggerState] = useState<string | undefined>(undefined);

  const setModus = (m: ModusId) => {
    setModusState(m);
    setTriggerState(undefined);
  };
  const setTrigger = (t: string | undefined) => setTriggerState(t);

  const config = modusConfig[modus];
  const patterns = config.activePatterns(triggerId);

  return (
    <ModusContext.Provider value={{ modus, triggerId, setModus, setTrigger, config, patterns }}>
      {children}
    </ModusContext.Provider>
  );
}

export function useHugoState() {
  return useContext(ModusContext);
}

// Legacy compat
export const stateConfig = modusConfig;
export type HugoState = ModusId;
