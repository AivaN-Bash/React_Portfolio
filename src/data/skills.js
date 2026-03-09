// ============================================================
// ✏️  YOUR SKILLS — Edit levels, names, tags here
// ============================================================
const SKILLS = {
  backend: {
    label: "Backend Systems", icon: "⬡", arcana: "THE TOWER",
    items: [
      { name: "Node.js / Express", level: 88, tag: "Advanced"     },
      { name: "Python / FastAPI",  level: 82, tag: "Advanced"     },
      { name: "REST API Design",   level: 90, tag: "Expert"       },
      { name: "GraphQL",           level: 70, tag: "Intermediate" },
      { name: "WebSockets",        level: 72, tag: "Intermediate" },
      { name: "Microservices",     level: 68, tag: "Intermediate" },
    ],
  },
  database: {
    label: "Database & Storage", icon: "◈", arcana: "THE HERMIT",
    items: [
      { name: "PostgreSQL",       level: 85, tag: "Advanced"     },
      { name: "MongoDB",          level: 80, tag: "Advanced"     },
      { name: "Redis",            level: 74, tag: "Intermediate" },
      { name: "MySQL",            level: 78, tag: "Intermediate" },
      { name: "Prisma / ORM",     level: 82, tag: "Advanced"     },
      { name: "Database Design",  level: 80, tag: "Advanced"     },
    ],
  },
  devops: {
    label: "DevOps & Tools", icon: "◉", arcana: "THE STAR",
    items: [
      { name: "Git / GitHub",    level: 92, tag: "Expert"       },
      { name: "Docker",          level: 75, tag: "Intermediate" },
      { name: "Linux / Bash",    level: 80, tag: "Advanced"     },
      { name: "AWS / Cloud",     level: 68, tag: "Intermediate" },
      { name: "CI/CD Pipelines", level: 70, tag: "Intermediate" },
      { name: "Jest / Testing",  level: 76, tag: "Intermediate" },
    ],
  },
};

export default SKILLS;
