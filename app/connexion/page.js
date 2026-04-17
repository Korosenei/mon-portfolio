'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ConnexionPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    // Remplacer par vraie auth Supabase
    if (form.email === 'admin@portfolio.com' && form.password === 'admin123') {
      router.push('/dashboard')
    } else {
      setError('Identifiants incorrects. Vérifiez votre email et mot de passe.')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* GRID */}
      <div className="grid-overlay" />

      {/* BG GLOW */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,47,255,0.1) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}>

        {/* CARD */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: '16px', padding: '2.5rem', position: 'relative', overflow: 'hidden',
        }}>
          {/* TOP GLOW */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,var(--neon2),transparent)' }} />

          {/* ICON */}
          <div style={{
            height: '52px', borderRadius: '12px',
            fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem',
            background: 'linear-gradient(135deg, rgba(123,47,255,0.2), rgba(0,245,212,0.1))',
            border: '1px solid rgba(123,47,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.5rem', fontSize: '1.4rem',
          }}>🔐 Mon espace sécurisé</div>

          {error && (
            <div style={{
              padding: '0.85rem 1rem', background: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.25)', borderRadius: '8px', marginBottom: '1.2rem',
              display: 'flex', alignItems: 'center', gap: '0.7rem',
            }}>
              <span>⚠️</span>
              <span style={{ fontSize: '0.82rem', color: '#f87171' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                // Email
              </label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required
                className="input-dark" placeholder="admin@portfolio.com"
                autoComplete="email" />
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                // Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <input name="password" type={showPwd ? 'text' : 'password'} value={form.password} onChange={handleChange} required
                  className="input-dark" placeholder="••••••••"
                  style={{ paddingRight: '3rem' }}
                  autoComplete="current-password" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{
                  position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '0.2rem',
                }}>
                  {showPwd ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.75 : 1 }}>
              {loading ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 11-18 0" />
                  </svg>
                  Connexion...
                </>
              ) : (
                <>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
                  </svg>
                  Se connecter
                </>
              )}
            </button>

            {/* BACK */}
            <Link href="/" style={{
            display: 'inline-flex', gap: '0.5rem',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)',
            textDecoration: 'none', marginBottom: '0.5rem', transition: 'color 0.3s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--neon)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Aller au portfolio
            </Link>
          </form>
        </div>

        {/* DEMO INFO */}
        <div style={{
          marginTop: '1rem', padding: '0.8rem 1rem',
          background: 'rgba(0,245,212,0.04)', border: '1px solid rgba(0,245,212,0.12)',
          borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)',
        }}>
          <span style={{ color: 'var(--neon)' }}>// demo:</span> admin@portfolio.com / admin123
        </div>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
