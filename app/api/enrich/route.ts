import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      )
    }

    // Simple fetch of website content
    const response = await fetch(url)
    const html = await response.text()

    // Extract basic text (very simple MVP)
    const text = html
      .replace(/<script[^>]*>.*?<\/script>/gi, "")
      .replace(/<style[^>]*>.*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .slice(0, 2000)

    const summary = text.slice(0, 300)

    return NextResponse.json({
      summary,
      keywords: extractKeywords(text),
      signals: deriveSignals(html),
      source: url,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to enrich" },
      { status: 500 }
    )
  }
}

function extractKeywords(text: string) {
  const words = text
    .toLowerCase()
    .split(" ")
    .filter(word => word.length > 6)

  return [...new Set(words)].slice(0, 8)
}

function deriveSignals(html: string) {
  const signals = []

  if (html.includes("careers")) signals.push("Careers page detected")
  if (html.includes("blog")) signals.push("Blog section detected")
  if (html.includes("changelog")) signals.push("Changelog present")

  return signals
}