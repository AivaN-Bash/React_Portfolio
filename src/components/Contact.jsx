import { useState } from "react";
import "../styles/Contact.css";
import ME from "../data/me";

export default function Contact() {
  const [form, setForm]     = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    // 🔧 REPLACE with your real form service:
    // Option A — Formspree (free):
    //   await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });
    //
    // Option B — EmailJS:
    //   import emailjs from '@emailjs/browser'
    //   await emailjs.send("SERVICE_ID", "TEMPLATE_ID", form, "PUBLIC_KEY")

    await new Promise(r => setTimeout(r, 1400)); // remove this line when using real service
    setStatus("sent");
  };

  const links = [
    { icon:"✉", label:"Email",    val: ME.email,           href: `mailto:${ME.email}` },
    { icon:"⌥", label:"GitHub",   val: "github.com/beam",  href: ME.github },
    { icon:"⊞", label:"LinkedIn", val: "linkedin/beam",    href: ME.linkedin },
    { icon:"◎", label:"Location", val: ME.location,        href: "#" },
  ];

  return (
    <section className="sec">
      <div className="sec-tag">// CONNECT</div>

      <div className="sec-hd">
        <div className="sec-n">03</div>
        <div>
          <span className="sec-ey">social links · form</span>
          <h2 className="sec-title">Get In <span className="dim">Touch</span></h2>
          <div className="sec-rule" />
        </div>
      </div>

      <div className="contact-layout">
        {/* Left — links */}
        <div style={{ animation: "fadeUp .5s both" }}>
          <p className="contact-lore">
            {ME.about}<br /><br />
            Open to full-time roles, freelance projects, and collaborations.
            Reach out — I respond within 24 hours.
          </p>
          <div className="contact-links">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="c-item"
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <div className="c-icon">{l.icon}</div>
                <div style={{ flex: 1 }}>
                  <div className="c-lbl">{l.label}</div>
                  <div className="c-val">{l.val}</div>
                </div>
                <span className="c-arr">›</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div style={{ animation: "fadeUp .5s .2s both" }}>
          <div className="form-panel">
            {status === "sent" ? (
              <div className="f-ok">
                <span className="f-ok-g">🌙</span>
                <div className="f-ok-t">Message Received</div>
                <div className="f-ok-s">Thanks, {form.name}. I'll respond within 24 hours.</div>
              </div>
            ) : (
              <>
                <div className="form-hd">「 Send a Message 」</div>
                <div className="form-2">
                  <div className="fg">
                    <label className="fl">Name</label>
                    <input className="fi" name="name" placeholder="Jane Doe" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="fg">
                    <label className="fl">Email</label>
                    <input className="fi" name="email" type="email" placeholder="jane@email.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="fg">
                  <label className="fl">Subject</label>
                  <input className="fi" name="subject" placeholder="Project / Opportunity" value={form.subject} onChange={handleChange} />
                </div>
                <div className="fg">
                  <label className="fl">Message</label>
                  <textarea className="fta" name="message" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} />
                </div>
                <button className="f-btn" onClick={handleSend} disabled={status === "sending"}>
                  {status === "sending" ? "TRANSMITTING..." : "▶ SEND MESSAGE"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
