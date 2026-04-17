'use client'
import { useEffect, useRef, useState } from 'react'

export default function ContactSection({ profile }) {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // Simuler envoi (remplacer par vraie API Supabase/email)
    await new Promise(r => setTimeout(r, 1800))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus(null), 5000)
  }

  const contactItems = [
    { icon: '📱', label: 'Téléphone', value: profile?.phone || '+226 71 88 20 20', href: `tel:${profile?.phone}` },
    { icon: '📱', label: 'Téléphone 2', value: profile?.phone2 || '+226 54 12 99 36', href: `tel:${profile?.phone2}` },
    { icon: '✉️', label: 'Email', value: profile?.email || 'leandrebenilde07@gmail.com', href: `mailto:${profile?.email}`, small: true },
    { icon: '📍', label: 'Localisation', value: profile?.location || 'Ouagadougou, Burkina Faso', href: '#' },
    { icon: '💻', label: 'GitHub', value: 'github.com/Korosenei', href: profile?.github || 'https://github.com/Korosenei', external: true },
  ]

  return (
    <section id="contact" ref={sectionRef} className="section-wrapper reveal">

      <p className="section-tag">Contact</p>
      <h2 className="section-title">Travaillons <span className="neon-text">ensemble</span></h2>
      <div className="section-line" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}
        className="contact-grid">

        {/* LEFT INFO */}
        <div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
            Vous avez un projet en tête ? Une idée à concrétiser ? N'hésitez pas à me contacter — je serai ravi d'en discuter et de vous proposer la solution adaptée.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
            {contactItems.map((item, i) => (
              <a key={i} href={item.href} target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.9rem 1.1rem',
                  background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '8px',
                  textDecoration: 'none', transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon)'; e.currentTarget.style.transform = 'translateX(5px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'none' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '8px',
                  background: 'rgba(0,245,212,0.08)', border: '1px solid rgba(0,245,212,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.label}</div>
                  <div style={{ fontSize: item.small ? '0.78rem' : '0.88rem', color: 'var(--text)', fontWeight: 500, marginTop: '0.15rem' }}>{item.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* REFERENCES */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              // Références professionnelles
            </h3>
            {[
              { name: 'Mr. TRAORE EMMANUEL', role: 'DG de TUNKA TECH', phone: '+226 64 73 16 12' },
              { name: 'Mr. ZIDA CHARLES', role: 'Chef Service Info. LONAB', phone: '+226 73 69 97 16' },
              { name: 'Mr. LENGANE CHEICK ALI', role: 'Chef projet SONABEL', phone: '+226 71 64 29 83' },
            ].map((ref, i) => (
              <div key={i} style={{
                padding: '0.7rem 1rem', marginBottom: '0.5rem',
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border2)', borderRadius: '6px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 500 }}>{ref.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.1rem' }}>{ref.role}</div>
                </div>
                <a href={`tel:${ref.phone}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon)', textDecoration: 'none' }}>{ref.phone}</a>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
          {/* GLOW */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,var(--neon),transparent)' }} />

          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--neon)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.8rem' }}>
            // Envoyer un message
          </h3>

          {status === 'sent' && (
            <div style={{
              padding: '1rem 1.2rem', background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.25)', borderRadius: '8px', marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.8rem',
            }}>
              <span style={{ fontSize: '1.1rem' }}>✅</span>
              <span style={{ fontSize: '0.88rem', color: '#4ade80' }}>Message envoyé ! Je vous répondrai rapidement.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  // Nom
                </label>
                <input name="name" value={form.name} onChange={handleChange} required
                  className="input-dark" placeholder="Votre nom" />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  // Email
                </label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="input-dark" placeholder="votre@email.com" />
              </div>
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                // Sujet
              </label>
              <input name="subject" value={form.subject} onChange={handleChange}
                className="input-dark" placeholder="Sujet du message" />
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                // Message
              </label>
              <textarea name="message" value={form.message} onChange={handleChange} required
                className="input-dark" placeholder="Décrivez votre projet, votre besoin..."
                style={{ minHeight: '140px', resize: 'vertical' }} />
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn-primary"
              style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.7 : 1 }}>
              {status === 'sending' ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3" />
                    <path d="M21 12a9 9 0 00-9-9" />
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Envoyer le message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}