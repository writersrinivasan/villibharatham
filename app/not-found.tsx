import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <div className="ornament">✦</div>
      <h2 style={{ fontFamily: 'Noto Serif Tamil, serif', fontSize: '1.4rem', color: 'var(--text-gold)', margin: '1rem 0' }}>
        பக்கம் காணவில்லை
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
        This reading session does not exist yet.
      </p>
      <Link href="/" className="nav-btn">← Back to all sessions</Link>
    </div>
  )
}
