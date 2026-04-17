'use client'
import Header from '@/app/layout/Header'
import Footer from '@/app/layout/Footer'
import HeroSection from '@/app/sections/HeroSection'
import AboutSection from '@/app/sections/AboutSection'
import ExperienceSection from '@/app/sections/ExperienceSection'
import SkillsSection from '@/app/sections/SkillsSection'
import ProjectsSection from '@/app/sections/ProjectsSection'
import ContactSection from '@/app/sections/ContactSection'
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