import { ProjectCard } from "./project-card"

interface Project {
  id: string
  title: string
  url: string
  description?: string
  author?: string
}

interface ProjectShowcaseProps {
  projects: Project[]
  className?: string
}

export function ProjectShowcase({ projects, className = "" }: ProjectShowcaseProps) {
  if (projects.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Yet</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Be the first to submit your project and showcase your creation to the community.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          url={project.url}
          description={project.description}
          author={project.author}
        />
      ))}
    </div>
  )
}
