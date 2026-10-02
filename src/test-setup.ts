import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(cleanup)

// jsdom has no IntersectionObserver; components only need it to exist.
vi.stubGlobal('IntersectionObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
})

// jsdom has no matchMedia either; report "not desktop" and never fire changes.
vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {} }))

// jsdom does not implement <dialog> methods.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) { this.open = true }
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) { this.open = false; this.dispatchEvent(new Event('close')) }
