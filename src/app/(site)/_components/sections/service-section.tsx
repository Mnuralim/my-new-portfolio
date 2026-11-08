import { getServices } from "@/lib/data";
import Reveal from "@/app/_components/reveal";

export default async function ServicesSection() {
  const services = await getServices();

  return (
    <section id="services" className="px-4 sm:px-8 py-16 sm:py-24">
      <Reveal>
        <div
          className="rounded-[24px] p-6 py-10 sm:p-14 grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-10 lg:gap-12"
          style={{ background: "var(--c-divider)" }}
        >
          <h2 className="section-label !mb-0">Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {services.map((service) => (
              <div key={service.title}>
                <div
                  aria-hidden="true"
                  className="w-11 h-11 rounded-full grid place-items-center font-mono text-[0.95rem] mb-4"
                  style={{ background: "var(--c-panel)", color: "var(--c-mark)" }}
                >
                  {service.icon}
                </div>
                <h3 className="font-semibold text-[1.2rem]" style={{ color: "var(--c-text)" }}>
                  {service.title}
                </h3>
                <p className="mt-1.5 leading-[1.6]" style={{ color: "var(--c-muted)" }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
