import { getContactLinks } from "@/lib/data";
import Reveal from "@/app/_components/reveal";

export default async function ContactSection() {
  const contactLinks = await getContactLinks();

  return (
    <section id="contact" className="px-4 sm:px-8 py-16 sm:py-24">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-[24px] px-6 py-12 sm:px-14 sm:py-[72px]"
          style={{ background: "var(--c-panel)", color: "var(--c-on-panel)" }}
        >
          <svg
            viewBox="0 0 340 340"
            aria-hidden="true"
            className="absolute -right-10 -bottom-10 w-[200px] h-[200px] opacity-35 sm:w-[340px] sm:h-[340px] sm:opacity-90"
            strokeLinecap="round"
            strokeWidth={44}
          >
            <line x1="90" y1="90" x2="290" y2="90" stroke="#F5F0E6" strokeOpacity={0.12} />
            <line x1="90" y1="270" x2="290" y2="270" stroke="#F5F0E6" strokeOpacity={0.12} />
            <line x1="90" y1="270" x2="290" y2="90" stroke="#E8B94A" />
          </svg>

          <div className="relative">
            <h2 className="font-semibold text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] max-w-[14ch]">
              Ada yang mau dibangun?
            </h2>
            <p className="mt-4 text-[1.1rem] leading-[1.6] max-w-[44ch]" style={{ color: "var(--c-on-panel-muted)" }}>
              Terbuka untuk freelance dan full-time, remote atau on-site. Gue balas dalam 24 jam.
            </p>

            <div className="flex items-center gap-x-8 gap-y-5 flex-wrap mt-10">
              <a
                href="mailto:hello@namalo.dev"
                className="btn-primary btn-tactile !bg-[var(--c-mark)] !text-[#13201a]"
              >
                Hubungi gue
              </a>
              <div className="flex gap-x-6 gap-y-2 flex-wrap">
                {contactLinks.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="no-underline transition-colors hover:text-[var(--c-on-panel)]"
                      style={{ color: "var(--c-on-panel-muted)" }}
                    >
                      {link.label}
                      {external && <span className="sr-only"> (buka di tab baru)</span>}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
