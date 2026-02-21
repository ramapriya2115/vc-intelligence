"use client"

import { useState, useEffect } from "react"

export default function SavedSearches() {
  const [saved, setSaved] = useState<string[]>([])
  const [newSearch, setNewSearch] = useState("")

  useEffect(() => {
    const data = localStorage.getItem("saved-searches")
    if (data) setSaved(JSON.parse(data))
  }, [])

  function saveSearch() {
    if (!newSearch.trim()) return

    const updated = [...saved, newSearch]
    setSaved(updated)
    localStorage.setItem("saved-searches", JSON.stringify(updated))
    setNewSearch("")
  }

  function deleteSearch(index: number) {
    const updated = saved.filter((_, i) => i !== index)
    setSaved(updated)
    localStorage.setItem("saved-searches", JSON.stringify(updated))
  }

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-bold">
        Saved Searches
      </h1>

      {/* Create Saved Query */}
      <div className="flex gap-4">
        <input
          className="border px-4 py-3 rounded-xl w-full"
          placeholder="Save a search query..."
          value={newSearch}
          onChange={(e) => setNewSearch(e.target.value)}
        />
        <button
          onClick={saveSearch}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Save
        </button>
      </div>

      {/* Display Saved Queries */}
      <div className="space-y-4">
        {saved.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No saved searches yet.
          </p>
        ) : (
          saved.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-6 bg-white rounded-2xl shadow border border-gray-100 hover:shadow-lg transition"
            >
              <span className="text-gray-700">{item}</span>

              <button
                onClick={() => deleteSearch(index)}
                className="text-red-500 text-sm font-medium hover:underline"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  )
}