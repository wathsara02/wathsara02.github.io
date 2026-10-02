import { useState, type ReactNode } from 'react'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { ADD_BUTTON, RemoveButton } from './fields'

type Props<T extends { id: number }> = {
  items: T[]
  onChange: (items: T[]) => void
  getTitle: (item: T) => string
  /** Builds a blank item; receives an id not used by any existing item. */
  createItem: (id: number) => T
  addLabel: string
  renderFields: (item: T, update: (patch: Partial<T>) => void) => ReactNode
}

/** Accordion of editable records: one open at a time, with add and remove. */
export function CollapsibleList<T extends { id: number }>({ items, onChange, getTitle, createItem, addLabel, renderFields }: Props<T>) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const update = (id: number, patch: Partial<T>) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)))

  const add = () => {
    const id = Math.max(0, ...items.map((item) => item.id)) + 1
    onChange([...items, createItem(id)])
    setExpandedId(id)
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isExpanded = expandedId === item.id
        const title = getTitle(item) || '(untitled)'
        return (
          <div key={item.id} className="border-2 border-border bg-surface2">
            <div className="flex items-center gap-3 px-5 py-4">
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="flex flex-1 items-center justify-between gap-3 text-left font-mono text-sm text-primary"
              >
                {title}
                {isExpanded ? <ChevronUp size={14} className="text-faint" /> : <ChevronDown size={14} className="text-faint" />}
              </button>
              <RemoveButton label={`Remove ${title}`} onClick={() => onChange(items.filter((other) => other.id !== item.id))} />
            </div>
            {isExpanded && (
              <div className="space-y-4 border-t-2 border-border px-5 py-5">
                {renderFields(item, (patch) => update(item.id, patch))}
              </div>
            )}
          </div>
        )
      })}
      <button type="button" onClick={add} className={ADD_BUTTON}>
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  )
}
