import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, ExternalLink, Save, RotateCcw, Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { defaults } from '@/data/defaults'

const ADMIN_PASSWORD = 'portfolio2025'
const TABS = ['Meta', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact']

// --- Auth Gate ---
function AuthGate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true')
      onAuth()
    } else {
      setShake(true)
      setError(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <motion.div
        animate={shake ? { x: [0, -8, 8, -8, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-surface border border-border rounded-xl p-8 w-full max-w-sm"
      >
        <h1 className="font-display font-bold text-primary text-2xl mb-6">Admin Access</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="font-ui text-sm text-secondary block mb-2">Password</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false) }}
              className="w-full bg-surface2 border border-border rounded-lg px-4 py-2.5 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="Enter password"
              autoFocus
            />
            {error && <p className="font-ui text-xs text-accent mt-2">Incorrect password</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-bg font-ui font-medium rounded-lg py-2.5 hover:opacity-90 transition-opacity"
          >
            Enter
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// --- Input helpers ---
function Field({ label, children }) {
  return (
    <div>
      <label className="font-ui text-sm text-secondary block mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder = '' }) {
  return (
    <input
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-surface2 border border-border rounded-lg px-4 py-2.5 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors"
    />
  )
}

function TextArea({ value, onChange, rows = 4 }) {
  return (
    <textarea
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      className="w-full bg-surface2 border border-border rounded-lg px-4 py-2.5 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors resize-y"
    />
  )
}

// --- Tag input ---
function TagInput({ tags, onChange }) {
  const [input, setInput] = useState('')

  const add = () => {
    const v = input.trim()
    if (v && !tags.includes(v)) {
      onChange([...tags, v])
    }
    setInput('')
  }

  const remove = (tag) => onChange(tags.filter(t => t !== tag))

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add() }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Add skill, press Enter"
          className="flex-1 bg-surface2 border border-border rounded-lg px-4 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors"
        />
        <button type="button" onClick={add} className="px-3 py-2 bg-surface2 border border-border rounded-lg text-secondary hover:text-primary hover:border-accent transition-colors">
          <Plus size={14} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-1 font-mono text-xs bg-bg border border-border rounded-full px-3 py-1 text-secondary">
            {tag}
            <button type="button" onClick={() => remove(tag)} className="text-faint hover:text-accent ml-1"><X size={10} /></button>
          </span>
        ))}
      </div>
    </div>
  )
}

// --- Dynamic list of strings ---
function StringList({ items, onChange, placeholder = '' }) {
  const update = (i, v) => { const n = [...items]; n[i] = v; onChange(n) }
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const add = () => onChange([...items, ''])

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={e => update(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-surface2 border border-border rounded-lg px-4 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors"
          />
          <button type="button" onClick={() => remove(i)} className="text-faint hover:text-accent transition-colors px-2">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button type="button" onClick={add}
        className="flex items-center gap-1 font-ui text-xs text-secondary hover:text-primary border border-border rounded-lg px-3 py-1.5 hover:border-accent transition-colors">
        <Plus size={12} /> Add item
      </button>
    </div>
  )
}

// --- Tab editors ---
function MetaEditor({ data, onChange }) {
  const m = data.meta

  const upd = (key, val) => onChange({ ...data, meta: { ...m, [key]: val } })
  const updSocial = (key, val) => onChange({ ...data, meta: { ...m, socials: { ...m.socials, [key]: val } } })

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => upd('avatar', ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full Name"><TextInput value={m.name} onChange={v => upd('name', v)} /></Field>
        <Field label="Title"><TextInput value={m.title} onChange={v => upd('title', v)} /></Field>
        <Field label="Email"><TextInput value={m.email} onChange={v => upd('email', v)} /></Field>
        <Field label="Location"><TextInput value={m.location} onChange={v => upd('location', v)} /></Field>
        <Field label="Resume URL" ><TextInput value={m.resumeUrl} onChange={v => upd('resumeUrl', v)} /></Field>
      </div>
      <Field label="Tagline"><TextInput value={m.tagline} onChange={v => upd('tagline', v)} /></Field>
      <Field label="Typewriter Roles">
        <StringList items={m.roles} onChange={v => upd('roles', v)} placeholder="Role title" />
      </Field>
      <Field label="Avatar Image">
        <div className="flex items-center gap-4">
          <input type="file" accept="image/*" onChange={handleAvatar}
            className="font-ui text-sm text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-surface2 file:text-secondary file:font-ui file:text-xs file:cursor-pointer" />
          {m.avatar && (
            <img src={m.avatar} alt="avatar preview" className="w-12 h-12 rounded-lg object-cover border border-border" />
          )}
        </div>
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.keys(m.socials).map(key => (
          <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1) + ' URL'}>
            <TextInput value={m.socials[key]} onChange={v => updSocial(key, v)} />
          </Field>
        ))}
      </div>
    </div>
  )
}

function AboutEditor({ data, onChange }) {
  return (
    <div className="space-y-5">
      <Field label="Bio">
        <TextArea value={data.about.bio} onChange={v => onChange({ ...data, about: { ...data.about, bio: v } })} rows={6} />
      </Field>
      <Field label="Stats">
        <div className="space-y-3">
          {data.stats.map((stat, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input value={stat.label} onChange={e => {
                const n = [...data.stats]; n[i] = { ...stat, label: e.target.value }
                onChange({ ...data, stats: n })
              }} placeholder="Label"
                className="flex-1 bg-surface2 border border-border rounded-lg px-4 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
              <input type="number" value={stat.value} onChange={e => {
                const n = [...data.stats]; n[i] = { ...stat, value: Number(e.target.value) }
                onChange({ ...data, stats: n })
              }}
                className="w-24 bg-surface2 border border-border rounded-lg px-4 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
              <button onClick={() => {
                onChange({ ...data, stats: data.stats.filter((_, idx) => idx !== i) })
              }} className="text-faint hover:text-accent"><Trash2 size={14} /></button>
            </div>
          ))}
          <button onClick={() => onChange({ ...data, stats: [...data.stats, { label: '', value: 0 }] })}
            className="flex items-center gap-1 font-ui text-xs text-secondary hover:text-primary border border-border rounded-lg px-3 py-1.5 hover:border-accent transition-colors">
            <Plus size={12} /> Add stat
          </button>
        </div>
      </Field>
    </div>
  )
}

function SkillsEditor({ data, onChange }) {
  const upd = (skills) => onChange({ ...data, skills })

  const updateCategory = (i, key, val) => {
    const n = [...data.skills]; n[i] = { ...n[i], [key]: val }; upd(n)
  }
  const removeCategory = (i) => upd(data.skills.filter((_, idx) => idx !== i))
  const addCategory = () => upd([...data.skills, { category: '', items: [] }])

  return (
    <div className="space-y-4">
      {data.skills.map((cat, i) => (
        <div key={i} className="bg-surface2 border border-border rounded-xl p-5 space-y-4">
          <div className="flex gap-3 items-center">
            <input value={cat.category} onChange={e => updateCategory(i, 'category', e.target.value)}
              placeholder="Category name"
              className="flex-1 bg-bg border border-border rounded-lg px-4 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
            <button onClick={() => removeCategory(i)} className="text-faint hover:text-accent"><Trash2 size={14} /></button>
          </div>
          <TagInput tags={cat.items} onChange={v => updateCategory(i, 'items', v)} />
        </div>
      ))}
      <button onClick={addCategory}
        className="flex items-center gap-2 font-ui text-sm text-secondary hover:text-primary border border-border rounded-lg px-4 py-2 hover:border-accent transition-colors">
        <Plus size={14} /> Add category
      </button>
    </div>
  )
}

function ProjectsEditor({ data, onChange }) {
  const [expanded, setExpanded] = useState(null)

  const upd = (projects) => onChange({ ...data, projects })
  const updProject = (i, key, val) => {
    const n = [...data.projects]; n[i] = { ...n[i], [key]: val }; upd(n)
  }
  const removeProject = (i) => upd(data.projects.filter((_, idx) => idx !== i))
  const addProject = () => {
    const newId = Math.max(0, ...data.projects.map(p => p.id)) + 1
    upd([...data.projects, { id: newId, title: '', description: '', tags: [], githubUrl: '', liveUrl: '', featured: false, wide: false, image: '' }])
    setExpanded(data.projects.length)
  }

  return (
    <div className="space-y-3">
      {data.projects.map((project, i) => (
        <div key={project.id} className="bg-surface2 border border-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
            <span className="flex-1 font-ui text-sm text-primary">{project.title || '(untitled)'}</span>
            <label className="flex items-center gap-2 font-mono text-xs text-faint cursor-pointer" onClick={e => e.stopPropagation()}>
              <input type="checkbox" checked={project.featured} onChange={e => updProject(i, 'featured', e.target.checked)}
                className="accent-accent" />
              Featured
            </label>
            <label className="flex items-center gap-2 font-mono text-xs text-faint cursor-pointer" onClick={e => e.stopPropagation()}>
              <input type="checkbox" checked={!!project.wide} onChange={e => updProject(i, 'wide', e.target.checked)}
                className="accent-accent" />
              Wide
            </label>
            <button onClick={(e) => { e.stopPropagation(); removeProject(i) }} className="text-faint hover:text-accent ml-2"><Trash2 size={14} /></button>
            {expanded === i ? <ChevronUp size={14} className="text-faint" /> : <ChevronDown size={14} className="text-faint" />}
          </div>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t border-border">
              <Field label="Title"><TextInput value={project.title} onChange={v => updProject(i, 'title', v)} /></Field>
              <Field label="Description"><TextArea value={project.description} onChange={v => updProject(i, 'description', v)} rows={3} /></Field>
              <Field label="Tags"><TagInput tags={project.tags} onChange={v => updProject(i, 'tags', v)} /></Field>
              <Field label="Image URL">
                <TextInput value={project.image || ''} onChange={v => updProject(i, 'image', v)} placeholder="https://..." />
              </Field>
              {project.image && (
                <div className="rounded-lg overflow-hidden border border-border h-32">
                  <img src={project.image} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <Field label="GitHub URL"><TextInput value={project.githubUrl} onChange={v => updProject(i, 'githubUrl', v)} /></Field>
                <Field label="Live URL"><TextInput value={project.liveUrl} onChange={v => updProject(i, 'liveUrl', v)} /></Field>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={addProject}
        className="flex items-center gap-2 font-ui text-sm text-secondary hover:text-primary border border-border rounded-lg px-4 py-2 hover:border-accent transition-colors">
        <Plus size={14} /> Add project
      </button>
    </div>
  )
}

function ExperienceEditor({ data, onChange }) {
  const [expanded, setExpanded] = useState(null)

  const upd = (experience) => onChange({ ...data, experience })
  const updItem = (i, key, val) => {
    const n = [...data.experience]; n[i] = { ...n[i], [key]: val }; upd(n)
  }
  const removeItem = (i) => upd(data.experience.filter((_, idx) => idx !== i))
  const addItem = () => {
    const newId = Math.max(0, ...data.experience.map(e => e.id)) + 1
    upd([...data.experience, { id: newId, role: '', company: '', period: '', location: '', description: '', highlights: [] }])
    setExpanded(data.experience.length)
  }

  return (
    <div className="space-y-3">
      {data.experience.map((item, i) => (
        <div key={item.id} className="bg-surface2 border border-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
            <span className="flex-1 font-ui text-sm text-primary">{item.role || '(untitled)'} {item.company ? `@ ${item.company}` : ''}</span>
            <button onClick={(e) => { e.stopPropagation(); removeItem(i) }} className="text-faint hover:text-accent"><Trash2 size={14} /></button>
            {expanded === i ? <ChevronUp size={14} className="text-faint" /> : <ChevronDown size={14} className="text-faint" />}
          </div>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Role"><TextInput value={item.role} onChange={v => updItem(i, 'role', v)} /></Field>
                <Field label="Company"><TextInput value={item.company} onChange={v => updItem(i, 'company', v)} /></Field>
                <Field label="Period"><TextInput value={item.period} onChange={v => updItem(i, 'period', v)} /></Field>
                <Field label="Location"><TextInput value={item.location} onChange={v => updItem(i, 'location', v)} /></Field>
              </div>
              <Field label="Description"><TextArea value={item.description} onChange={v => updItem(i, 'description', v)} /></Field>
              <Field label="Highlights">
                <StringList items={item.highlights} onChange={v => updItem(i, 'highlights', v)} placeholder="Highlight bullet" />
              </Field>
            </div>
          )}
        </div>
      ))}
      <button onClick={addItem}
        className="flex items-center gap-2 font-ui text-sm text-secondary hover:text-primary border border-border rounded-lg px-4 py-2 hover:border-accent transition-colors">
        <Plus size={14} /> Add entry
      </button>
    </div>
  )
}

function EducationEditor({ data, onChange }) {
  const [expanded, setExpanded] = useState(null)

  const upd = (education) => onChange({ ...data, education })
  const updItem = (i, key, val) => {
    const n = [...data.education]; n[i] = { ...n[i], [key]: val }; upd(n)
  }
  const removeItem = (i) => upd(data.education.filter((_, idx) => idx !== i))
  const addItem = () => {
    const newId = Math.max(0, ...data.education.map(e => e.id)) + 1
    upd([...data.education, { id: newId, degree: '', institution: '', period: '', location: '', description: '' }])
    setExpanded(data.education.length)
  }

  return (
    <div className="space-y-3">
      {data.education.map((item, i) => (
        <div key={item.id} className="bg-surface2 border border-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
            <span className="flex-1 font-ui text-sm text-primary">{item.degree || '(untitled)'}</span>
            <button onClick={(e) => { e.stopPropagation(); removeItem(i) }} className="text-faint hover:text-accent"><Trash2 size={14} /></button>
            {expanded === i ? <ChevronUp size={14} className="text-faint" /> : <ChevronDown size={14} className="text-faint" />}
          </div>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Degree"><TextInput value={item.degree} onChange={v => updItem(i, 'degree', v)} /></Field>
                <Field label="Institution"><TextInput value={item.institution} onChange={v => updItem(i, 'institution', v)} /></Field>
                <Field label="Period"><TextInput value={item.period} onChange={v => updItem(i, 'period', v)} /></Field>
                <Field label="Location"><TextInput value={item.location} onChange={v => updItem(i, 'location', v)} /></Field>
              </div>
              <Field label="Description"><TextArea value={item.description} onChange={v => updItem(i, 'description', v)} /></Field>
            </div>
          )}
        </div>
      ))}
      <button onClick={addItem}
        className="flex items-center gap-2 font-ui text-sm text-secondary hover:text-primary border border-border rounded-lg px-4 py-2 hover:border-accent transition-colors">
        <Plus size={14} /> Add entry
      </button>
    </div>
  )
}

function ContactEditor({ data, onChange }) {
  return (
    <div className="space-y-5">
      <Field label="Heading">
        <TextInput value={data.contact.heading} onChange={v => onChange({ ...data, contact: { ...data.contact, heading: v } })} />
      </Field>
      <Field label="Subtext">
        <TextArea value={data.contact.subtext} onChange={v => onChange({ ...data, contact: { ...data.contact, subtext: v } })} rows={3} />
      </Field>
    </div>
  )
}

const TAB_EDITORS = {
  Meta: MetaEditor,
  About: AboutEditor,
  Skills: SkillsEditor,
  Projects: ProjectsEditor,
  Experience: ExperienceEditor,
  Education: EducationEditor,
  Contact: ContactEditor,
}

// --- Main Admin component ---
export function Admin() {
  const { portfolioData, updateSection } = usePortfolioData()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === 'true')
  const [activeTab, setActiveTab] = useState('Meta')
  const [localData, setLocalData] = useState(portfolioData)
  const [toast, setToast] = useState(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const logout = () => {
    sessionStorage.removeItem('admin_auth')
    setAuthed(false)
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const save = () => {
    // save all sections from localData
    Object.keys(localData).forEach(key => {
      updateSection(key, localData[key])
    })
    showToast('Saved!')
  }

  const resetSection = () => {
    const key = activeTab.toLowerCase()
    const resetMap = {
      meta: 'meta', about: 'about', skills: 'skills',
      projects: 'projects', experience: 'experience',
      education: 'education', contact: 'contact',
    }
    const dKey = resetMap[key]
    if (dKey && defaults[dKey]) {
      setLocalData(prev => ({ ...prev, [dKey]: defaults[dKey] }))
      updateSection(dKey, defaults[dKey])
    }
    setConfirmReset(false)
    showToast('Reset to defaults!')
  }

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />

  const EditorComponent = TAB_EDITORS[activeTab]

  return (
    <div className="min-h-screen bg-bg">
      {/* top bar */}
      <div className="border-b border-border bg-surface px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="font-display font-bold text-primary text-lg">Portfolio Admin</h1>
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1 font-ui text-sm text-secondary hover:text-primary transition-colors">
            View Site <ExternalLink size={14} />
          </Link>
          <button onClick={logout} className="flex items-center gap-1 font-ui text-sm text-faint hover:text-accent transition-colors">
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* sidebar tabs */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:w-44 shrink-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 text-left px-4 py-2.5 rounded-lg font-ui text-sm transition-colors ${
                activeTab === tab
                  ? 'bg-surface2 text-primary border border-border'
                  : 'text-secondary hover:text-primary hover:bg-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* main form area */}
        <div className="flex-1 min-w-0">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="font-display font-medium text-primary text-xl mb-6">{activeTab}</h2>
            {EditorComponent && (
              <EditorComponent data={localData} onChange={setLocalData} />
            )}
          </div>

          {/* bottom bar */}
          <div className="flex items-center justify-between mt-4">
            <div>
              {!confirmReset ? (
                <button onClick={() => setConfirmReset(true)}
                  className="flex items-center gap-1 font-ui text-sm text-faint hover:text-accent transition-colors">
                  <RotateCcw size={14} /> Reset section to defaults
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="font-ui text-sm text-secondary">Reset {activeTab} to defaults?</span>
                  <button onClick={resetSection} className="font-ui text-sm text-accent hover:underline">Yes, reset</button>
                  <button onClick={() => setConfirmReset(false)} className="font-ui text-sm text-faint hover:text-secondary">Cancel</button>
                </div>
              )}
            </div>
            <button onClick={save}
              className="flex items-center gap-2 bg-primary text-bg font-ui font-medium rounded-lg px-6 py-2.5 hover:opacity-90 transition-opacity">
              <Save size={15} /> Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-8 right-8 bg-surface2 border border-border rounded-lg px-4 py-3 font-ui text-sm text-primary shadow-lg z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


