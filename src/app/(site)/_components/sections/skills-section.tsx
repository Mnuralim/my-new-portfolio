import { getSkills } from "@/lib/data";
import Reveal from "@/app/_components/reveal";

export default async function SkillsSection() {
  const skills = await getSkills();
  // group by category, keeping the admin's order
  const groups = new Map<string, typeof skills>();
  for (const s of skills) groups.set(s.category, [...(groups.get(s.category) ?? []), s]);

  return (
    <section id="skills" className="px-4 sm:px-8 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-10 lg:gap-12">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="section-label !mb-0">Skills</h2>
          <p className="mt-4 max-w-[30ch] leading-[1.6]" style={{ color: "var(--c-muted)" }}>
            Satu orang yang pegang kode dan kabelnya.
          </p>
        </Reveal>

        <div className="flex flex-col gap-12">
          {[...groups].map(([category, items], i) => (
            <Reveal key={category} delay={i * 0.06}>
              <h3 className="text-[0.95rem] font-medium mb-3" style={{ color: "var(--c-muted)" }}>
                {category}
              </h3>
              <p
                className="font-medium text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.35] tracking-[-0.02em]"
                style={{ color: "var(--c-text)" }}
              >
                {items.map((s) => s.name).join(", ")}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
