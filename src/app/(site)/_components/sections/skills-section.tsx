import { getSkills } from "@/lib/data";
import Reveal from "@/app/_components/reveal";

export default async function SkillsSection() {
  const skills = await getSkills();

  return (
    <section
      id="skills"
      className="px-4 sm:px-8 py-16 sm:py-20"
      style={{ borderTop: "1px solid var(--c-divider)" }}
    >
      <h2 className="section-label">02 / Skills</h2>

      <Reveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px rounded-[14px] overflow-hidden">
        <div
          className="contents"
          style={{ background: "var(--c-divider)" }}
        >
          {skills.map((skill) => (
            <div key={skill.name} className="skill-cell px-6 py-[26px]">
              <div
                className="font-mono text-meta-sm tracking-[0.08em] mb-2.5"
                style={{ color: "var(--color-accent)" }}
              >
                {skill.category}
              </div>
              <div
                className="font-sans font-medium text-meta-lg"
                style={{ color: "var(--c-text)" }}
              >
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
