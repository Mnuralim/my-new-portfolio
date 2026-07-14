import { getContactLinks } from "@/lib/data";

export default async function ContactSection() {
  const contactLinks = await getContactLinks();

  return (
    <section id="contact" className="px-3 pb-20">
      <h2 className="section-label">05 / CONTACT</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-black border-2 border-black dark:bg-transparent dark:border-[#2a2a2a]">
        <div className="p-12 md:border-r-2 border-b-2 md:border-b-0 border-[#333] dark:border-[#2a2a2a]">
          <h3 className="font-display font-extrabold leading-[0.95] tracking-[-2px] text-[clamp(2rem,5vw,3rem)] mb-8 text-[#ffff00]">
            LET&apos;S
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px #f0f0f0" }}
            >
              WORK
            </span>
            <br />
            TOGETHER.
          </h3>

          <div className="flex flex-col">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="
                  flex justify-between items-center
                  py-4 border-b border-[#333] dark:border-[#2a2a2a]
                  text-meta-md text-[#ffff00] no-underline
                  tracking-[1px] transition-colors duration-200
                  hover:text-[#ffff00] group
                "
              >
                {link.label}
                <span className="text-xl text-[#999999] group-hover:text-[#ffff00] transition-colors duration-200">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="p-12 flex flex-col justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5 text-meta-xs tracking-widest text-[#999999] mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-blink" />
              AVAILABLE FOR FREELANCE &amp; FULL-TIME
            </div>

            <p className="text-meta-lg text-[#999999] leading-[1.8] mb-8">
              Based in Indonesia. Siap kerja remote atau on-site. Respon dalam
              24 jam.
            </p>

            <a
              href="mailto:hello@namalo.dev"
              className="bg-accent text-black font-mono text-meta-md font-bold px-7 py-3.5 tracking-widest border-2 border-accent cursor-pointer uppercase transition-all duration-200 hover:bg-[#00FFFF] hover:border-[#00FFFF] hover:text-black w-full block text-center"
            >
              KIRIM PESAN
            </a>
          </div>

          <div className="bg-[#111111] border-2 border-[#333] dark:border-[#2a2a2a] p-5 font-mono text-meta-sm leading-[2]">
            <div>
              <span className="text-[#ffff00]">→ </span>
              <span className="text-[#ffff00]">whoami</span>
            </div>
            <div className="text-[#999999]">{"// Web Dev + IT Support"}</div>
            <div>
              <span className="text-[#ffff00]">→ </span>
              <span className="text-[#ffff00]">status</span>
            </div>
            <div className="text-green-500">● ONLINE &amp; READY TO BUILD</div>
          </div>
        </div>
      </div>
    </section>
  );
}
