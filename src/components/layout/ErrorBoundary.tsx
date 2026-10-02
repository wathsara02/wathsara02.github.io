import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

// Error boundaries still require a class component in React 19.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled render error', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="shell flex min-h-screen flex-col items-start justify-center gap-6">
        <p className="eyebrow text-accent">Error</p>
        <h1 className="font-display text-display font-bold uppercase">Something broke.</h1>
        <p className="text-lead text-secondary">Reloading the page usually fixes it.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="border-2 border-accent bg-accent px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-accentFg"
        >
          Reload
        </button>
      </main>
    )
  }
}
