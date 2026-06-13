import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/posts'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | வில்லிபாரதம்`,
    description: post.excerpt,
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  // Find prev/next
  const allPosts = getAllPosts().sort((a, b) => a.sessionNumber - b.sessionNumber)
  const idx = allPosts.findIndex((p) => p.slug === params.slug)
  const prev = idx > 0 ? allPosts[idx - 1] : null
  const next = idx < allPosts.length - 1 ? allPosts[idx + 1] : null

  return (
    <div className="container">
      <Link href="/" className="back-link">← அனைத்து வாசிப்புகளும் / All Sessions</Link>

      <div className="post-header">
        <div className="post-day-label">Day {post.sessionNumber} &nbsp;·&nbsp; {formatDate(post.date)}</div>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta-row">
          <span>📖 {post.parva}</span>
          <span>📜 {post.subSection}</span>
          <span>🔢 செய்யுள் {post.verseStart}–{post.verseEnd}</span>
          <span>∑ மொத்தம் {post.totalVersesRead} செய்யுள்கள்</span>
        </div>
      </div>

      <div className="ornament">✦ ✦ ✦</div>

      <article className="prose">
        <MDXRemote source={post.content} />
      </article>

      {(prev || next) && (
        <nav className="post-nav">
          {prev ? (
            <Link href={`/posts/${prev.slug}`} className="nav-btn">
              ← Day {prev.sessionNumber}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/posts/${next.slug}`} className="nav-btn">
              Day {next.sessionNumber} →
            </Link>
          ) : <span />}
        </nav>
      )}
    </div>
  )
}
