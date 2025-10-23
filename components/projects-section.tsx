'use client'

import { useEffect, useState } from 'react'
import { useSectionInView } from '@/hooks/use-section-in-view'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import SectionHeading from './section-heading'
import { Badge } from './ui/badge'
import apiClient from '@/lib/apiClient'

interface Project {
  _id: string
  title: string
  description: string
  shortDescription: string
  image: string
  projectUrl: string
  githubUrl: string
  technologies: string[]
  category: string
  isFeatured: boolean
  order: number
}

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * index },
  }),
}

export default function ProjectsSection() {
  const { ref } = useSectionInView('Projects', 0.3)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await apiClient.get('/portfolio/project/public')
        setProjects(res.data.projects)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section
        ref={ref}
        id="projects"
        className="flex h-[50vh] items-center justify-center text-gray-500"
      >
        Loading projects...
      </section>
    )
  }

  if (!projects.length) {
    return (
      <section
        ref={ref}
        id="projects"
        className="flex h-[50vh] items-center justify-center text-red-500"
      >
        No project data available.
      </section>
    )
  }

  return (
    <section ref={ref} id="projects" className="my-10 scroll-mt-28 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          heading="My Projects"
          content="Projects I worked on. Each of them containing its own case study."
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            className="relative flex flex-col rounded border overflow-hidden cursor-pointer group"
          >
            {/* Project image */}
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-all duration-300 flex items-center justify-center gap-4 group-hover:opacity-100">
              {project.projectUrl && (
                <Link
                  href={project.projectUrl}
                  target="_blank"
                  className="px-4 py-2 bg-white text-black rounded-md font-medium transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95"
                >
                  View
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="px-4 py-2 bg-white text-black rounded-md font-medium transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95"
                >
                  GitHub
                </Link>
              )}
            </div>

            {/* Project info */}
            <div className="p-4">
              <h3 className="text-xl font-medium">{project.title}</h3>
              <p className="text-muted-foreground mb-4 mt-1">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" size="lg">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}