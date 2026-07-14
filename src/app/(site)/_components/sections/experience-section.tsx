import { getExperiences } from "@/lib/data";

export default async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <section id="experience" className="px-3 pb-20">
      <h2 className="section-label">03 / EXPERIENCE</h2>

      <div className="flex flex-col">
        {experiences.map((exp) => (
          <div
            key={exp.num}
            data-cursor-hover
            className="
              grid grid-cols-1 md:grid-cols-[180px_1fr]
              bg-black border-2 border-[#333] dark:bg-transparent dark:border-[#2a2a2a] -mt-px
              group transition-colors duration-200 hover:border-accent
            "
          >
            <div className="p-8 md:border-r-2 border-b-2 md:border-b-0 border-[#333] dark:border-[#2a2a2a] flex flex-col gap-2">
              <span className="text-meta-xs tracking-widest text-[#ffff00]">
                {exp.period}
              </span>
              <span className="font-display font-bold text-meta-lg leading-tight text-[#ffff00]">
                {exp.company}
              </span>
              <span className="inline-block text-meta-2xs tracking-widest text-[#999999] border border-[#333] dark:border-[#2a2a2a] px-2 py-0.5 w-fit mt-1">
                {exp.type}
              </span>
              <span
                className="font-display font-extrabold text-[3.5rem] leading-none mt-auto opacity-40 self-end"
                style={{ WebkitTextStroke: "1px #333", color: "transparent" }}
              >
                {exp.num}
              </span>
            </div>

            <div className="p-8 flex flex-col gap-3">
              <h3 className="font-display font-bold text-[1.1rem] tracking-tight text-[#ffff00]">
                {exp.role}
              </h3>
              <p className="text-meta-md text-[#999999] leading-[1.9]">
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
