"use client"

import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  url: string
  description?: string
  author?: string
  className?: string
}

export function ProjectCard({ title, url, description, author, className = "" }: ProjectCardProps) {
  // Clean URL for Thum.io (remove protocol if present)
  const cleanUrl = url.replace(/^https?:\/\//, "")
  const thumUrl = `https://image.thum.io/get/width/800/crop/600/noanimate/${cleanUrl}`

  const handleVisitProject = () => {
    const fullUrl = url.startsWith("http") ? url : `https://${url}`
    window.open(fullUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white ${className}`}>
      <CardContent className="p-0">
        {/* Screenshot Container */}
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100">
            <Image
              src={thumUrl || "/placeholder.svg"}
              alt={`Screenshot of ${title}`}
              width={800}
              height={600}
              className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback to placeholder if Thum.io fails
                const target = e.target as HTMLImageElement
                target.src = `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(title)}`
              }}
            />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-t-lg" />

          {/* Visit Button Overlay */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              onClick={handleVisitProject}
              className="bg-white/90 text-gray-900 hover:bg-white shadow-lg backdrop-blur-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {title}
            </h3>
            {author && <p className="text-sm text-gray-500">by {author}</p>}
          </div>

          {/* Description */}
          {description && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{description}</p>}

          {/* URL Display */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 truncate">{cleanUrl}</p>
            </div>

            {/* Visit Link */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVisitProject}
              className="ml-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Visit Site</span>
              <span className="sm:hidden">Visit</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
