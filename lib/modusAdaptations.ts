// Modus-specific adaptations per page section
// Grounded in Atlas analysis: Caine & Caine 12 Principles, AGES Model,
// Cognitive Load Theory (Sweller), Andragogia (Knowles), Heutagogia (Hase & Kenyon)

export type ModusKey = "pressao" | "operacional" | "flow";

// ─── INSTRUMENTOS ────────────────────────────────────────────────────────────

export interface InstrumentStatus {
  name: string;
  code: string;
  color: string;
  status: "dominante" | "suprimido" | "distorcido" | "balanceado" | "pico";
  statusLabel: string;
  what: string;
  why: string;
}

export const instrumentosPorModus: Record<ModusKey, InstrumentStatus[]> = {
  pressao: [
    {
      name: "DISC Dominância (D)",
      code: "DISC D",
      color: "#C48BB4",
      status: "dominante",
      statusLabel: "⬆ dominante",
      what: "Fight mode ativo. Decisões unilaterais, controle maximizado.",
      why: "Ameaça → amígdala sequestra o prefrontal → resposta instintiva de confronto.",
    },
    {
      name: "DISC Influência (I)",
      code: "DISC I",
      color: "#555",
      status: "suprimido",
      statusLabel: "⬇ suprimido",
      what: "Calor social colapsa. Pessoas viram obstáculos, não aliados.",
      why: "Oxitocina cai sob cortisol alto. O I exige custo emocional que o cérebro não paga em ameaça.",
    },
    {
      name: "Eneagrama Sombra 8",
      code: "E8 shadow",
      color: "#C48BB4",
      status: "dominante",
      statusLabel: "⬆ ativo",
      what: "Counter-attack. Não solta o argumento. Conflito vira disputa de princípio.",
      why: "Acesso ao 8 em 95% — sob pressão, o 8 domina o 1.",
    },
    {
      name: "Eneagrama 1→4 Flecha",
      code: "E1 → 4",
      color: "#C48BB4",
      status: "dominante",
      statusLabel: "⬆ ativo",
      what: "Melancolia, 'ninguém entende', autocrítica severa.",
      why: "Flecha de estresse do Tipo 1. Ativada quando o ambiente não corresponde ao ideal.",
    },
    {
      name: "Big Five Agreeableness",
      code: "A:84",
      color: "#555",
      status: "suprimido",
      statusLabel: "⬇ cai",
      what: "Cooperação suprimida. Empatia vira crítica. Colaboração reduzida.",
      why: "Power HIGH overwhelms Cooperation 17 quando cortisol sobe.",
    },
    {
      name: "MBTI Thinking (T)",
      code: "MBTI T",
      color: "#C48BB4",
      status: "dominante",
      statusLabel: "⬆ T sobre F",
      what: "Feeling suprimido. Decisões puramente lógicas sem considerar impacto emocional.",
      why: "Amígdala sob stress bloqueia circuitos de perspectiva social.",
    },
  ],
  operacional: [
    {
      name: "DISC Assessor (DI/IC)",
      code: "DISC DI/IC",
      color: "#C4A882",
      status: "balanceado",
      statusLabel: "↔ balanceado",
      what: "D + I + C em tensão saudável. Assertivo + persuasivo + criterioso.",
      why: "Estado de alerta relaxado (Caine & Caine): prefrontal online, amígdala regulada.",
    },
    {
      name: "ENTP Gerador",
      code: "ENTP-A",
      color: "#7C9E8F",
      status: "balanceado",
      statusLabel: "↔ ativo",
      what: "Gerador de ideias online. Adaptável ao contexto. Debate produtivo.",
      why: "Dopamina estabilizada. Novidade disponível sem urgência bloqueando.",
    },
    {
      name: "Eneagrama 1w2 Saudável",
      code: "E1w2",
      color: "#C4A882",
      status: "balanceado",
      statusLabel: "↔ integrado",
      what: "Motor de qualidade, não punição. Ajuda de posição de força.",
      why: "Asa 2 acessível. Tipo 1 não no modo defensivo.",
    },
    {
      name: "Big Five Conscientiousness",
      code: "C:91",
      color: "#C4A882",
      status: "balanceado",
      statusLabel: "↔ como produtividade",
      what: "Drive de realização ativo. Confiável, segue through nos compromissos.",
      why: "Carga cognitiva ótima → schema-building funcional.",
    },
    {
      name: "Motivadores Teórico + Econômico",
      code: "Teórico HIGH",
      color: "#C4A882",
      status: "balanceado",
      statusLabel: "↔ combustível",
      what: "Desejo de entender completamente + prova de competência como motor.",
      why: "Sem urgência, o Teórico explora. Com urgência, comprime.",
    },
  ],
  flow: [
    {
      name: "ENTP em Pico",
      code: "ENTP-A",
      color: "#7C9E8F",
      status: "pico",
      statusLabel: "⬆⬆ 6 superpoderes",
      what: "Gerador, improvisador, persuasivo, quick learner, energizador, pensador independente — todos ativos.",
      why: "Dopamina + Serotonina + BDNF elevados. Novelty + purpose alignment.",
    },
    {
      name: "Eneagrama 1→7 Flecha Crescimento",
      code: "E1 → 7",
      color: "#7C9E8F",
      status: "pico",
      statusLabel: "⬆⬆ flecha ativa",
      what: "Leveza, espontaneidade, aproveita o processo. Alegria na execução.",
      why: "Flecha de crescimento do Tipo 1. Aparece quando Hugo está seguro + estimulado.",
    },
    {
      name: "Tritipo 1-3-7 Integrado",
      code: "Tritipo",
      color: "#7C9E8F",
      status: "pico",
      statusLabel: "⬆⬆ alinhado",
      what: "Reformador + Realizador + Entusiasta em sincronia. Visão + execução + alegria.",
      why: "Todos os três tipos servem o mesmo vetor. Sem conflito interno.",
    },
    {
      name: "Big Five Integrado",
      code: "E:93 C:91 A:84",
      color: "#7C9E8F",
      status: "pico",
      statusLabel: "⬆⬆ todos integrados",
      what: "E, C, A, O todos elevados e não competindo. Completo sem paradoxo.",
      why: "Oxitocina + dopamina: circuitos sociais E executivos simultaneamente ativos.",
    },
    {
      name: "DISC I Social Peak",
      code: "DISC I",
      color: "#7C9E8F",
      status: "pico",
      statusLabel: "⬆⬆ magnetismo",
      what: "Simpatia 19/20, Emoções Positivas 18/20. Liderança relacional no topo.",
      why: "Oxitocina elevada. Mirror neurons plenos. Contágio emocional positivo.",
    },
  ],
};

// ─── PARADOXOS ───────────────────────────────────────────────────────────────

export interface ParadoxModus {
  id: string;
  status: "explode" | "tensao" | "superpoder";
  label: string;
  description: string;
}

export const paradoxosPorModus: Record<ModusKey, ParadoxModus[]> = {
  pressao: [
    {
      id: "empatia-critica",
      status: "explode",
      label: "Empatia → Crítica",
      description: "DISC I colapsa. Calor emocional se converte em julgamento. As pessoas percebem antes de você.",
    },
    {
      id: "conexao-fechamento",
      status: "explode",
      label: "Quer conexão → Fecha",
      description: "Flecha ao Tipo 4 ativa. Isolamento interno como proteção. Quanto mais precisa, mais fecha.",
    },
    {
      id: "exigencia-paralisia",
      status: "explode",
      label: "Autoexigência → Paralisia",
      description: "Se a decisão não tiver saída moralmente clara, trava. O perfeccionismo do Tipo 1 encontra a urgência e explode.",
    },
    {
      id: "lider-nao-ouve",
      status: "explode",
      label: "Líder que não ouve",
      description: "'Ouve para concordar ou discordar, não para entender.' Máximo sob pressão. Feedback externo bloqueia.",
    },
    {
      id: "entp-escalation",
      status: "explode",
      label: "ENTP Escalation",
      description: "Debate a posição mesmo sem acreditar mais nela. Princípio substitui pragmatismo. Conflito se torna identidade.",
    },
  ],
  operacional: [
    {
      id: "espontaneo-perfeccionista",
      status: "tensao",
      label: "Espontâneo + Perfeccionista",
      description: "Tensão produtiva. Gera output de alta qualidade sem precisar de sistemas rígidos. Excelência adaptativa.",
    },
    {
      id: "visao-execucao",
      status: "tensao",
      label: "Visão + Execução",
      description: "Ambos acessíveis. Big picture + atenção ao detalhe coexistindo sem paralisia.",
    },
    {
      id: "analitico-emocional",
      status: "tensao",
      label: "Analítico + Emocional",
      description: "T e F balanceados. Decisões integrando lógica e impacto humano. Raro no DISC D.",
    },
    {
      id: "autonomia-alinhamento",
      status: "tensao",
      label: "Autonomia + Alinhamento",
      description: "Quer independência de método mas precisa de buy-in do time. Tensão saudável quando gerenciada.",
    },
  ],
  flow: [
    {
      id: "empatia-critica",
      status: "superpoder",
      label: "Exigência com Calor",
      description: "Feedback transformador: alto padrão entregue com genuína conexão emocional. Raro e poderoso.",
    },
    {
      id: "exigencia-leveza",
      status: "superpoder",
      label: "Autoexigência + Leveza",
      description: "Drive sem punição. Tipo 7 libera: excelência through joy. Motor ativo sem custo interno.",
    },
    {
      id: "individual-coletivo",
      status: "superpoder",
      label: "Individual → Coletivo",
      description: "Contribuição única a serviço da visão compartilhada. Altruísmo 19 + Individualístico HIGH integrados.",
    },
    {
      id: "visao-abertura",
      status: "superpoder",
      label: "Visão Disruptiva + Abertura",
      description: "Inovação sem apego ao controle. ENTP + Tipo 7: propõe sem precisar ser o único dono da ideia.",
    },
  ],
};

// ─── COMUNICAÇÃO ──────────────────────────────────────────────────────────────

export interface ComunicacaoModus {
  mode: string;
  headline: string;
  neuroscience: string;
  works: string[];
  breaks: string[];
  receiverExperience: string;
  tip: string;
}

export const comunicacaoPorModus: Record<ModusKey, ComunicacaoModus> = {
  pressao: {
    mode: "Protocolo de Emergência",
    headline: "Como interagir com Hugo agora — modo crise",
    neuroscience: "Amígdala parcialmente ativada. Córtex pré-frontal comprometido. Working memory reduzida. Decisões mais reativas.",
    works: [
      "Closure explícito em decisões — vagueza é intolerável",
      "Dados concretos antes de qualquer outra coisa",
      "Dar ownership do método, não do resultado",
      "Perguntar 'o que você precisa?' antes de sugerir",
      "Ser direto — comunicação densa é bem-vinda",
    ],
    breaks: [
      "Debate filosófico ou abstrato sem ação",
      "Múltiplas opções abertas sem recomendação",
      "Apelar para emoções ('pensa no time')",
      "Sugerir que a abordagem dele pode estar errada",
      "Atrasar decisão para 'refletir melhor'",
    ],
    receiverExperience: "Receptor sente julgamento, pressa, não ser ouvido. Resposta defensiva dos dois lados é o risco real.",
    tip: "Atrasar 10min qualquer comunicação importante. O DISC D em pressão manda mensagens que o Normal se arrepende.",
  },
  operacional: {
    mode: "Guia Padrão",
    headline: "Como interagir com Hugo",
    neuroscience: "Estado de alerta relaxado (Caine & Caine). Córtex pré-frontal online, amígdala regulada. Máxima capacidade cognitiva.",
    works: [
      "Estimulante, crível, action-oriented, com ritmo rápido",
      "Contexto de impacto antes de detalhes operacionais",
      "Perguntas genuínas — ele detecta se é retórica",
      "Feedback estruturado: reconhece esforço + nomeia lacuna",
      "Dar espaço para desenvolver a ideia no próprio ritmo",
    ],
    breaks: [
      "Explicar demais — absorção é rápida",
      "Insistir no seu método sem espaço para o dele",
      "Feedback pessoal (sobre ele, não sobre o trabalho)",
      "Deixar decisões completamente abertas sem âncora",
      "Excluir da estratégia — precisa do porquê",
    ],
    receiverExperience: "Receptor sente: ouvido, direcionado, seguro para contribuir. Hugo cria segurança psicológica neste estado.",
    tip: "Melhor momento para conversas de feedback estruturado e alinhamento estratégico de médio prazo.",
  },
  flow: {
    mode: "Janela Expandida",
    headline: "Hugo em Flow — como aproveitar esse estado nas relações",
    neuroscience: "Dopamina, Serotonina e Oxitocina elevados. BDNF ativo. Full mirror neurons. Energia contagiante — receptores se energizam na presença.",
    works: [
      "Perguntas profundas com curiosidade genuína",
      "Desafios novos e intelectualmente complexos",
      "Conversas difíceis que vinha adiando — melhor janela",
      "Colaboração de igual para igual (não hierarquia)",
      "Explorar sem agenda de resultado imediato",
    ],
    breaks: [
      "Interromper com processo ('como vai documentar isso?')",
      "Estruturar demais a abordagem antes de começar",
      "Tratar como subordinado em vez de par",
      "Limitar escopo artificialmente",
      "Exigir clareza completa antes de explorar",
    ],
    receiverExperience: "Receptor sente: inspirado, incluído, entendido. Energia do estado é contagiante. Use para conexões profundas.",
    tip: "Atenção: otimismo 19/20 pode inflacionar estimativas neste estado. Calibrar com dados antes de comprometer.",
  },
};

// ─── APRENDIZADO ──────────────────────────────────────────────────────────────

export interface AprendizadoModus {
  estado: string;
  headline: string;
  kolb: string;
  agentModel: { label: string; status: "ativo" | "bloqueado" | "parcial"; note: string }[];
  strategies: string[];
  risks: string[];
  neuroscience: string;
  loopLevel: string;
}

export const aprendizadoPorModus: Record<ModusKey, AprendizadoModus> = {
  pressao: {
    estado: "Bloqueado",
    headline: "Aprendizado em modo sobrevivência",
    kolb: "Tático apenas — ação imediata sem reflexão",
    neuroscience: "Caine & Caine Princípio 2: ameaça desliga funções cognitivas superiores. Cognitive Load (Sweller): working memory sequestrada pelo cortisol.",
    agentModel: [
      { label: "Attention", status: "parcial", note: "Estreitada à ameaça — hypervigilância" },
      { label: "Generation", status: "bloqueado", note: "Criatividade suprimida. Só soluções conhecidas." },
      { label: "Emotion", status: "bloqueado", note: "Espiral negativa: frustração → raiva → shutdown" },
      { label: "Spacing", status: "bloqueado", note: "Urgência elimina revisão espaçada. Esquecimento garantido." },
    ],
    strategies: [
      "Protocolos táticos e checklists — ação antes de entendimento",
      "Just-in-time: apenas o que resolve agora",
      "Respostas diretas, não frameworks",
      "Uma próxima ação clara, não opções",
    ],
    risks: [
      "Não cria schemas novos — repete o que já funcionou antes",
      "Quick Learner 19/20 bloqueado",
      "Recusa reflexão ('sem tempo para isso')",
      "Não admite gaps de conhecimento — ameaça = fraqueza",
    ],
    loopLevel: "Single-loop apenas — corrige ação, não questiona premissas",
  },
  operacional: {
    estado: "Ótimo",
    headline: "Estado base de aprendizado adulto",
    kolb: "Convergente (Teoria + Prática) — modelo → teste imediato",
    neuroscience: "Andragogia (Knowles): todos os 6 princípios ativos. Self-Determination Theory (Deci & Ryan): autonomia + competência + relacionamento satisfeitos.",
    agentModel: [
      { label: "Attention", status: "ativo", note: "Foco disponível. Pode direcionar por escolha." },
      { label: "Generation", status: "ativo", note: "Cria conexões próprias. Absorve por aplicação." },
      { label: "Emotion", status: "ativo", note: "Engajamento positivo. Storytelling ressoa." },
      { label: "Spacing", status: "ativo", note: "Revisão espaçada funcional (Ebbinghaus). Retenção real." },
    ],
    strategies: [
      "Debate — testa ideias contra perspectivas opostas",
      "Hands-on: teoria → protótipo → feedback em dias",
      "Ensinar para consolidar (Quick Learner via output)",
      "Leitura + conversação em paralelo — intake híbrido",
      "Autonomia de método com clareza de resultado",
    ],
    risks: [
      "Teórico HIGH + ENTP = rabbit holes sem retorno proporcional",
      "Absorção rápida gera impressão de domínio antes de retenção real",
      "Precisa de âncora de propósito para não dispersar",
    ],
    loopLevel: "Double-loop disponível — questiona premissas quando provocado",
  },
  flow: {
    estado: "Pico — Absorção Total",
    headline: "Heutagogia plena: autodeterminado, não-linear",
    kolb: "Acesso fluido a todos os 4 modos (raro) — EC + OR + CA + EA simultaneamente",
    neuroscience: "BDNF elevado (neuroplasticidade). Dopamina + Novidade. Heutagogia (Hase & Kenyon): autodeterminação completa. Autodevelopment 19/20 no pico.",
    agentModel: [
      { label: "Attention", status: "ativo", note: "Hiperfoco natural. Concentração sem esforço." },
      { label: "Generation", status: "ativo", note: "Conexões criativas emergem sozinhas. Insight mode." },
      { label: "Emotion", status: "ativo", note: "Alegria no processo. Emoção facilita memória de longo prazo." },
      { label: "Spacing", status: "ativo", note: "Memoria múltipla simultânea: episódica + semântica + emocional." },
    ],
    strategies: [
      "Investigação autônoma profunda — deixar ir até resolver completamente",
      "Metacognição: questionar como pensa, não só o que pensa",
      "Capturar em tempo real — o ENTP em flow gera o que o Operacional não reproduz",
      "Teaching others no pico — consolidação máxima",
      "Desafios ambíguos sem resposta única (heutagógico)",
    ],
    risks: [
      "Teórico + ENTP + Easily Distracted = profundidade infinita sem entrega",
      "Otimismo 19/20 infla estimativas — checar com dados antes de comprometer",
      "Quick Learner cria sensação de domínio prematuro em tópicos novos",
    ],
    loopLevel: "Triple-loop ativo: ajusta ação → questiona premissas → avalia o próprio sistema de aprendizado",
  },
};
