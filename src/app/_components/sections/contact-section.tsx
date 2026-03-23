import { contactLinks } from "@/lib/data";

export default function ContactSection() {
  return (
    <section id="contact" className="px-3 pb-20">
      <div className="section-label">05 / CONTACT</div>
      <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-border">
        <div className="p-12 md:border-r-2 border-b-2 md:border-b-0 border-border">
          <h2 className="font-display font-extrabold leading-[0.95] tracking-[-2px] text-[clamp(2rem,5vw,3rem)] mb-8">
            LET&apos;S
            <br />
            <span className="text-outline-sm">WORK</span>
            <br />
            TOGETHER.
          </h2>

          <div className="flex flex-col">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="
                  flex justify-between items-center
                  py-4 border-b border-border
                  text-[0.75rem] text-white no-underline
                  tracking-[1px] transition-colors duration-200
                  hover:text-accent group
                "
              >
                {link.label}
                <span className="text-xl text-muted group-hover:text-accent transition-colors duration-200">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="p-12 flex flex-col justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5 text-[0.65rem] tracking-widest text-muted mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-blink" />
              AVAILABLE FOR FREELANCE &amp; FULL-TIME
            </div>

            <p className="text-[0.8rem] text-muted leading-[1.8] mb-8">
              Based in Indonesia. Siap kerja remote atau on-site. Respon dalam
              24 jam.
            </p>

            <a
              href="mailto:hello@namalo.dev"
              className="btn-primary w-full block text-center"
            >
              KIRIM PESAN
            </a>
          </div>

          <div className="bg-surface border-2 border-border p-5 font-mono text-[0.72rem] leading-[2]">
            <div>
              <span className="text-accent">→ </span>
              <span className="text-white">whoami</span>
            </div>
            <div className="text-muted">{"// Web Dev + IT Support"}</div>
            <div>
              <span className="text-accent">→ </span>
              <span className="text-white">status</span>
            </div>
            <div className="text-accent3">● ONLINE &amp; READY TO BUILD</div>
          </div>
        </div>
      </div>
    </section>
  );
}
