'use client'

import { useSectionInView } from '@/hooks/use-section-in-view'
import { siteConfig } from '@/lib/site-config'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeading from './section-heading'
import Skills from './skills'
import { useEffect, useState } from 'react'
import apiClient from '@/lib/apiClient'
import { profile } from 'console'

interface AboutMe {
  description: string
}

export default function AboutSection() {
  const { ref } = useSectionInView('About')
  const [aboutMe, setAboutMe] = useState<AboutMe | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await apiClient.get(
        `/portfolio/profile/68f3e5970f743004e2c6f2b1`
      )
      setAboutMe(res.data.profile)
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

  if (!aboutMe) {
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
  const [intro, callToAction] = aboutMe.description.split('...')

  return (
    <motion.section
      ref={ref}
      id="about"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
    >
      <SectionHeading heading="About Me" />
      <div className="-mt-5 max-w-2xl text-center leading-7">
        <p className="mb-4">
          {intro}
        </p>
        <p>
          {callToAction}{' '}
          <Link
            className="underline-offset-4 hover:underline"
            href={siteConfig.links.contactForm}
          >
            contact
          </Link>{' '}
          me.
        </p>
      </div>
      <Skills />
    </motion.section>
  )
}