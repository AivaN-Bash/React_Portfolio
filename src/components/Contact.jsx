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

// ── URL safety ───────────────────────────────────────────────
// Prevents javascript: or data: URI injection in href attributes.
// Only allows https://, http://, and mailto: protocols.
function safeHref(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim().toLowerCase();
  if (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://")  ||
    trimmed.startsWith("mailto:")
  ) return url.trim();
  return null; // block anything else
}

// ── Email validation ─────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Field limits ─────────────────────────────────────────────
const LIMITS = { name: 80, email: 120, subject: 120, message: 1000 };

// ── Initial state ─────────────────────────────────────────────
const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact({ t = (k) => k, lang = 'en' }) {
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
    if (!f.name.trim())                e.name    = t("err_name");
    if (!f.email.trim())               e.email   = t("err_email_req");
    else if (!EMAIL_RE.test(f.email))  e.email   = t("err_email_inv");
    if (!f.message.trim())             e.message = t("err_message");
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
      label: t("contact_label_email"),
      val:   ME.email,
      href:  safeHref(`mailto:${ME.email}`),
    },
    {
      icon:  "⌥",
      label: t("contact_label_github"),
      val:   ME.github.replace("https://", ""),
      href:  safeHref(ME.github),
    },
    {
      icon:  "in",
      label: t("contact_label_linkedin"),
      val:   ME.linkedin.replace("https://", ""),
      href:  safeHref(ME.linkedin),
    },
    {
      icon:  "◎",
      label: t("contact_label_location"),
      val:   lang === 'th' ? ME.location_th : ME.location,
      href:  null,
    },
  ];

  return (
    <section className="sec">
      <div className="sec-tag">{t("sec_contact_tag")}</div>

      <div className="sec-hd" ref={headerRef}>
        <div className="sec-n">03</div>
        <div>
          <span className="sec-ey">{t("sec_contact_ey")}</span>
          <h2 className="sec-title">{t("sec_contact_title")} <span className="dim">{t("sec_contact_dim")}</span></h2>
          <div className="sec-rule"/>
        </div>
      </div>

      <div className="contact-layout">

        {/* ── Left — links ── */}
        <div ref={leftRef}>
          <p className="contact-lore">
            {t("contact_lore").split("\n\n").map((para, i) => (
              <span key={i}>{para}{i === 0 && <><br/><br/></>}</span>
            ))}
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
                <p className="f-ok-t">{t("form_ok_title")}</p>
                <p className="f-ok-s">
                  {t("form_ok_sub")}, {sanitize(form.name)}.
                </p>
              </div>
            ) : (
              <>
                <h3 className="form-hd">{t("form_hd")}</h3>

                {status === "error" && (
                  <div className="f-error" role="alert">
                    {t("form_error")}
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
                  <span className="f-hint">{t("form_hint")}</span>
                </div>

                <button
                  {...ripple}
                  className="f-btn ripple-origin"
                  onClick={handleSend}
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" ? t("form_sending") : t("form_send")}
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
