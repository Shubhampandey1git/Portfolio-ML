// SkillNetwork.jsx
const isMobile = window.innerWidth < 768;

export const NETWORK_LAYOUT = {
  startX: isMobile ? -1.8 : -6.0,   // wider
  gapX:   isMobile ? 1.2  : 4.0,    // more gap
  rowGap: isMobile ? 0.6  : 1.1,    // taller rows
  offsetY: -0.3,
};

export const COLUMNS = [
  {
    key: "languages",
    label: "LANGUAGES & DATA",
    color: "#00ff66",
    skills: [
      { name: "Python",     projects: ["Visual Cortex", "Agentic Cortex", "Language Cortex"] },
      { name: "C++",        projects: ["Visual Cortex"] },
      { name: "Java",       projects: ["Visual Cortex"] },
      { name: "JavaScript", projects: ["Agentic Cortex"] },
      { name: "SQL",        projects: ["Predictive Cortex"] },
      { name: "MongoDB",    projects: ["Agentic Cortex"] },
    ],
  },
  {
    key: "frameworks",
    label: "FRAMEWORKS & TOOLS",
    color: "#00e5ff",
    skills: [
      { name: "PyTorch",         projects: ["Visual Cortex", "Language Cortex"] },
      { name: "TensorFlow Lite", projects: ["Visual Cortex"] },
      { name: "LangChain",       projects: ["Agentic Cortex"] },
      { name: "React",           projects: ["Agentic Cortex"] },
      { name: "Node.js",         projects: ["Agentic Cortex"] },
      { name: "CameraX",         projects: ["Visual Cortex"] },
    ],
  },
  {
    key: "aiml",
    label: "AI / ML DOMAINS",
    color: "#7b61ff",
    skills: [
      { name: "Computer Vision", projects: ["Visual Cortex"] },
      { name: "YOLO",            projects: ["Visual Cortex"] },
      { name: "NLP",             projects: ["Language Cortex"] },
      { name: "RAG",             projects: ["Agentic Cortex"] },
      { name: "LLMs",            projects: ["Agentic Cortex"] },
      { name: "Embeddings",      projects: ["Agentic Cortex"] },
      { name: "Vector Search",   projects: ["Agentic Cortex"] },
    ],
  },
  {
    key: "outcomes",
    label: "OUTCOMES & IMPACT",
    color: "#ff66ff",
    skills: [
      { name: "Projects",    projects: ["Visual Cortex", "Agentic Cortex", "Language Cortex", "Predictive Cortex"] },
      { name: "Research",    projects: ["Visual Cortex", "Language Cortex"] },
      { name: "AI Engineer", projects: ["All Projects"] },
    ],
  },
];

export function buildSkillNetwork() {
  const nodes = [];
  const headers = [];

  COLUMNS.forEach((column, colIndex) => {
    const x = NETWORK_LAYOUT.startX + colIndex * NETWORK_LAYOUT.gapX;
    const startY = ((column.skills.length - 1) * NETWORK_LAYOUT.rowGap) / 2;

    headers.push({
      position: [x, startY + 0.55 + NETWORK_LAYOUT.offsetY, 0],
      label: column.label,
      color: column.color,
    });

    column.skills.forEach((skill, rowIndex) => {
      nodes.push({
        skill: skill.name,
        projects: skill.projects,
        color: column.color,
        columnIndex: colIndex,
        position: [x, startY - rowIndex * NETWORK_LAYOUT.rowGap + NETWORK_LAYOUT.offsetY, 0],
      });
    });
  });

  return { nodes, headers };
}