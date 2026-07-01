import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { LogOut, ExternalLink, Save, RotateCcw, Plus, Trash2, ChevronDown, ChevronUp, X, GitBranch, Loader2, CheckCircle2, AlertCircle, Settings } from "lucide-react"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { defaults } from "@/data/defaults"

const ADMIN_PASSWORD = "portfolio2025"
const TABS = ["Meta", "About", "Skills", "Projects", "Experience", "Education", "Interests", "Contact"]
const GITHUB_OWNER = "wathsara02"
const GITHUB_REPO  = "wathsara02.github.io"
const GITHUB_FILE  = "src/data/defaults.js"
const GITHUB_BRANCH = "main"
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

async function commitToGitHub(token, newData) {
  const api = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE}`
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
  const current = await fetch(api, { headers }).then(r => r.json())
  if (current.message) throw new Error(current.message)
  const fileContent = `export const defaults = ${JSON.stringify(newData, null, 2)}\n`
  const encoded = btoa(unescape(encodeURIComponent(fileContent)))
  const res = await fetch(api, { method: "PUT", headers, body: JSON.stringify({ message: "content: update portfolio data via admin", content: encoded, sha: current.sha, branch: GITHUB_BRANCH }) })
  if (!res.ok) { const err = await res.json(); throw new Error(err.message || "GitHub API error") }
}

function buildPeriod(startMonth, startYear, endMonth, endYear, current) {
  const start = [startMonth, startYear].filter(Boolean).join(" ") || ""
  const end = current ? "Present" : [endMonth, endYear].filter(Boolean).join(" ") || ""
  if (!start && !end) return ""
  if (!end) return start
  if (!start) return end
  return `${start} — ${end}`
}
function AuthGate({ onAuth }) {
  const [pw, setPw] = useState("")
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem("admin_auth", "true"); onAuth() }
    else { setShake(true); setError(true); setTimeout(() => setShake(false), 500) }
  }
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <motion.div animate={shake ? { x: [0,-8,8,-8,0] } : { x: 0 }} transition={{ duration: 0.4 }}
        className="bg-surface border-2 border-border p-8 w-full max-w-sm">
        <h1 className="font-display font-bold text-primary text-2xl mb-6">Admin Access</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="font-mono text-xs text-secondary uppercase tracking-widest block mb-2">Password</label>
            <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false) }}
              className="w-full bg-surface2 border-2 border-border px-4 py-2.5 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="Enter password" autoFocus />
            {error && <p className="font-mono text-xs text-accent mt-2">Incorrect password</p>}
          </div>
          <button type="submit" className="w-full bg-accent text-bg font-mono font-bold uppercase tracking-widest py-2.5 hover:opacity-90 transition-opacity">Enter</button>
        </form>
      </motion.div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="font-mono text-xs text-secondary uppercase tracking-widest block mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder = "", type = "text" }) {
  return (
    <input type={type} value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-bg border-2 border-border px-4 py-2.5 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
  )
}

function TextArea({ value, onChange, rows = 4 }) {
  return (
    <textarea value={value || ""} onChange={e => onChange(e.target.value)} rows={rows}
      className="w-full bg-bg border-2 border-border px-4 py-2.5 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors resize-y" />
  )
}

function TagInput({ tags, onChange }) {
  const [input, setInput] = useState("")
  const add = () => { const v = input.trim(); if (v && !tags.includes(v)) onChange([...tags, v]); setInput("") }
  const remove = (tag) => onChange(tags.filter(t => t !== tag))
  const onKey = (e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add() } }
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey} placeholder="Add item, press Enter"
          className="flex-1 bg-bg border-2 border-border px-4 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
        <button type="button" onClick={add} className="px-3 py-2 bg-bg border-2 border-border text-secondary hover:text-primary hover:border-accent transition-colors"><Plus size={14} /></button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-1 font-mono text-xs bg-surface2 border border-border px-3 py-1 text-secondary">
            {tag}
            <button type="button" onClick={() => remove(tag)} className="text-faint hover:text-accent ml-1"><X size={10} /></button>
          </span>
        ))}
      </div>
    </div>
  )
}

function StringList({ items, onChange, placeholder = "" }) {
  const update = (i, v) => { const n = [...items]; n[i] = v; onChange(n) }
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const add = () => onChange([...items, ""])
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input value={item} onChange={e => update(i, e.target.value)} placeholder={placeholder}
            className="flex-1 bg-bg border-2 border-border px-4 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
          <button type="button" onClick={() => remove(i)} className="text-faint hover:text-accent px-2"><Trash2 size={14} /></button>
        </div>
      ))}
      <button type="button" onClick={add}
        className="flex items-center gap-1 font-mono text-xs text-secondary hover:text-primary border-2 border-border px-3 py-1.5 hover:border-accent transition-colors">
        <Plus size={12} /> Add item
      </button>
    </div>
  )
}

function MonthYearPicker({ monthValue, yearValue, onMonthChange, onYearChange, monthLabel = "Month", yearLabel = "Year" }) {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <label className="font-mono text-xs text-faint uppercase tracking-widest block mb-1">{monthLabel}</label>
        <select value={monthValue || ""} onChange={e => onMonthChange(e.target.value)}
          className="w-full bg-bg border-2 border-border px-3 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors">
          <option value="">— No month —</option>
          {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="flex-1">
        <label className="font-mono text-xs text-faint uppercase tracking-widest block mb-1">{yearLabel}</label>
        <input type="number" value={yearValue || ""} onChange={e => onYearChange(e.target.value)}
          placeholder="YYYY" min="1900" max="2100"
          className="w-full bg-bg border-2 border-border px-3 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
      </div>
    </div>
  )
}

function MetaEditor({ data, onChange }) {
  const m = data.meta
  const upd = (key, val) => onChange({ ...data, meta: { ...m, [key]: val } })
  const updSocial = (key, val) => onChange({ ...data, meta: { ...m, socials: { ...m.socials, [key]: val } } })
  const handleAvatar = (e) => {
    const file = e.target.files[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => upd("avatar", ev.target.result)
    reader.readAsDataURL(file)
  }
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full Name"><TextInput value={m.name} onChange={v => upd("name", v)} /></Field>
        <Field label="Title"><TextInput value={m.title} onChange={v => upd("title", v)} /></Field>
        <Field label="Email"><TextInput value={m.email} onChange={v => upd("email", v)} /></Field>
        <Field label="Resume URL"><TextInput value={m.resumeUrl} onChange={v => upd("resumeUrl", v)} placeholder="https://..." /></Field>
      </div>
      <Field label="Tagline"><TextInput value={m.tagline} onChange={v => upd("tagline", v)} /></Field>
      <Field label="Typewriter Roles">
        <StringList items={m.roles} onChange={v => upd("roles", v)} placeholder="Role title" />
      </Field>
      <Field label="Avatar Image (upload or paste URL)">
        <div className="space-y-2">
          <TextInput value={m.avatar?.startsWith("data:") ? "" : m.avatar} onChange={v => upd("avatar", v)} placeholder="https://..." />
          <input type="file" accept="image/*" onChange={handleAvatar}
            className="font-mono text-xs text-secondary file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-surface2 file:text-secondary file:font-mono file:text-xs file:cursor-pointer" />
          {m.avatar && <img src={m.avatar} alt="avatar preview" className="w-16 h-16 object-cover border-2 border-border" />}
        </div>
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.keys(m.socials).map(key => (
          <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1) + " URL"}>
            <TextInput value={m.socials[key]} onChange={v => updSocial(key, v)} placeholder="https://..." />
          </Field>
        ))}
      </div>
    </div>
  )
}

function AboutEditor({ data, onChange }) {
  return (
    <div className="space-y-5">
      <Field label="Bio"><TextArea value={data.about.bio} onChange={v => onChange({ ...data, about: { ...data.about, bio: v } })} rows={6} /></Field>
      <Field label="Stats">
        <div className="space-y-3">
          {data.stats.map((stat, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input value={stat.label} onChange={e => { const n = [...data.stats]; n[i] = { ...stat, label: e.target.value }; onChange({ ...data, stats: n }) }}
                placeholder="Label"
                className="flex-1 bg-bg border-2 border-border px-4 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
              <input type="number" value={stat.value} onChange={e => { const n = [...data.stats]; n[i] = { ...stat, value: Number(e.target.value) }; onChange({ ...data, stats: n }) }}
                className="w-24 bg-bg border-2 border-border px-4 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
              <button onClick={() => onChange({ ...data, stats: data.stats.filter((_, idx) => idx !== i) })} className="text-faint hover:text-accent"><Trash2 size={14} /></button>
            </div>
          ))}
          <button onClick={() => onChange({ ...data, stats: [...data.stats, { label: "", value: 0 }] })}
            className="flex items-center gap-1 font-mono text-xs text-secondary hover:text-primary border-2 border-border px-3 py-1.5 hover:border-accent transition-colors">
            <Plus size={12} /> Add stat
          </button>
        </div>
      </Field>
    </div>
  )
}

function SkillsEditor({ data, onChange }) {
  const upd = (skills) => onChange({ ...data, skills })
  const updateCategory = (i, key, val) => { const n = [...data.skills]; n[i] = { ...n[i], [key]: val }; upd(n) }
  const removeCategory = (i) => upd(data.skills.filter((_, idx) => idx !== i))
  const addCategory = () => upd([...data.skills, { category: "", items: [] }])
  return (
    <div className="space-y-4">
      {data.skills.map((cat, i) => (
        <div key={i} className="bg-surface2 border-2 border-border p-5 space-y-4">
          <div className="flex gap-3 items-center">
            <input value={cat.category} onChange={e => updateCategory(i, "category", e.target.value)} placeholder="Category name"
              className="flex-1 bg-bg border-2 border-border px-4 py-2 font-mono text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
            <button onClick={() => removeCategory(i)} className="text-faint hover:text-accent"><Trash2 size={14} /></button>
          </div>
          <TagInput tags={cat.items} onChange={v => updateCategory(i, "items", v)} />
        </div>
      ))}
      <button onClick={addCategory}
        className="flex items-center gap-2 font-mono text-sm text-secondary hover:text-primary border-2 border-border px-4 py-2 hover:border-accent transition-colors">
        <Plus size={14} /> Add category
      </button>
    </div>
  )
}

function ProjectsEditor({ data, onChange }) {
  const [expanded, setExpanded] = useState(null)
  const upd = (projects) => onChange({ ...data, projects })
  const updProject = (i, key, val) => { const n = [...data.projects]; n[i] = { ...n[i], [key]: val }; upd(n) }
  const removeProject = (i) => upd(data.projects.filter((_, idx) => idx !== i))
  const addProject = () => {
    const newId = Math.max(0, ...data.projects.map(p => p.id)) + 1
    upd([...data.projects, { id: newId, title: "", description: "", tags: [], githubUrl: "", liveUrl: "", featured: false, wide: false, image: "" }])
    setExpanded(data.projects.length)
  }
  return (
    <div className="space-y-3">
      <p className="font-mono text-xs text-faint">Check "Wide" to give a project the full-width showcase display.</p>
      {data.projects.map((project, i) => (
        <div key={project.id} className="bg-surface2 border-2 border-border overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
            <span className="flex-1 font-mono text-sm text-primary">{project.title || "(untitled)"}</span>
            <label className="flex items-center gap-2 font-mono text-xs text-faint cursor-pointer" onClick={e => e.stopPropagation()}>
              <input type="checkbox" checked={project.featured} onChange={e => updProject(i, "featured", e.target.checked)} className="accent-accent" /> Featured
            </label>
            <label className="flex items-center gap-2 font-mono text-xs text-accent font-bold cursor-pointer" onClick={e => e.stopPropagation()}>
              <input type="checkbox" checked={!!project.wide} onChange={e => updProject(i, "wide", e.target.checked)} className="accent-accent" /> Wide (Showcase)
            </label>
            <button onClick={(e) => { e.stopPropagation(); removeProject(i) }} className="text-faint hover:text-accent ml-2"><Trash2 size={14} /></button>
            {expanded === i ? <ChevronUp size={14} className="text-faint" /> : <ChevronDown size={14} className="text-faint" />}
          </div>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t-2 border-border">
              <Field label="Title"><TextInput value={project.title} onChange={v => updProject(i, "title", v)} /></Field>
              <Field label="Description"><TextArea value={project.description} onChange={v => updProject(i, "description", v)} rows={3} /></Field>
              <Field label="Tags"><TagInput tags={project.tags} onChange={v => updProject(i, "tags", v)} /></Field>
              <Field label="Image URL">
                <TextInput value={project.image || ""} onChange={v => updProject(i, "image", v)} placeholder="https://..." />
              </Field>
              {project.image && (
                <div className="border-2 border-border h-36 overflow-hidden">
                  <img src={project.image} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <Field label="GitHub URL"><TextInput value={project.githubUrl} onChange={v => updProject(i, "githubUrl", v)} placeholder="https://github.com/..." /></Field>
                <Field label="Live URL"><TextInput value={project.liveUrl} onChange={v => updProject(i, "liveUrl", v)} placeholder="https://..." /></Field>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={addProject}
        className="flex items-center gap-2 font-mono text-sm text-secondary hover:text-primary border-2 border-border px-4 py-2 hover:border-accent transition-colors">
        <Plus size={14} /> Add project
      </button>
    </div>
  )
}

function ExperienceEditor({ data, onChange }) {
  const [expanded, setExpanded] = useState(null)
  const upd = (experience) => onChange({ ...data, experience })
  const updItem = (i, patch) => {
    const n = [...data.experience]
    const updated = { ...n[i], ...patch }
    updated.period = buildPeriod(updated.startMonth, updated.startYear, updated.endMonth, updated.endYear, updated.current)
    n[i] = updated; upd(n)
  }
  const removeItem = (i) => upd(data.experience.filter((_, idx) => idx !== i))
  const addItem = () => {
    const newId = Math.max(0, ...data.experience.map(e => e.id)) + 1
    upd([...data.experience, { id: newId, role: "", company: "", startMonth: "", startYear: "", endMonth: "", endYear: "", current: false, period: "", location: "", description: "", highlights: [] }])
    setExpanded(data.experience.length)
  }
  return (
    <div className="space-y-3">
      {data.experience.map((item, i) => (
        <div key={item.id} className="bg-surface2 border-2 border-border overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
            <span className="flex-1 font-mono text-sm text-primary">{item.role || "(untitled)"} {item.company ? `@ ${item.company}` : ""}</span>
            <button onClick={(e) => { e.stopPropagation(); removeItem(i) }} className="text-faint hover:text-accent"><Trash2 size={14} /></button>
            {expanded === i ? <ChevronUp size={14} className="text-faint" /> : <ChevronDown size={14} className="text-faint" />}
          </div>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t-2 border-border">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Role"><TextInput value={item.role} onChange={v => updItem(i, { role: v })} /></Field>
                <Field label="Company"><TextInput value={item.company} onChange={v => updItem(i, { company: v })} /></Field>
                <Field label="Location"><TextInput value={item.location} onChange={v => updItem(i, { location: v })} /></Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-xs text-secondary uppercase tracking-widest mb-2">Start Date</p>
                  <MonthYearPicker monthValue={item.startMonth} yearValue={item.startYear}
                    onMonthChange={v => updItem(i, { startMonth: v })} onYearChange={v => updItem(i, { startYear: v })}
                    monthLabel="Start Month" yearLabel="Start Year" />
                </div>
                <div>
                  <p className="font-mono text-xs text-secondary uppercase tracking-widest mb-2">End Date</p>
                  <label className="flex items-center gap-2 font-mono text-xs text-faint mb-2 cursor-pointer">
                    <input type="checkbox" checked={!!item.current} onChange={e => updItem(i, { current: e.target.checked })} className="accent-accent" />
                    Current / Present
                  </label>
                  {!item.current && (
                    <MonthYearPicker monthValue={item.endMonth} yearValue={item.endYear}
                      onMonthChange={v => updItem(i, { endMonth: v })} onYearChange={v => updItem(i, { endYear: v })}
                      monthLabel="End Month" yearLabel="End Year" />
                  )}
                </div>
              </div>
              {item.period && <p className="font-mono text-xs text-accent">Preview: {item.period}</p>}
              <Field label="Description"><TextArea value={item.description} onChange={v => updItem(i, { description: v })} /></Field>
              <Field label="Highlights"><StringList items={item.highlights || []} onChange={v => updItem(i, { highlights: v })} placeholder="Highlight bullet" /></Field>
            </div>
          )}
        </div>
      ))}
      <button onClick={addItem}
        className="flex items-center gap-2 font-mono text-sm text-secondary hover:text-primary border-2 border-border px-4 py-2 hover:border-accent transition-colors">
        <Plus size={14} /> Add entry
      </button>
    </div>
  )
}

function EducationEditor({ data, onChange }) {
  const [expanded, setExpanded] = useState(null)
  const upd = (education) => onChange({ ...data, education })
  const updItem = (i, patch) => {
    const n = [...data.education]
    const updated = { ...n[i], ...patch }
    updated.period = buildPeriod(updated.startMonth, updated.startYear, updated.endMonth, updated.endYear, updated.current)
    n[i] = updated; upd(n)
  }
  const removeItem = (i) => upd(data.education.filter((_, idx) => idx !== i))
  const addItem = () => {
    const newId = Math.max(0, ...data.education.map(e => e.id)) + 1
    upd([...data.education, { id: newId, degree: "", institution: "", startMonth: "", startYear: "", endMonth: "", endYear: "", current: false, period: "", location: "", description: "" }])
    setExpanded(data.education.length)
  }
  return (
    <div className="space-y-3">
      {data.education.map((item, i) => (
        <div key={item.id} className="bg-surface2 border-2 border-border overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
            <span className="flex-1 font-mono text-sm text-primary">{item.degree || "(untitled)"}</span>
            <button onClick={(e) => { e.stopPropagation(); removeItem(i) }} className="text-faint hover:text-accent"><Trash2 size={14} /></button>
            {expanded === i ? <ChevronUp size={14} className="text-faint" /> : <ChevronDown size={14} className="text-faint" />}
          </div>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t-2 border-border">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Degree"><TextInput value={item.degree} onChange={v => updItem(i, { degree: v })} /></Field>
                <Field label="Institution"><TextInput value={item.institution} onChange={v => updItem(i, { institution: v })} /></Field>
                <Field label="Location"><TextInput value={item.location} onChange={v => updItem(i, { location: v })} /></Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-xs text-secondary uppercase tracking-widest mb-2">Start Date</p>
                  <MonthYearPicker monthValue={item.startMonth} yearValue={item.startYear}
                    onMonthChange={v => updItem(i, { startMonth: v })} onYearChange={v => updItem(i, { startYear: v })}
                    monthLabel="Start Month" yearLabel="Start Year" />
                </div>
                <div>
                  <p className="font-mono text-xs text-secondary uppercase tracking-widest mb-2">End Date</p>
                  <label className="flex items-center gap-2 font-mono text-xs text-faint mb-2 cursor-pointer">
                    <input type="checkbox" checked={!!item.current} onChange={e => updItem(i, { current: e.target.checked })} className="accent-accent" />
                    Current / Present
                  </label>
                  {!item.current && (
                    <MonthYearPicker monthValue={item.endMonth} yearValue={item.endYear}
                      onMonthChange={v => updItem(i, { endMonth: v })} onYearChange={v => updItem(i, { endYear: v })}
                      monthLabel="End Month" yearLabel="End Year" />
                  )}
                </div>
              </div>
              {item.period && <p className="font-mono text-xs text-accent">Preview: {item.period}</p>}
              <Field label="Description"><TextArea value={item.description} onChange={v => updItem(i, { description: v })} /></Field>
            </div>
          )}
        </div>
      ))}
      <button onClick={addItem}
        className="flex items-center gap-2 font-mono text-sm text-secondary hover:text-primary border-2 border-border px-4 py-2 hover:border-accent transition-colors">
        <Plus size={14} /> Add entry
      </button>
    </div>
  )
}

function InterestsEditor({ data, onChange }) {
  const [expanded, setExpanded] = useState(null)
  const interests = data.interests || []
  const upd = (arr) => onChange({ ...data, interests: arr })
  const updItem = (i, key, val) => { const n = [...interests]; n[i] = { ...n[i], [key]: val }; upd(n) }
  const removeItem = (i) => upd(interests.filter((_, idx) => idx !== i))
  const addItem = () => { upd([...interests, { icon: "✦", title: "", description: "" }]); setExpanded(interests.length) }
  return (
    <div className="space-y-3">
      {interests.map((item, i) => (
        <div key={i} className="bg-surface2 border-2 border-border overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
            <span className="text-lg shrink-0">{item.icon}</span>
            <span className="flex-1 font-mono text-sm text-primary">{item.title || "(untitled)"}</span>
            <button onClick={(e) => { e.stopPropagation(); removeItem(i) }} className="text-faint hover:text-accent"><Trash2 size={14} /></button>
            {expanded === i ? <ChevronUp size={14} className="text-faint" /> : <ChevronDown size={14} className="text-faint" />}
          </div>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t-2 border-border">
              <Field label="Icon (emoji)"><TextInput value={item.icon} onChange={v => updItem(i, "icon", v)} placeholder="🧠" /></Field>
              <Field label="Title"><TextInput value={item.title} onChange={v => updItem(i, "title", v)} /></Field>
              <Field label="Description"><TextArea value={item.description} onChange={v => updItem(i, "description", v)} rows={3} /></Field>
            </div>
          )}
        </div>
      ))}
      <button onClick={addItem}
        className="flex items-center gap-2 font-mono text-sm text-secondary hover:text-primary border-2 border-border px-4 py-2 hover:border-accent transition-colors">
        <Plus size={14} /> Add interest
      </button>
    </div>
  )
}

function ContactEditor({ data, onChange }) {
  return (
    <div className="space-y-5">
      <Field label="Heading"><TextInput value={data.contact.heading} onChange={v => onChange({ ...data, contact: { ...data.contact, heading: v } })} /></Field>
      <Field label="Subtext"><TextArea value={data.contact.subtext} onChange={v => onChange({ ...data, contact: { ...data.contact, subtext: v } })} rows={3} /></Field>
    </div>
  )
}

const TAB_EDITORS = { Meta: MetaEditor, About: AboutEditor, Skills: SkillsEditor, Projects: ProjectsEditor, Experience: ExperienceEditor, Education: EducationEditor, Interests: InterestsEditor, Contact: ContactEditor }

function GitHubSetup({ token, onSave, onClose }) {
  const [val, setVal] = useState(token || "")
  return (
    <div className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50 flex items-center justify-center px-6">
      <div className="bg-surface border-2 border-border p-8 w-full max-w-lg space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-primary text-xl">GitHub Token Setup</h2>
          <button onClick={onClose} className="text-faint hover:text-primary"><X size={18} /></button>
        </div>
        <p className="font-mono text-xs text-secondary leading-relaxed">
          To save permanently, you need a GitHub Personal Access Token with <span className="text-accent">repo</span> scope.<br /><br />
          1. Go to <span className="text-accent">github.com {">"} Settings {">"} Developer settings {">"} Personal access tokens {">"} Fine-grained tokens</span><br />
          2. Create token with <span className="text-accent">Contents: Read and write</span> permission for this repo<br />
          3. Paste it below — stored only in your browser
        </p>
        <Field label="Personal Access Token">
          <TextInput value={val} onChange={setVal} placeholder="github_pat_..." type="password" />
        </Field>
        <button onClick={() => { onSave(val); onClose() }}
          className="w-full bg-accent text-bg font-mono font-bold uppercase tracking-widest py-2.5 hover:opacity-90 transition-opacity">
          Save Token
        </button>
      </div>
    </div>
  )
}

export function Admin() {
  const { portfolioData, updateSection } = usePortfolioData()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "true")
  const [activeTab, setActiveTab] = useState("Meta")
  const [localData, setLocalData] = useState(portfolioData)
  const [saveStatus, setSaveStatus] = useState(null)
  const [saveError, setSaveError] = useState("")
  const [confirmReset, setConfirmReset] = useState(false)
  const [showGHSetup, setShowGHSetup] = useState(false)
  const [ghToken, setGhToken] = useState(() => localStorage.getItem("gh_pat") || "")

  const logout = () => { sessionStorage.removeItem("admin_auth"); setAuthed(false) }

  const save = async () => {
    Object.keys(localData).forEach(key => updateSection(key, localData[key]))
    if (!ghToken) { setShowGHSetup(true); return }
    setSaveStatus("saving"); setSaveError("")
    try {
      await commitToGitHub(ghToken, localData)
      setSaveStatus("success")
      setTimeout(() => setSaveStatus(null), 4000)
    } catch (err) {
      setSaveStatus("error"); setSaveError(err.message)
      setTimeout(() => setSaveStatus(null), 6000)
    }
  }

  const resetSection = () => {
    const keyMap = { meta: "meta", about: "about", skills: "skills", projects: "projects", experience: "experience", education: "education", interests: "interests", contact: "contact" }
    const dKey = keyMap[activeTab.toLowerCase()]
    if (dKey && defaults[dKey]) {
      setLocalData(prev => ({ ...prev, [dKey]: defaults[dKey] }))
      updateSection(dKey, defaults[dKey])
    }
    setConfirmReset(false)
  }

  const saveGhToken = (t) => { setGhToken(t); localStorage.setItem("gh_pat", t) }

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />

  const EditorComponent = TAB_EDITORS[activeTab]

  return (
    <div className="min-h-screen bg-bg">
      {showGHSetup && <GitHubSetup token={ghToken} onSave={saveGhToken} onClose={() => setShowGHSetup(false)} />}

      <div className="border-b-2 border-border bg-surface px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="font-display font-bold text-primary text-lg">Portfolio Admin</h1>
          {ghToken
            ? <span className="flex items-center gap-1 font-mono text-xs text-accent border border-accent px-2 py-0.5"><GitBranch size={10} /> Connected</span>
            : <button onClick={() => setShowGHSetup(true)} className="flex items-center gap-1 font-mono text-xs text-faint border border-border px-2 py-0.5 hover:border-accent hover:text-accent transition-colors"><Settings size={10} /> Setup GitHub</button>
          }
        </div>
        <div className="flex items-center gap-4">
          {ghToken && <button onClick={() => setShowGHSetup(true)} className="font-mono text-xs text-faint hover:text-secondary transition-colors"><Settings size={14} /></button>}
          <Link to="/" className="flex items-center gap-1 font-mono text-xs text-secondary hover:text-primary transition-colors">View Site <ExternalLink size={12} /></Link>
          <button onClick={logout} className="flex items-center gap-1 font-mono text-xs text-faint hover:text-accent transition-colors"><LogOut size={12} /> Log Out</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:w-44 shrink-0">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`shrink-0 text-left px-4 py-2.5 font-mono text-sm transition-colors uppercase tracking-widest ${activeTab === tab ? "bg-accent text-bg" : "text-secondary hover:text-primary hover:bg-surface"}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-surface border-2 border-border p-6">
            <h2 className="font-display font-bold text-primary text-xl mb-6">{activeTab}</h2>
            {EditorComponent && <EditorComponent data={localData} onChange={setLocalData} />}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              {!confirmReset
                ? <button onClick={() => setConfirmReset(true)} className="flex items-center gap-1 font-mono text-xs text-faint hover:text-accent transition-colors"><RotateCcw size={12} /> Reset section to defaults</button>
                : <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-secondary">Reset {activeTab}?</span>
                    <button onClick={resetSection} className="font-mono text-xs text-accent hover:underline">Yes</button>
                    <button onClick={() => setConfirmReset(false)} className="font-mono text-xs text-faint hover:text-secondary">Cancel</button>
                  </div>
              }
            </div>
            <div className="flex items-center gap-3">
              {saveStatus === "error" && <span className="flex items-center gap-1 font-mono text-xs text-red-400"><AlertCircle size={12} /> {saveError}</span>}
              {saveStatus === "success" && <span className="flex items-center gap-1 font-mono text-xs text-green-400"><CheckCircle2 size={12} /> Committed — rebuilding in ~2 min</span>}
              <button onClick={save} disabled={saveStatus === "saving"}
                className="flex items-center gap-2 bg-accent text-bg font-mono font-bold uppercase tracking-widest px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-60">
                {saveStatus === "saving" ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> {ghToken ? "Save & Deploy" : "Save"}</>}
              </button>
            </div>
          </div>

          {!ghToken && (
            <div className="mt-4 border-2 border-dashed border-border p-4 flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-faint">Changes save locally only. Connect GitHub to deploy to everyone.</p>
              <button onClick={() => setShowGHSetup(true)}
                className="flex items-center gap-2 font-mono text-xs text-accent border border-accent px-3 py-1.5 hover:bg-accent hover:text-bg transition-colors shrink-0">
                <GitBranch size={12} /> Connect GitHub
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
