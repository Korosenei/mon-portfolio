'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#experience', label: 'Expérience' },
  { href: '#competences', label: 'Compétences' },
  { href: '#projets', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      // Active section detection
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 3rem',
      background: scrolled ? 'rgba(5,5,16,0.95)' : 'rgba(5,5,16,0.7)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(0,245,212,0.12)' : '1px solid transparent',
      transition: 'all 0.3s',
      height: '72px',
      display: 'flex', alignItems: 'center',
    }}>
      <nav style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* LOGO */}
        <a href="#accueil" onClick={e => scrollTo(e, '#accueil')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '1.05rem',
            color: 'var(--neon)', letterSpacing: '0.05em',
          }}>
            <span style={{ color: 'var(--muted)' }}>~/</span>leandre.dev
          </span>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#4ade80', boxShadow: '0 0 10px #4ade80',
            animation: 'pulse 2s infinite',
          }} />
        </a>

        {/* DESKTOP NAV */}
        <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}
          className="desktop-nav">
          {navLinks.map(link => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={link.href}>
                <a href={link.href} onClick={e => scrollTo(e, link.href)} style={{
                  textDecoration: 'none',
                  fontSize: '0.85rem', fontWeight: 500,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: isActive ? 'var(--neon)' : 'var(--muted)',
                  transition: 'color 0.3s', position: 'relative', paddingBottom: '4px',
                }}>
                  {link.label}
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0,
                    height: '1px', width: isActive ? '100%' : '0',
                    background: 'var(--neon)', transition: 'width 0.3s',
                  }} />
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA BUTTONS */}
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <a href="/CV_PARE_Kontama.pdf" download style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.5rem 1.2rem',
            border: '1px solid rgba(0,245,212,0.3)',
            color: 'var(--neon)', background: 'rgba(0,245,212,0.06)',
            borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'all 0.3s', fontFamily: 'var(--font-mono)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,212,0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,212,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,245,212,0.06)'; e.currentTarget.style.boxShadow = 'none' }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            CV
          </a>

          {/* BURGER */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="burger-btn" style={{
            display: 'none', background: 'none', border: 'none', color: 'var(--text)',
            cursor: 'pointer', padding: '0.5rem',
          }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '72px', left: 0, right: 0,
          background: 'rgba(5,5,16,0.98)', borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(20px)', padding: '1rem 1.5rem',
        }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={e => scrollTo(e, link.href)} style={{
              display: 'block', padding: '0.8rem 1rem',
              color: 'var(--muted)', textDecoration: 'none',
              fontSize: '0.9rem', fontWeight: 500,
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              transition: 'color 0.3s',
            }}>
              <span style={{ color: 'var(--neon)', fontFamily: 'var(--font-mono)', marginRight: '0.5rem', fontSize: '0.75rem' }}>›</span>
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
          header { padding: 0 1.5rem !important; }
        }
      `}</style>
    </header>
  )
}