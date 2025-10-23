'use client'
import { useSectionInView } from '@/hooks/use-section-in-view'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Icons } from './icons'
import { Button } from './ui/button'
import { GridPattern } from './ui/grid-pattern'

export default function HeroSection() {
  const { ref } = useSectionInView('Home')

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
          'opacity-70',
        )}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'tween',
          duration: 0.2,
        }}
      >
        <Link
          href={siteConfig.links.contactForm}
          className="flex items-center gap-3 rounded border px-3 py-1"
        >
          <span className="relative flex size-2">
            <span className="absolute flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative flex size-2 rounded-full bg-green-400"></span>
          </span>
          <span className="text-sm">Available for work!</span>
        </Link>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading max-w-3xl text-4xl font-extrabold md:text-5xl"
      >
        I'm a{' '}
        <span className="bg-gradient-to-r from-rose-700 to-pink-600 bg-clip-text text-transparent">
          Professional Full Stack
        </span>{' '}
        developer crafting modern digital experiences.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
        className="text-muted-foreground max-w-xl"
      >
        You have a project in mind? Let's talk about it!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
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
        <Button variant="outline" size="icon" asChild>
          <Link
            href={siteConfig.links.linkedin}
            aria-label="Linkedin"
            target="_blank"
          >
            <Icons.linkedin className="size-5" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href={siteConfig.links.github}
            aria-label="Github"
            target="_blank"
          >
            <Icons.github className="size-5" />
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}