// ============================================================
// ✏️  YOUR SKILLS — Edit levels, names, tags here
// Items are sorted highest → lowest within each tab
// ============================================================
const SKILLS = {
  backend: {
    label:    "Backend Systems",
    label_th: "ระบบ Backend",
    icon: "⬡", arcana: "THE TOWER",
    items: [
      { name: "REST API Design",   name_th: "REST API Design",   level: 90, tag: "Expert",       tag_th: "เชี่ยวชาญ"   },
      { name: "Node.js / Express", name_th: "Node.js / Express", level: 88, tag: "Advanced",     tag_th: "ขั้นสูง"      },
      { name: "Python / FastAPI",  name_th: "Python / FastAPI",  level: 82, tag: "Advanced",     tag_th: "ขั้นสูง"      },
      { name: "WebSockets",        name_th: "WebSockets",        level: 72, tag: "Intermediate", tag_th: "ปานกลาง"     },
      { name: "GraphQL",           name_th: "GraphQL",           level: 70, tag: "Intermediate", tag_th: "ปานกลาง"     },
      { name: "Microservices",     name_th: "Microservices",     level: 68, tag: "Intermediate", tag_th: "ปานกลาง"     },
    ],
  },
  database: {
    label:    "Database & Storage",
    label_th: "ฐานข้อมูล",
    icon: "◈", arcana: "THE HERMIT",
    items: [
      { name: "PostgreSQL",      name_th: "PostgreSQL",      level: 85, tag: "Advanced",     tag_th: "ขั้นสูง"  },
      { name: "Prisma / ORM",    name_th: "Prisma / ORM",    level: 82, tag: "Advanced",     tag_th: "ขั้นสูง"  },
      { name: "MongoDB",         name_th: "MongoDB",         level: 80, tag: "Advanced",     tag_th: "ขั้นสูง"  },
      { name: "Database Design", name_th: "ออกแบบฐานข้อมูล", level: 80, tag: "Advanced",     tag_th: "ขั้นสูง"  },
      { name: "MySQL",           name_th: "MySQL",           level: 78, tag: "Intermediate", tag_th: "ปานกลาง" },
      { name: "Redis",           name_th: "Redis",           level: 74, tag: "Intermediate", tag_th: "ปานกลาง" },
    ],
  },
  devops: {
    label:    "DevOps & Tools",
    label_th: "DevOps และเครื่องมือ",
    icon: "◉", arcana: "THE STAR",
    items: [
      { name: "Git / GitHub",    name_th: "Git / GitHub",    level: 92, tag: "Expert",       tag_th: "เชี่ยวชาญ" },
      { name: "Linux / Bash",    name_th: "Linux / Bash",    level: 80, tag: "Advanced",     tag_th: "ขั้นสูง"   },
      { name: "Docker",          name_th: "Docker",          level: 75, tag: "Intermediate", tag_th: "ปานกลาง"  },
      { name: "Jest / Testing",  name_th: "Jest / Testing",  level: 76, tag: "Intermediate", tag_th: "ปานกลาง"  },
      { name: "CI/CD Pipelines", name_th: "CI/CD Pipelines", level: 70, tag: "Intermediate", tag_th: "ปานกลาง"  },
      { name: "AWS / Cloud",     name_th: "AWS / Cloud",     level: 68, tag: "Intermediate", tag_th: "ปานกลาง"  },
    ],
  },
};

export default SKILLS;
