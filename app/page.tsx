import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div className="container">
      <div className="ornament">✦ ✦ ✦</div>

      <h1 className="page-heading">அன்றாட வாசிப்பு — Daily Sessions</h1>

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>முதல் வாசிப்பு இன்னும் வரவில்லை.</p>
          <p style={{ marginTop: '0.5rem' }}>The first reading session has not been published yet.</p>
        </div>
      ) : (
        <div className="session-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="session-card">
              <div className="card-day">Day {post.sessionNumber} &nbsp;·&nbsp; {formatDate(post.date)}</div>
              <div className="card-title">{post.title}</div>
              {post.excerpt && <div className="card-excerpt">{post.excerpt}</div>}
              <div className="card-meta">
                <span>📖 {post.parva}</span>
                <span>📜 {post.subSection}</span>
                <span>🔢 செய்யுள் {post.verseStart}–{post.verseEnd}</span>
                <span>∑ {post.totalVersesRead} verses read</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="ornament" style={{ marginTop: '3rem' }}>✦</div>
      <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
        ஒவ்வொரு நாளும் காலை 7 மணிக்கு புதிய வாசிப்பு பதிவேற்றப்படும்.<br />
        A new session is published every morning at 7 AM.
      </p>
    </div>
  )
}
