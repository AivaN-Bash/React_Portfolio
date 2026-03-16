import { useState, useCallback } from "react";
import "../styles/Contact.css";
import ME from "../data/me";
import useScrollReveal from "../hooks/useScrollReveal";
import useRipple        from "../hooks/useRipple";

// ── Input sanitization ───────────────────────────────────────
// Strips HTML tags and trims whitespace.
// Prevents XSS if this data ever gets stored or displayed elsewhere.
function sanitize(str) {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

// ── Email validation ─────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Field limits ─────────────────────────────────────────────
const LIMITS = { name: 80, email: 120, subject: 120, message: 1000 };

// ── Initial state ─────────────────────────────────────────────
const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form,   setForm]   = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const headerRef = useScrollReveal({ delay: 0 });
  const leftRef   = useScrollReveal({ delay: 80 });
  const rightRef  = useScrollReveal({ delay: 160 });
  const ripple    = useRipple();

  // Controlled input — enforces maxLength + clears field error on change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (value.length > LIMITS[name]) return; // hard cap
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: null }));
  }, [errors]);

  // Validate all fields — returns error map
  const validate = (f) => {
    const e = {};
    if (!f.name.trim())                e.name    = "Name is required";
    if (!f.email.trim())               e.email   = "Email is required";
    else if (!EMAIL_RE.test(f.email))  e.email   = "Enter a valid email";
    if (!f.message.trim())             e.message = "Message is required";
    return e;
  };

  const handleSend = useCallback(async () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("sending");

    // ─────────────────────────────────────────────────────────
    // 🔧 TO CONNECT A REAL EMAIL SERVICE:
    //
    // Option A — Formspree (easiest, free tier)
    //   1. Sign up at formspree.io
    //   2. Create a form → copy your form ID
    //   3. Replace the fetch below:
    //
    //   await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(sanitized),
    //   });
    //
    // Option B — EmailJS (no backend needed)
    //   See emailjs.com for setup instructions.
    // ─────────────────────────────────────────────────────────

    const sanitized = {
      name:    sanitize(form.name),
      email:   sanitize(form.email),
      subject: sanitize(form.subject),
      message: sanitize(form.message),
    };

    try {
      // Simulated send — replace with real service above
      await new Promise(r => setTimeout(r, 1200));
      console.info("Form data (connect real service):", sanitized);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }, [form]);

  // Submit on Ctrl/Cmd+Enter in textarea
  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleSend();
  }, [handleSend]);

  const links = [
    {
      icon:  "✉",
      label: "Email",
      val:   ME.email,
      href:  `mailto:${ME.email}`,
    },
    {
      icon:  "⌥",
      label: "GitHub",
      val:   ME.github.replace("https://", ""),
      href:  ME.github,
    },
    {
      icon:  "in",
      label: "LinkedIn",
      val:   ME.linkedin.replace("https://", ""),
      href:  ME.linkedin,
    },
    {
      icon:  "◎",
      label: "Location",
      val:   ME.location,
      href:  null,
    },
  ];

  return (
    <section className="sec">
      <div className="sec-tag">// CONTACT</div>

      <div className="sec-hd" ref={headerRef}>
        <div className="sec-n">03</div>
        <div>
          <span className="sec-ey">let's talk</span>
          <h2 className="sec-title">Say <span className="dim">Hello</span></h2>
          <div className="sec-rule"/>
        </div>
      </div>

      <div className="contact-layout">

        {/* ── Left — links ── */}
        <div ref={leftRef}>
          <p className="contact-lore">
            I'm currently open to full-time backend roles, freelance work,
            and interesting side projects.<br/><br/>
            If you have something in mind — or just want to talk code —
            feel free to reach out. I usually reply the same day.
          </p>

          <nav className="contact-links" aria-label="Contact links">
            {links.map(l => {
              const Tag  = l.href ? "a" : "div";
              const props = l.href
                ? {
                    href:   l.href,
                    target: l.href.startsWith("http") ? "_blank" : undefined,
                    // Security: noopener prevents tab-napping,
                    //           noreferrer hides the referrer header
                    rel:    l.href.startsWith("http") ? "noopener noreferrer" : undefined,
                  }
                : {};

              return (
                <Tag key={l.label} className="c-item" {...props}>
                  <div className="c-icon" aria-hidden="true">{l.icon}</div>
                  <div className="c-body">
                    <span className="c-lbl">{l.label}</span>
                    <span className="c-val">{l.val}</span>
                  </div>
                  {l.href && <span className="c-arr" aria-hidden="true">›</span>}
                </Tag>
              );
            })}
          </nav>
        </div>

        {/* ── Right — form ── */}
        <div ref={rightRef}>
          <div className="form-panel" role="region" aria-label="Contact form">

            {status === "sent" ? (
              <div className="f-ok" role="alert" aria-live="polite">
                <span className="f-ok-g" aria-hidden="true">🌙</span>
                <p className="f-ok-t">Got it, thanks!</p>
                <p className="f-ok-s">
                  I'll get back to you soon, {sanitize(form.name)}.
                </p>
              </div>
            ) : (
              <>
                <h3 className="form-hd">Drop me a message</h3>

                {status === "error" && (
                  <div className="f-error" role="alert">
                    Something went wrong — please email me directly.
                  </div>
                )}

                <div className="form-2">
                  <Field
                    label="Name" name="name" type="text"
                    placeholder="Jane Doe"
                    value={form.name} error={errors.name}
                    maxLength={LIMITS.name}
                    onChange={handleChange}
                  />
                  <Field
                    label="Email" name="email" type="email"
                    placeholder="jane@email.com"
                    value={form.email} error={errors.email}
                    maxLength={LIMITS.email}
                    onChange={handleChange}
                  />
                </div>

                <Field
                  label="Subject" name="subject" type="text"
                  placeholder="Project / Opportunity"
                  value={form.subject} error={errors.subject}
                  maxLength={LIMITS.subject}
                  onChange={handleChange}
                />

                <div className="fg">
                  <div className="fl-row">
                    <label className="fl" htmlFor="field-message">Message</label>
                    <span className="fl-count" aria-hidden="true">
                      {form.message.length}/{LIMITS.message}
                    </span>
                  </div>
                  <textarea
                    id="field-message"
                    className={`fta${errors.message ? " err" : ""}`}
                    name="message"
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    aria-invalid={!!errors.message}
                    autoComplete="off"
                    spellCheck="true"
                  />
                  {errors.message && (
                    <span id="err-message" className="f-err-msg" role="alert">
                      {errors.message}
                    </span>
                  )}
                  <span className="f-hint">Ctrl + Enter to send</span>
                </div>

                <button
                  {...ripple}
                  className="f-btn ripple-origin"
                  onClick={handleSend}
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Field component — keeps form DRY ────────────────────────
function Field({ label, name, type, placeholder, value, error, maxLength, onChange }) {
  const id = `field-${name}`;
  return (
    <div className="fg">
      <label className="fl" htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`fi${error ? " err" : ""}`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        aria-describedby={error ? `err-${name}` : undefined}
        aria-invalid={!!error}
        autoComplete={name === "email" ? "email" : name === "name" ? "name" : "off"}
        spellCheck={type === "text" ? "true" : "false"}
      />
      {error && (
        <span id={`err-${name}`} className="f-err-msg" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
