export type SocialKey = 'github' | 'linkedin' | 'twitter' | 'kaggle'

export type Meta = {
  name: string
  title: string
  roles: string[]
  tagline: string
  email: string
  location: string
  availability: string
  avatar: string
  resumeUrl: string
  socials: Record<SocialKey, string>
}

export type Stat = {
  value: string
  label: string
}

export type SkillCategory = {
  category: string
  items: string[]
}

export type Project = {
  id: number
  title: string
  description: string
  tags: string[]
  metrics: Stat[]
  githubUrl: string
  liveUrl: string
  image: string
}

/** Month/year parts are only present on entries created through the admin editor. */
export type PeriodParts = {
  startMonth?: string
  startYear?: string
  endMonth?: string
  endYear?: string
  current?: boolean
}

export type TimelineEntry = PeriodParts & {
  id: number
  period: string
  location: string
  description: string
}

export type ExperienceEntry = TimelineEntry & {
  role: string
  company: string
  highlights: string[]
}

export type EducationEntry = TimelineEntry & {
  degree: string
  institution: string
}

export type PortfolioData = {
  meta: Meta
  stats: Stat[]
  about: { bio: string }
  skills: SkillCategory[]
  projects: Project[]
  experience: ExperienceEntry[]
  education: EducationEntry[]
  contact: { heading: string; subtext: string }
}
