import { getContactLinks } from "@/lib/data";
import Reveal from "@/app/_components/reveal";

export default async function ContactSection() {
  const contactLinks = await getContactLinks();

  return (
    <section
      id="contact"
      className="px-4 sm:px-8 py-16 sm:py-20"
      style={{ borderTop: "1px solid var(--c-divider)" }}
    >
      <h2 className="section-label">05 / Contact</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Reveal>
          <h3
            className="font-sans font-extrabold leading-[1.05] tracking-[-0.01em] text-[clamp(2rem,5vw,3rem)] mb-7"
            style={{ color: "var(--c-text)" }}
          >
            Let&apos;s work
            <br />
            together.
          </h3>

          <div
            className="flex items-center gap-2.5 text-meta-xs tracking-widest mb-6"
            style={{ color: "var(--c-muted2)" }}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-blink" />
            AVAILABLE FOR FREELANCE &amp; FULL-TIME
          </div>

          <p
            className="text-meta-lg leading-[1.6] max-w-[420px] mb-8"
            style={{ color: "var(--c-muted2)" }}
          >
            Based in Indonesia. Siap kerja remote atau on-site. Respon dalam
            24 jam.
          </p>

          <a href="mailto:hello@namalo.dev" className="btn-primary btn-tactile inline-block text-center">
            Kirim Pesan
          </a>

          <div
            className="mt-8 rounded-[10px] p-5 font-mono text-meta-sm leading-[2]"
            style={{ background: "var(--c-cardbg)", border: "1px solid var(--c-cardborder)" }}
          >
            <div>
              <span style={{ color: "var(--color-accent)" }}>→ </span>
              whoami
            </div>
            <div style={{ color: "var(--c-muted2)" }}>
              {"// Web Dev + IT Support"}
            </div>
            <div>
              <span style={{ color: "var(--color-accent)" }}>→ </span>
              status
            </div>
            <div className="text-green-500">● ONLINE &amp; READY TO BUILD</div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="contact-link flex justify-between items-center py-5 no-underline text-meta-lg font-semibold"
              style={{ borderTop: "1px solid var(--c-divider)" }}
            >
              {link.label}
              {link.href.startsWith("http") && (
                <span className="sr-only"> (buka di tab baru)</span>
              )}
              <span className="contact-link-arrow" style={{ color: "var(--c-muted2)" }} aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
