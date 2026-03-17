import { useState, useEffect, useCallback } from "react";

/**
 * useLang
 *
 * Two-language toggle: EN / TH
 * - Reads from localStorage on mount
 * - Falls back to browser language preference
 * - Exposes t(key) translation helper
 *
 * All visible UI text has both translations so switching
 * language changes every string across every page.
 */

const STORAGE_KEY = "beam-portfolio-lang";
const VALID_LANGS  = ["en", "th"];

// ── Translations — all visible UI text ───────────────────────
const T = {
  en: {
    // ── Nav ──
    nav_home:              "Home",
    nav_skills:            "Skills",
    nav_projects:          "Projects",
    nav_exp:               "Experience",
    nav_contact:           "Contact",
    nav_travel:            "Travel",

    // ── Hero ──
    over_location:         "Bangkok · Thailand",
    over_status:           "Open to Work",
    hero_about_prefix:     "Backend Developer",
    hero_cta_contact:      "Contact Me",
    hero_cta_projects:     "View Projects",
    hero_cta_cv:           "Download CV",
    hero_stack_label:      "STACK",

    // ── Skills section ──
    sec_skills_tag:        "// SKILLS",
    sec_skills_ey:         "What I actually know",
    sec_skills_title:      "Skills &",
    sec_skills_dim:        "Tools",

    // ── Projects section ──
    sec_proj_tag:          "// PROJECTS",
    sec_proj_ey:           "Things I've built",
    sec_proj_title:        "My",
    sec_proj_dim:          "Projects",
    proj_github:           "GitHub",
    proj_live:             "Live Demo",

    // ── Experience section ──
    sec_exp_tag:           "// EXPERIENCE",
    sec_exp_ey:            "Where I've been",
    sec_exp_title:         "Work",
    sec_exp_dim:           "History",
    exp_story_btn:         "✈ Read Full Story →",

    // ── Contact section ──
    sec_contact_tag:       "// CONTACT",
    sec_contact_ey:        "Let's talk",
    sec_contact_title:     "Say",
    sec_contact_dim:       "Hello",
    contact_lore:          "I'm currently open to full-time backend roles, freelance work, and interesting side projects.\n\nIf you have something in mind — or just want to talk code — feel free to reach out.",
    contact_label_email:   "Email",
    contact_label_github:  "GitHub",
    contact_label_linkedin:"LinkedIn",
    contact_label_location:"Location",
    form_hd:               "Drop me a message",
    form_name:             "Name",
    form_email:            "Email",
    form_subject:          "Subject",
    form_message:          "Message",
    form_ph_name:          "Jane Doe",
    form_ph_email:         "jane@email.com",
    form_ph_subject:       "Project / Opportunity",
    form_ph_message:       "Tell me about your project...",
    form_send:             "Send Message",
    form_sending:          "Sending…",
    form_ok_title:         "Got it, thanks!",
    form_ok_sub:           "I'll get back to you soon",
    form_error:            "Something went wrong — please email me directly.",
    form_hint:             "Ctrl + Enter to send",
    err_name:              "Name is required",
    err_email_req:         "Email is required",
    err_email_inv:         "Enter a valid email",
    err_message:           "Message is required",

    // ── Travel section ──
    sec_travel_tag:        "// TRAVEL",
    sec_travel_ey:         "Life beyond the desk",

    // ── Footer ──
    footer_role:           "Backend Developer",
    footer_arcana:         "THE FOOL",

    // ── Page titles ──
    title_home:            "Beam · Portfolio",
    title_skills:          "Skills · Beam",
    title_projects:        "Projects · Beam",
    title_exp:             "Experience · Beam",
    title_contact:         "Contact · Beam",
    title_travel:          "Work & Travel · Beam",
  },

  th: {
    // ── Nav ──
    nav_home:              "หน้าหลัก",
    nav_skills:            "ทักษะ",
    nav_projects:          "ผลงาน",
    nav_exp:               "ประสบการณ์",
    nav_contact:           "ติดต่อ",
    nav_travel:            "ท่องเที่ยว",

    // ── Hero ──
    over_location:         "กรุงเทพ · ประเทศไทย",
    over_status:           "รับงานอยู่",
    hero_about_prefix:     "นักพัฒนา Backend",
    hero_cta_contact:      "ติดต่อผม",
    hero_cta_projects:     "ดูผลงาน",
    hero_cta_cv:           "ดาวน์โหลด CV",
    hero_stack_label:      "สแตก",

    // ── Skills section ──
    sec_skills_tag:        "// ทักษะ",
    sec_skills_ey:         "สิ่งที่ผมทำได้จริง",
    sec_skills_title:      "ทักษะและ",
    sec_skills_dim:        "เครื่องมือ",

    // ── Projects section ──
    sec_proj_tag:          "// ผลงาน",
    sec_proj_ey:           "สิ่งที่ผมสร้าง",
    sec_proj_title:        "ผลงาน",
    sec_proj_dim:          "ของผม",
    proj_github:           "โค้ด",
    proj_live:             "ดูตัวอย่าง",

    // ── Experience section ──
    sec_exp_tag:           "// ประสบการณ์",
    sec_exp_ey:            "ที่ที่ผมเคยทำงาน",
    sec_exp_title:         "ประวัติ",
    sec_exp_dim:           "การทำงาน",
    exp_story_btn:         "✈ อ่านเรื่องราวเต็ม →",

    // ── Contact section ──
    sec_contact_tag:       "// ติดต่อ",
    sec_contact_ey:        "มาคุยกัน",
    sec_contact_title:     "ทักทาย",
    sec_contact_dim:       "กัน",
    contact_lore:          "ผมเปิดรับงานประจำด้าน Backend, งานฟรีแลนซ์ และโปรเจกต์ที่น่าสนใจ\n\nถ้าคุณมีอะไรในใจ หรืออยากคุยเรื่องโค้ด ติดต่อมาได้เลยครับ",
    contact_label_email:   "อีเมล",
    contact_label_github:  "GitHub",
    contact_label_linkedin:"LinkedIn",
    contact_label_location:"ที่อยู่",
    form_hd:               "ฝากข้อความถึงผม",
    form_name:             "ชื่อ",
    form_email:            "อีเมล",
    form_subject:          "หัวข้อ",
    form_message:          "ข้อความ",
    form_ph_name:          "สมชาย ใจดี",
    form_ph_email:         "somchai@email.com",
    form_ph_subject:       "โปรเจกต์ / โอกาสงาน",
    form_ph_message:       "เล่าให้ฟังเกี่ยวกับโปรเจกต์ของคุณ...",
    form_send:             "ส่งข้อความ",
    form_sending:          "กำลังส่ง…",
    form_ok_title:         "ได้รับแล้ว ขอบคุณครับ!",
    form_ok_sub:           "จะตอบกลับเร็วๆ นี้",
    form_error:            "เกิดข้อผิดพลาด กรุณาส่งอีเมลตรงถึงผม",
    form_hint:             "Ctrl + Enter เพื่อส่ง",
    err_name:              "กรุณากรอกชื่อ",
    err_email_req:         "กรุณากรอกอีเมล",
    err_email_inv:         "กรุณากรอกอีเมลที่ถูกต้อง",
    err_message:           "กรุณากรอกข้อความ",

    // ── Travel section ──
    sec_travel_tag:        "// ท่องเที่ยว",
    sec_travel_ey:         "ชีวิตนอกหน้าจอ",

    // ── Footer ──
    footer_role:           "นักพัฒนา Backend",
    footer_arcana:         "ใบ้ศูนย์",

    // ── Page titles ──
    title_home:            "Beam · พอร์ตโฟลิโอ",
    title_skills:          "ทักษะ · Beam",
    title_projects:        "ผลงาน · Beam",
    title_exp:             "ประสบการณ์ · Beam",
    title_contact:         "ติดต่อ · Beam",
    title_travel:          "ท่องเที่ยว · Beam",
  },
};

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VALID_LANGS.includes(saved)) return saved;
  } catch { /* localStorage blocked */ }

  const bl = (navigator.language || "en").toLowerCase();
  return bl.startsWith("th") ? "th" : "en";
}

export default function useLang() {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
    // Set lang attribute on <html> — activates :lang() CSS rules
    document.documentElement.setAttribute("lang",
      lang === "th" ? "th" : "en"
    );
    // Cleanup: restore default lang when hook unmounts
    return () => { document.documentElement.setAttribute("lang", "en"); };
  }, [lang]);

  const setLang = useCallback((l) => {
    if (VALID_LANGS.includes(l)) setLangState(l);
  }, []);

  const t = useCallback(
    (key) => T[lang]?.[key] ?? T.en[key] ?? key,
    [lang]
  );

  return { lang, setLang, t };
}
