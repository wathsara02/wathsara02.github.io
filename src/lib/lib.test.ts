import { describe, expect, test } from 'vitest'
import { defaults } from '@/data/defaults'
import { buildPeriod, sortNewestFirst, startYearOf } from './period'
import { validatePortfolioData } from './schema'
import { sectionIndex } from './sections'
import { displayUrl, safeUrl } from './url'

describe('buildPeriod', () => {
  test('joins start and end with a dash', () => {
    expect(buildPeriod({ startMonth: 'March', startYear: '2024', endMonth: 'May', endYear: '2025' })).toBe('March 2024 — May 2025')
  })

  test('shows Present for a current entry and ignores any end date', () => {
    expect(buildPeriod({ startYear: '2026', endYear: '2027', current: true })).toBe('2026 — Present')
  })

  test('returns only the side that is filled in', () => {
    expect(buildPeriod({ startYear: '2023' })).toBe('2023')
    expect(buildPeriod({})).toBe('')
  })
})

describe('startYearOf and sortNewestFirst', () => {
  test('prefers the explicit start year over the display string', () => {
    expect(startYearOf({ startYear: '2021', period: '2019 — 2022' })).toBe(2021)
  })

  test('falls back to the first year in the display string, then to zero', () => {
    expect(startYearOf({ period: 'March 2026 — Present' })).toBe(2026)
    expect(startYearOf({ period: 'sometime' })).toBe(0)
  })

  test('sorts newest first without mutating the input', () => {
    const entries = [{ period: '2019 — 2022' }, { period: '2023 — 2026' }]

    const sorted = sortNewestFirst(entries)

    expect(sorted.map((entry) => entry.period)).toEqual(['2023 — 2026', '2019 — 2022'])
    expect(entries[0]?.period).toBe('2019 — 2022')
  })
})

describe('safeUrl', () => {
  test.each(['https://example.com', 'http://example.com/a', 'mailto:me@example.com', '/about.webp'])('allows %s', (url) => {
    expect(safeUrl(url)).toBe(url)
  })

  test.each(['javascript:alert(1)', 'data:text/html,x', '//evil.example', '/\\evil.example', 'not a url', ''])('rejects %j', (url) => {
    expect(safeUrl(url)).toBeUndefined()
  })
})

test('displayUrl strips the scheme, www and trailing slash', () => {
  expect(displayUrl('https://www.github.com/wathsara02/')).toBe('github.com/wathsara02')
})

test('sectionIndex returns the two-digit page position', () => {
  expect(sectionIndex('about')).toBe('01')
  expect(sectionIndex('contact')).toBe('06')
})

describe('validatePortfolioData', () => {
  test('accepts the published defaults', () => {
    expect(validatePortfolioData(defaults)).toEqual([])
  })

  test('reports each problem with its path', () => {
    const broken = {
      ...defaults,
      meta: { ...defaults.meta, name: ' ', resumeUrl: 'javascript:alert(1)' },
      projects: [{ ...defaults.projects[0], tags: 'PyTorch' }],
    }

    expect(validatePortfolioData(broken)).toEqual([
      'meta.name: required',
      'meta.resumeUrl: must be an http(s) link or a site path',
      'projects[0].tags: expected a list',
    ])
  })

  test('rejects data that is not an object', () => {
    expect(validatePortfolioData(null)).toEqual([': expected an object'])
  })
})
