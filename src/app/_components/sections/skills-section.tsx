import { skills } from "@/lib/data";

export default function SkillsSection() {
  return (
    <section id="skills" className="px-10 py-20">
      <div className="section-label">01 / SKILLS</div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            data-cursor-hover
            className="
              border-2 border-border -mt-px -ml-px p-6
              relative overflow-hidden
              group transition-all duration-200 hover:border-accent
              cursor-pointer
            "
          >
            <div
              className="
                absolute inset-0 bg-accent z-0
                translate-y-full group-hover:translate-y-0
                transition-transform duration-300 ease-in-out
              "
            />

            <div className="relative z-10">
              <p className="text-[0.6rem] tracking-widest text-muted mb-2 group-hover:text-black transition-colors duration-200">
                {skill.category}
              </p>
              <p className="font-display font-bold text-base group-hover:text-black transition-colors duration-200">
                {skill.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
