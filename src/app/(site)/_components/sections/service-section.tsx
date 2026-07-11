import { services } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section id="services" className="px-3 pb-20">
      <div className="section-label">04 / SERVICES</div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            data-cursor-hover
            className="
              border-2 border-border -mt-px -ml-px p-8
              flex gap-6
              group transition-colors duration-200 hover:border-accent
            "
          >
            <div className="w-11 h-11 flex-shrink-0 border-2 border-border flex items-center justify-center text-lg font-mono group-hover:border-accent transition-colors duration-200">
              {service.icon}
            </div>

            <div>
              <h3 className="font-display font-bold text-base mb-2">
                {service.title}
              </h3>
              <p className="text-[0.72rem] text-muted leading-[1.8]">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
