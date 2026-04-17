'use client'
import { useState } from 'react'
import Link from 'next/link'
import { profileData, projectsData, skillsData, experiencesData } from '@/data/mockData'

const TABS = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
  { id: 'projets', label: 'Projets', icon: '🚀' },
  { id: 'competences', label: 'Compétences', icon: '⚙️' },
  { id: 'experience', label: 'Expériences', icon: '💼' },
  { id: 'profil', label: 'Profil', icon: '👤' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)', display: 'flex' }}>

      {/* SIDEBAR */}
      <aside style={{
        width: sidebarOpen ? '240px' : '64px', flexShrink: 0,
        background: 'var(--card)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s', position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
      }}>
        {/* LOGO */}
        <div style={{ padding: '1.2rem', borderBottom: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          {sidebarOpen && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--neon)', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--muted)' }}>~/</span>dashboard
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '0.2rem', flexShrink: 0,
          }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {sidebarOpen
                ? <path d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
                : <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />}
            </svg>
          </button>
        </div>

        {/* NAV */}
        <nav style={{ flex: 1, padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} title={tab.label} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.7rem 0.85rem', borderRadius: '8px', cursor: 'pointer',
              background: activeTab === tab.id ? 'rgba(0,245,212,0.08)' : 'transparent',
              border: activeTab === tab.id ? '1px solid rgba(0,245,212,0.2)' : '1px solid transparent',
              color: activeTab === tab.id ? 'var(--neon)' : 'var(--muted)',
              width: '100%', textAlign: 'left', transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{tab.icon}</span>
              {sidebarOpen && <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{tab.label}</span>}
            </button>
          ))}
        </nav>

        {/* BOTTOM */}
        <div style={{ padding: '0.8rem', borderTop: '1px solid var(--border2)' }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.7rem 0.85rem', borderRadius: '8px',
            color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {sidebarOpen && <span style={{ fontSize: '0.82rem' }}>Voir le portfolio</span>}
          </Link>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

        {/* TOP BAR */}
        <header style={{
          padding: '1rem 2rem', background: 'var(--card)',
          borderBottom: '1px solid var(--border2)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>
              {TABS.find(t => t.id === activeTab)?.icon} {TABS.find(t => t.id === activeTab)?.label}
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.1rem' }}>
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{
              padding: '0.3rem 0.8rem', background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.2)', borderRadius: '100px',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#4ade80',
            }}>● En ligne</span>
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%',
              background: 'linear-gradient(135deg,var(--neon),var(--neon2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 700, color: 'var(--bg)', fontFamily: 'var(--font-mono)',
            }}>PL</div>
          </div>
        </header>

        {/* CONTENT */}
        <div style={{ flex: 1, padding: '2rem' }}>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'projets' && <ProjectsTab />}
          {activeTab === 'competences' && <SkillsTab />}
          {activeTab === 'experience' && <ExperienceTab />}
          {activeTab === 'profil' && <ProfilTab />}
        </div>
      </main>
    </div>
  )
}

/* ─── OVERVIEW ─── */
function OverviewTab() {
  const stats = [
    { label: 'Projets', value: projectsData.length, icon: '🚀', color: 'var(--neon)' },
    { label: 'Compétences', value: skillsData.reduce((a, c) => a + c.skills.length, 0), icon: '⚙️', color: '#a78bfa' },
    { label: 'Expériences', value: experiencesData.length, icon: '💼', color: '#fb923c' },
    { label: 'Années exp.', value: '2+', icon: '📅', color: '#7dd3fc' },
  ]
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '10px',
            padding: '1.2rem 1.4rem', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: s.color }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{s.label}</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)' }}>{s.value}</div>
              </div>
              <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="dash-grid">
        {/* RECENT PROJECTS */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '10px', padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>// Projets récents</h3>
          {projectsData.slice(0, 4).map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.7rem 0', borderBottom: '1px solid var(--border2)' }}>
              <span style={{ fontSize: '1rem' }}>{p.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.83rem', color: 'var(--text)', fontWeight: 500 }}>{p.title}</div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                  {p.stack.slice(0, 2).map(s => <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)' }}>{s}</span>)}
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.2rem 0.5rem', background: 'rgba(0,245,212,0.06)', color: 'var(--neon)', border: '1px solid rgba(0,245,212,0.15)', borderRadius: '100px' }}>{p.category}</span>
            </div>
          ))}
        </div>

        {/* SKILLS OVERVIEW */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '10px', padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>// Top compétences</h3>
          {skillsData[0].skills.map(skill => (
            <div key={skill.name} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text)' }}>{skill.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--neon)' }}>{skill.level}%</span>
              </div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: skill.level + '%', background: 'linear-gradient(90deg,var(--neon),var(--neon2))', borderRadius: '2px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.dash-grid{grid-template-columns:1fr !important}}`}</style>
    </div>
  )
}

/* ─── PROJECTS TAB ─── */
function ProjectsTab() {
  const [projects, setProjects] = useState(projectsData)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})

  const openEdit = (p) => { setEditing(p.id); setForm({ ...p }) }
  const closeEdit = () => { setEditing(null); setForm({}) }
  const saveEdit = () => {
    setProjects(prev => prev.map(p => p.id === editing ? { ...p, ...form } : p))
    closeEdit()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Gérer les projets</h2>
        <button className="btn-ghost" style={{ fontSize: '0.8rem' }}>
          <span>+</span> Nouveau projet
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {projects.map(p => (
          <div key={p.id} style={{
            background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '10px',
            padding: '1.2rem 1.4rem', display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.3rem' }}>{p.title}</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>{p.description.substring(0, 100)}...</p>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {p.stack.map(s => <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.15rem 0.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border2)', borderRadius: '100px', color: 'var(--muted)' }}>{s}</span>)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.25rem 0.7rem', background: 'rgba(0,245,212,0.06)', color: 'var(--neon)', border: '1px solid rgba(0,245,212,0.15)', borderRadius: '100px' }}>{p.category}</span>
              <button onClick={() => openEdit(p)} style={{ padding: '0.4rem 0.9rem', background: 'rgba(123,47,255,0.1)', color: '#a78bfa', border: '1px solid rgba(123,47,255,0.2)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem' }}>✏️ Modifier</button>
              <button style={{ padding: '0.4rem 0.9rem', background: 'rgba(248,113,113,0.07)', color: '#f87171', border: '1px solid rgba(248,113,113,0.18)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem' }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '520px' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--neon)', marginBottom: '1.5rem' }}>// Modifier le projet</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['title', 'description'].map(field => (
                <div key={field}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>{field}</label>
                  {field === 'description'
                    ? <textarea className="input-dark" value={form[field] || ''} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} style={{ minHeight: '80px', resize: 'vertical' }} />
                    : <input className="input-dark" value={form[field] || ''} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} />}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button className="btn-primary" onClick={saveEdit} style={{ fontSize: '0.85rem' }}>Sauvegarder</button>
              <button onClick={closeEdit} style={{ padding: '0.7rem 1.4rem', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border2)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── SKILLS TAB ─── */
function SkillsTab() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Gérer les compétences</h2>
        <button className="btn-ghost" style={{ fontSize: '0.8rem' }}>+ Ajouter</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {skillsData.map(cat => (
          <div key={cat.category} style={{ background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '10px', padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 600 }}>{cat.icon} {cat.category}</h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>{cat.skills.length} skills</span>
            </div>
            {cat.skills.map(skill => (
              <div key={skill.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{skill.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '60px', height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: skill.level + '%', background: 'var(--neon)' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--neon)' }}>{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── EXPERIENCE TAB ─── */
function ExperienceTab() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Gérer les expériences</h2>
        <button className="btn-ghost" style={{ fontSize: '0.8rem' }}>+ Ajouter</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {experiencesData.map(exp => (
          <div key={exp.id} style={{ background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '10px', padding: '1.4rem', borderLeft: `3px solid ${exp.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>{exp.role}</div>
                <div style={{ fontSize: '0.82rem', color: exp.color, fontWeight: 500 }}>{exp.company}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.3rem' }}>{exp.period}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ padding: '0.4rem 0.9rem', background: 'rgba(123,47,255,0.1)', color: '#a78bfa', border: '1px solid rgba(123,47,255,0.2)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem' }}>✏️ Modifier</button>
              </div>
            </div>
            <ul style={{ marginTop: '0.8rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {exp.tasks.slice(0, 3).map((t, i) => (
                <li key={i} style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: exp.color, fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>▸</span>{t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── PROFIL TAB ─── */
function ProfilTab() {
  const [profile, setProfile] = useState(profileData)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const fields = [
    { key: 'firstName', label: 'Prénom' },
    { key: 'lastName', label: 'Nom' },
    { key: 'title', label: 'Titre professionnel' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Téléphone principal' },
    { key: 'phone2', label: 'Téléphone secondaire' },
    { key: 'location', label: 'Localisation' },
    { key: 'github', label: 'GitHub URL' },
    { key: 'linkedin', label: 'LinkedIn URL' },
  ]

  return (
    <div style={{ maxWidth: '640px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Modifier le profil</h2>
        {saved && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            ✅ Sauvegardé !
          </span>
        )}
      </div>

      {/* AVATAR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', padding: '1.5rem', background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '10px' }}>
        <div style={{
          width: '70px', height: '70px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg,var(--neon),var(--neon2))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', fontWeight: 700, color: 'var(--bg)', fontFamily: 'var(--font-mono)',
        }}>PL</div>
        <div>
          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>{profile.name}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{profile.title}</div>
          <button className="btn-ghost" style={{ fontSize: '0.72rem', marginTop: '0.6rem', padding: '0.3rem 0.8rem' }}>📷 Changer la photo</button>
        </div>
      </div>

      {/* FIELDS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {fields.map(f => (
          <div key={f.key}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>{f.label}</label>
            <input className="input-dark" value={profile[f.key] || ''} onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))} />
          </div>
        ))}
      </div>

      {/* BIO */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Bio</label>
        <textarea className="input-dark" value={profile.bio || ''} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} style={{ minHeight: '100px', resize: 'vertical' }} />
      </div>

      {/* AVAILABLE TOGGLE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '8px' }}>
        <span style={{ fontSize: '0.88rem', color: 'var(--text)', flex: 1 }}>Disponible pour de nouveaux projets</span>
        <button onClick={() => setProfile(p => ({ ...p, available: !p.available }))} style={{
          width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
          background: profile.available ? 'var(--neon)' : 'rgba(255,255,255,0.1)',
          position: 'relative', transition: 'background 0.3s',
        }}>
          <div style={{
            width: '18px', height: '18px', borderRadius: '50%', background: 'white',
            position: 'absolute', top: '3px',
            left: profile.available ? '23px' : '3px', transition: 'left 0.3s',
          }} />
        </button>
      </div>

      <button className="btn-primary" onClick={handleSave}>
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
        </svg>
        Sauvegarder les modifications
      </button>
    </div>
  )
}
