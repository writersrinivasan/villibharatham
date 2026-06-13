'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const today = new Date().toISOString().slice(0, 10)

const defaultContent = `## Session Summary

Brief summary of today's reading...

---

### **செய்யுள் 1** *(விருத்தம் — ...)*

> Verse line 1
> Verse line 2
> Verse line 3
> Verse line 4

| சொல் | பொருள் |
|------|--------|
| word | meaning |

**Tamil விளக்கம்:** ...

**English Explanation:** ...

---

## Day Summary

**இன்றைய கதை சுருக்கம்:** ...

**Today's Reading in Brief:** ...

**இன்றைய சிறப்பு வரி:** "..." — *...*
`

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    title: '',
    date: today,
    sessionNumber: 2,
    parvaNumber: 1,
    parva: 'ஆதிபருவம்',
    subSection: '',
    verseStart: 1,
    verseEnd: 1,
    excerpt: '',
    content: defaultContent,
  })

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then(({ count }) => setForm((f) => ({ ...f, sessionNumber: count + 1 })))
      .catch(() => {})
  }, [])

  const totalVersesRead = Math.max(0, Number(form.verseEnd) - Number(form.verseStart) + 1)

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, totalVersesRead }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Failed to create post')
      } else {
        setSuccess(`Post created! Redirecting…`)
        setTimeout(() => router.push(`/posts/${data.slug}`), 1200)
      }
    } catch {
      setError('Network error — is the dev server running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1 className="page-heading">புதிய நாள் பதிவு — New Daily Post</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-row-2">
          <label className="admin-field">
            <span>Date</span>
            <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} required />
          </label>
          <label className="admin-field">
            <span>Day # (Session)</span>
            <input type="number" min={1} value={form.sessionNumber} onChange={(e) => set('sessionNumber', Number(e.target.value))} required />
          </label>
        </div>

        <label className="admin-field">
          <span>Title</span>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder={`Day ${form.sessionNumber} — ஆதிபருவம் | Verses X–Y`}
            required
          />
        </label>

        <label className="admin-field">
          <span>Excerpt (Tamil summary, 1–2 sentences)</span>
          <input type="text" value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
        </label>

        <div className="admin-row-2">
          <label className="admin-field">
            <span>Parva Number</span>
            <input type="number" min={1} value={form.parvaNumber} onChange={(e) => set('parvaNumber', Number(e.target.value))} />
          </label>
          <label className="admin-field">
            <span>Parva (பருவம்)</span>
            <input type="text" value={form.parva} onChange={(e) => set('parva', e.target.value)} placeholder="ஆதிபருவம்" />
          </label>
        </div>

        <div className="admin-row-3">
          <label className="admin-field">
            <span>Sub-section</span>
            <input type="text" value={form.subSection} onChange={(e) => set('subSection', e.target.value)} placeholder="பாயிரம்" />
          </label>
          <label className="admin-field">
            <span>Verse Start</span>
            <input type="number" min={1} value={form.verseStart} onChange={(e) => set('verseStart', Number(e.target.value))} />
          </label>
          <label className="admin-field">
            <span>Verse End</span>
            <input type="number" min={1} value={form.verseEnd} onChange={(e) => set('verseEnd', Number(e.target.value))} />
          </label>
        </div>

        <div className="admin-verse-count">
          Verses in this session: <strong>{totalVersesRead}</strong>
        </div>

        <label className="admin-field">
          <span>Post Content (MDX / Markdown)</span>
          <textarea
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            rows={28}
            spellCheck={false}
          />
        </label>

        {error && <div className="admin-error">{error}</div>}
        {success && <div className="admin-success">{success}</div>}

        <button type="submit" className="admin-submit" disabled={loading}>
          {loading ? 'Creating…' : 'பதிவேற்று — Publish Post'}
        </button>
      </form>
    </div>
  )
}
