import "./globals.css"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">

        <div className="flex">

          {/* Sidebar */}
          <aside className="w-64 h-screen sticky top-0 backdrop-blur-lg bg-white/70 border-r border-white/40 shadow-xl px-6 py-8">

            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-10">
              VC Intelligence
            </h1>

            <nav className="space-y-4 text-sm font-medium">
              <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-indigo-100 transition">
                Dashboard
              </Link>
              <Link href="/companies" className="block px-3 py-2 rounded-lg hover:bg-indigo-100 transition">
                Companies
              </Link>
              <Link href="/lists" className="block px-3 py-2 rounded-lg hover:bg-indigo-100 transition">
                Lists
              </Link>
              <Link href="/saved" className="block px-3 py-2 rounded-lg hover:bg-indigo-100 transition">
                Saved Searches
              </Link>
            </nav>

          </aside>

          {/* Main */}
          <main className="flex-1 px-16 py-12">
            {children}
          </main>

        </div>

      </body>
    </html>
  )
}