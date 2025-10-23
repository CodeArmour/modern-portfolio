import { Icons } from '@/components/icons'
import {  NavLink, Skill } from './types'

export const navLinks: NavLink[] = [
  {
    name: 'Home',
    href: '#home',
  },
  {
    name: 'About',
    href: '#about',
  },
  {
    name: 'Experience',
    href: '#experience',
  },
  {
    name: 'Projects',
    href: '#projects',
  },
  {
    name: 'Contact',
    href: '#contact',
  },
]

export const skillsData: Skill[] = [
  // { name: 'Sass', icon: <Icons.sass className="size-12" /> },
  { name: 'Tailwind', icon: <Icons.tailwind className="size-12" /> },
  { name: 'JavaScript', icon: <Icons.javascript className="size-12" /> },
  { name: 'TypeScript', icon: <Icons.typescript className="size-12" /> },
  { name: 'React', icon: <Icons.react className="size-12" /> },
  { name: 'NextJS', icon: <Icons.nextjs className="size-12" /> },
  { name: 'NestJS', icon: <Icons.nestjs className="size-12" /> },
  { name: 'NodeJS', icon: <Icons.nodeJs className="size-12" /> },
  { name: 'Prisma', icon: <Icons.prisma className="size-12" /> },
  { name: 'Docker', icon: <Icons.docker className="size-12" /> },
]