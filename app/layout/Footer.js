'use client'
import Link from 'next/link'

const quickLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#experience', label: 'Expérience' },
  { href: '#competences', label: 'Compétences' },
  { href: '#projets', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer({ profile }) {
  const year = new Date().getFullYear()

  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)', marginTop: '4rem' }}>

      {/* GLOW TOP */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '300px', height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--neon), transparent)',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '4rem', marginBottom: '3rem' }}
          className="footer-grid">

          {/* BRANDING */}
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--neon)' }}>
              <span style={{ color: 'var(--muted)' }}>~/</span>leandre.dev
            </span>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.8, marginTop: '1rem', maxWidth: '340px' }}>
              {profile?.bio?.substring(0, 160) || 'Développeur Full Stack passionné, basé à Ouagadougou. Spécialisé Django, Spring Boot & Angular.'}...
            </p>

            {/* SOCIAL */}
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              {[
                { href: profile?.github || '#', label: 'GitHub', icon: (
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                )},
                { href: profile?.linkedin || '#', label: 'LinkedIn', icon: (
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )},
                { href: `mailto:${profile?.email || 'leandrebenilde07@gmail.com'}`, label: 'Email', icon: (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                )},
              ].map(s => (
                <a key={s.label} href={s.href} target={s.label !== 'Email' ? '_blank' : undefined}
                  rel="noreferrer" aria-label={s.label} style={{
                    width: '38px', height: '38px', borderRadius: '8px',
                    border: '1px solid var(--border2)', color: 'var(--muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon)'; e.currentTarget.style.color = 'var(--neon)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--muted)' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              // Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {quickLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={e => scrollTo(e, l.href)} style={{
                    color: 'var(--muted)', textDecoration: 'none', fontSize: '0.88rem',
                    transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                    <span style={{ color: 'var(--neon)', fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>›</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              // Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { icon: '📱', label: profile?.phone || '+226 71 88 20 20', href: `tel:${profile?.phone}` },
                { icon: '✉️', label: profile?.email || 'leandrebenilde07@gmail.com', href: `mailto:${profile?.email}`, small: true },
                { icon: '📍', label: 'Ouagadougou, BF', href: '#' },
              ].map((item, i) => (
                <a key={i} href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: '0.7rem',
                  color: 'var(--muted)', textDecoration: 'none',
                  fontSize: item.small ? '0.78rem' : '0.88rem', transition: 'color 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                  <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{
          borderTop: '1px solid var(--border2)', paddingTop: '1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>
            © {year} — PARE Kontama Léandre Bénilde. Tous droits réservés.
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>
              Built with Next.js & Supabase
            </span>

            <Link href="/dashboard" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.45rem 1rem',
              border: '1px solid rgba(123,47,255,0.3)',
              color: '#a78bfa', background: 'rgba(123,47,255,0.07)',
              borderRadius: '4px', fontSize: '0.75rem', textDecoration: 'none',
              fontFamily: 'var(--font-mono)', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(123,47,255,0.2)'; e.currentTarget.style.boxShadow = '0 5px 20px rgba(123,47,255,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(123,47,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
              </svg>
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </footer>
  )
}