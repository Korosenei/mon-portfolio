'use client'
import { useEffect, useRef, useState } from 'react'

export default function ExperienceSection({ experiences }) {
  const sectionRef = useRef(null)
  const [activeId, setActiveId] = useState(experiences?.[0]?.id || 1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const active = experiences?.find(e => e.id === activeId) || experiences?.[0]

  return (
    <section id="experience" ref={sectionRef} className="section-wrapper reveal">

      <p className="section-tag">Parcours</p>
      <h2 className="section-title">Expériences <span className="neon-text">Pro.</span></h2>
      <div className="section-line" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }}
        className="exp-grid">

        {/* TIMELINE LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {(experiences || []).map((exp, i) => (
            <button key={exp.id} onClick={() => setActiveId(exp.id)} style={{
              display: 'flex', alignItems: 'center', gap: '1.2rem',
              padding: '1rem 1.2rem',
              background: activeId === exp.id ? 'rgba(0,245,212,0.06)' : 'var(--card)',
              border: `1px solid ${activeId === exp.id ? 'rgba(0,245,212,0.3)' : 'var(--border2)'}`,
              borderLeft: `3px solid ${activeId === exp.id ? exp.color : 'transparent'}`,
              borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.3s', width: '100%',
            }}
              onMouseEnter={e => { if (activeId !== exp.id) e.currentTarget.style.borderColor = 'var(--border)' }}
              onMouseLeave={e => { if (activeId !== exp.id) e.currentTarget.style.borderColor = 'var(--border2)' }}>

              {/* DOT */}
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                background: exp.color,
                boxShadow: activeId === exp.id ? `0 0 15px ${exp.color}` : 'none',
                transition: 'all 0.3s',
              }} />

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: activeId === exp.id ? 'var(--text)' : 'var(--muted)', marginBottom: '0.2rem', transition: 'color 0.3s' }}>
                  {exp.role}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: exp.color, fontWeight: 500 }}>{exp.company}</span>
                  <span style={{
                    fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
                    padding: '0.15rem 0.5rem', borderRadius: '100px',
                    background: 'rgba(255,255,255,0.04)', color: 'var(--muted)',
                  }}>{exp.type}</span>
                </div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginTop: '0.25rem' }}>{exp.period}</div>
              </div>
            </button>
          ))}
        </div>

        {/* DETAIL PANEL */}
        {active && (
          <div key={active.id} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '2rem',
            borderTop: `2px solid ${active.color}`,
            animation: 'fadeSlideUp 0.4s ease',
          }}>
            {/* HEADER */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.6rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{active.role}</h3>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                  padding: '0.3rem 0.8rem', borderRadius: '100px',
                  background: `rgba(${active.color === '#00f5d4' ? '0,245,212' : active.color === '#7b2fff' ? '123,47,255' : active.color === '#fb923c' ? '251,146,60' : '125,211,252'},0.1)`,
                  color: active.color, border: `1px solid ${active.color}40`,
                }}>{active.period}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.88rem', color: active.color, fontWeight: 600 }}>{active.company}</span>
                <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>—</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{active.location}</span>
              </div>
            </div>

            {/* TASKS */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                // Missions
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {active.tasks.map((task, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                    <span style={{ color: active.color, marginTop: '0.2rem', fontSize: '0.7rem', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>▸</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            {/* STACK */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                // Stack utilisée
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {active.stack.map(s => (
                  <span key={s} className="tag tag-mono">{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}