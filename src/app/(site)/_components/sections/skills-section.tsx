import { getSkills } from "@/lib/data";

export default async function SkillsSection() {
  const skills = await getSkills();

  return (
    <section id="skills" className="px-3 py-20">
      <h2 className="section-label">02 / SKILLS</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            data-cursor-hover
            className="
              bg-black border-2 border-[#333] dark:bg-transparent dark:border-[#2a2a2a] -mt-px -ml-px p-6
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
              <p className="text-meta-2xs tracking-widest text-[#999999] mb-2 group-hover:text-black transition-colors duration-200">
                {skill.category}
              </p>
              <p className="font-display font-bold text-base text-[#ffff00] group-hover:text-black transition-colors duration-200">
                {skill.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
