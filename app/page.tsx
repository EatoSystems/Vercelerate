"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  ExternalLink,
  Github,
  FileText,
  Mail,
  Zap,
  Rocket,
  Copy,
  Check,
  Upload,
  Heart,
  Trophy,
  Star,
  Award,
  Target,
} from "lucide-react"
import Link from "next/link"

interface BuilderData {
  mission: string
  framework: string
  uiComponents: string
  technologies: string[]
  features: string[]
  experienceIdeas: string
  projectName: string
  liveUrl: string
  joinTeam: boolean
}

interface SubmittedProject {
  id: string
  name: string
  author: string
  url: string
  screenshot?: string | null
  score: number
  submittedAt: Date
  technologies: string[]
  features: string[]
  joinTeam: boolean
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [submittedProjects, setSubmittedProjects] = useState<SubmittedProject[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedScreenshots, setUploadedScreenshots] = useState<{ [key: string]: string }>({})

  const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedScreenshots((prev) => ({
          ...prev,
          [builderData.projectName || "temp"]: result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "v021") {
      setIsLoggedIn(true)
      setLoginError("")
    } else {
      setLoginError("Incorrect password. Please try again.")
    }
  }

  const [builderData, setBuilderData] = useState<BuilderData>({
    mission: "",
    framework: "",
    uiComponents: "",
    technologies: [],
    features: [],
    experienceIdeas: "",
    projectName: "",
    liveUrl: "",
    joinTeam: false,
  })

  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [currentStep, setCurrentStep] = useState("step-1")
  const [copied, setCopied] = useState(false)
  const builderRef = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)

  const frameworks = ["Next.js", "React", "Vue.js", "Svelte", "Nuxt.js", "SvelteKit"]
  const uiOptions = ["shadcn/ui", "Tailwind UI", "Headless UI", "Chakra UI", "Material UI", "Ant Design"]
  const techOptions = [
    "TypeScript",
    "JavaScript",
    "Prisma",
    "Supabase",
    "Vercel KV",
    "Edge Functions",
    "Server Actions",
  ]
  const featureOptions = [
    "Gamification",
    "Interactive Forms",
    "Preview Panel",
    "Animations",
    "Dark Mode",
    "Mobile First",
  ]

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToShowcase = () => {
    showcaseRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleTechnologyChange = (tech: string, checked: boolean) => {
    if (checked) {
      setBuilderData((prev) => ({ ...prev, technologies: [...prev.technologies, tech] }))
    } else {
      setBuilderData((prev) => ({ ...prev, technologies: prev.technologies.filter((t) => t !== tech) }))
    }
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setBuilderData((prev) => ({ ...prev, features: [...prev.features, feature] }))
    } else {
      setBuilderData((prev) => ({ ...prev, features: prev.features.filter((f) => f !== feature) }))
    }
  }

  const generatePrompt = () => {
    const prompt = `Create a modern, gamified learning platform called "Vercelerate" using ${builderData.framework} and ${builderData.uiComponents}. 

Mission: ${builderData.mission}

Key Technologies: ${builderData.technologies.join(", ")}
Features to Include: ${builderData.features.join(", ")}
User Experience Ideas: ${builderData.experienceIdeas}

Design Requirements:
- Clean, minimalist white background design
- Responsive layout with Tailwind CSS
- Interactive elements and smooth animations
- Modern typography and ample whitespace
- Mobile-first approach

The platform should help users learn web development by building projects, with gamification elements to keep them engaged. Include sections for tutorials, project showcase, and community features.`

    setGeneratedPrompt(prompt)
    setCurrentStep("step-4")
  }

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openInV0 = () => {
    const encodedPrompt = encodeURIComponent(generatedPrompt)
    window.open(`https://v0.dev?prompt=${encodedPrompt}`, "_blank")
  }

  // Much more challenging scoring system
  const calculateProjectScore = (project: Omit<SubmittedProject, "id" | "score" | "submittedAt">) => {
    let score = 0

    // Base score for submission (reduced from 20 to 10)
    score += 10

    // URL quality assessment (more strict)
    const url = project.url.toLowerCase()
    if (url.includes("https://")) {
      score += 3 // Basic security
    }

    // Vercel deployment bonus (shows they used the recommended platform)
    if (url.includes(".vercel.app")) {
      score += 8
    } else if (url.includes("netlify") || url.includes("github.io")) {
      score += 5 // Other platforms get less
    } else if (url.includes(".") && !url.includes("localhost")) {
      score += 12 // Custom domain shows more effort
    }

    // Technology diversity (much more strict)
    const techCount = project.technologies.length
    if (techCount >= 6) score += 15
    else if (techCount >= 4) score += 10
    else if (techCount >= 2) score += 5
    else score += 0 // No bonus for minimal tech

    // Feature richness (more demanding)
    const featureCount = project.features.length
    if (featureCount >= 6) score += 12
    else if (featureCount >= 4) score += 8
    else if (featureCount >= 2) score += 4
    else score += 0

    // Team application bonus (reduced)
    if (project.joinTeam) score += 5

    // Innovation/quality simulation (much more realistic distribution)
    // Most projects should be average, few should be exceptional
    const qualityRoll = Math.random()
    let qualityBonus = 0

    if (qualityRoll < 0.05) {
      // 5% chance - exceptional
      qualityBonus = 25
    } else if (qualityRoll < 0.15) {
      // 10% chance - great
      qualityBonus = 18
    } else if (qualityRoll < 0.35) {
      // 20% chance - good
      qualityBonus = 12
    } else if (qualityRoll < 0.65) {
      // 30% chance - decent
      qualityBonus = 8
    } else {
      // 35% chance - basic
      qualityBonus = 3
    }

    score += qualityBonus

    // Penalty system for likely low-effort submissions
    if (
      project.name.toLowerCase().includes("test") ||
      project.name.toLowerCase().includes("untitled") ||
      project.name.length < 5
    ) {
      score -= 8 // Penalty for generic names
    }

    if (url.includes("localhost") || url.includes("127.0.0.1")) {
      score -= 15 // Major penalty for local URLs
    }

    // Final score should typically range from 25-85, with rare 90+ scores
    return Math.min(Math.max(score, 15), 95)
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-100"
    if (score >= 75) return "text-blue-600 bg-blue-100"
    if (score >= 65) return "text-yellow-600 bg-yellow-100"
    if (score >= 50) return "text-orange-600 bg-orange-100"
    return "text-red-600 bg-red-100"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 85) return { icon: Trophy, label: "Legendary", color: "text-yellow-600" }
    if (score >= 75) return { icon: Award, label: "Excellent", color: "text-green-600" }
    if (score >= 65) return { icon: Star, label: "Great", color: "text-blue-600" }
    if (score >= 50) return { icon: Target, label: "Good", color: "text-purple-600" }
    return { icon: Zap, label: "Learning", color: "text-gray-600" }
  }

  const handleProjectSubmission = async () => {
    if (!builderData.projectName || !builderData.liveUrl) return

    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newProject: SubmittedProject = {
      id: Date.now().toString(),
      name: builderData.projectName,
      author: "Anonymous Builder", // In real app, this would come from auth
      url: builderData.liveUrl,
      screenshot: uploadedScreenshots[builderData.projectName] || null,
      score: calculateProjectScore({
        name: builderData.projectName,
        author: "Anonymous Builder",
        url: builderData.liveUrl,
        technologies: builderData.technologies,
        features: builderData.features,
        joinTeam: builderData.joinTeam,
      }),
      submittedAt: new Date(),
      technologies: builderData.technologies,
      features: builderData.features,
      joinTeam: builderData.joinTeam,
    }

    setSubmittedProjects((prev) => [newProject, ...prev])
    setIsSubmitting(false)

    // Reset form
    setBuilderData((prev) => ({
      ...prev,
      projectName: "",
      liveUrl: "",
      joinTeam: false,
    }))

    // Scroll to showcase to see the new project
    setTimeout(() => {
      scrollToShowcase()
    }, 500)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-md font-bold">
                  V
                </div>
                <span className="font-bold text-2xl">Vercelerate</span>
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Enter the access code to continue</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Access Code</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter access code"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-center"
                  />
                </div>
                {loginError && <p className="text-sm text-red-600 text-center">{loginError}</p>}
                <Button type="submit" className="w-full">
                  Access Platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <div className="text-xs text-muted-foreground text-center">
                Hint: The code is related to our mission name
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-md font-bold text-sm">
              V
            </div>
            <span className="font-bold text-xl">Vercelerate</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#" className="text-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="#how-it-works" className="text-foreground/60 hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#showcase" className="text-foreground/60 hover:text-foreground transition-colors">
              Showcase ({submittedProjects.length})
            </Link>
            <Button size="sm" onClick={scrollToBuilder}>
              Start Building
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto px-4 py-24 md:py-32 relative overflow-hidden">
          {/* Abstract Background Shape */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto relative">
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Interactive Learning Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">Vercelerate</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">v0 to One – Learn by Building.</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Build the future by building Vercelerate. Learn v0.dev and Vercel through creation.
            </p>
            <Button size="lg" className="text-base px-8 mt-8" onClick={scrollToBuilder}>
              Start Building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-6 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">What is Vercelerate?</h2>
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Vercelerate is a gamified learning and building platform where developers don't just learn — they
                    launch. In your first mission, you'll build your own version of Vercelerate: a platform designed to
                    teach, inspire, and showcase how creators can use v0.dev and Vercel to bring powerful web
                    experiences to life.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    This isn't just another project. It's your opportunity to shape a movement, share your vision, and
                    potentially join the team shaping the future of digital creation.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">Learn by Building</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Vercelerate isn't just another tutorial platform. It's a hands-on experience where you learn
                      v0.dev and Vercel by building real projects. Your first mission? Create your own version of
                      Vercelerate itself.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">From Idea to Deployment</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Master the complete development cycle: design with v0.dev's AI-powered components, deploy
                      instantly with Vercel, and share your creation with the world. Every step is guided, gamified, and
                      designed to build real skills.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">AI-Powered Design</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Rocket className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Instant Deployment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium">Gamified Learning</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="font-medium">Community Driven</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights Grid */}
              <div className="grid md:grid-cols-4 gap-8 mb-16">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold">Hands-on Missions</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn through building real projects, not just watching tutorials
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold">Instant Design + Deployment</h4>
                  <p className="text-sm text-muted-foreground">
                    From prompt to live site in minutes with v0.dev and Vercel
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold">Community-Powered Showcase</h4>
                  <p className="text-sm text-muted-foreground">
                    Share your builds and get inspired by others' creations
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold">Learn by Shipping</h4>
                  <p className="text-sm text-muted-foreground">
                    Build portfolio-worthy projects while mastering new skills
                  </p>
                </div>
              </div>

              {/* Mission Explanation */}
              <div className="bg-white border rounded-2xl p-8 shadow-sm">
                <div className="text-center space-y-4 mb-8">
                  <h3 className="text-2xl font-semibold">Your Mission: v0 to One</h3>
                  <p className="text-muted-foreground">
                    Build your own version of Vercelerate and join the next generation of builders
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">1</span>
                    </div>
                    <h4 className="font-semibold">Define Your Vision</h4>
                    <p className="text-sm text-muted-foreground">
                      Start with your unique mission. How will your version help developers learn and grow?
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">2</span>
                    </div>
                    <h4 className="font-semibold">Build & Deploy</h4>
                    <p className="text-sm text-muted-foreground">
                      Use our guided builder to create your platform with v0.dev and deploy it instantly with Vercel.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-lg">3</span>
                    </div>
                    <h4 className="font-semibold">Join the Movement</h4>
                    <p className="text-sm text-muted-foreground">
                      Share your creation, get scored, and the best builders may be invited to join our team.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Ready to Build the Future?</h3>
                  <p className="text-muted-foreground">
                    Join thousands of developers learning by building. Your journey from v0 to One starts here.
                  </p>
                  <Button size="lg" onClick={scrollToBuilder} className="mt-6">
                    Start Your Mission
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Step Interactive Builder */}
        <section id="how-it-works" ref={builderRef} className="bg-gray-50 py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Build Your Vision</h2>
              <p className="text-lg text-muted-foreground">Follow these steps to create your own Vercelerate</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Accordion type="single" value={currentStep} onValueChange={setCurrentStep} className="space-y-4">
                {/* Step 1: Define the Mission */}
                <AccordionItem value="step-1" className="border rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                        ✅
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">Step 1: Define the Mission</h3>
                        <p className="text-sm text-muted-foreground">Start With Why</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Start With Why</h4>
                        <p className="text-lg text-muted-foreground mb-4">
                          What will your version of Vercelerate achieve?
                        </p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Vercelerate is a launchpad for the next generation of developers. Your version will help
                          others learn to build world-class projects using v0.dev and Vercel. Begin by defining your
                          mission.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="mission" className="text-base font-medium">
                            📝 Your Mission Statement:
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground text-sm">
                              "I want to create a version of Vercelerate that…"
                            </span>
                            <Textarea
                              id="mission"
                              placeholder=""
                              value={builderData.mission}
                              onChange={(e) => setBuilderData((prev) => ({ ...prev, mission: e.target.value }))}
                              className="min-h-[120px] pt-8"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="additionalIdeas" className="text-base font-medium">
                            💡 Optional: Additional Ideas
                          </Label>
                          <p className="text-sm text-muted-foreground mb-2">
                            What else should your version offer? Think competitions, community features, or unique
                            mechanics.
                          </p>
                          <Textarea
                            id="additionalIdeas"
                            placeholder="e.g., Weekly coding challenges, peer review system, AI-powered project suggestions..."
                            value={builderData.experienceIdeas}
                            onChange={(e) => setBuilderData((prev) => ({ ...prev, experienceIdeas: e.target.value }))}
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={() => setCurrentStep("step-2")}
                        disabled={!builderData.mission.trim()}
                        className="w-full sm:w-auto"
                      >
                        Continue to Step 2
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Step 2: Design the Learning Engine */}
                <AccordionItem value="step-2" className="border rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full font-semibold text-sm">
                        ✅
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">Step 2: Design the Learning Engine</h3>
                        <p className="text-sm text-muted-foreground">Map out how your version will teach</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <p className="text-lg font-medium mb-2">
                          "Vercelerate isn't just a platform — it's a launchpad for the next generation of builders."
                        </p>
                        <p className="text-muted-foreground">Map out how your version will teach v0.dev and Vercel.</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-800">
                          Choose the learning mechanics and topics you'll use to teach users how to build, deploy, and
                          scale. Make it fun, educational, and powerful.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-base font-medium mb-3 block">🧠 Learning Formats (choose any):</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              "Missions / Challenges",
                              "In-browser builds",
                              "AI build coach",
                              "Tooltips & explainers",
                              "Short videos",
                              "Gamified scoring",
                              "Community mentors",
                              "Unlockable levels",
                            ].map((format) => (
                              <div key={format} className="flex items-center space-x-2">
                                <Checkbox
                                  id={format}
                                  checked={builderData.features.includes(format)}
                                  onCheckedChange={(checked) => handleFeatureChange(format, checked as boolean)}
                                />
                                <Label htmlFor={format} className="text-sm">
                                  {format}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-base font-medium mb-3 block">📚 Topics You'll Teach:</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              "Prompt writing with v0.dev",
                              "Deploying with Vercel",
                              "Working with frameworks (Next.js, etc.)",
                              "Connecting to databases",
                              "Using edge functions",
                              "Scaling apps",
                              "Git & versioning",
                              "UI/UX principles",
                            ].map((topic) => (
                              <div key={topic} className="flex items-center space-x-2">
                                <Checkbox
                                  id={topic}
                                  checked={builderData.technologies.includes(topic)}
                                  onCheckedChange={(checked) => handleTechnologyChange(topic, checked as boolean)}
                                />
                                <Label htmlFor={topic} className="text-sm">
                                  {topic}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-base font-medium">📝 Explain How Your Version Will Teach</Label>
                          <p className="text-sm text-muted-foreground mb-2">
                            Example: "Each mission introduces a new part of the stack: start with a UI, deploy it, scale
                            it. The user learns by building and unlocking."
                          </p>
                          <Textarea
                            placeholder="Describe your teaching approach and learning flow..."
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-base font-medium">💡 Optional: Add Your Own Learning Ideas</Label>
                          <Textarea
                            placeholder="Any unique teaching methods or innovative approaches you want to include..."
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={() => setCurrentStep("step-3")}
                        disabled={builderData.features.length === 0 && builderData.technologies.length === 0}
                        className="w-full sm:w-auto"
                      >
                        Continue to Step 3
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Step 3: Design the Experience */}
                <AccordionItem value="step-3" className="border rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full font-semibold text-sm">
                        ✅
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">Step 3: Design the Experience</h3>
                        <p className="text-sm text-muted-foreground">Make It Addictive</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Make It Addictive</h4>
                        <p className="text-muted-foreground">How will users feel? What will keep them coming back?</p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-800">
                          Define the interactions, visuals, and gameplay mechanics that make your version fun,
                          intuitive, and sticky.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-base font-medium mb-3 block">🎮 Features to Include:</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              "Project Generator",
                              "Live Preview",
                              "Gamified Feedback",
                              "Leaderboard",
                              "Unlockable badges / ranks",
                              '"Fork this build" option',
                              "Showcase Gallery",
                              "Submit to Earn a Spot on the Team",
                            ].map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`experience-${feature}`}
                                  defaultChecked={["Project Generator", "Live Preview", "Showcase Gallery"].includes(
                                    feature,
                                  )}
                                />
                                <Label htmlFor={`experience-${feature}`} className="text-sm">
                                  {feature}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-base font-medium mb-3 block">📱 Design Choices:</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              "Mobile-first",
                              "Clean white UI (like Vercel.com)",
                              "Simple typography & dark-light toggle",
                              "Modular cards, easy sharing",
                            ].map((choice) => (
                              <div key={choice} className="flex items-center space-x-2">
                                <Checkbox id={`design-${choice}`} defaultChecked={true} />
                                <Label htmlFor={`design-${choice}`} className="text-sm">
                                  {choice}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-base font-medium">📝 Describe Your User Experience:</Label>
                          <p className="text-sm text-muted-foreground mb-2">
                            What happens from the time they land to the moment they ship?
                          </p>
                          <Textarea
                            placeholder="Walk through the user journey step by step..."
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-base font-medium">💡 Optional: Add Your Own Feature Ideas</Label>
                          <Textarea
                            placeholder="Any unique features or interactions you want to include..."
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>

                      <Button onClick={generatePrompt} className="w-full sm:w-auto">
                        Generate Your Prompt
                        <Zap className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Step 4: Generate the Prompt */}
                <AccordionItem value="step-4" className="border rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full font-semibold text-sm">
                        ✅
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">Step 4: Generate the Prompt</h3>
                        <p className="text-sm text-muted-foreground">Build with v0.dev</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Build with v0.dev</h4>
                        <p className="text-muted-foreground">Generate your project based on your vision.</p>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-orange-800">
                          Here, we generate your prompt for v0.dev based on your inputs. This prompt will create your
                          own version of Vercelerate.
                        </p>
                      </div>

                      {generatedPrompt && (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-base font-medium mb-2 block">
                              🧾 Auto-filled prompt preview (editable)
                            </Label>
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-sm">Generated v0.dev Prompt</span>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={copyPrompt}
                                    className="text-gray-400 hover:text-white"
                                  >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    <span className="ml-1 text-xs">Copy</span>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                    <span className="text-xs">Edit</span>
                                  </Button>
                                </div>
                              </div>
                              <Textarea
                                value={generatedPrompt}
                                onChange={(e) => setGeneratedPrompt(e.target.value)}
                                className="bg-transparent border-none text-gray-100 font-mono text-sm min-h-[200px] resize-none focus:ring-0"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-base font-medium mb-2 block">
                              📝 Edit or refine your prompt if needed
                            </Label>
                            <p className="text-sm text-muted-foreground mb-4">
                              Make any adjustments to better match your vision before opening in v0.dev
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button onClick={openInV0} className="flex-1" size="lg">
                              <ExternalLink className="w-4 h-4 mr-2" />🔗 Open in v0.dev
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setCurrentStep("step-5")}
                              className="flex-1 bg-transparent"
                              size="lg"
                            >
                              Continue to Submit
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Step 5: Submit & Showcase */}
                <AccordionItem value="step-5" className="border rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full font-semibold text-sm">
                        ✅
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">Step 5: Submit & Showcase</h3>
                        <p className="text-sm text-muted-foreground">Launch Your Build</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Launch Your Build</h4>
                        <p className="text-muted-foreground">Share your creation. Join the movement.</p>
                      </div>

                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-sm text-red-800">
                          Once you've deployed your version of Vercelerate, submit it to the gallery. Your project will
                          be scored, showcased, and may even earn you a spot on the Vercelerate team.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <Label className="text-base font-medium mb-4 block">🌐 Project Info Form:</Label>
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="projectName">Project Name</Label>
                              <Input
                                id="projectName"
                                placeholder="My Vercelerate Vision"
                                value={builderData.projectName}
                                onChange={(e) => setBuilderData((prev) => ({ ...prev, projectName: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="liveUrl">Live URL</Label>
                              <Input
                                id="liveUrl"
                                placeholder="https://your-project.vercel.app"
                                value={builderData.liveUrl}
                                onChange={(e) => setBuilderData((prev) => ({ ...prev, liveUrl: e.target.value }))}
                              />
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <Label htmlFor="screenshot">Screenshot Upload</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                              <input
                                type="file"
                                id="screenshot"
                                accept="image/*"
                                onChange={handleScreenshotUpload}
                                className="hidden"
                              />
                              <label htmlFor="screenshot" className="cursor-pointer">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                              </label>
                              {uploadedScreenshots[builderData.projectName] && (
                                <div className="mt-4">
                                  <img
                                    src={uploadedScreenshots[builderData.projectName] || "/placeholder.svg"}
                                    alt="Uploaded screenshot"
                                    className="max-w-full h-32 object-cover rounded mx-auto"
                                  />
                                  <p className="text-xs text-green-600 mt-2">Screenshot uploaded successfully!</p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <Label>"Why I Built This" (Optional)</Label>
                            <Textarea
                              placeholder="Share your inspiration, challenges overcome, or what makes your version unique..."
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              id="joinTeam"
                              checked={builderData.joinTeam}
                              onCheckedChange={(checked) => setBuilderData((prev) => ({ ...prev, joinTeam: checked }))}
                            />
                            <Label htmlFor="joinTeam" className="text-sm">
                              ✓ I'd like to be considered for the team
                            </Label>
                          </div>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Trophy className="w-5 h-5 text-yellow-600" />
                            <span className="font-semibold text-yellow-800">🎯 Automatic Scoring Based On:</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-yellow-700">
                            <div>• Innovation</div>
                            <div>• Use of v0 + Vercel</div>
                            <div>• Design polish</div>
                            <div>• Educational value</div>
                            <div>• Custom interactions</div>
                            <div>• Team application (+10 pts)</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-base font-medium">
                            💡 Optional: What else should we showcase from your build?
                          </Label>
                          <Textarea
                            placeholder="Highlight any special features, innovative approaches, or unique elements..."
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        disabled={!builderData.projectName || !builderData.liveUrl || isSubmitting}
                        onClick={handleProjectSubmission}
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Calculating Score & Submitting...
                          </>
                        ) : (
                          <>
                            🟢 Submit to Gallery
                            <Rocket className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Showcase Grid */}
        <section id="showcase" ref={showcaseRef} className="py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">v0 to One Gallery</h2>
              <p className="text-lg text-muted-foreground">
                {submittedProjects.length === 0
                  ? "Community creations will appear here once submitted"
                  : `${submittedProjects.length} community creation${submittedProjects.length === 1 ? "" : "s"} and counting!`}
              </p>
            </div>

            {submittedProjects.length === 0 ? (
              <div className="max-w-2xl mx-auto text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Be the first to submit your Vercelerate creation! Complete the 5-step builder above to get started.
                </p>
                <Button onClick={scrollToBuilder} variant="outline">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {submittedProjects
                    .sort((a, b) => b.score - a.score) // Sort by score descending
                    .map((project, index) => {
                      const scoreBadge = getScoreBadge(project.score)
                      const ScoreIcon = scoreBadge.icon

                      return (
                        <Card key={project.id} className="group hover:shadow-lg transition-all duration-200 relative">
                          {index === 0 && (
                            <div className="absolute -top-3 -right-3 z-10">
                              <Badge className="bg-yellow-500 text-white px-3 py-1">
                                <Trophy className="w-3 h-3 mr-1" />
                                Top Score
                              </Badge>
                            </div>
                          )}
                          <CardContent className="p-0">
                            <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center relative overflow-hidden group">
                              {project.screenshot ? (
                                <img
                                  src={project.screenshot || "/placeholder.svg"}
                                  alt={`Screenshot of ${project.name}`}
                                  className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-t-lg flex items-center justify-center text-white font-bold text-lg p-4 text-center relative">
                                  <div className="absolute inset-0 bg-black/10 rounded-t-lg"></div>
                                  <div className="relative z-10">
                                    <div className="text-2xl mb-2">🚀</div>
                                    <div className="text-sm font-medium">{project.name}</div>
                                  </div>
                                </div>
                              )}

                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-t-lg" />

                              {/* Visit Button Overlay */}
                              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    window.open(
                                      project.url.startsWith("http") ? project.url : `https://${project.url}`,
                                      "_blank",
                                    )
                                  }
                                  className="bg-white/90 text-gray-900 hover:bg-white shadow-lg backdrop-blur-sm"
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  Visit
                                </Button>
                              </div>

                              {/* Score Badge */}
                              <div className="absolute top-3 left-3">
                                <Badge className={`${getScoreColor(project.score)} font-bold`}>
                                  {project.score}/100
                                </Badge>
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-lg">{project.name}</h3>
                                <div className={`flex items-center space-x-1 ${scoreBadge.color}`}>
                                  <ScoreIcon className="w-4 h-4" />
                                  <span className="text-xs font-medium">{scoreBadge.label}</span>
                                </div>
                              </div>
                              <p className="text-muted-foreground text-sm mb-3">by {project.author}</p>

                              {/* Score Progress Bar */}
                              <div className="mb-4">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-muted-foreground">Project Score</span>
                                  <span className="font-medium">{project.score}/100</span>
                                </div>
                                <Progress value={project.score} className="h-2" />
                              </div>

                              {/* Technologies */}
                              {project.technologies.length > 0 && (
                                <div className="mb-3">
                                  <div className="flex flex-wrap gap-1">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                      <Badge key={tech} variant="secondary" className="text-xs">
                                        {tech}
                                      </Badge>
                                    ))}
                                    {project.technologies.length > 3 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{project.technologies.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-muted-foreground">
                                    {project.submittedAt.toLocaleDateString()}
                                  </span>
                                  {project.joinTeam && (
                                    <Badge variant="outline" className="text-xs">
                                      Team Applicant
                                    </Badge>
                                  )}
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                                  onClick={() =>
                                    window.open(
                                      project.url.startsWith("http") ? project.url : `https://${project.url}`,
                                      "_blank",
                                    )
                                  }
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Visit
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>

                <div className="text-center mt-12">
                  <Button variant="outline" size="lg" onClick={scrollToBuilder}>
                    Submit Your Build
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                <FileText className="w-4 h-4 inline mr-1" />
                Docs
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                <Github className="w-4 h-4 inline mr-1" />
                GitHub
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 inline mr-1" />
                Contact
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right flex items-center">
              Built with <Heart className="w-4 h-4 mx-1 text-red-500" /> using v0.dev and Vercel.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
