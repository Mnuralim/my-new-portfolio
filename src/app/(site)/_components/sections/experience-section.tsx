import { getExperiences } from "@/lib/data";
import Reveal from "@/app/_components/reveal";

export default async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <section id="experience" className="px-4 sm:px-8 py-16 sm:py-24">
      <h2 className="section-label">Experience</h2>

      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <Reveal key={`${exp.period}-${exp.role}`} delay={i * 0.06}>
            <article
              className="grid grid-cols-1 sm:grid-cols-[150px_1fr] lg:grid-cols-[180px_1fr_1fr] gap-x-8 gap-y-2 py-7"
              style={i > 0 ? { borderTop: "1px solid var(--c-border)" } : undefined}
            >
              <div className="font-mono text-meta-sm pt-1" style={{ color: "var(--c-muted)" }}>
                {exp.period}
              </div>
              <div>
                <h3 className="font-semibold text-[1.25rem]" style={{ color: "var(--c-text)" }}>
                  {exp.role}
                </h3>
                <div style={{ color: "var(--c-muted)" }}>
                  {exp.company}
                  {exp.type && <span style={{ color: "var(--c-muted3)" }}>, {exp.type}</span>}
                </div>
              </div>
              <div className="sm:col-start-2 lg:col-start-auto">
                <p className="leading-[1.6]" style={{ color: "var(--c-muted)" }}>
                  {exp.description}
                </p>
                {exp.tags.length > 0 && (
                  <div className="font-mono text-meta-sm mt-3" style={{ color: "var(--c-muted3)" }}>
                    {exp.tags.join(", ")}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
