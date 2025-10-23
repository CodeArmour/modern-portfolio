'use client'

import { useEffect, useState } from 'react'
import { useSectionInView } from '@/hooks/use-section-in-view'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Icons } from './icons'
import SectionHeading from './section-heading'
import { Badge } from './ui/badge'
import apiClient from '@/lib/apiClient'

interface Experience {
  _id: string
  company: string
  position: string
  description: string
  location: string
  employmentType: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  technologies: string[]
  order: number
}

export default function ExperienceSection() {
  const { ref, inView } = useSectionInView('Experience', 0.3)
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await apiClient.get(
          '/portfolio/experience/68f3e5970f743004e2c6f2b1'
        )
        setExperiences(res.data.experiences)
      } catch (error) {
        console.error('Failed to fetch experiences:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  if (loading) {
    return (
      <section
        ref={ref}
        id="experience"
        className="flex h-[50vh] items-center justify-center text-gray-500"
      >
        Loading experiences...
      </section>
    )
  }

  if (!experiences.length) {
    return (
      <section
        ref={ref}
        id="experience"
        className="flex h-[50vh] items-center justify-center text-red-500"
      >
        No experience data available.
      </section>
    )
  }

  return (
    <section ref={ref} id="experience" className="my-10 scroll-mt-28 md:mb-20">
      <SectionHeading
        heading="My Experience"
        content="Professional experience that I have accumulated over several years."
      />

      <div className="relative max-w-screen-md">
        {experiences.map((exp) => (
          <div key={exp._id} className="relative pl-8 [&:not(:last-child)]:pb-10">
            {/* Vertical line */}
            <div className="bg-muted absolute left-0 top-2.5 h-full w-[2px]">
              <div className="border-primary bg-background absolute left-[-5px] top-0 size-3 rounded-full border-2" />
            </div>

            {/* Experience card */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.175 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border">
                  <Icons.building className="size-5" />
                </div>
                <span className="text-lg font-semibold">{exp.company}, {exp.location}</span>
              </div>

              <div>
                <h3 className="text-xl font-medium">{exp.position}</h3>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <Icons.calendar className="size-4" />
                  <span>
                    {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}{' '}
                    -{' '}
                    {exp.isCurrent
                      ? 'Present'
                      : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      : ''}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" size="lg">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
