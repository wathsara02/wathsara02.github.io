import { useEffect, useRef, useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2, ExternalLink, GitBranch, Loader2, RotateCcw, Save, Settings, X } from 'lucide-react'
import { defaults } from '@/data/defaults'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { validatePortfolioData } from '@/lib/schema'
import type { PortfolioData } from '@/types/portfolio'
import {
  AboutEditor, ContactEditor, EducationEditor, ExperienceEditor, MetaEditor, ProjectsEditor, SkillsEditor,
  type EditorProps,
} from './editors'
import { Field, TextInput } from './fields'
import { commitPortfolioData, loadToken, storeToken } from './github'

type Tab = {
  label: string
  /** Data keys this tab edits; "Reset" restores exactly these. */
  keys: (keyof PortfolioData)[]
  Editor: ComponentType<EditorProps>
}

const TABS: Tab[] = [
  { label: 'Meta', keys: ['meta'], Editor: MetaEditor },
  { label: 'About', keys: ['about', 'stats'], Editor: AboutEditor },
  { label: 'Skills', keys: ['skills'], Editor: SkillsEditor },
  { label: 'Projects', keys: ['projects'], Editor: ProjectsEditor },
  { label: 'Experience', keys: ['experience'], Editor: ExperienceEditor },
  { label: 'Education', keys: ['education'], Editor: EducationEditor },
  { label: 'Contact', keys: ['contact'], Editor: ContactEditor },
]

type SaveState =
  | { status: 'idle' }
  | { status: 'saving' }
  | { status: 'success'; message: string }
  | { status: 'error'; problems: string[] }

const PRIMARY_BUTTON =
  'flex items-center justify-center gap-2 bg-accent px-6 py-2.5 font-mono text-sm font-bold uppercase tracking-widest text-accentFg transition-opacity hover:opacity-90 disabled:opacity-60'

function TokenDialog({ token, onSave, onClose }: { token: string; onSave: (token: string) => void; onClose: () => void }) {
  const [value, setValue] = useState(token)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // showModal gives the focus trap, Escape handling and focus restore for free.
  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  return (
    <dialog ref={dialogRef} onClose={onClose} aria-labelledby="token-dialog-title" className="w-full max-w-lg bg-transparent p-0 text-primary backdrop:bg-bg/80 backdrop:backdrop-blur-sm">
      <form
        className="space-y-5 border-2 border-border bg-surface p-8"
        onSubmit={(event) => { event.preventDefault(); onSave(value.trim()); onClose() }}
      >
        <div className="flex items-center justify-between">
          <h2 id="token-dialog-title" className="font-display text-xl font-bold">GitHub token</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="text-faint hover:text-primary"><X size={18} /></button>
        </div>
        <ol className="list-decimal space-y-1 pl-5 font-mono text-xs leading-relaxed text-secondary">
          <li>GitHub → Settings → Developer settings → Fine-grained tokens.</li>
          <li>Grant <span className="text-accent">Contents: Read and write</span> on this repository only.</li>
          <li>Paste it below. It is kept for this browser tab only.</li>
        </ol>
        <Field label="Personal access token">
          <TextInput type="password" value={value} onChange={setValue} placeholder="github_pat_..." />
        </Field>
        <button type="submit" className={`${PRIMARY_BUTTON} w-full`}>Save token</button>
      </form>
    </dialog>
  )
}

function SaveNotice({ state }: { state: SaveState }) {
  return (
    <div role="status" className="min-w-0 font-mono text-xs">
      {state.status === 'success' && (
        <p className="flex items-center gap-1 text-accent"><CheckCircle2 size={12} /> {state.message}</p>
      )}
      {state.status === 'error' && (
        <ul className="space-y-1 text-red-400">
          {state.problems.map((problem) => (
            <li key={problem} className="flex items-start gap-1"><AlertCircle size={12} className="mt-0.5 shrink-0" /> {problem}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Admin() {
  const { portfolioData, saveDraft } = usePortfolioData()
  const [draft, setDraft] = useState(portfolioData)
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]!)
  const [saveState, setSaveState] = useState<SaveState>({ status: 'idle' })
  const [isConfirmingReset, setIsConfirmingReset] = useState(false)
  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false)
  const [token, setToken] = useState(loadToken)

  const handleTokenSave = (next: string) => {
    setToken(next)
    storeToken(next)
  }

  const handleSave = async () => {
    const problems = validatePortfolioData(draft)
    if (problems.length > 0) {
      setSaveState({ status: 'error', problems })
      return
    }
    saveDraft(draft)
    if (!token) {
      setSaveState({ status: 'success', message: 'Saved in this browser only. Connect GitHub to publish.' })
      return
    }
    setSaveState({ status: 'saving' })
    try {
      await commitPortfolioData(token, draft)
      setSaveState({ status: 'success', message: 'Committed. The site rebuilds in about two minutes.' })
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Unknown error'
      setSaveState({ status: 'error', problems: [`Saved locally, but publishing failed. ${reason}`] })
    }
  }

  const handleReset = () => {
    const restored = Object.fromEntries(activeTab.keys.map((key) => [key, defaults[key]]))
    setDraft({ ...draft, ...restored })
    setIsConfirmingReset(false)
  }

  const { Editor } = activeTab

  return (
    <div className="min-h-screen bg-bg">
      {isTokenDialogOpen && <TokenDialog token={token} onSave={handleTokenSave} onClose={() => setIsTokenDialogOpen(false)} />}

      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b-2 border-border bg-surface px-6 py-4">
        <h1 className="font-display text-lg font-bold">Portfolio admin</h1>
        <div className="flex items-center gap-4 font-mono text-xs">
          <button type="button" onClick={() => setIsTokenDialogOpen(true)}
            className={`flex items-center gap-1 border px-2 py-1 transition-colors hover:border-accent hover:text-accent ${token ? 'border-accent text-accent' : 'border-border text-secondary'}`}>
            {token ? <><GitBranch size={12} /> Connected</> : <><Settings size={12} /> Connect GitHub</>}
          </button>
          <Link to="/" className="flex items-center gap-1 text-secondary transition-colors hover:text-primary">View site <ExternalLink size={12} /></Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 lg:flex-row">
        <nav aria-label="Sections" className="flex shrink-0 gap-2 overflow-x-auto lg:w-44 lg:flex-col">
          {TABS.map((tab) => (
            <button key={tab.label} type="button" aria-current={tab === activeTab ? 'page' : undefined}
              onClick={() => { setActiveTab(tab); setIsConfirmingReset(false) }}
              className={`shrink-0 px-4 py-2.5 text-left font-mono text-sm uppercase tracking-widest transition-colors ${tab === activeTab ? 'bg-accent text-accentFg' : 'text-secondary hover:bg-surface hover:text-primary'}`}>
              {tab.label}
            </button>
          ))}
        </nav>

        <main className="min-w-0 flex-1">
          <section aria-labelledby="editor-title" className="border-2 border-border bg-surface p-6">
            <h2 id="editor-title" className="mb-6 font-display text-xl font-bold">{activeTab.label}</h2>
            <Editor data={draft} onChange={setDraft} />
          </section>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3 font-mono text-xs">
              {isConfirmingReset ? (
                <>
                  <span className="text-secondary">Reset {activeTab.label} to the published version?</span>
                  <button type="button" onClick={handleReset} className="text-accent hover:underline">Yes</button>
                  <button type="button" onClick={() => setIsConfirmingReset(false)} className="text-secondary hover:text-primary">Cancel</button>
                </>
              ) : (
                <button type="button" onClick={() => setIsConfirmingReset(true)} className="flex items-center gap-1 text-secondary transition-colors hover:text-accent">
                  <RotateCcw size={12} /> Reset section
                </button>
              )}
            </div>
            <div className="flex min-w-0 flex-1 items-start justify-end gap-4">
              <SaveNotice state={saveState} />
              <button type="button" onClick={handleSave} disabled={saveState.status === 'saving'} className={`${PRIMARY_BUTTON} shrink-0`}>
                {saveState.status === 'saving'
                  ? <><Loader2 size={14} className="animate-spin" /> Saving</>
                  : <><Save size={14} /> {token ? 'Save & deploy' : 'Save draft'}</>}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
