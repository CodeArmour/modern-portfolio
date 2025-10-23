'use client'

import { useSectionInView } from '@/hooks/use-section-in-view'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Icons } from './icons'
import { Button } from './ui/button'
import { GridPattern } from './ui/grid-pattern'
import { useEffect, useState } from 'react'
import apiClient from '@/lib/apiClient'

interface Profile {
  workAvailability: boolean
  workTitle: string
  aboutMe: string
  description: string
  socialLinks?: {
    github?: string;
    linkedin?: string;
    [key: string]: string | undefined; // flexible for future links
  };
}

export default function HeroSection() {
  const { ref } = useSectionInView('Home')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await apiClient.get(
        `/portfolio/profile/68f3e5970f743004e2c6f2b1`
      )
      setProfile(res.data.profile)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        console.error('❌ API responded with error:', error.response.status, error.response.data)
      } else if (error.request) {
        console.error('❌ No response received from API:', error.request)
      } else {
        console.error('❌ Error setting up request:', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  fetchProfile()
}, [])


  if (loading) {
    return (
      <section
        ref={ref}
        id="home"
        className="flex h-[60vh] items-center justify-center text-gray-500"
      >
        Loading profile...
      </section>
    )
  }

  if (!profile) {
    return (
      <section
        ref={ref}
        id="home"
        className="flex h-[60vh] items-center justify-center text-red-500"
      >
        Failed to load profile data.
      </section>
    )
  }

  // Split aboutMe by comma — example: "developer crafting..., You have..."
  const [intro, callToAction] = profile.aboutMe.split(',')

  return (
    <section
      ref={ref}
      id="home"
      className="relative my-10 mb-60 flex scroll-mt-96 flex-col items-center gap-5 text-center sm:mt-28"
    >
      <GridPattern
        width={80}
        height={120}
        squares={[
          [0, 3],
          [3, 1],
          [2, 0],
          [7, 2],
          [8, 3],
          [2, 4],
          [6, 4],
        ]}
        strokeDasharray={'4'}
        className={cn(
          'absolute inset-0',
          '[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
          'opacity-70'
        )}
      />

      {/* Work Availability */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <Link
          href={siteConfig.links.contactForm}
          className="flex items-center gap-3 rounded border px-3 py-1"
        >
          <span className="relative flex size-2">
            <span
              className={cn(
                'absolute flex size-full animate-ping rounded-full opacity-75',
                profile.workAvailability ? 'bg-green-400' : 'bg-red-500'
              )}
            />
            <span
              className={cn(
                'relative flex size-2 rounded-full',
                profile.workAvailability ? 'bg-green-400' : 'bg-red-500'
              )}
            ></span>
          </span>
          <span className="text-sm">
            {profile.workAvailability ? 'Available for work!' : 'Not available for work'}
          </span>
        </Link>
      </motion.div>

      {/* Work Title */}
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading max-w-3xl text-4xl font-extrabold md:text-5xl"
      >
        I'm a{' '}
        <span className="bg-gradient-to-r from-rose-700 to-pink-600 bg-clip-text text-transparent">
          {profile.workTitle}
        </span>{' '}
        {intro?.trim() || ''}
      </motion.h1>

      {/* About / CTA */}
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground max-w-xl"
      >
        {callToAction?.trim() || ''}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-row gap-2 items-center"
      >
        <Button asChild size="lg">
          <Link href={siteConfig.links.contactForm}>
            Get in touch <Icons.arrowRight className="ml-2 size-4" />
          </Link>
        </Button>

        <Button variant="outline" size="lg" className="hidden sm:flex" asChild>
          <a href={siteConfig.links.cvPdf} download>
            Download CV <Icons.download className="ml-2 size-4" />
          </a>
        </Button>
        {profile.socialLinks?.linkedin && (  
        <Button variant="outline" size="icon" asChild>
          <Link
            href={profile.socialLinks.linkedin}
            aria-label="Linkedin"
            target="_blank"
          >
            <Icons.linkedin className="size-5" />
          </Link>
        </Button>
        )}
        {profile.socialLinks?.github && (  
        <Button variant="outline" size="icon" asChild>
          <Link
            href={profile.socialLinks.github}
            aria-label="Github"
            target="_blank"
          >
            <Icons.github className="size-5" />
          </Link>
        </Button>
        )}
      </motion.div>
    </section>
  )
}