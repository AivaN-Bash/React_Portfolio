// ============================================================
// ✏️  YOUR PROJECTS — Add your real projects here!
// ============================================================
// status options: "Live", "In Progress", "Completed"
// ============================================================
const PROJECTS = [
  {
    title:    "REST API Service",           // 🔧 your project name
    desc:     "A scalable REST API built with Node.js and Express. Features JWT authentication, rate limiting, and PostgreSQL integration.",
    tags:     ["Node.js", "Express", "PostgreSQL", "JWT"],
    color:    "#00c8ff",
    icon:     "⬡",
    status:   "Completed",
    github:   "https://github.com/yourusername/project1",  // 🔧
    live:     "",  // 🔧 leave empty if no live demo
    arcana:   "I",
  },
  {
    title:    "Python Data Pipeline",       // 🔧
    desc:     "Automated data pipeline using FastAPI and Python. Processes and transforms large datasets with scheduled jobs and monitoring.",
    tags:     ["Python", "FastAPI", "MongoDB", "Docker"],
    color:    "#7b61ff",
    icon:     "◈",
    status:   "Completed",
    github:   "https://github.com/yourusername/project2",  // 🔧
    live:     "",
    arcana:   "II",
  },
  {
    title:    "Real-time Chat Backend",     // 🔧
    desc:     "WebSocket-powered real-time messaging backend. Supports multiple rooms, message history, and user presence indicators.",
    tags:     ["Node.js", "WebSockets", "Redis", "MongoDB"],
    color:    "#ffd700",
    icon:     "◉",
    status:   "In Progress",
    github:   "https://github.com/yourusername/project3",  // 🔧
    live:     "",
    arcana:   "III",
  },
  {
    title:    "This Portfolio",             // keep this one!
    desc:     "Personal portfolio built with React. Persona 3 Reload inspired UI with custom animations, travel story page, and photo slideshow.",
    tags:     ["React", "CSS", "GitHub Pages"],
    color:    "#ff6b9d",
    icon:     "🌙",
    status:   "Live",
    github:   "https://github.com/yourusername/portfolio",  // 🔧
    live:     "https://yourusername.github.io/portfolio",   // 🔧
    arcana:   "IV",
  },
];

export default PROJECTS;
