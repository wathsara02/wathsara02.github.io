import { safeUrl } from './url'

type Check = (value: unknown, path: string) => string[]

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const string: Check = (value, path) => (typeof value === 'string' ? [] : [`${path}: expected text`])
const number: Check = (value, path) => (typeof value === 'number' && Number.isFinite(value) ? [] : [`${path}: expected a number`])

const requiredString: Check = (value, path) =>
  typeof value === 'string' && value.trim() ? [] : [`${path}: required`]

const url: Check = (value, path) => {
  if (typeof value !== 'string') return [`${path}: expected text`]
  return value === '' || safeUrl(value) ? [] : [`${path}: must be an http(s) link or a site path`]
}

const listOf = (item: Check): Check => (value, path) =>
  Array.isArray(value) ? value.flatMap((entry, i) => item(entry, `${path}[${i}]`)) : [`${path}: expected a list`]

const shape = (fields: Record<string, Check>): Check => (value, path) =>
  isRecord(value)
    ? Object.entries(fields).flatMap(([key, check]) => check(value[key], path ? `${path}.${key}` : key))
    : [`${path}: expected an object`]

const stat = shape({ value: requiredString, label: requiredString })

const timelineFields = { id: number, period: string, location: string, description: string }

const portfolio = shape({
  meta: shape({
    name: requiredString,
    title: requiredString,
    roles: listOf(requiredString),
    tagline: string,
    email: requiredString,
    location: string,
    availability: string,
    avatar: url,
    resumeUrl: url,
    socials: shape({ github: url, linkedin: url, twitter: url, kaggle: url }),
  }),
  stats: listOf(stat),
  about: shape({ bio: string }),
  skills: listOf(shape({ category: requiredString, items: listOf(requiredString) })),
  projects: listOf(shape({
    id: number,
    title: requiredString,
    description: string,
    tags: listOf(requiredString),
    metrics: listOf(stat),
    githubUrl: url,
    liveUrl: url,
    image: url,
  })),
  experience: listOf(shape({ ...timelineFields, role: requiredString, company: requiredString, highlights: listOf(requiredString) })),
  education: listOf(shape({ ...timelineFields, degree: requiredString, institution: requiredString })),
  contact: shape({ heading: string, subtext: string }),
})

/** Returns a list of human-readable problems; empty means the data is valid. */
export function validatePortfolioData(data: unknown): string[] {
  return portfolio(data, '')
}
