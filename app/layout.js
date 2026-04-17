import './globals.css'

export const metadata = {
  title: 'PARE Kontama Léandre — Développeur Full Stack',
  description: 'Portfolio de PARE Kontama Léandre Bénilde, Développeur Full Stack basé à Ouagadougou. Java/Spring Boot, Python/Django, Angular, Next.js.',
  keywords: 'développeur full stack, Django, Spring Boot, Angular, Ouagadougou, Burkina Faso',
  authors: [{ name: 'PARE Kontama Léandre Bénilde' }],
  openGraph: {
    title: 'PARE Kontama Léandre — Développeur Full Stack',
    description: 'Portfolio full stack developer basé à Ouagadougou, BF.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}