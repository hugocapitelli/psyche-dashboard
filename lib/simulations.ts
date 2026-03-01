// ============================================================================
// SIMULATION DATA — Hugo Capitelli
// Baseado no perfil psicométrico integrado
// ============================================================================

export interface ScenarioReaction {
  instinct: string;       // O que Hugo faz instintivamente
  thought: string;        // O que passa na cabeça (motivadores)
  risk: string;           // O risco psicométrico dessa situação
  framework: string;      // Qual framework explica a reação
  growth: string;         // Como agir melhor (flecha de crescimento)
  stressLevel: "low" | "medium" | "high";
}

export interface Scenario {
  id: string;
  title: string;
  context: string;
  category: "liderança" | "conflito" | "feedback" | "decisão" | "relacionamento" | "trabalho";
  reactions: {
    disc: ScenarioReaction;
    enneagram: ScenarioReaction;
    mbti: ScenarioReaction;
    synthesis: string;
  };
  growthAction: string;
}

export const scenarios: Scenario[] = [
  {
    id: "critica-construtiva",
    title: "Receber crítica construtiva de um par",
    context: "Um colega de mesmo nível te diz que sua abordagem num projeto está errada e sugere outra direção.",
    category: "feedback",
    reactions: {
      disc: {
        instinct: "Ouve, mas internamente já está formulando o contra-argumento. Pode interromper para corrigir premissas.",
        thought: "\"Será que ele fez o dever de casa? Precisa ser crível.\"",
        risk: "Power HIGH: ouve para concordar/discordar, não para entender. Pode descartar feedback válido.",
        framework: "DISC Power HIGH + Motivador Individualístico",
        growth: "Fazer uma pergunta genuína antes de responder. Atrasar o julgamento por 30 segundos.",
        stressLevel: "medium",
      },
      enneagram: {
        instinct: "O Tipo 1 ativa o crítico interno: \"Ele está certo? Significa que eu errei?\" Defensividade velada.",
        thought: "\"Preciso estar certo. Ser errado é ameaçador para minha integridade.\"",
        risk: "Racionalização: usa o intelecto para provar que o crítico estava errado, em vez de avaliar o mérito.",
        framework: "Eneagrama 1 — medo de ser falho + Tipo 8 (95%): acesso fácil à contra-ataque",
        growth: "Separar 'o feedback sobre o trabalho' de 'julgamento sobre quem sou'. São coisas diferentes.",
        stressLevel: "high",
      },
      mbti: {
        instinct: "ENTP ativa o modo debate. Começa a construir o argumento oposto — talvez até para testar a ideia.",
        thought: "\"Deixa ver se a ideia dele aguenta pressão intelectual.\"",
        risk: "O debate pode parecer rejeição quando era apenas exploração intelectual.",
        framework: "ENTP: Devil's Advocate + Escalating Conflicts",
        growth: "Sinalizar explicitamente: 'Estou explorando, não rejeitando.' Diferenciar debate de ataque.",
        stressLevel: "medium",
      },
      synthesis: "A situação ativa simultaneamente o medo do Tipo 1 (ser falho), o Power HIGH (não aceitar ser corrigido) e o padrão ENTP de contra-argumentar. Resultado provável: rejeição intelectualmente sofisticada de um feedback válido.",
    },
    growthAction: "Antes de responder qualquer crítica, fazer uma pergunta genuína de entendimento. 'O que te fez chegar a essa conclusão?' — sem tom defensivo.",
  },
  {
    id: "reuniao-sem-decisao",
    title: "Reunião que se arrasta sem chegar a uma decisão",
    context: "45 minutos de discussão circular. Ninguém toma posição. O grupo fica dando voltas no mesmo ponto.",
    category: "trabalho",
    reactions: {
      disc: {
        instinct: "Assume o controle da reunião. Começa a direcionar ativamente, forçar convergência, propor a decisão.",
        thought: "\"Por que ninguém está decidindo? Eu decido.\"",
        risk: "Pode atropelar processos legítimos de consenso. Pessoas se sentem silenciadas.",
        framework: "DISC D: fight response, decisividade, controle do ambiente",
        growth: "Perguntar ao grupo 'o que precisamos para decidir?' antes de propor a solução.",
        stressLevel: "high",
      },
      enneagram: {
        instinct: "Impaciência crescente. O Tipo 1 vê a indecisão como 'a coisa errada' — há sempre uma resposta correta.",
        thought: "\"Isso é irresponsável. Decisões importam. Estamos perdendo tempo.\"",
        risk: "O ressentimento acumula. Pode vazar como crítica velada ou tom julgador.",
        framework: "Eneagrama 1: intolerância com o que percebe como irresponsabilidade ou falta de padrão",
        growth: "Reconhecer que consenso tem valor além da eficiência. Nem sempre a decisão mais rápida é a melhor.",
        stressLevel: "high",
      },
      mbti: {
        instinct: "ENTP começa a gerar alternativas para quebrar o impasse. Pode propor ideias radicalmente diferentes só para mover.",
        thought: "\"Se ninguém vai decidir, vou introduzir uma opção que force escolha.\"",
        risk: "As alternativas geradas podem distrair mais do que resolver — rabbit hole coletivo.",
        framework: "ENTP: Gerador de ideias + impaciência com rotina",
        growth: "Antes de gerar novas opções, perguntar: 'Qual é o verdadeiro obstáculo para decidir agora?'",
        stressLevel: "medium",
      },
      synthesis: "Reuniões sem closure são um dos maiores gatilhos de Hugo. O DISC D quer controlar, o Tipo 1 vê como irresponsabilidade, e o ENTP fica entediado. Combinação provável: assume o controle de forma que pode parecer atropelamento.",
    },
    growthAction: "Ter um protocolo pessoal: quando sentir a impaciência subir, fazer uma pergunta de processo antes de propor conteúdo.",
  },
  {
    id: "falha-de-liderado",
    title: "Liderado falha pela terceira vez no mesmo ponto",
    context: "Alguém da sua equipe cometeu o mesmo tipo de erro pela terceira vez. Você já conversou duas vezes antes.",
    category: "liderança",
    reactions: {
      disc: {
        instinct: "Confronto direto. Não mais conselhos — consequências claras. Tom mais duro que o habitual.",
        thought: "\"Já dei a oportunidade. Quem não aprende, não é para o time.\"",
        risk: "O 'mais duro' pode cruzar para 'repreendendo' — estilo que desmotiva em vez de corrigir.",
        framework: "DISC D + Power HIGH: usa posição para conseguir resultado",
        growth: "Antes do confronto, entender se o problema é capacidade, clareza ou motivação. São soluções diferentes.",
        stressLevel: "high",
      },
      enneagram: {
        instinct: "Julgamento moral. O Tipo 1 vê a repetição do erro como falta de comprometimento com qualidade.",
        thought: "\"Se você se importasse, não repetiria. Erro repetido é escolha.\"",
        risk: "Confunde 'falta de padrão' com 'má intenção'. Pode destruir a relação sem resolver o problema.",
        framework: "Eneagrama 1 sob estresse: dogmático, repreendendo, julgador",
        growth: "Separar o comportamento do caráter da pessoa. Atacar o padrão, não a identidade.",
        stressLevel: "high",
      },
      mbti: {
        instinct: "ENTP analisa padrões. 'Por que o erro se repete? Qual o sistema que permite isso?'",
        thought: "\"Há algo estrutural aqui. Qual é a causa raiz real?'",
        risk: "A análise intelectual pode adiar a conversa difícil necessária.",
        framework: "ENTP: análise de padrões + aversão a confronto emocional",
        growth: "Usar a análise de causa raiz como abertura da conversa — com a pessoa, não sobre a pessoa.",
        stressLevel: "low",
      },
      synthesis: "Situação que combina os piores ângulos do Tipo 1 (julgamento moral) com Power HIGH (usa autoridade). Alto risco de feedback destrutivo. A saída é o ENTP — usar análise de sistema como linguagem.",
    },
    growthAction: "Perguntar antes de falar: 'O que eu quero que essa pessoa sinta ao final dessa conversa?' A resposta muda o tom de tudo.",
  },
  {
    id: "mudanca-estrategica",
    title: "Sócio quer mudar completamente a direção estratégica",
    context: "Seu sócio chegou com uma análise que sugere abandonar o que vocês vinham construindo e pivotar para outra coisa.",
    category: "decisão",
    reactions: {
      disc: {
        instinct: "Resistência inicial forte. 'Não entra no carro a menos que esteja dirigindo.' Precisa processar na posição de liderança.",
        thought: "\"Essa ideia é dele. Se eu aceitar assim, estou cedendo o volante.\"",
        risk: "Rejeita a ideia pelo poder, não pelo mérito. Pode perder decisão certa por ego.",
        framework: "DISC Power HIGH: 'Nao entra no carro se não está dirigindo'",
        growth: "Separar explicitamente: 'Estou avaliando o mérito ou estou protegendo controle?' Fazer a pergunta em voz alta.",
        stressLevel: "high",
      },
      enneagram: {
        instinct: "O Tipo 1 + Tipo 3 (97%) entram em tensão. 1: 'E o trabalho que já fizemos?' 3: 'E a imagem de mudar de ideia?'",
        thought: "\"Abandonar significa que erramos. E errar é ameaçador para quem precisa estar correto.\"",
        risk: "Sunk cost fallacy reforçada por medo de estar errado. Fica no caminho errado para não admitir que era errado.",
        framework: "Tritype 1-3-7: o 1 não quer ter errado, o 3 não quer parecer inconstante",
        growth: "Reformular mentalmente: pivotar com base em dados não é erro — é atualização inteligente.",
        stressLevel: "high",
      },
      mbti: {
        instinct: "ENTP fica genuinamente animado com a novidade. Começa a explorar a ideia com entusiasmo.",
        thought: "\"Interessante. Vamos destrinchar isso. Mas tenho que testar se aguenta pressão.\"",
        risk: "O entusiasmo ENTP pode fazer uma análise rasa parecer validação completa.",
        framework: "ENTP: novelty-seeking + reluctant to commit (agora no caminho oposto — entusiasmo prematuro)",
        growth: "Usar o entusiasmo inicial como sinal, não como decisão. Definir critérios de validação antes de avançar.",
        stressLevel: "low",
      },
      synthesis: "Cenário de alta tensão interna. DISC e Eneagrama puxam para resistir, ENTP puxam para abraçar. O resultado real depende de quem 'ganhar' internamente — e geralmente é o DISC/Eneagrama por serem mais profundos.",
    },
    growthAction: "Criar um ritual pessoal para decisões estratégicas: 24h de processamento antes de responder a qualquer proposta de mudança grande. A primeira reação raramente é a melhor.",
  },
  {
    id: "elogio-publico",
    title: "Receber elogio em público inesperado",
    context: "Em uma reunião com clientes, seu sócio te elogia expansivamente na frente de todos por um trabalho recente.",
    category: "feedback",
    reactions: {
      disc: {
        instinct: "Aceita com naturalidade. Pode redirecionar o crédito para o time — não por modéstia, por estratégia de liderança.",
        thought: "\"Isso ajuda minha credibilidade. Mas não posso parecer arrogante.\"",
        risk: "Se o elogio for sobre uma área onde há insegurança, pode ativar a síndrome do impostor.",
        framework: "DISC I: precisa de validação. Image 17/20: cultiva imagem estrategicamente",
        growth: "Aceitar completamente sem minimizar nem redirecionar. Deixar o reconhecimento existir.",
        stressLevel: "low",
      },
      enneagram: {
        instinct: "Desconforto velado. O Tipo 1 não sabe bem como receber elogios — a voz interna já lista o que poderia ter sido melhor.",
        thought: "\"Mas o relatório tinha aquele ponto fraco... Será que ele viu? Não mereço 100%.\"",
        risk: "Minimiza o elogio internamente, perdendo o benefício real do reconhecimento.",
        framework: "Eneagrama 1: o crítico interno não para nem com elogios",
        growth: "Prática deliberada: dizer 'obrigado' simples, sem adicionais. Deixar a afirmação entrar.",
        stressLevel: "medium",
      },
      mbti: {
        instinct: "ENTP-A (Assertive) lida bem com isso. Não catastrofiza nem constrange. Responde com humor ou com genuína gratidão.",
        thought: "\"Legal. Merecido. Próximo assunto.\"",
        risk: "A naturalidade pode parecer indiferença para quem esperava mais reação.",
        framework: "MBTI Assertive 61%: não rumina, não catastrofiza, segue em frente",
        growth: "A facilidade com elogios é um ativo — usar para modelar como o time deve receber feedback positivo.",
        stressLevel: "low",
      },
      synthesis: "Elogios em público são processados de forma ambivalente. O ENTP-A lida bem, mas o Tipo 1 já identificou o que não merecia elogio. O risco é desvalorizar reconhecimento legítimo por autocrítica desproporcionada.",
    },
    growthAction: "Exercício: quando receber um elogio, ficar em silêncio por 3 segundos antes de responder. Apenas receber — não redirecionar, não minimizar, não justificar.",
  },
  {
    id: "ser-microgerenciado",
    title: "Ser microgerenciado por alguém acima de você",
    context: "Um investidor ou sócio sênior começa a pedir updates diários, questionar cada decisão pequena e sugerir abordagens operacionais.",
    category: "conflito",
    reactions: {
      disc: {
        instinct: "Resistência imediata e intensa. 'Ou você confia em mim ou não.' Pode escalar rápido.",
        thought: "\"Isso é uma afronta à minha competência. Não preciso disso.\"",
        risk: "A reação de poder contra poder pode destruir uma relação importante — investidor, sócio, cliente chave.",
        framework: "DISC D + Individualístico HIGH: autonomia de método é não-negociável",
        growth: "Entender o que gerou a necessidade de controle no outro antes de reagir. Provavelmente é ansiedade deles, não desconfiança de você.",
        stressLevel: "high",
      },
      enneagram: {
        instinct: "O Tipo 1 vê como questionamento da sua integridade e competência — as duas coisas mais centrais.",
        thought: "\"Se ele confiasse na minha integridade, não precisaria disso. Está me tratando como incompetente.\"",
        risk: "Interpretação catastrófica de uma ação que pode ser apenas estilo de gestão do outro.",
        framework: "Eneagrama 1: medo de ser visto como inadequado, mais Tipo 8 (95%) — resposta de contra-ataque",
        growth: "Separar: 'Isso é sobre mim ou sobre o estilo/ansiedade dele?' A maioria das vezes é a segunda opção.",
        stressLevel: "high",
      },
      mbti: {
        instinct: "ENTP confronta intelectualmente. Vai questionar a lógica por trás do microgerenciamento.",
        thought: "\"Qual é o modelo de trabalho que justifica esse nível de supervisão?\"",
        risk: "Questionar o framework pode parecer arrogante — 'você está errado por isso e isso.'",
        framework: "ENTP: questiona autoridade quando não há justificativa lógica clara",
        growth: "Usar a habilidade de questionamento de forma colaborativa: 'Como podemos criar um sistema de visibilidade que funcione para os dois?'",
        stressLevel: "medium",
      },
      synthesis: "Uma das situações de mais alto risco do perfil. Autonomia é non-negociável para Hugo. O DISC, o Eneagrama e o MBTI convergem em reação forte. Requer muito trabalho consciente para não escalar.",
    },
    growthAction: "Quando sentir o gatilho da autonomia ativado: fazer uma pergunta antes de qualquer afirmação. 'O que você precisa para se sentir tranquilo com o projeto?' Desloca o frame de poder para parceria.",
  },
];

// ============================================================================
// DECISION SIMULATOR DATA
// ============================================================================

export interface DecisionDimension {
  id: string;
  label: string;
  description: string;
  low: string;
  high: string;
  weight: number; // How much this drives Hugo's engagement
  source: string; // Which framework
}

export const decisionDimensions: DecisionDimension[] = [
  {
    id: "autonomia",
    label: "Autonomia de Método",
    description: "Quanto controle você tem sobre COMO fazer, não apenas o quê",
    low: "Método totalmente prescrito",
    high: "Liberdade total de abordagem",
    weight: 1.4,
    source: "Individualístico HIGH + DISC D",
  },
  {
    id: "complexidade",
    label: "Complexidade Intelectual",
    description: "O problema exige pensamento profundo ou é rotineiro?",
    low: "Tarefa repetitiva e mecânica",
    high: "Problema sem resposta óbvia",
    weight: 1.3,
    source: "Teórico HIGH + Intelecto 18 + ENTP",
  },
  {
    id: "impacto",
    label: "Impacto em Pessoas",
    description: "O resultado afeta pessoas de forma significativa?",
    low: "Impacto somente em sistemas/processos",
    high: "Impacto direto em pessoas que você se importa",
    weight: 1.1,
    source: "Altruísmo 19 + 1w2 + DISC I",
  },
  {
    id: "clareza",
    label: "Clareza de Resultado",
    description: "Você sabe exatamente o que é sucesso nessa situação?",
    low: "Resultado vago e ambíguo",
    high: "Critério de sucesso cristalino",
    weight: 1.2,
    source: "Eneagrama 1 + Econômico HIGH",
  },
  {
    id: "moral",
    label: "Alinhamento Moral",
    description: "Isso está em linha com seus valores e integridade?",
    low: "Conflito com valores pessoais",
    high: "Perfeito alinhamento moral",
    weight: 1.5,
    source: "Eneagrama 1 + Senso de Dever 17",
  },
];

export function calculateEngagement(scores: Record<string, number>): {
  total: number;
  level: "baixo" | "médio" | "alto" | "máximo";
  label: string;
  color: string;
  description: string;
  blindspots: string[];
  flowConditions: string[];
} {
  const weighted = decisionDimensions.reduce((sum, dim) => {
    return sum + (scores[dim.id] ?? 5) * dim.weight;
  }, 0);

  const maxPossible = decisionDimensions.reduce((sum, d) => sum + 10 * d.weight, 0);
  const total = Math.round((weighted / maxPossible) * 100);

  const blindspots: string[] = [];
  if ((scores.autonomia ?? 5) < 4) blindspots.push("Autonomia baixa → risco de resistência passiva ou saída");
  if ((scores.moral ?? 5) < 4) blindspots.push("Conflito moral → pode sabotar inconscientemente");
  if ((scores.complexidade ?? 5) < 3) blindspots.push("Tarefa simples demais → atenção vai diminuir rapidamente");
  if ((scores.clareza ?? 5) < 3) blindspots.push("Sem clareza de resultado → o Tipo 1 vai criar seu próprio critério, nem sempre alinhado");
  if ((scores.impacto ?? 5) > 8 && (scores.moral ?? 5) < 5) blindspots.push("Alto impacto em pessoas com conflito moral → situação de alto estresse");

  const flowConditions: string[] = [];
  if ((scores.autonomia ?? 5) >= 7) flowConditions.push("✓ Autonomia presente — método livre");
  if ((scores.complexidade ?? 5) >= 7) flowConditions.push("✓ Problema intelectualmente estimulante");
  if ((scores.impacto ?? 5) >= 6) flowConditions.push("✓ Impacto real em pessoas");
  if ((scores.clareza ?? 5) >= 7) flowConditions.push("✓ Clareza de resultado");
  if ((scores.moral ?? 5) >= 8) flowConditions.push("✓ Alinhamento moral forte");

  let level: "baixo" | "médio" | "alto" | "máximo";
  let label: string;
  let color: string;
  let description: string;

  if (total >= 80) {
    level = "máximo"; label = "Estado de Flow"; color = "#7C9E8F";
    description = "Todos os motores acesos. Hugo vai operar no pico — criativo, persistente, imbatível. Esse é o perfil de projetos que ele não larga.";
  } else if (total >= 60) {
    level = "alto"; label = "Alto Engajamento"; color = "#C4A882";
    description = "Engajado e capaz. Vai entregar qualidade. Pode haver fricção pontual mas o drive sustenta.";
  } else if (total >= 40) {
    level = "médio"; label = "Engajamento Parcial"; color = "#8B9CC4";
    description = "Vai fazer, mas não vai brilhar. Risco de fazer o mínimo necessário e seguir em frente para algo mais estimulante.";
  } else {
    level = "baixo"; label = "Engajamento Baixo"; color = "#C48BB4";
    description = "Território de risco. Hugo pode completar mas com qualidade comprometida, ressentimento acumulado, ou abandono antes do fim.";
  }

  return { total, level, label, color, description, blindspots, flowConditions };
}

// ============================================================================
// INNER CRITIC ACTIVITY DATA
// ============================================================================

export interface CriticScenario {
  id: string;
  situation: string;
  context: string;
  healthyResponse: string;
  type1Pattern: string;
}

export const criticScenarios: CriticScenario[] = [
  {
    id: "erro-publico",
    situation: "Você cometeu um erro em frente ao time",
    context: "Uma informação errada, uma decisão ruim, ou algo que claramente não deveria ter feito",
    healthyResponse: "Reconhecer, aprender, seguir em frente sem ruminar",
    type1Pattern: "O crítico interno fica em loop por horas. 'Como eu deixei isso acontecer?'",
  },
  {
    id: "bom-suficiente",
    situation: "Entregou algo 'bom o suficiente' mas não perfeito",
    context: "Prazo forçou um resultado que você sabe que poderia ser melhor com mais tempo",
    healthyResponse: "Aceitar que entrega boa no prazo certo supera entrega perfeita fora do tempo",
    type1Pattern: "Continua pensando no que poderia ter sido diferente mesmo depois de entregue",
  },
  {
    id: "pedir-ajuda",
    situation: "Você precisou pedir ajuda para algo que acreditava que deveria saber",
    context: "Admitir que não sabia algo na frente de alguém que você respeita",
    healthyResponse: "Pedir ajuda é sinal de inteligência, não de fraqueza",
    type1Pattern: "Sente que mostrou uma fraqueza. O Tipo 1 'deveria saber' mais coisas.",
  },
  {
    id: "ideia-rejeitada",
    situation: "Sua ideia foi criticada ou rejeitada pelo grupo",
    context: "Você apresentou algo em que acreditava e o grupo não comprou",
    healthyResponse: "A ideia e você são coisas diferentes. Crítica a uma é informação, não julgamento da outra",
    type1Pattern: "Mistura rejeição da ideia com rejeição pessoal. O ENTP debate, mas o Tipo 1 dói.",
  },
  {
    id: "descanso-sem-culpa",
    situation: "Você tirou um dia de folga sem ter 'merecido'",
    context: "Descansou num dia de semana sem ter uma razão produtiva justificável",
    healthyResponse: "Descanso não precisa ser merecido. Faz parte de uma vida sustentável.",
    type1Pattern: "Culpa no background. 'Devia estar trabalhando. Tem tanta coisa por fazer.'",
  },
  {
    id: "comparacao",
    situation: "Você se comparou com alguém que parece mais avançado que você",
    context: "Ver o trabalho ou resultados de alguém da sua área que está 'à frente'",
    healthyResponse: "Comparação é informação sobre onde ir, não sobre onde você deveria estar",
    type1Pattern: "O Econômico HIGH + Eneagrama 3 (97%) ativam: 'Deveria estar mais avançado já.'",
  },
];

export function interpretCriticScore(scores: Record<string, number>): {
  average: number;
  level: string;
  color: string;
  description: string;
  insight: string;
  practice: string;
} {
  const vals = Object.values(scores);
  if (vals.length === 0) return { average: 0, level: "", color: "", description: "", insight: "", practice: "" };

  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;

  if (avg >= 4.2) {
    return {
      average: avg,
      level: "Crítico interno muito ativo",
      color: "#C48BB4",
      description: "O crítico interno está operando no modo de alta vigilância. Cada situação de potencial 'falha' é processada de forma intensa e prolongada.",
      insight: "Isso indica que você provavelmente está no espectro de saúde mais baixo do Eneagrama 1 agora — não como traço permanente, mas como estado atual. O trabalho é começar a questionar o crítico com a mesma inteligência que você usa para questionar tudo mais.",
      practice: "Exercício: quando o crítico aparecer, fazer uma pergunta: 'Isso é fato ou interpretação?' Muitas vezes é interpretação catastrófica vestida de fato.",
    };
  } else if (avg >= 3) {
    return {
      average: avg,
      level: "Crítico interno moderado",
      color: "#C4A882",
      description: "O crítico interno está presente mas manejável. Em algumas situações te empurra para melhorar, em outras cria atrito desnecessário.",
      insight: "Você está operando no espectro médio do Tipo 1 — que é onde a maioria passa a maior parte do tempo. O crítico serve como motor mas às vezes ultrapassa o ponto útil.",
      practice: "Identificar quais das 6 situações tiveram score mais alto — esses são seus gatilhos principais. Criar um 'protocolo' específico para cada um.",
    };
  } else {
    return {
      average: avg,
      level: "Crítico interno integrado",
      color: "#7C9E8F",
      description: "O crítico interno está relativamente integrado. Você consegue processar falhas e imperfeições sem ruminar excessivamente.",
      insight: "Isso indica que você está operando mais próximo do espectro saudável do Eneagrama 1 — ou que as situações apresentadas não foram os seus gatilhos específicos. A flecha de crescimento ao 7 está mais acessível.",
      practice: "Manter: quais práticas ou contextos te permitem esse nível de integração? Documentar para replicar em momentos de estresse.",
    };
  }
}
