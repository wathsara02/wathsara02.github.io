import { useState, type KeyboardEvent, type ReactNode } from 'react'
import { Plus, Trash2, X } from 'lucide-react'

export const INPUT =
  'w-full border-2 border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary transition-colors focus:border-accent focus:outline-none'
export const ADD_BUTTON =
  'flex items-center gap-2 border-2 border-border px-4 py-2 font-mono text-sm text-secondary transition-colors hover:border-accent hover:text-primary'
const LABEL = 'mb-1.5 block font-mono text-xs uppercase tracking-widest text-secondary'
const ICON_BUTTON = 'px-2 text-faint transition-colors hover:text-accent'

/** Labels a single input, select or textarea. */
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={LABEL}>{label}</span>
      {children}
    </label>
  )
}

/** Labels a control made of several inputs, where a wrapping <label> would be ambiguous. */
export function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className={LABEL}>{label}</legend>
      {children}
    </fieldset>
  )
}

type TextInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'url'
}

export function TextInput({ value, onChange, placeholder, type = 'text' }: TextInputProps) {
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={INPUT} />
}

export function TextArea({ value, onChange, rows = 4 }: { value: string; onChange: (value: string) => void; rows?: number }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={`${INPUT} resize-y`} />
}

export function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={ICON_BUTTON}>
      <Trash2 size={14} />
    </button>
  )
}

type ListProps = { items: string[]; onChange: (items: string[]) => void }

/** Chip-style editor for short unique values; Enter or comma adds one. */
export function TagInput({ items, onChange }: ListProps) {
  const [draft, setDraft] = useState('')

  const add = () => {
    const value = draft.trim()
    if (value && !items.includes(value)) onChange([...items, value])
    setDraft('')
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ',') return
    event.preventDefault()
    add()
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={handleKeyDown} placeholder="Add item, press Enter" aria-label="New item" className={INPUT} />
        <button type="button" aria-label="Add item" onClick={add} className="border-2 border-border px-3 text-secondary transition-colors hover:border-accent hover:text-primary">
          <Plus size={14} />
        </button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-1 border border-border bg-surface2 px-3 py-1 font-mono text-xs text-secondary">
            {item}
            <button type="button" aria-label={`Remove ${item}`} onClick={() => onChange(items.filter((other) => other !== item))} className="ml-1 text-faint hover:text-accent">
              <X size={10} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** One free-text input per line, for longer values such as bullet points. */
export function StringList({ items, onChange, placeholder }: ListProps & { placeholder?: string }) {
  const update = (index: number, value: string) => onChange(items.map((item, i) => (i === index ? value : item)))

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        // Rows have no identity beyond their position.
        <div key={i} className="flex gap-2">
          <input value={item} onChange={(e) => update(i, e.target.value)} placeholder={placeholder} aria-label={`Item ${i + 1}`} className={INPUT} />
          <RemoveButton label={`Remove item ${i + 1}`} onClick={() => onChange(items.filter((_, other) => other !== i))} />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ''])} className={ADD_BUTTON}>
        <Plus size={14} /> Add item
      </button>
    </div>
  )
}
