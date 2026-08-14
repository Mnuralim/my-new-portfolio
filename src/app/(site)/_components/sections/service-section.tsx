import { getServices } from "@/lib/data";
import Reveal from "@/app/_components/reveal";

export default async function ServicesSection() {
  const services = await getServices();

  return (
    <section
      id="services"
      className="px-4 sm:px-8 py-16 sm:py-20"
      style={{ borderTop: "1px solid var(--c-divider)" }}
    >
      <h2 className="section-label">04 / Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.06}>
            <div
              className="card-hoverable rounded-[14px] p-[30px] h-full"
              style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)" }}
            >
              <div
                className="font-mono text-[1.6rem] mb-[22px]"
                style={{ color: "var(--color-accent)" }}
              >
                {service.icon}
              </div>
              <h3
                className="font-sans font-bold text-meta-lg mb-3"
                style={{ color: "var(--c-text)" }}
              >
                {service.title}
              </h3>
              <p
                className="text-meta-md leading-[1.6] m-0"
                style={{ color: "var(--c-muted)" }}
              >
                {service.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
