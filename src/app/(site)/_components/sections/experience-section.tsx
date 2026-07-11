import { experiences } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="px-3 pb-20">
      <div className="section-label">02 / EXPERIENCE</div>

      <div className="flex flex-col">
        {experiences.map((exp) => (
          <div
            key={exp.num}
            data-cursor-hover
            className="
              grid grid-cols-1 md:grid-cols-[180px_1fr]
              border-2 border-border -mt-px
              group transition-colors duration-200 hover:border-accent
            "
          >
            <div className="p-8 md:border-r-2 border-b-2 md:border-b-0 border-border flex flex-col gap-2">
              <span className="text-[0.65rem] tracking-widest text-accent">
                {exp.period}
              </span>
              <span className="font-display font-bold text-[0.9rem] leading-tight">
                {exp.company}
              </span>
              <span className="inline-block text-[0.55rem] tracking-widest text-muted border border-border px-2 py-0.5 w-fit mt-1">
                {exp.type}
              </span>
              <span className="font-display font-extrabold text-[3.5rem] text-outline-border leading-none mt-auto opacity-40 self-end">
                {exp.num}
              </span>
            </div>

            <div className="p-8 flex flex-col gap-3">
              <h3 className="font-display font-bold text-[1.1rem] tracking-tight">
                {exp.role}
              </h3>
              <p className="text-[0.75rem] text-muted leading-[1.9]">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="stack-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
