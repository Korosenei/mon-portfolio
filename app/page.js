'use client'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'
import {
  profileData,
  experiencesData,
  skillsData,
  projectsData,
  formationsData,
  autresFormationsData,
} from '@/data/mockData'

export default function HomePage() {
  return (
    <>
      {/* GRID OVERLAY GLOBAL */}
      <div className="grid-overlay" />

      <Header />

      <main>
        <HeroSection profile={profileData} />
        <AboutSection
          profile={profileData}
          formations={formationsData}
          autresFormations={autresFormationsData}
        />
        <ExperienceSection experiences={experiencesData} />
        <SkillsSection skills={skillsData} />
        <ProjectsSection projects={projectsData} />
        <ContactSection profile={profileData} />
      </main>

      <Footer profile={profileData} />
    </>
  )
}