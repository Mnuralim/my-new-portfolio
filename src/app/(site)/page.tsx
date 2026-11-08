import BlogSection from "./_components/sections/blog-section";
import ContactSection from "./_components/sections/contact-section";
import CredentialsSection from "./_components/sections/credentials-section";
import ExperienceSection from "./_components/sections/experience-section";
import HeroSection from "./_components/sections/hero-section";
import ProjectsSection from "./_components/sections/project-section";
import ServicesSection from "./_components/sections/service-section";
import SkillsSection from "./_components/sections/skills-section";
import Footer from "./_components/ui/footer";
import { getContactLinks } from "@/lib/data";

export default async function Home() {
  const links = await getContactLinks();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://izzy.my.id/#person",
        name: "Muhamad Nur Fatahil Alim",
        alternateName: "Izzy",
        url: "https://izzy.my.id",
        image: "https://izzy.my.id/07-izzy-susun-2x2.png",
        jobTitle: "IT Engineer & Full Stack Developer",
        address: { "@type": "PostalAddress", addressLocality: "Kolaka", addressCountry: "ID" },
        sameAs: links.map((l) => l.href).filter((h) => h.startsWith("http")),
      },
      {
        "@type": "WebSite",
        "@id": "https://izzy.my.id/#website",
        url: "https://izzy.my.id",
        name: "Izzy",
        inLanguage: "id-ID",
        publisher: { "@id": "https://izzy.my.id/#person" },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <CredentialsSection />
        <ServicesSection />
        <ContactSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
