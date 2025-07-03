"use client"

import { ProjectShowcase } from "@/components/project-showcase"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const sampleProjects = [
  {
    id: "1",
    title: "Vercelerate Reimagined",
    url: "https://vercel.com",
    description:
      "A modern take on the learning platform with enhanced gamification features and AI-powered project suggestions.",
    author: "Sarah Chen",
  },
  {
    id: "2",
    title: "DevQuest Platform",
    url: "https://github.com",
    description: "Interactive coding challenges with real-time feedback and community-driven content.",
    author: "Alex Rodriguez",
  },
  {
    id: "3",
    title: "BuildSpace Clone",
    url: "https://nextjs.org",
    description: "A comprehensive learning environment for web3 developers with integrated deployment tools.",
    author: "Jamie Kim",
  },
  {
    id: "4",
    title: "CodeCraft Academy",
    url: "https://tailwindcss.com",
    description: "Step-by-step tutorials for building full-stack applications with modern frameworks.",
    author: "Mike Johnson",
  },
  {
    id: "5",
    title: "WebDev Bootcamp",
    url: "https://react.dev",
    description: "Intensive learning program with mentorship and project-based curriculum.",
    author: "Lisa Wang",
  },
  {
    id: "6",
    title: "FullStack Journey",
    url: "https://supabase.com",
    description: "End-to-end development course covering frontend, backend, and deployment strategies.",
    author: "David Brown",
  },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Project Showcase Demo</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Responsive project cards with dynamic screenshots powered by Thum.io
            </p>
          </div>
        </div>

        {/* Project Showcase */}
        <ProjectShowcase projects={sampleProjects} />

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Features Demonstrated</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Dynamic Screenshots</h3>
              <p className="text-gray-600 text-sm">
                Each card automatically generates a screenshot using Thum.io API with the project's live URL.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Responsive Design</h3>
              <p className="text-gray-600 text-sm">
                Cards adapt seamlessly from mobile to desktop with optimized layouts and hover effects.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Interactive Elements</h3>
              <p className="text-gray-600 text-sm">
                Hover effects, clickable links, and smooth transitions enhance the user experience.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Fallback Handling</h3>
              <p className="text-gray-600 text-sm">
                Graceful fallback to placeholder images if screenshot generation fails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
