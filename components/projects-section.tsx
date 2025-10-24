"use client";

import { useEffect, useState } from "react";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "./section-heading";
import { Badge } from "./ui/badge";
import apiClient from "@/lib/apiClient";
import { Icons } from "./icons";

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  projectUrl: string;
  githubUrl: string;
  technologies: string[];
  category: string;
  isFeatured: boolean;
  order: number;
}

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * index },
  }),
};

export default function ProjectsSection() {
  const { ref } = useSectionInView("Projects", 0.3);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await apiClient.get("/portfolio/project/public");
        setProjects(res.data.projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId: string) => {
    setActiveProject(activeProject === projectId ? null : projectId);
  };

  if (loading) {
    return (
      <section
        ref={ref}
        id="projects"
        className="flex h-[50vh] items-center justify-center text-gray-500"
      >
        Loading projects...
      </section>
    );
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
    );
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
            onClick={() => handleProjectClick(project._id)}
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

            {/* Hover/Active overlay - shows on hover for desktop, on click for mobile */}
            <div
              className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-4 ${
                activeProject === project._id
                  ? "opacity-100"
                  : "opacity-0 md:group-hover:opacity-100"
              }`}
            >
              {project.projectUrl && project.category != "API/Backend" && (
                <Link
                  href={project.projectUrl}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="w-12 h-12 bg-white text-black rounded-full font-medium transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 flex items-center justify-center group/eye"
                >
                  <Icons.eyeclosed className="size-5 group-hover/eye:hidden" />
                  <Icons.eye className="size-5 hidden group-hover/eye:block" />
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="w-12 h-12 bg-white text-black rounded-full font-medium transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 flex items-center justify-center"
                >
                  <Icons.github className="size-5" />
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
  );
}
