# வில்லிபாரதம் — Daily Reading

A personal daily-reading blog for **Villiputhurar's வில்லிபாரதம்** — the 14th-century Tamil retelling of the Mahābhārata. Each day's entry covers a set of verses with the original Tamil text, word-by-word glossary, Tamil commentary, and English explanation.

Built with **Next.js 14** (App Router) and MDX. Deployable to Vercel.

---

## What This Is

வில்லிபாரதம் (Villi Bharatam) is one of the five great Tamil epics, composed by Villiputhurar around the 14th century. This blog documents a verse-by-verse reading journey through the entire work — one session per day — starting from the Pāyiram (prologue) of the Ādi Parva.

Each post includes:
- The original Tamil verse (செய்யுள்) in its classical metre
- A word-by-word meaning table (சொல் → பொருள்)
- Tamil commentary (Tamil விளக்கம்)
- English explanation with literary and historical context
- Day summary in both Tamil and English

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Content | MDX files in `content/posts/` |
| Styling | Plain CSS with CSS variables (parchment/gold theme) |
| Fonts | Noto Serif Tamil + EB Garamond (Google Fonts) |
| Deployment | Vercel |

---

## Project Structure

```
├── app/
│   ├── layout.tsx          # Site header, footer, fonts
│   ├── page.tsx            # Home — lists all sessions
│   ├── not-found.tsx       # 404 page
│   ├── globals.css         # All styles
│   ├── posts/[slug]/
│   │   └── page.tsx        # Individual post page
│   ├── admin/new/
│   │   └── page.tsx        # Form to publish a new daily post
│   └── api/posts/
│       └── route.ts        # GET (post count) / POST (create MDX file)
├── content/
│   └── posts/              # One .mdx file per session
│       └── YYYY-MM-DD-day-N.mdx
├── lib/
│   └── posts.ts            # getAllPosts / getPostBySlug / getAllSlugs
└── public/
```

---

## Running Locally

```bash
git clone https://github.com/writersrinivasan/villibharatham.git
cd villibharatham
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Writing a New Daily Post

Two ways to add a post:

### 1. Admin form (easiest)

With the dev server running, go to [http://localhost:3000/admin/new](http://localhost:3000/admin/new)  
(or click **+ புதிய பதிவு** in the site header).

Fill in the fields — date, session number, parva, verse range, excerpt, and the MDX body. Hit **பதிவேற்று — Publish Post**. The file is written to `content/posts/` immediately and you are redirected to the new post.

### 2. Create the file directly

Add a file to `content/posts/` named `YYYY-MM-DD-day-N.mdx`:

```mdx
---
title: "Day N — பருவம் | Sub-section (Verses X–Y)"
date: "YYYY-MM-DD"
sessionNumber: N
parvaNumber: 1
parva: "ஆதிபருவம்"
subSection: "பாயிரம்"
verseStart: X
verseEnd: Y
totalVersesRead: Z
excerpt: "One or two sentence Tamil summary of the session."
---

## Session Summary

...

### **செய்யுள் 1** *(விருத்தம் — ...)*

> Verse line 1
> Verse line 2

| சொல் | பொருள் |
|------|--------|
| word | meaning |

**Tamil விளக்கம்:** ...

**English Explanation:** ...

---

## Day Summary

...
```

The dev server hot-reloads; the post appears on the home page instantly.

---

## Deploying to Vercel

The repo includes a `vercel.json`. Push to GitHub and import the repo in the Vercel dashboard — it deploys automatically on every push to `master`.

> **Note:** The `/admin/new` route writes files to the local filesystem, so it works only in local development. On Vercel (read-only filesystem) you must commit new MDX files via git and push to deploy them.

---

## Frontmatter Reference

| Field | Type | Description |
|---|---|---|
| `title` | string | Post title shown in cards and `<title>` |
| `date` | `YYYY-MM-DD` | Publication date |
| `sessionNumber` | number | Sequential day count (1, 2, 3…) |
| `parvaNumber` | number | Parva index in the epic |
| `parva` | string | Tamil parva name (e.g. ஆதிபருவம்) |
| `subSection` | string | Sub-section within the parva |
| `verseStart` | number | First verse number covered |
| `verseEnd` | number | Last verse number covered |
| `totalVersesRead` | number | Cumulative verses read so far |
| `excerpt` | string | Short Tamil summary for the card |

---

## License

The blog infrastructure (code, CSS, components) is MIT licensed.  
The Tamil verse text of வில்லிபாரதம் is in the public domain — Villiputhurar, ~14th century.  
Commentary and translations by Srinivasan — open for all learners of Tamil classical literature.
