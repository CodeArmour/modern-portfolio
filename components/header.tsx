'use client'

import { navLinks } from '@/lib/data'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { useActiveSection } from './context/active-section-provider'
import { Icons } from './icons'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSection()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-5 z-20 my-5 sm:top-10 sm:my-10"
    >
      {/* Mobile Navbar */}
      <div className="sm:hidden flex items-center gap-2 justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="bg-background/80 backdrop-blur-sm"
            >
              Menu <Icons.chevronDown className="ml-2 size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-md self-start font-medium">
                Navigation
              </DialogTitle>
            </DialogHeader>
            <nav>
              <ul>
                {navLinks.map((data) => (
                  <li
                    key={data.name}
                    onClick={() => setIsOpen(false)}
                    className="border-muted-foreground/10 py-3 text-sm [&:not(:last-child)]:border-b"
                  >
                    <Link className="block" href={data.href}>
                      {data.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </DialogContent>
        </Dialog>
        {/* Tablet/Desktop Navbar */}
        <ThemeToggle className="bg-background/80 backdrop-blur-sm" />
      </div>
      {/* Desktop Navbar */}
      <div className="hidden sm:block">
        <nav className="bg-background/80 items-center gap-2 text-muted-foreground text-sm flex rounded-full border px-2 py-3 backdrop-blur-sm">
          <ul className="flex gap-5">
            {navLinks.map((data) => (
              <li key={data.name}>
                <Link
                  href={data.href}
                  className="hover:text-foreground relative px-4 py-2 transition-colors"
                  onClick={() => {
                    setActiveSection(data.name)
                    setTimeOfLastClick(Date.now())
                  }}
                >
                  {data.name}
                  {data.name === activeSection && (
                    <motion.span
                      className="bg-muted absolute inset-0 -z-10 rounded-full"
                      layoutId="activeSection"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}