'use client'
import { useEffect, useRef, useState } from 'react'

const colorMap = {
  neon: { bg: 'rgba(0,245,212,0.07)', color: 'var(--neon)', border: 'rgba(0,245,212,0.2)', bar: 'linear-gradient(90deg,#00f5d4,#00c8b0)' },
  blue: { bg: 'rgba(56,189,248,0.07)', color: '#7dd3fc', border: 'rgba(56,189,248,0.2)', bar: 'linear-gradient(90deg,#38bdf8,#7dd3fc)' },
  purple: { bg: 'rgba(123,47,255,0.07)', color: '#a78bfa', border: 'rgba(123,47,255,0.2)', bar: 'linear-gradient(90deg,#7b2fff,#a855f7)' },
  orange: { bg: 'rgba(255,107,53,0.07)', color: '#fb923c', border: 'rgba(255,107,53,0.2)', bar: 'linear-gradient(90deg,#f97316,#fb923c)' },
}

export default function SkillsSection({ skills }) {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          setVisible(true)
        }
      })
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const displaySkills = activeCategory
    ? skills?.filter(s => s.category === activeCategory)
    : skills

  return (
    <section id="competences" ref={sectionRef} className="section-wrapper reveal">

      <p className="section-tag">Compétences</p>
      <h2 className="section-title">Stack <span className="neon-text">Tech.</span></h2>
      <div className="section-line" />

      {/* FILTER TABS */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
        <button onClick={() => setActiveCategory(null)} style={{
          padding: '0.45rem 1.1rem', borderRadius: '100px', cursor: 'pointer', fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)', transition: 'all 0.3s', fontWeight: 500,
          background: !activeCategory ? 'rgba(0,245,212,0.12)' : 'rgba(255,255,255,0.03)',
          color: !activeCategory ? 'var(--neon)' : 'var(--muted)',
          border: !activeCategory ? '1px solid rgba(0,245,212,0.3)' : '1px solid var(--border2)',
        }}>Tout</button>
        {(skills || []).map(cat => (
          <button key={cat.category} onClick={() => setActiveCategory(cat.category === activeCategory ? null : cat.category)}
            style={{
              padding: '0.45rem 1.1rem', borderRadius: '100px', cursor: 'pointer', fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)', transition: 'all 0.3s',
              background: activeCategory === cat.category ? 'rgba(0,245,212,0.12)' : 'rgba(255,255,255,0.03)',
              color: activeCategory === cat.category ? 'var(--neon)' : 'var(--muted)',
              border: activeCategory === cat.category ? '1px solid rgba(0,245,212,0.3)' : '1px solid var(--border2)',
            }}>{cat.icon} {cat.category}</button>
        ))}
      </div>

      {/* SKILLS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.4rem' }}>
        {(displaySkills || []).map((cat, ci) => {
          const theme = colorMap[cat.color] || colorMap.neon
          return (
            <div key={cat.category} style={{
              background: 'var(--card)', border: '1px solid var(--border2)',
              borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden',
              transition: 'all 0.3s',
              animation: visible ? `fadeSlideUp 0.5s ${ci * 0.08}s both` : 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'none' }}>

              {/* TOP GLOW LINE */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${theme.color}, transparent)` }} />

              {/* HEADER */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.4rem' }}>
                <span style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: theme.bg, border: `1px solid ${theme.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
                }}>{cat.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: theme.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  // {cat.category}
                </h3>
              </div>

              {/* SKILL BARS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 500 }}>{skill.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: theme.color }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '2px',
                        background: theme.bar,
                        width: visible ? skill.level + '%' : '0',
                        transition: `width 1.2s ${0.2 + si * 0.1}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* TOOLS ICONS ROW */}
      <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '12px' }}>
        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.4rem', textAlign: 'center' }}>
          // Quelques outils maîtrisés
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
          {['Python','Django','Java','Spring Boot','Angular','Next.js','React','TypeScript','PostgreSQL','MySQL','Docker','Git','Odoo','Linux','Tailwind','Bootstrap','REST API','JWT'].map(tool => (
            <span key={tool} className="tag tag-mono"
              style={{ transition: 'all 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon)'; e.currentTarget.style.color = 'var(--neon)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--muted)' }}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}