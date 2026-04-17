'use client'
import { useEffect, useRef } from 'react'

export default function AboutSection({ profile, formations, autresFormations }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    // Animate lang bars
    const langObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-width]').forEach(bar => {
            const w = bar.getAttribute('data-width')
            bar.style.width = '0'
            setTimeout(() => { bar.style.width = w + '%' }, 200)
          })
          langObserver.unobserve(e.target)
        }
      })
    }, { threshold: 0.4 })
    if (sectionRef.current) langObserver.observe(sectionRef.current)

    return () => { observer.disconnect(); langObserver.disconnect() }
  }, [])

  const info = [
    { label: 'Nom complet', value: profile?.name || 'PARE Kontama Léandre Bénilde' },
    { label: 'Email', value: profile?.email || 'leandrebenilde07@gmail.com', small: true },
    { label: 'Téléphone', value: profile?.phone || '+226 71 88 20 20' },
    { label: 'Localisation', value: profile?.location || 'Ouagadougou, BF' },
    { label: 'Diplôme', value: 'Licence Pro. MIAGE' },
    { label: 'Disponibilité', value: profile?.available ? '✅ Disponible' : '🔴 Occupé', color: profile?.available ? '#4ade80' : '#f87171' },
  ]

  return (
    <section id="a-propos" ref={sectionRef} className="section-wrapper reveal">

      <p className="section-tag">À propos</p>
      <h2 className="section-title">Qui suis-je <span className="neon-text">?</span></h2>
      <div className="section-line" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '5rem', alignItems: 'start' }}
        className="about-grid">

        {/* LEFT */}
        <div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
            Je suis <span style={{ color: 'var(--text)', fontWeight: 600 }}>PARE Kontama Léandre Bénilde</span>, développeur Full Stack passionné basé à Ouagadougou.
            Titulaire d'une <span style={{ color: 'var(--neon)' }}>Licence Professionnelle MIAGE</span> et actuellement en{' '}
            <span style={{ color: 'var(--neon)' }}>Master 2 ISIE</span> à l'IBAM, j'allie rigueur académique et expérience terrain.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
            Fort de plus de <span style={{ color: 'var(--text)', fontWeight: 500 }}>2 ans d'expérience</span> en entreprise (TUNKA TECH, LONAB, SONABEL),
            je conçois des applications web robustes, des APIs REST sécurisées et des systèmes de gestion performants.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Curieux, autonome et orienté résultats, je cherche à contribuer à des projets à fort impact technologique.
          </p>

          {/* INFO GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            {info.map((item, i) => (
              <div key={i} style={{
                background: 'var(--card)', border: '1px solid var(--border2)',
                borderRadius: '8px', padding: '0.9rem 1.1rem',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: item.small ? '0.78rem' : '0.88rem', color: item.color || 'var(--text)', fontWeight: 500 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* DOWNLOAD CV */}
          <div style={{ marginTop: '2rem' }}>
            <a className="btn-download" href={profile?.cvUrl || '/CV_PARE_Kontama.pdf'} download
              style={{ display: 'inline-flex', textDecoration: 'none' }}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Télécharger mon CV
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* LANGUAGES */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.4rem' }}>
              // Langues
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(profile?.languages || []).map((lang, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ width: '70px', fontSize: '0.83rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{lang.name}</span>
                  <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div data-width={lang.level} style={{
                      height: '100%', borderRadius: '2px', width: lang.level + '%',
                      background: 'linear-gradient(90deg, var(--neon), var(--neon2))',
                      transition: 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)', width: '80px', textAlign: 'right', flexShrink: 0 }}>{lang.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QUALITIES */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              // Qualités
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {(profile?.qualities || []).map((q, i) => (
                <span key={i} className={`tag ${['tag-neon','tag-purple','tag-orange','tag-blue','tag-neon','tag-purple','tag-orange'][i % 7]}`}
                  style={{ transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  {q}
                </span>
              ))}
            </div>
          </div>

          {/* FORMATIONS */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              // Formations
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {(formations || []).map((f, i) => (
                <div key={i} style={{
                  background: 'var(--card)', border: '1px solid var(--border2)',
                  borderRadius: '8px', padding: '1rem 1.2rem',
                  borderLeft: `2px solid ${i === 0 ? 'var(--neon)' : i === 1 ? 'var(--neon2)' : 'var(--muted)'}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>{f.degree}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>{f.school}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--neon2)' }}>{f.field}</div>
                    </div>
                    <span style={{
                      fontSize: '0.68rem', padding: '0.3rem 0.7rem', borderRadius: '100px', flexShrink: 0,
                      background: f.status === 'current' ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.05)',
                      color: f.status === 'current' ? '#4ade80' : 'var(--muted)',
                      border: f.status === 'current' ? '1px solid rgba(74,222,128,0.25)' : '1px solid var(--border2)',
                      fontFamily: 'var(--font-mono)',
                    }}>{f.period}</span>
                  </div>
                </div>
              ))}
              {/* Autres formations */}
              {(autresFormations || []).map((f, i) => (
                <div key={'other-' + i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.8rem',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border2)',
                  borderRadius: '8px',
                }}>
                  <span style={{ fontSize: '0.8rem' }}>📜</span>
                  <div>
                    <div style={{ fontSize: '0.83rem', color: 'var(--text)', fontWeight: 500 }}>{f.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.15rem' }}>{f.org} — {f.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}