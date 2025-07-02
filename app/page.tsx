"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, ExternalLink, Github, FileText, Mail, Zap, Rocket, Copy, Check, Upload, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

export default function HomePage() {
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
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
              Showcase
            </Link>
            <Link href="#submit" className="text-foreground/60 hover:text-foreground transition-colors">
              Submit
            </Link>
            <Button size="sm" onClick={scrollToBuilder}>
              Start Building
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32 relative overflow-hidden">
          {/* Abstract Background Shape */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto relative">
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

        {/* 5-Step Interactive Builder */}
        <section id="how-it-works" ref={builderRef} className="bg-gray-50 py-24">
          <div className="container">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Build Your Vision</h2>
              <p className="text-lg text-muted-foreground">Follow these steps to create your own Vercelerate</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" value={currentStep} onValueChange={setCurrentStep} className="space-y-4">
                {/* Step 1: Understand the Mission */}
                <AccordionItem value="step-1" className="border rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                        1
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">Understand the Mission</h3>
                        <p className="text-sm text-muted-foreground">Define your vision for Vercelerate</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Vercelerate is a gamified learning platform that teaches web development through hands-on
                          building. Your mission is to create your own version that helps developers learn v0.dev and
                          Vercel by creating real projects.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mission">What's your mission? How will your version help developers?</Label>
                        <Textarea
                          id="mission"
                          placeholder="e.g., Create an interactive platform where developers learn by building progressively complex projects, with AI-powered guidance and community collaboration..."
                          value={builderData.mission}
                          onChange={(e) => setBuilderData((prev) => ({ ...prev, mission: e.target.value }))}
                          className="min-h-[120px]"
                        />
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

                {/* Step 2: Learn v0.dev & Vercel */}
                <AccordionItem value="step-2" className="border rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full font-semibold text-sm">
                        2
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">Learn v0.dev & Vercel</h3>
                        <p className="text-sm text-muted-foreground">Choose your tech stack</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-800">
                          v0.dev generates React components from text prompts, while Vercel provides instant deployment
                          and hosting. Choose the technologies that will power your learning platform.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Framework</Label>
                          <Select
                            value={builderData.framework}
                            onValueChange={(value) => setBuilderData((prev) => ({ ...prev, framework: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a framework" />
                            </SelectTrigger>
                            <SelectContent>
                              {frameworks.map((framework) => (
                                <SelectItem key={framework} value={framework}>
                                  {framework}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>UI Components</Label>
                          <Select
                            value={builderData.uiComponents}
                            onValueChange={(value) => setBuilderData((prev) => ({ ...prev, uiComponents: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose UI library" />
                            </SelectTrigger>
                            <SelectContent>
                              {uiOptions.map((ui) => (
                                <SelectItem key={ui} value={ui}>
                                  {ui}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Additional Technologies</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {techOptions.map((tech) => (
                            <div key={tech} className="flex items-center space-x-2">
                              <Checkbox
                                id={tech}
                                checked={builderData.technologies.includes(tech)}
                                onCheckedChange={(checked) => handleTechnologyChange(tech, checked as boolean)}
                              />
                              <Label htmlFor={tech} className="text-sm">
                                {tech}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => setCurrentStep("step-3")}
                        disabled={!builderData.framework || !builderData.uiComponents}
                        className="w-full sm:w-auto"
                      >
                        Continue to Step 3
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Step 3: Define the Experience */}
                <AccordionItem value="step-3" className="border rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full font-semibold text-sm">
                        3
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">Define the Experience</h3>
                        <p className="text-sm text-muted-foreground">Choose features and interactions</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>Key Features</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {featureOptions.map((feature) => (
                            <div key={feature} className="flex items-center space-x-2">
                              <Checkbox
                                id={feature}
                                checked={builderData.features.includes(feature)}
                                onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                              />
                              <Label htmlFor={feature} className="text-sm">
                                {feature}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">User Experience Ideas</Label>
                        <Textarea
                          id="experience"
                          placeholder="Describe the user journey, interactions, and unique features you want to include..."
                          value={builderData.experienceIdeas}
                          onChange={(e) => setBuilderData((prev) => ({ ...prev, experienceIdeas: e.target.value }))}
                          className="min-h-[100px]"
                        />
                      </div>

                      <Button
                        onClick={generatePrompt}
                        disabled={builderData.features.length === 0}
                        className="w-full sm:w-auto"
                      >
                        Generate Your Prompt
                        <Zap className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Step 4: Generate Your Prompt */}
                <AccordionItem value="step-4" className="border rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full font-semibold text-sm">
                        4
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">Generate Your Prompt</h3>
                        <p className="text-sm text-muted-foreground">Review and refine your v0.dev prompt</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      {generatedPrompt && (
                        <>
                          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400 text-sm">Generated v0.dev Prompt</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyPrompt}
                                className="text-gray-400 hover:text-white"
                              >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </Button>
                            </div>
                            <Textarea
                              value={generatedPrompt}
                              onChange={(e) => setGeneratedPrompt(e.target.value)}
                              className="bg-transparent border-none text-gray-100 font-mono text-sm min-h-[200px] resize-none focus:ring-0"
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button onClick={openInV0} className="flex-1">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Open in v0.dev
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setCurrentStep("step-5")}
                              className="flex-1 bg-transparent"
                            >
                              Continue to Showcase
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Step 5: Showcase Your Project */}
                <AccordionItem value="step-5" className="border rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full font-semibold text-sm">
                        5
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">Showcase Your Project</h3>
                        <p className="text-sm text-muted-foreground">Submit your creation to the community</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
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

                      <div className="space-y-2">
                        <Label>Screenshot (Optional)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="joinTeam"
                          checked={builderData.joinTeam}
                          onCheckedChange={(checked) => setBuilderData((prev) => ({ ...prev, joinTeam: checked }))}
                        />
                        <Label htmlFor="joinTeam" className="text-sm">
                          I'm interested in joining the Vercelerate team
                        </Label>
                      </div>

                      <Button className="w-full" disabled={!builderData.projectName || !builderData.liveUrl}>
                        Submit to Showcase
                        <Rocket className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Showcase Grid */}
        <section id="showcase" className="py-24">
          <div className="container">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">v0 to One Gallery</h2>
              <p className="text-lg text-muted-foreground">Community creations and innovations</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Vercelerate Reimagined", author: "Sarah Chen", url: "vercelerate-v2.vercel.app" },
                { name: "DevQuest Platform", author: "Alex Rodriguez", url: "devquest.vercel.app" },
                { name: "BuildSpace Clone", author: "Jamie Kim", url: "buildspace-clone.vercel.app" },
                { name: "CodeCraft Academy", author: "Mike Johnson", url: "codecraft.vercel.app" },
                { name: "WebDev Bootcamp", author: "Lisa Wang", url: "webdev-bootcamp.vercel.app" },
                { name: "FullStack Journey", author: "David Brown", url: "fullstack-journey.vercel.app" },
              ].map((project, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center">
                      <Image
                        src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(project.name)}`}
                        alt={project.name}
                        width={300}
                        height={200}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">by {project.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{project.url}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" onClick={scrollToBuilder}>
                Submit Your Build
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container py-12">
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
