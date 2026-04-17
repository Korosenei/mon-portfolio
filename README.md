# Portfolio — PARE Kontama Léandre Bénilde

Portfolio professionnel Full Stack développé avec **Next.js 14**, **Supabase** et **Tailwind CSS**.

## 🗂️ Structure du projet

```
mon-portfolio/
├── app/
│   ├── page.js                    ← Page d'accueil (toutes sections)
│   ├── layout.js                  ← Layout global + metadata
│   ├── globals.css                ← Thème sombre techno + CSS global
│   ├── connexion/
│   │   └── page.js               ← Page de connexion admin
│   └── dashboard/
│       └── page.js               ← Dashboard admin complet
│
├── components/
│   ├── layout/
│   │   ├── Header.js             ← Navigation sticky + mobile
│   │   └── Footer.js             ← Footer avec liens + dashboard btn
│   └── sections/
│       ├── HeroSection.js        ← Hero + canvas particles + typewriter
│       ├── AboutSection.js       ← À propos + formations + langues
│       ├── ExperienceSection.js  ← Timeline interactive
│       ├── SkillsSection.js      ← Compétences + barres de progression
│       ├── ProjectsSection.js    ← Projets avec filtres
│       └── ContactSection.js     ← Contact + formulaire + références
│
├── data/
│   └── mockData.js               ← Données statiques (remplacer par Supabase)
│
└── lib/
    └── supabase.js               ← Client Supabase + helpers API
```

## 🚀 Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Copier et configurer les variables d'env
cp .env.local.example .env.local
# → Remplir NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Lancer en développement
npm run dev

# 4. Build production
npm run build && npm start
```

## 🔐 Connexion Dashboard

URL : `/connexion`
- Demo : `admin@portfolio.com` / `admin123`
- En production : remplacer par l'auth Supabase dans `app/connexion/page.js`

## 🗄️ Tables Supabase à créer

```sql
-- Profil
create table profile (
  id bigint primary key default 1,
  name text, first_name text, last_name text,
  title text, bio text,
  email text, phone text, phone2 text,
  location text, github text, linkedin text,
  cv_url text, available boolean default true
);

-- Projets
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text, color text, category text,
  stack text[], github text, live text,
  featured boolean default false,
  order_index int default 0
);

-- Compétences
create table skills (
  id uuid primary key default gen_random_uuid(),
  category text, icon text, color text,
  skills jsonb
);

-- Expériences
create table experiences (
  id uuid primary key default gen_random_uuid(),
  role text, company text, location text,
  period text, type text, color text,
  tasks text[], stack text[],
  order_index int default 0
);

-- Messages contact
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text, email text, subject text, message text,
  created_at timestamptz default now(),
  read boolean default false
);
```

## ✅ Fonctionnalités

- Thème sombre techno avec animations canvas particles
- Navigation sticky avec détection de section active
- Typewriter effect sur le titre hero
- Révélation au scroll (Intersection Observer)
- Barres de progression animées
- Timeline interactive pour les expériences
- Filtres de projets par catégorie
- Formulaire de contact fonctionnel
- Téléchargement CV direct
- Dashboard admin complet (CRUD projets/compétences/profil)
- Page de connexion sécurisée
- Responsive mobile
- SEO optimisé (metadata Next.js)
