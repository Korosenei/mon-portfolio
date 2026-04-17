'use client'
import { useEffect, useRef, useState } from 'react'

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'web', label: 'Web App' },
  { id: 'erp', label: 'ERP' },
  { id: 'iot', label: 'IoT' },
  { id: 'devops', label: 'DevOps' },
]

export default function ProjectsSection({ projects }) {
  const sectionRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); setVisible(true) } })
    }, { threshold: 0.08 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = filter === 'all' ? projects : projects?.filter(p => p.category === filter)

  return (
    <section id="projets" ref={sectionRef} className="section-wrapper reveal">

      <p className="section-tag">Réalisations</p>
      <h2 className="section-title">Projets <span className="neon-text">Clés</span></h2>
      <div className="section-line" />

      {/* FILTER */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setFilter(cat.id)} style={{
            padding: '0.45rem 1.2rem', borderRadius: '100px', cursor: 'pointer',
            fontSize: '0.8rem', fontFamily: 'var(--font-mono)', transition: 'all 0.3s',
            background: filter === cat.id ? 'rgba(0,245,212,0.12)' : 'transparent',
            color: filter === cat.id ? 'var(--neon)' : 'var(--muted)',
            border: filter === cat.id ? '1px solid rgba(0,245,212,0.3)' : '1px solid var(--border2)',
          }}>{cat.label}</button>
        ))}
      </div>

      {/* GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {(filtered || []).map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 0.08} visible={visible} />
        ))}

        {/* GITHUB CTA */}
        <a href="https://github.com/Korosenei" target="_blank" rel="noreferrer" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '200px', background: 'transparent',
          border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px', textDecoration: 'none',
          transition: 'all 0.3s', padding: '2rem',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,212,0.3)'; e.currentTarget.style.background = 'rgba(0,245,212,0.03)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent' }}>
          <svg width="24" height="24" fill="var(--muted)" viewBox="0 0 24 24" style={{ marginBottom: '0.8rem' }}>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Voir tous les projets</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon)', marginTop: '0.3rem' }}>github.com/Korosenei</span>
        </a>
      </div>
    </section>
  )
}

function ProjectCard({ project, delay, visible }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '12px',
      overflow: 'hidden', transition: 'all 0.4s', cursor: 'pointer', position: 'relative',
      borderTop: hovered ? `2px solid ${project.color}` : '2px solid transparent',
      transform: hovered ? 'translateY(-5px)' : 'none',
      boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${project.color}18` : 'none',
      animation: visible ? `fadeSlideUp 0.5s ${delay}s both` : 'none',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* HEADER */}
      <div style={{ padding: '1.5rem 1.5rem 1rem', display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
          background: `${project.color}15`, border: `1px solid ${project.color}30`,
          transition: 'all 0.3s', transform: hovered ? 'scale(1.1)' : 'none',
        }}>{project.icon}</div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              style={{
                width: '32px', height: '32px', borderRadius: '6px',
                border: '1px solid var(--border2)', color: 'var(--muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', transition: 'all 0.3s', fontSize: '0.8rem',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--muted)' }}>
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              style={{
                width: '32px', height: '32px', borderRadius: '6px',
                border: '1px solid var(--border2)', color: 'var(--muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', transition: 'all 0.3s',
              }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: '0 1.5rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>{project.title}</h3>
          {project.featured && (
            <span style={{
              fontSize: '0.62rem', padding: '0.15rem 0.5rem', borderRadius: '100px',
              background: 'rgba(0,245,212,0.1)', color: 'var(--neon)', border: '1px solid rgba(0,245,212,0.2)',
              fontFamily: 'var(--font-mono)',
            }}>featured</span>
          )}
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.stack.map(s => (
            <span key={s} className="tag tag-mono">{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}