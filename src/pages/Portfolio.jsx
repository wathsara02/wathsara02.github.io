import { lazy, Suspense } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { PageTransition } from "@/components/layout/PageTransition"
import { Hero } from "@/components/sections/Hero"
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar"

const About      = lazy(() => import("@/components/sections/About").then(m => ({ default: m.About })))
const SkillsIcons = lazy(() => import("@/components/sections/SkillsIcons").then(m => ({ default: m.SkillsIcons })))
const Skills     = lazy(() => import("@/components/sections/Skills").then(m => ({ default: m.Skills })))
const Interests  = lazy(() => import("@/components/sections/Interests").then(m => ({ default: m.Interests })))
const Projects   = lazy(() => import("@/components/sections/Projects").then(m => ({ default: m.Projects })))
const Experience = lazy(() => import("@/components/sections/Experience").then(m => ({ default: m.Experience })))
const Education  = lazy(() => import("@/components/sections/Education").then(m => ({ default: m.Education })))
const Contact    = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })))

export function Portfolio() {
  return (
    <PageTransition>
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <SkillsIcons />
          <Interests />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </Suspense>
      </main>
    </PageTransition>
  )
}

