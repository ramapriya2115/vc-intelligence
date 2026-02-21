"use client"

import { useState, useEffect } from "react"
import { getLists, saveLists, VCList } from "@/lib/storage"
import { companies } from "@/lib/mockData"

export default function ListsPage() {
  const [lists, setLists] = useState<VCList[]>([])
  const [newListName, setNewListName] = useState("")

  useEffect(() => {
    setLists(getLists())
  }, [])

  function createList() {
    if (!newListName.trim()) return

    const updated = [
      ...lists,
      { id: Date.now().toString(), name: newListName, companies: [] }
    ]

    setLists(updated)
    saveLists(updated)
    setNewListName("")
  }

  function deleteList(listId: string) {
    const updated = lists.filter((list) => list.id !== listId)
    setLists(updated)
    saveLists(updated)
  }

  function removeCompany(listId: string, companyId: string) {
    const updated = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          companies: list.companies.filter((id) => id !== companyId)
        }
      }
      return list
    })

    setLists(updated)
    saveLists(updated)
  }

  function exportJSON(list: VCList) {
    const data = list.companies.map(id =>
      companies.find(c => c.id === id)
    )

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${list.name}.json`
    a.click()
  }

  function exportCSV(list: VCList) {
    const data = list.companies.map(id =>
      companies.find(c => c.id === id)
    )

    const header = "Name,Industry,Stage,Location\n"
    const rows = data
      .filter(Boolean)
      .map(c =>
        `${c!.name},${c!.industry},${c!.stage},${c!.location}`
      )
      .join("\n")

    const blob = new Blob([header + rows], {
      type: "text/csv"
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${list.name}.csv`
    a.click()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Lists</h1>

      {/* Create List */}
      <div className="mb-6 flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          placeholder="New list name..."
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button
          onClick={createList}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* Show Lists */}
      <div className="space-y-6">
        {lists.map((list) => (
          <div key={list.id} className="bg-white p-6 rounded-2xl shadow border border-gray-100">

            {/* Header with delete */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">{list.name}</h2>

              <button
                onClick={() => deleteList(list.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete List
              </button>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => exportJSON(list)}
                className="text-sm bg-gray-200 px-3 py-1 rounded"
              >
                Export JSON
              </button>

              <button
                onClick={() => exportCSV(list)}
                className="text-sm bg-gray-200 px-3 py-1 rounded"
              >
                Export CSV
              </button>
            </div>

            {/* Companies */}
            {list.companies.length === 0 ? (
              <p className="text-sm text-gray-500">
                No companies in this list
              </p>
            ) : (
              <ul className="space-y-2">
                {list.companies.map((companyId) => {
                  const company = companies.find(c => c.id === companyId)
                  if (!company) return null

                  return (
                    <li
                      key={companyId}
                      className="flex justify-between items-center border p-2 rounded"
                    >
                      <span>{company.name}</span>
                      <button
                        onClick={() => removeCompany(list.id, companyId)}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}