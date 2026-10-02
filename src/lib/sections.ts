/** Single source of truth for page sections: nav, footer and section ids all read this. */
export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export const SOCIAL_LABELS = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  kaggle: 'Kaggle',
} as const

/** Two-digit position of a section on the page, e.g. "03". */
export function sectionIndex(id: SectionId): string {
  const position = SECTIONS.findIndex((section) => section.id === id) + 1
  return String(position).padStart(2, '0')
}
