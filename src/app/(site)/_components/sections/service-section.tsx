import { getServices } from "@/lib/data";

export default async function ServicesSection() {
  const services = await getServices();

  return (
    <section id="services" className="px-3 pb-20">
      <h2 className="section-label">04 / SERVICES</h2>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            data-cursor-hover
            className="
              bg-black border-2 border-[#333] dark:bg-transparent dark:border-[#2a2a2a] -mt-px -ml-px p-8
              flex gap-6
              group transition-colors duration-200 hover:border-accent
            "
          >
            <div className="w-11 h-11 flex-shrink-0 border-2 border-[#333] dark:border-[#2a2a2a] flex items-center justify-center text-lg font-mono text-[#ffff00] group-hover:border-accent transition-colors duration-200">
              {service.icon}
            </div>

            <div>
              <h3 className="font-display font-bold text-base mb-2 text-[#ffff00]">
                {service.title}
              </h3>
              <p className="text-meta-sm text-[#999999] leading-[1.8]">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
