// ============================================================
// ✏️  YOUR PROJECTS — Add your real projects here!
// status options: "Live", "In Progress", "Completed"
// ============================================================
const PROJECTS = [
  {
    title:    "REST API Service",
    title_th: "REST API Service",
    desc:     "A scalable REST API built with Node.js and Express. JWT auth, rate limiting, and PostgreSQL integration.",
    desc_th:  "REST API ที่สร้างด้วย Node.js และ Express รองรับ JWT auth, rate limiting และเชื่อมกับ PostgreSQL",
    tags:     ["Node.js", "Express", "PostgreSQL", "JWT"],
    color:    "#00c8ff", icon: "⬡", status: "Completed",
    github:   "https://github.com/yourusername/project1",
    live:     "",
    arcana:   "I",
  },
  {
    title:    "Python Data Pipeline",
    title_th: "Python Data Pipeline",
    desc:     "Automated data pipeline using FastAPI and Python. Processes large datasets with scheduled jobs and monitoring.",
    desc_th:  "ระบบ data pipeline อัตโนมัติด้วย FastAPI และ Python ประมวลผลชุดข้อมูลขนาดใหญ่พร้อม job scheduling",
    tags:     ["Python", "FastAPI", "MongoDB", "Docker"],
    color:    "#7b61ff", icon: "◈", status: "Completed",
    github:   "https://github.com/yourusername/project2",
    live:     "",
    arcana:   "II",
  },
  {
    title:    "Real-time Chat Backend",
    title_th: "ระบบแชท Real-time",
    desc:     "WebSocket-powered real-time messaging backend. Multiple rooms, message history, and user presence.",
    desc_th:  "Backend แชทแบบ real-time ด้วย WebSocket รองรับหลายห้อง ประวัติข้อความ และสถานะออนไลน์",
    tags:     ["Node.js", "WebSockets", "Redis", "MongoDB"],
    color:    "#ffd700", icon: "◉", status: "In Progress",
    github:   "https://github.com/yourusername/project3",
    live:     "",
    arcana:   "III",
  },
  {
    title:    "This Portfolio",
    title_th: "พอร์ตโฟลิโอนี้",
    desc:     "Personal portfolio built with React. Persona 3 Reload inspired UI with custom animations, travel story, and photo slideshow.",
    desc_th:  "พอร์ตโฟลิโอส่วนตัวสร้างด้วย React ดีไซน์แรงบันดาลใจจาก Persona 3 Reload มี animation, หน้าเล่าเรื่อง และ slideshow รูปภาพ",
    tags:     ["React", "CSS", "GitHub Pages"],
    color:    "#ff6b9d", icon: "🌙", status: "Live",
    github:   "https://github.com/yourusername/portfolio",
    live:     "https://yourusername.github.io/portfolio",
    arcana:   "IV",
  },
];

export default PROJECTS;
