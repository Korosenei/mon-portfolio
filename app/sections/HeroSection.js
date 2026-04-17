"use client";
import { useState, useEffect, useRef } from "react";

export default function HeroSection({ profile }) {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const tiRef = useRef(0);
  const timeoutRef = useRef(null);

  const titles = [
    "Développeur Full Stack",
    "Backend Engineer",
    "Python / Django Dev",
    "Java / Spring Dev",
  ];

  useEffect(() => {
    setVisible(true);
  }, []);

  // TYPEWRITER
  useEffect(() => {
    const type = () => {
      const current = titles[tiRef.current];
      if (!deletingRef.current) {
        charRef.current++;
        setDisplayText(current.slice(0, charRef.current));
        if (charRef.current === current.length) {
          deletingRef.current = true;
          timeoutRef.current = setTimeout(type, 2000);
          return;
        }
      } else {
        charRef.current--;
        setDisplayText(current.slice(0, charRef.current));
        if (charRef.current === 0) {
          deletingRef.current = false;
          tiRef.current = (tiRef.current + 1) % titles.length;
        }
      }
      timeoutRef.current = setTimeout(type, deletingRef.current ? 45 : 80);
    };
    timeoutRef.current = setTimeout(type, 1800);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // PARTICLES CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const COUNT = 55;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    class P {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.r = Math.random() * 1.5 + 0.4;
        this.a = Math.random() * 0.45 + 0.08;
        this.c = Math.random() > 0.65 ? "0,245,212" : "123,47,255";
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        )
          this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.c},${this.a})`;
        ctx.fill();
      }
    }
    for (let i = 0; i < COUNT; i++) particles.push(new P());

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x,
            dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,212,${0.05 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  const statsStyle = { textAlign: "center" };

  return (
    <section
      id="accueil"
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* GRADIENT BG */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(123,47,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 20% 70%, rgba(0,245,212,0.05) 0%, transparent 50%)",
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "5rem 3rem 4rem",
          display: "flex",
          alignItems: "center",
          gap: "4rem",
          minHeight: "100vh",
        }}
        className="hero-inner"
      >
        {/* LEFT */}
        <div style={{ flex: 1 }}>
          {/* STATUS BADGE */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.5rem 1.1rem",
              background: "rgba(74,222,128,0.07)",
              border: "1px solid rgba(74,222,128,0.25)",
              borderRadius: "100px",
              marginBottom: "2rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                background: "#4ade80",
                borderRadius: "50%",
                boxShadow: "0 0 10px #4ade80",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.78rem",
                color: "#4ade80",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
              }}
            >
              {profile?.available
                ? "Disponible pour de nouveaux projets"
                : "Actuellement occupé"}
            </span>
          </div>

          {/* GREETING */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--muted)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "all 0.6s 0.1s ease",
            }}
          >
            Bonjour, je suis
          </p>

          {/* NAME */}
          <h1
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: "0.6rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "all 0.6s 0.2s ease",
            }}
          >
            <span style={{ color: "var(--text)", display: "block" }}>
              Léandre
            </span>
            <span
              style={{
                display: "block",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(0,245,212,0.7)",
                textShadow: "0 0 40px rgba(0,245,212,0.2)",
                letterSpacing: "-0.01em",
              }}
            >
              PARE
              <span
                style={{
                  animation: "blink 0.8s infinite",
                  color: "var(--neon)",
                  WebkitTextFillColor: "var(--neon)",
                  WebkitTextStroke: "0",
                }}
              >
                _
              </span>
            </span>
          </h1>

          {/* TYPEWRITER TITLE */}
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)",
              fontWeight: 400,
              color: "#a78bfa",
              marginBottom: "1.6rem",
              minHeight: "2rem",
              opacity: visible ? 1 : 0,
              transition: "all 0.6s 0.3s ease",
            }}
          >
            {displayText}
            <span
              style={{ animation: "blink 0.8s infinite", color: "var(--neon)" }}
            >
              |
            </span>
            <span
              style={{
                color: "var(--muted)",
                marginLeft: "0.6rem",
                fontSize: "0.85em",
              }}
            >
              / LICENCE.PRO
            </span>
          </p>

          {/* BIO */}
          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.85,
              fontSize: "0.95rem",
              maxWidth: "540px",
              marginBottom: "2.5rem",
              opacity: visible ? 1 : 0,
              transition: "all 0.6s 0.4s ease",
            }}
          >
            Passionné par la création de{" "}
            <span style={{ color: "var(--text)", fontWeight: 500 }}>
              solutions web innovantes
            </span>
            , je maîtrise{" "}
            <span
              style={{
                color: "var(--neon)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.9em",
              }}
            >
              Java/Spring Boot
            </span>
            ,{" "}
            <span
              style={{
                color: "var(--neon)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.9em",
              }}
            >
              Python/Django
            </span>{" "}
            &{" "}
            <span
              style={{
                color: "var(--neon)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.9em",
              }}
            >
              Angular
            </span>
            . Basé à{" "}
            <span style={{ color: "var(--text)" }}>Ouagadougou 🇧🇫</span>,
            orienté résultats.
          </p>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              opacity: visible ? 1 : 0,
              transition: "all 0.6s 0.5s ease",
            }}
          >
            <button className="btn-primary" onClick={() => scrollTo("contact")}>
              <svg
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Me Contacter
            </button>
            <button
              className="btn-secondary"
              onClick={() => scrollTo("projets")}
            >
              <svg
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
              Mes Projets
            </button>
            <a
              className="btn-download"
              href={profile?.cvUrl || "/CV_PARE_Kontama.pdf"}
              download
            >
              <svg
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Télécharger CV
            </a>
          </div>

          {/* STATS */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
              opacity: visible ? 1 : 0,
              transition: "all 0.6s 0.6s ease",
            }}
            className="hero-stats"
          >
            {(
              profile?.stats || [
                { value: "2+", label: "Ans d'expérience" },
                { value: "10+", label: "Projets réalisés" },
                { value: "4", label: "Entreprises" },
                { value: "5", label: "Langues" },
              ]
            ).map((s, i) => (
              <div key={i} style={statsStyle}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: "var(--neon)",
                  }}
                >
                  {s.value}
                  {s.suffix || ""}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: "0.2rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — AVATAR */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(30px)",
            transition: "all 0.8s 0.3s ease",
          }}
          className="hero-avatar"
        >
          <div
            style={{ position: "relative", width: "320px", height: "320px" }}
          >
            {/* RINGS */}
            <div
              style={{
                position: "absolute",
                inset: "-25px",
                borderRadius: "50%",
                border: "1px solid rgba(0,245,212,0.18)",
                animation: "spin 22s linear infinite",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "18px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "9px",
                  height: "9px",
                  background: "var(--neon)",
                  borderRadius: "50%",
                  boxShadow: "0 0 18px var(--neon)",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                inset: "-48px",
                borderRadius: "50%",
                border: "1px dashed rgba(123,47,255,0.18)",
                animation: "spin 35s linear infinite reverse",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "25px",
                  right: "8px",
                  width: "7px",
                  height: "7px",
                  background: "var(--neon2)",
                  borderRadius: "50%",
                  boxShadow: "0 0 15px var(--neon2)",
                }}
              />
            </div>

            {/* AVATAR */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "3px solid rgba(0,245,212,0.3)",
                background:
                  "linear-gradient(135deg, #0d0d20, #1a0540, #0d1a20)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 0 80px rgba(0,245,212,0.12), 0 0 30px rgba(123,47,255,0.1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 30% 30%, rgba(0,245,212,0.1), transparent 60%)",
                }}
              />

              {/* IMAGE DE PROFIL */}
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={`${profile?.firstName || ""} ${profile?.lastName || ""}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "relative",
                  }}
                />
              ) : (
                <span
                  style={{
                    fontSize: "5.5rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span style={{ color: "var(--neon)" }}>P</span>
                  <span style={{ color: "#a78bfa" }}>L</span>
                </span>
              )}
            </div>

            {/* BADGE */}
            <div
              style={{
                position: "absolute",
                bottom: "-15px",
                right: "-15px",
                background: "linear-gradient(135deg, #7b2fff, #a855f7)",
                padding: "0.55rem 1.3rem",
                borderRadius: "100px",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "white",
                boxShadow: "0 8px 25px rgba(123,47,255,0.5)",
                whiteSpace: "nowrap",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              🎓 M2 ISIE • IBAM
            </div>

            {/* FLOATING CARDS */}
            {[
              {
                style: { top: "-25px", left: "-70px" },
                delay: "0s",
                label: "// stack",
                value: "Django · Spring · Angular",
              },
              {
                style: { bottom: "30px", left: "-80px" },
                delay: "1.5s",
                label: "// localisation",
                value: "Ouagadougou 🇧🇫",
              },
              {
                style: { top: "50px", right: "-60px" },
                delay: "1s",
                label: "// statut",
                value: "● Open to work",
                color: "#4ade80",
              },
            ].map((fc, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...fc.style,
                  background: "rgba(10,10,26,0.92)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "0.7rem 1rem",
                  backdropFilter: "blur(10px)",
                  animation: `float 3s ${fc.delay} ease-in-out infinite`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--muted)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {fc.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: fc.color || "var(--neon)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {fc.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 1,
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--muted)",
            letterSpacing: "0.1em",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(180deg, var(--neon), transparent)",
          }}
        />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-inner { flex-direction: column !important; padding: 7rem 1.5rem 4rem !important; text-align: center; }
          .hero-avatar { display: none !important; }
          .hero-stats { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
