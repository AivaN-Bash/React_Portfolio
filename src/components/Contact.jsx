import { useState } from "react";
import "../styles/Contact.css";
import ME from "../data/me";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Contact() {
  const [form,   setForm]   = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState("idle");

  const headerRef = useScrollReveal({ delay: 0 });
  const leftRef   = useScrollReveal({ delay: 100 });
  const rightRef  = useScrollReveal({ delay: 200 });

  const handleChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}));
  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    // 🔧 Replace with Formspree or EmailJS
    await new Promise(r => setTimeout(r, 1400));
    setStatus("sent");
  };

  const links = [
    { icon:"✉", label:"Email",    val: ME.email,          href:`mailto:${ME.email}` },
    { icon:"⌥", label:"GitHub",   val: "github.com/beam", href: ME.github },
    { icon:"⊞", label:"LinkedIn", val: "linkedin/beam",   href: ME.linkedin },
    { icon:"◎", label:"Location", val: ME.location,       href: "#" },
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
        <div ref={leftRef}>
          <p className="contact-lore">
            I'm currently open to full-time backend roles, freelance work, and interesting side projects.<br/><br/>
            If you have something in mind — or just want to talk code — feel free to reach out. I check my email regularly and usually reply the same day.
          </p>
          <div className="contact-links">
            {links.map(l => (
              <a key={l.label} href={l.href} className="c-item"
                target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <div className="c-icon">{l.icon}</div>
                <div style={{flex:1}}>
                  <div className="c-lbl">{l.label}</div>
                  <div className="c-val">{l.val}</div>
                </div>
                <span className="c-arr">›</span>
              </a>
            ))}
          </div>
        </div>

        <div ref={rightRef}>
          <div className="form-panel">
            {status === "sent" ? (
              <div className="f-ok">
                <span className="f-ok-g">🌙</span>
                <div className="f-ok-t">Got it, thanks!</div>
                <div className="f-ok-s">I'll get back to you soon, {form.name}.</div>
              </div>
            ) : (
              <>
                <div className="form-hd">Drop me a message</div>
                <div className="form-2">
                  <div className="fg">
                    <label className="fl">Name</label>
                    <input className="fi" name="name" placeholder="Jane Doe" value={form.name} onChange={handleChange}/>
                  </div>
                  <div className="fg">
                    <label className="fl">Email</label>
                    <input className="fi" name="email" type="email" placeholder="jane@email.com" value={form.email} onChange={handleChange}/>
                  </div>
                </div>
                <div className="fg">
                  <label className="fl">Subject</label>
                  <input className="fi" name="subject" placeholder="Project / Opportunity" value={form.subject} onChange={handleChange}/>
                </div>
                <div className="fg">
                  <label className="fl">Message</label>
                  <textarea className="fta" name="message" placeholder="Tell me about your project..." value={form.message} onChange={handleChange}/>
                </div>
                <button className="f-btn" onClick={handleSend} disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
