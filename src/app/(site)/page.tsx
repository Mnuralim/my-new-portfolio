import BlogSection from "./_components/sections/blog-section";
import ContactSection from "./_components/sections/contact-section";
import ExperienceSection from "./_components/sections/experience-section";
import HeroSection from "./_components/sections/hero-section";
import ProjectsSection from "./_components/sections/project-section";
import ServicesSection from "./_components/sections/service-section";
import SkillsSection from "./_components/sections/skills-section";
import Footer from "./_components/ui/footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ServicesSection />
        <ContactSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
