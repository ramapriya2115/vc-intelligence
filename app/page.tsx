"use client"
import { useRouter } from "next/navigation"
export default function Dashboard() {
  const router = useRouter()
  return (
    <div className="space-y-10">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-12 text-white shadow-2xl">

        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            Precision AI Scout
          </h1>

          <p className="text-lg opacity-90">
            Discover, enrich and evaluate startups aligned to your fund thesis.
          </p>

          <button
  onClick={() => router.push("/companies")}
  className="mt-6 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
>
  Explore Companies →
</button>
        </div>

        {/* Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-8">

        <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Total Companies</p>
          <h2 className="text-3xl font-bold mt-2">24</h2>
        </div>

        <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Enriched Profiles</p>
          <h2 className="text-3xl font-bold mt-2">12</h2>
        </div>

        <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Active Lists</p>
          <h2 className="text-3xl font-bold mt-2">3</h2>
        </div>

      </div>

      {/* Activity Feed */}
      <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4 text-sm text-gray-600">
          <p>• ClimateForge enriched 2 hours ago</p>
          <p>• Added FinPilot to “Climate AI” list</p>
          <p>• Thesis match score updated</p>
        </div>
      </div>

    </div>
  )
}