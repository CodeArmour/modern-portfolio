import { Icons } from '@/components/icons'
import { Experience, NavLink, Project, Skill } from './types'

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

export const projectsData: Project[] = [
  {
    video: 'assets/videos/chat-collector-demo.mp4',
    title: 'Chat Collector Pro',
    description:
      'A comprehensive chat collector application built with React and Node.js, featuring real-time collaboration, project tracking, and team management capabilities.',
    technologies: [
      'React.js',
      'Node.js',
      'MongoDB',
      'Socket.io',
      'Material-UI',
    ],
    links: {
      preview: '#',
      github: '#',
      githubApi: '#',
    },
  },
  {
    video: 'assets/videos/magic-bento-demo.mp4',
    title: 'Magic Bento Box',
    description:
      'Magic Bento Box is a platform for creating and sharing magic recipes that can be used in the game.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Express.js',
      'PostgreSQL',
      'Stripe',
    ],
    links: {
      preview: '#',
      github: '#',
      githubApi: '#',
    },
  },
  {
    video: 'assets/videos/magic-bento-demo.mp4',
    title: 'Magic Bento Box',
    description:
      'Magic Bento Box is a platform for creating and sharing magic recipes that can be used in the game.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Express.js',
      'PostgreSQL',
      'Stripe',
    ],
    links: {
      preview: '#',
      github: '#',
      githubApi: '#',
    },
  },
  {
    video: 'assets/videos/magic-bento-demo.mp4',
    title: 'Magic Bento Box',
    description:
      'Magic Bento Box is a platform for creating and sharing magic recipes that can be used in the game.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Express.js',
      'PostgreSQL',
      'Stripe',
    ],
    links: {
      preview: '#',
      github: '#',
      githubApi: '#',
    },
  },
  {
    video: 'assets/videos/magic-bento-demo.mp4',
    title: 'Magic Bento Box',
    description:
      'Magic Bento Box is a platform for creating and sharing magic recipes that can be used in the game.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Express.js',
      'PostgreSQL',
      'Stripe',
    ],
    links: {
      preview: '#',
      github: '#',
      githubApi: '#',
    },
  },
] as const

export const experiencesData: Experience[] = [
  {
    title: 'Software Engineer',
    company: 'CloudTech Ventures, remote',
    description:
      'Currently developing scalable cloud-based applications and microservices. Responsible for architecting solutions, code reviews, and mentoring junior developers in best practices.',
    period: '2023 Jul - present',
    technologies: ['React', 'TypeScript', 'AWS', 'GraphQL', 'Kubernetes'],
  },
  {
    title: 'Backend Developer Intern',
    company: 'DataFlow Systems, remote',
    description:
      'Assisted in developing RESTful APIs and database optimization. Gained experience in agile development methodologies and collaborated with senior developers on complex projects.',
    period: '2023 Jan - 2023 Jul',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Innovations, remote',
    description:
      'Built responsive web applications from concept to deployment. Worked with clients to understand requirements and delivered custom solutions that exceeded expectations.',
    period: '2022 Jul - 2022 Dec',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Junior Software Engineer',
    company: 'TechCorp Solutions, San Francisco CA',
    description:
      'Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality software solutions.',
    period: '2022 Jan - 2022 Jul',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
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