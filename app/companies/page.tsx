"use client"

import { useState } from "react"
import { companies } from "@/lib/mockData"
import { useRouter } from "next/navigation"

export default function CompaniesPage() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Discover Companies
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Precision AI scouting powered by live enrichment.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search companies..."
          className="w-full rounded-xl border border-indigo-200 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cards Grid Instead of Table */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((company) => (
          <div
            key={company.id}
            onClick={() => router.push(`/companies/${company.id}`)}
            className="cursor-pointer p-6 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">
              {company.name}
            </h2>

            <div className="space-y-1 text-sm text-gray-600">
              <p>{company.industry}</p>
              <p>{company.stage}</p>
              <p>{company.location}</p>
            </div>

            <div className="mt-4">
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-medium">
                View Profile →
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}