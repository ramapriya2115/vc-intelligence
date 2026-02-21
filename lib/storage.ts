export interface VCList {
  id: string
  name: string
  companies: string[]
}

export function getLists(): VCList[] {
  const data = localStorage.getItem("vc-lists")
  return data ? JSON.parse(data) : []
}

export function saveLists(lists: VCList[]) {
  localStorage.setItem("vc-lists", JSON.stringify(lists))
}