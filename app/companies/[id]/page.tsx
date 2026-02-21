"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import { companies } from "@/lib/mockData"
import { getLists, saveLists, VCList } from "@/lib/storage"
import { fundThesis } from "@/lib/thesis"

export default function CompanyProfile() {
  const params = useParams()
  const id = params.id as string

  const company = companies.find((c) => c.id === id)

  const [notes, setNotes] = useState("")
  const [lists, setLists] = useState<VCList[]>([])
  const [enrichment, setEnrichment] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Load notes + lists
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${id}`)
    if (savedNotes) {
      setNotes(savedNotes)
    }

    setLists(getLists())

    // Load cached enrichment
    const cachedEnrichment = localStorage.getItem(`enrichment-${id}`)
    if (cachedEnrichment) {
      setEnrichment(JSON.parse(cachedEnrichment))
    }
  }, [id])

  // Persist notes
  useEffect(() => {
    localStorage.setItem(`notes-${id}`, notes)
  }, [notes, id])

  function addToList(listId: string) {
    const updatedLists = lists.map((list) => {
      if (list.id === listId && !list.companies.includes(id)) {
        return {
          ...list,
          companies: [...list.companies, id],
        }
      }
      return list
    })

    setLists(updatedLists)
    saveLists(updatedLists)
  }

  async function enrichCompany() {
    if (!company) return

    // If already enriched, skip API call
    if (enrichment) return

    setLoading(true)

    try {
      const response = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: company.website }),
      })

      const data = await response.json()

      setEnrichment(data)
      localStorage.setItem(`enrichment-${id}`, JSON.stringify(data))
    } catch (error) {
      console.error("Enrichment failed:", error)
    } finally {
      setLoading(false)
    }
  }

  //  Thesis Evaluation (memoized)
  const thesisResult = useMemo(() => {
    if (!enrichment) return null

    const matchedKeywords =
      enrichment.keywords?.filter((keyword: string) =>
        fundThesis.focus.includes(keyword.toLowerCase())
      ) || []

    const stageMatch = fundThesis.stage.includes(company!.stage)

    const score =
      matchedKeywords.length * 20 +
      (stageMatch ? 20 : 0)

    return {
      matchedKeywords,
      stageMatch,
      score: Math.min(score, 100),
    }
  }, [enrichment, company])

  if (!company) {
    return <div>Company not found</div>
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{company.name}</h1>
        <p className="text-gray-500">
          {company.industry} • {company.stage} • {company.location}
        </p>
      </div>

      {/* Overview */}
   <div className="p-8 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-lg transition space-y-3">
        <h2 className="text-lg font-semibold">Overview</h2>
<p><strong>Founded:</strong> {company.founded}</p>
<p><strong>Employees:</strong> {company.employees}</p>
<p><strong>Funding:</strong> {company.funding}</p>
<p className="text-gray-600 mt-3">{company.description}</p>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={company.website}
            target="_blank"
            className="text-blue-600 underline"
          >
            {company.website}
          </a>
        </p>
      </div>

      {/* Enrichment */}
      <div className="p-8 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-lg transition space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Live Enrichment</h2>

          <button
            onClick={enrichCompany}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          >
            {loading ? "Enriching..." : enrichment ? "Enriched ✓" : "Enrich Company"}
          </button>
        </div>

        {enrichment && (
          <>
            <p><strong>Summary:</strong> {enrichment.summary}</p>

            <div>
              <strong>Keywords:</strong>
              <ul className="list-disc ml-6">
                {enrichment.keywords?.map((k: string, i: number) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Signals:</strong>
              <ul className="list-disc ml-6">
                {enrichment.signals?.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-gray-500">
              Source: {enrichment.source}
            </p>
            <p className="text-xs text-gray-500">
              Retrieved: {enrichment.timestamp}
            </p>
          </>
        )}
      </div>

      {/* Thesis Match */}
      {thesisResult && (
       <div className="p-8 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-lg transition space-y-3">
          <h2 className="text-lg font-semibold">Thesis Match Analysis</h2>

          <p>
            <strong>Match Score:</strong> {thesisResult.score} / 100
          </p>

          <p>
            <strong>Matched Keywords:</strong>{" "}
            {thesisResult.matchedKeywords.length
              ? thesisResult.matchedKeywords.join(", ")
              : "None"}
          </p>

          <p>
            <strong>Stage Fit:</strong>{" "}
            {thesisResult.stageMatch
              ? "Matches fund stage"
              : "Stage mismatch"}
          </p>
        </div>
      )}

      {/* Save to List */}
   <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 shadow-lg">

  <h2 className="text-lg font-semibold mb-6 text-indigo-700">
    Save to Investment List
  </h2>

  {lists.length === 0 ? (
    <p className="text-sm text-gray-500">
      No lists available. Create one in the Lists page.
    </p>
  ) : (
    <div className="grid gap-3">
      {lists.map((list) => (
        <button
          key={list.id}
          onClick={() => addToList(list.id)}
          className="flex justify-between items-center px-5 py-3 rounded-xl bg-white shadow hover:shadow-xl border border-indigo-100 hover:scale-[1.02] transition-all"
        >
          <span className="font-medium text-gray-800">
            {list.name}
          </span>

          <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-semibold">
            Add →
          </span>
        </button>
      ))}
    </div>
  )}
</div>

      {/* Notes */}
  <div className="p-8 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-lg transition space-y-3">
        <h2 className="text-lg font-semibold">Investment Notes</h2>

        <textarea
          className="w-full border p-3 rounded-md h-32"
          placeholder="Add your investment notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

    </div>
  )
}