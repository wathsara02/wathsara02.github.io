import { Plus } from 'lucide-react'
import { SOCIAL_LABELS } from '@/lib/sections'
import type { EducationEntry, ExperienceEntry, PortfolioData, Project, SocialKey, Stat } from '@/types/portfolio'
import { CollapsibleList } from './CollapsibleList'
import { ADD_BUTTON, Field, FieldGroup, INPUT, RemoveButton, StringList, TagInput, TextArea, TextInput } from './fields'
import { PeriodFields } from './PeriodFields'

export type EditorProps = {
  data: PortfolioData
  onChange: (data: PortfolioData) => void
}

function StatList({ stats, onChange, addLabel }: { stats: Stat[]; onChange: (stats: Stat[]) => void; addLabel: string }) {
  const update = (index: number, patch: Partial<Stat>) =>
    onChange(stats.map((stat, i) => (i === index ? { ...stat, ...patch } : stat)))

  return (
    <div className="space-y-3">
      {stats.map((stat, i) => (
        // Rows have no identity beyond their position.
        <div key={i} className="flex gap-3">
          <input value={stat.value} onChange={(e) => update(i, { value: e.target.value })} placeholder="2M" aria-label={`Value ${i + 1}`} className={`${INPUT} w-32 shrink-0`} />
          <input value={stat.label} onChange={(e) => update(i, { label: e.target.value })} placeholder="What the number measures" aria-label={`Label ${i + 1}`} className={INPUT} />
          <RemoveButton label={`Remove row ${i + 1}`} onClick={() => onChange(stats.filter((_, other) => other !== i))} />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...stats, { value: '', label: '' }])} className={ADD_BUTTON}>
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  )
}

export function MetaEditor({ data, onChange }: EditorProps) {
  const { meta } = data
  const update = (patch: Partial<PortfolioData['meta']>) => onChange({ ...data, meta: { ...meta, ...patch } })

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name"><TextInput value={meta.name} onChange={(name) => update({ name })} /></Field>
        <Field label="Title"><TextInput value={meta.title} onChange={(title) => update({ title })} /></Field>
        <Field label="Email"><TextInput type="email" value={meta.email} onChange={(email) => update({ email })} /></Field>
        <Field label="Location"><TextInput value={meta.location} onChange={(location) => update({ location })} /></Field>
        <Field label="Availability badge (blank hides it)"><TextInput value={meta.availability} onChange={(availability) => update({ availability })} placeholder="Open to work" /></Field>
        <Field label="Resume URL (blank hides the button)"><TextInput value={meta.resumeUrl} onChange={(resumeUrl) => update({ resumeUrl })} placeholder="/cv.pdf or https://..." /></Field>
      </div>
      <Field label="Tagline"><TextInput value={meta.tagline} onChange={(tagline) => update({ tagline })} /></Field>
      <FieldGroup label="Roles"><StringList items={meta.roles} onChange={(roles) => update({ roles })} placeholder="Role title" /></FieldGroup>
      <Field label="Portrait URL"><TextInput value={meta.avatar} onChange={(avatar) => update({ avatar })} placeholder="/about.webp or https://..." /></Field>
      <div className="grid gap-5 md:grid-cols-2">
        {(Object.keys(meta.socials) as SocialKey[]).map((key) => (
          <Field key={key} label={`${SOCIAL_LABELS[key]} URL`}>
            <TextInput type="url" value={meta.socials[key]} onChange={(url) => update({ socials: { ...meta.socials, [key]: url } })} placeholder="https://..." />
          </Field>
        ))}
      </div>
    </div>
  )
}

export function AboutEditor({ data, onChange }: EditorProps) {
  return (
    <div className="space-y-5">
      <Field label="Bio (blank line starts a new paragraph)">
        <TextArea value={data.about.bio} onChange={(bio) => onChange({ ...data, about: { bio } })} rows={8} />
      </Field>
      <FieldGroup label="Headline numbers">
        <StatList stats={data.stats} onChange={(stats) => onChange({ ...data, stats })} addLabel="Add number" />
      </FieldGroup>
    </div>
  )
}

export function SkillsEditor({ data, onChange }: EditorProps) {
  const { skills } = data
  const update = (next: PortfolioData['skills']) => onChange({ ...data, skills: next })

  return (
    <div className="space-y-4">
      {skills.map((group, i) => (
        // Categories have no identity beyond their position.
        <div key={i} className="space-y-4 border-2 border-border bg-surface2 p-5">
          <div className="flex gap-3">
            <input value={group.category} onChange={(e) => update(skills.map((other, j) => (j === i ? { ...other, category: e.target.value } : other)))} placeholder="Category name" aria-label={`Category ${i + 1} name`} className={INPUT} />
            <RemoveButton label={`Remove category ${group.category}`} onClick={() => update(skills.filter((_, j) => j !== i))} />
          </div>
          <TagInput items={group.items} onChange={(items) => update(skills.map((other, j) => (j === i ? { ...other, items } : other)))} />
        </div>
      ))}
      <button type="button" onClick={() => update([...skills, { category: '', items: [] }])} className={ADD_BUTTON}>
        <Plus size={14} /> Add category
      </button>
    </div>
  )
}

const blankProject = (id: number): Project =>
  ({ id, title: '', description: '', tags: [], metrics: [], githubUrl: '', liveUrl: '', image: '' })

export function ProjectsEditor({ data, onChange }: EditorProps) {
  return (
    <CollapsibleList
      items={data.projects}
      onChange={(projects) => onChange({ ...data, projects })}
      getTitle={(project) => project.title}
      createItem={blankProject}
      addLabel="Add project"
      renderFields={(project, update) => (
        <>
          <Field label="Title"><TextInput value={project.title} onChange={(title) => update({ title })} /></Field>
          <Field label="Description"><TextArea value={project.description} onChange={(description) => update({ description })} /></Field>
          <FieldGroup label="Tags"><TagInput items={project.tags} onChange={(tags) => update({ tags })} /></FieldGroup>
          <FieldGroup label="Result metrics (shown when there is no image)">
            <StatList stats={project.metrics} onChange={(metrics) => update({ metrics })} addLabel="Add metric" />
          </FieldGroup>
          <Field label="Image URL"><TextInput value={project.image} onChange={(image) => update({ image })} placeholder="/projects/omi.webp or https://..." /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="GitHub URL"><TextInput type="url" value={project.githubUrl} onChange={(githubUrl) => update({ githubUrl })} placeholder="https://github.com/..." /></Field>
            <Field label="Live URL"><TextInput type="url" value={project.liveUrl} onChange={(liveUrl) => update({ liveUrl })} placeholder="https://..." /></Field>
          </div>
        </>
      )}
    />
  )
}

const blankExperience = (id: number): ExperienceEntry =>
  ({ id, role: '', company: '', period: '', location: '', description: '', highlights: [] })

export function ExperienceEditor({ data, onChange }: EditorProps) {
  return (
    <CollapsibleList
      items={data.experience}
      onChange={(experience) => onChange({ ...data, experience })}
      getTitle={(entry) => [entry.role, entry.company].filter(Boolean).join(' @ ')}
      createItem={blankExperience}
      addLabel="Add entry"
      renderFields={(entry, update) => (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Role"><TextInput value={entry.role} onChange={(role) => update({ role })} /></Field>
            <Field label="Company"><TextInput value={entry.company} onChange={(company) => update({ company })} /></Field>
            <Field label="Location"><TextInput value={entry.location} onChange={(location) => update({ location })} /></Field>
          </div>
          <PeriodFields entry={entry} onChange={update} />
          <Field label="Description"><TextArea value={entry.description} onChange={(description) => update({ description })} /></Field>
          <FieldGroup label="Highlights"><StringList items={entry.highlights} onChange={(highlights) => update({ highlights })} placeholder="Highlight bullet" /></FieldGroup>
        </>
      )}
    />
  )
}

const blankEducation = (id: number): EducationEntry =>
  ({ id, degree: '', institution: '', period: '', location: '', description: '' })

export function EducationEditor({ data, onChange }: EditorProps) {
  return (
    <CollapsibleList
      items={data.education}
      onChange={(education) => onChange({ ...data, education })}
      getTitle={(entry) => entry.degree}
      createItem={blankEducation}
      addLabel="Add entry"
      renderFields={(entry, update) => (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Degree"><TextInput value={entry.degree} onChange={(degree) => update({ degree })} /></Field>
            <Field label="Institution"><TextInput value={entry.institution} onChange={(institution) => update({ institution })} /></Field>
            <Field label="Location"><TextInput value={entry.location} onChange={(location) => update({ location })} /></Field>
          </div>
          <PeriodFields entry={entry} onChange={update} />
          <Field label="Description"><TextArea value={entry.description} onChange={(description) => update({ description })} /></Field>
        </>
      )}
    />
  )
}

export function ContactEditor({ data, onChange }: EditorProps) {
  const update = (patch: Partial<PortfolioData['contact']>) => onChange({ ...data, contact: { ...data.contact, ...patch } })

  return (
    <div className="space-y-5">
      <Field label="Heading"><TextInput value={data.contact.heading} onChange={(heading) => update({ heading })} /></Field>
      <Field label="Subtext"><TextArea value={data.contact.subtext} onChange={(subtext) => update({ subtext })} rows={3} /></Field>
    </div>
  )
}
