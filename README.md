# 🚀 Portfolio Next.js + Supabase + Tailwind CSS

Portfolio professionnel full-stack avec thème sombre, animations, dashboard admin et gestion complète via Supabase.

---

## 📁 Structure du projet

```
mon-portfolio/
├── app/
│   ├── globals.css              # Variables CSS dark theme + animations
│   ├── layout.js                # Layout racine + fonts
│   ├── page.js                  # Page d'accueil
│   └── dashboard/
│       ├── layout.js            # Layout sidebar dashboard
│       ├── page.js              # Vue d'ensemble
│       ├── projets/page.js      # CRUD projets
│       ├── competences/page.js  # CRUD compétences
│       └── profil/page.js       # Édition profil
├── components/
│   ├── layout/
│   │   ├── Header.js            # Navbar fixe + boutons CV & Dashboard
│   │   └── Footer.js            # Footer complet + liens sociaux
│   └── home/
│       ├── HeroSection.js       # Hero animé + avatar + CTA
│       ├── StatsBar.js          # Compteurs animés (IntersectionObserver)
│       ├── SkillsSection.js     # Grille compétences + filtre catégories
│       ├── ProjectsSection.js   # Grille projets avec cards
│       └── ContactSection.js    # Bande contact + bouton CV
├── lib/
│   └── supabase.js              # Client + toutes les fonctions CRUD
├── data/
│   └── mockData.js              # Données de démo (fallback)
├── middleware.js                # Protection route /dashboard
├── supabase-schema.sql          # Schéma SQL complet à importer
├── next.config.js
├── tailwind.config.js
└── .env.local.example
```

---

## ⚙️ Installation

```bash
# 1. Créer le projet Next.js
npx create-next-app@latest mon-portfolio --app --src-dir=false

# 2. Installer les dépendances
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# 3. Copier tous les fichiers de ce projet

# 4. Configurer les variables d'environnement
cp .env.local.example .env.local
# Remplir NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY

# 5. Lancer en développement
npm run dev
```

---

## 🗄️ Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com)
2. Allez dans **SQL Editor** et copiez le contenu de `supabase-schema.sql`
3. Exécutez le script pour créer les tables, les RLS policies et les données de départ
4. Récupérez vos clés dans **Settings → API** et remplissez `.env.local`

---

## 🔐 Authentification Dashboard

Le dashboard `/dashboard` est protégé par Supabase Auth.

Pour créer votre compte admin :
1. Allez dans **Supabase → Authentication → Users**
2. Cliquez sur **Add user**
3. Entrez votre email et mot de passe
4. Connectez-vous sur `/dashboard`

---

## 📄 Bouton Télécharger CV

Placez votre fichier CV dans `/public/cv.pdf`.

Le bouton télécharge automatiquement ce fichier. Pour changer le chemin, modifiez `cv_url` dans votre profil Supabase ou dans `data/mockData.js`.

---

## 🎨 Personnalisation

### Couleurs (globals.css)
```css
:root {
  --accent: #6c63ff;    /* Violet principal */
  --accent2: #4ecdc4;   /* Teal */
  --accent3: #ff6b6b;   /* Rouge/corail */
}
```

### Données (data/mockData.js)
Modifiez `profileData`, `projectsData` et `skillsData` pour des données de démo pendant le développement. Une fois Supabase configuré, ces données servent de fallback.

---

## 🚀 Déploiement sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Ajouter les variables d'environnement dans Vercel Dashboard :
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## ✅ Fonctionnalités

- [x] Thème sombre complet avec variables CSS
- [x] Hero section avec animations (orbs, ring tournant, cartes flottantes)
- [x] Barre de stats avec compteurs animés (IntersectionObserver)
- [x] Section compétences avec filtre par catégorie
- [x] Grille de projets avec cards interactives
- [x] Section contact avec boutons CV + email
- [x] **Bouton télécharger CV** (Header + Hero + Contact + Footer)
- [x] **Bouton Dashboard Admin** (Header + Footer)
- [x] Dashboard protégé par auth Supabase
- [x] CRUD complet Projets (créer, modifier, supprimer)
- [x] CRUD complet Compétences avec filtre catégorie
- [x] Gestion profil avec toggle disponibilité
- [x] Schéma SQL Supabase avec RLS policies
- [x] Fallback mock data si Supabase non configuré