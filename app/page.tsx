import AboutSection from "@/components/about-section";
import Header from "@/components/header";
import SectionDivider from "@/components/section-divider";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <>
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <Header />
        <HeroSection />
        <AboutSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
      {/* Desktop: Theme Toggle */}
      <ThemeToggle className="bg-background hidden sm:fixed sm:bottom-8 sm:right-8 sm:flex" />
    </>
  );
}
