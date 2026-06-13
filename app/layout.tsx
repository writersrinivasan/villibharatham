import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'வில்லிபாரதம் — Daily Reading',
  description: 'Daily verse-by-verse study of Villiputhurar\'s வில்லிபாரதம் — the 14th-century Tamil Mahābhārata',
  openGraph: {
    title: 'வில்லிபாரதம் — Daily Reading',
    description: 'Word-by-word Tamil & English study of the Villi Bharatam',
    locale: 'ta_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ta">
      <body>
        <header className="site-header">
          <Link href="/">
            <div className="site-title">வில்லிபாரதம்</div>
            <div className="site-subtitle">Villiputhurar's Tamil Mahābhārata — Daily Reading</div>
          </Link>
          <Link href="/admin/new" className="new-post-link">+ புதிய பதிவு</Link>
        </header>

        <main>
          {children}
        </main>

        <footer className="site-footer">
          <p>வில்லிபாரதம் — Villiputhurar (14th century) &nbsp;·&nbsp; Daily reading by Srinivasan</p>
          <p style={{ marginTop: '0.3rem' }}>பதிப்புரிமை இல்லை — Open for all learners of Tamil classical literature</p>
        </footer>
      </body>
    </html>
  )
}
