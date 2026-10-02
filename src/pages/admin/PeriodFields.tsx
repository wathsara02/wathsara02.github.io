import { buildPeriod, MONTHS } from '@/lib/period'
import type { PeriodParts } from '@/types/portfolio'
import { Field, FieldGroup, INPUT } from './fields'

type MonthYearProps = {
  legend: string
  month: string | undefined
  year: string | undefined
  onChange: (month: string, year: string) => void
}

function MonthYear({ legend, month = '', year = '', onChange }: MonthYearProps) {
  return (
    <FieldGroup label={legend}>
      <div className="flex gap-2">
        <Field label="Month">
          <select value={month} onChange={(e) => onChange(e.target.value, year)} className={INPUT}>
            <option value="">— No month —</option>
            {MONTHS.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </Field>
        <Field label="Year">
          <input type="number" value={year} onChange={(e) => onChange(month, e.target.value)} placeholder="YYYY" min="1900" max="2100" className={INPUT} />
        </Field>
      </div>
    </FieldGroup>
  )
}

/** Returns the patch plus the display string derived from it, keeping the two in sync. */
function withPeriod<T extends PeriodParts>(entry: T, patch: PeriodParts): PeriodParts & { period: string } {
  return { ...patch, period: buildPeriod({ ...entry, ...patch }) }
}

type Props = {
  entry: PeriodParts & { period: string }
  onChange: (patch: PeriodParts & { period: string }) => void
}

export function PeriodFields({ entry, onChange }: Props) {
  const update = (patch: PeriodParts) => onChange(withPeriod(entry, patch))

  return (
    <div className="space-y-3">
      <div className="grid gap-4 md:grid-cols-2">
        <MonthYear legend="Start date" month={entry.startMonth} year={entry.startYear}
          onChange={(startMonth, startYear) => update({ startMonth, startYear })} />
        <div className="space-y-2">
          {!entry.current && (
            <MonthYear legend="End date" month={entry.endMonth} year={entry.endYear}
              onChange={(endMonth, endYear) => update({ endMonth, endYear })} />
          )}
          <label className="flex items-center gap-2 font-mono text-xs text-secondary">
            <input type="checkbox" checked={!!entry.current} onChange={(e) => update({ current: e.target.checked })} className="accent-accent" />
            Current / Present
          </label>
        </div>
      </div>
      {entry.period && <p className="font-mono text-xs text-accent">Shown as: {entry.period}</p>}
    </div>
  )
}
