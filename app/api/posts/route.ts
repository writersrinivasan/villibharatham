import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const postsDir = path.join(process.cwd(), 'content/posts')

export async function GET() {
  if (!fs.existsSync(postsDir)) return NextResponse.json({ count: 0 })
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
  return NextResponse.json({ count: files.length })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    title, date, sessionNumber, parvaNumber, parva,
    subSection, verseStart, verseEnd, totalVersesRead, excerpt, content,
  } = body

  if (!title || !date || !sessionNumber) {
    return NextResponse.json({ error: 'title, date, sessionNumber are required' }, { status: 400 })
  }

  const slug = `${date}-day-${sessionNumber}`
  const filePath = path.join(postsDir, `${slug}.mdx`)

  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'A post for this day already exists', slug }, { status: 409 })
  }

  const escapedTitle = String(title).replace(/"/g, '\\"')
  const escapedExcerpt = String(excerpt ?? '').replace(/"/g, '\\"')
  const escapedParva = String(parva ?? '').replace(/"/g, '\\"')
  const escapedSubSection = String(subSection ?? '').replace(/"/g, '\\"')

  const fileContent = `---
title: "${escapedTitle}"
date: "${date}"
sessionNumber: ${sessionNumber}
parvaNumber: ${parvaNumber ?? 1}
parva: "${escapedParva}"
subSection: "${escapedSubSection}"
verseStart: ${verseStart ?? 1}
verseEnd: ${verseEnd ?? 1}
totalVersesRead: ${totalVersesRead ?? 1}
excerpt: "${escapedExcerpt}"
---

${content ?? ''}
`

  fs.mkdirSync(postsDir, { recursive: true })
  fs.writeFileSync(filePath, fileContent, 'utf8')

  return NextResponse.json({ slug }, { status: 201 })
}
