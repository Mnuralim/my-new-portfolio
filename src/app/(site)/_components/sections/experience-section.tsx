import { getExperiences } from "@/lib/data";
import Reveal from "@/app/_components/reveal";

export default async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <section
      id="experience"
      className="px-4 sm:px-8 py-16 sm:py-20"
      style={{ borderTop: "1px solid var(--c-divider)" }}
    >
      <h2 className="section-label">03 / Experience</h2>

      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <Reveal key={exp.num} delay={i * 0.08}>
            <div
              className="experience-row grid grid-cols-1 md:grid-cols-[200px_1fr] gap-9 py-9 pl-5 -ml-5"
              style={{ borderTop: "1px solid var(--c-divider)" }}
            >
              <div>
                <div
                  className="font-mono text-meta-sm mb-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  {exp.period}
                </div>
                <div className="text-meta-md" style={{ color: "var(--c-muted2)" }}>
                  {exp.company}
                </div>
                <div
                  className="text-meta-xs mt-1"
                  style={{ color: "var(--c-muted3)" }}
                >
                  {exp.type}
                </div>
              </div>

              <div>
                <h3
                  className="font-sans font-bold text-[1.3rem] mb-3"
                  style={{ color: "var(--c-text)" }}
                >
                  {exp.role}
                </h3>
                <p
                  className="text-meta-lg leading-[1.65] mb-[18px]"
                  style={{ color: "var(--c-muted)" }}
                >
                  {exp.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="stack-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
