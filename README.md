# VC Intelligence

VC Intelligence is a thesis-driven venture capital scouting platform built with Next.js.  
The application enables structured company discovery, live website enrichment, and explainable thesis-based evaluation.

---

# Overview

This platform centralizes the venture sourcing workflow:

Discover → Enrich → Evaluate → Save → Export

It is designed to simulate how modern VC firms analyze and manage investment opportunities.

---

# Features

## Dashboard
- Overview interface
- Navigation into sourcing workflow

## Company Discovery
- Real companies with live websites
- Search functionality
- Interactive company profiles

## Company Profile
- Company overview (founded, funding, employees, description)
- Website link
- Investment notes (persistent)
- Save to investment lists
- Live website enrichment
- Thesis match scoring

## Live Enrichment
- Server-side website fetching
- Text extraction
- Keyword detection
- Signal identification
- Cached results to avoid repeated requests

## Thesis Match Engine
- Keyword-based alignment with defined thesis
- Stage alignment
- Score capped at 100
- Fully explainable logic

## Investment Lists
- Create lists
- Delete lists
- Add and remove companies
- Export as JSON
- Export as CSV
- Persistent storage

## Saved Searches
- Save custom queries
- Delete saved queries
- Persistent storage

---

# Architecture

Frontend:
- Next.js (App Router)
- React Client Components
- Tailwind CSS

Backend:
- Next.js API Routes
- Server-side enrichment logic

Data Flow:
Companies → Profile → Enrich API → Website Fetch → Extract → Score → Render → Cache

---

# Local Development

Clone the repository:

git clone <repository-url>  
cd vc-intelligence  

Install dependencies:

npm install  

Run development server:

npm run dev  

Open:

http://localhost:3000

---

# Deployment

The application is deployed using Vercel with automatic Next.js configuration.

---

# Future Improvements

- LLM-powered summarization
- Database integration
- Authentication
- Advanced analytics dashboard
- Multi-user support
