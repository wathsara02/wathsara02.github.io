const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:'])

// Browsers treat "\" as "/", so "/\host" would escape the site; control characters are never valid.
// eslint-disable-next-line no-control-regex
const UNSAFE_PATH_CHARS = /[\\\u0000-\u001f]/

/** Returns the URL only if it is same-site relative or uses a safe scheme. */
export function safeUrl(url: string): string | undefined {
  if (!url || UNSAFE_PATH_CHARS.test(url)) return undefined
  if (url.startsWith('/')) return url.startsWith('//') ? undefined : url
  try {
    return SAFE_PROTOCOLS.has(new URL(url).protocol) ? url : undefined
  } catch {
    return undefined
  }
}

/** "https://www.github.com/user/" -> "github.com/user" */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}
