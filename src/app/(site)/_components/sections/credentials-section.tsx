import { getCredentials } from "@/lib/data";
import Reveal from "@/app/_components/reveal";

const card = {
  border: "1px solid var(--c-cardborder)",
  background: "var(--c-cardbg)",
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-mono text-meta-xs tracking-[3px] uppercase mb-5"
      style={{ color: "var(--c-muted2)" }}
    >
      {children}
    </h3>
  );
}

function MaybeLink({
  url,
  className,
  style,
  children,
}: {
  url: string | null;
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (!url)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} no-underline cursor-pointer`}
      style={style}
    >
      {children}
    </a>
  );
}

function LinkHint({ url, label }: { url: string | null; label: string }) {
  if (!url) return null;
  return (
    <span
      className="inline-block font-mono text-meta-xs tracking-widest mt-3"
      style={{ color: "var(--color-accent)" }}
    >
      {label} ↗
    </span>
  );
}

export default async function CredentialsSection() {
  const { education, certifications, publications } = await getCredentials();
  if (!education.length && !certifications.length && !publications.length) return null;

  return (
    <section
      id="credentials"
      className="px-4 sm:px-8 py-16 sm:py-20"
      style={{ borderTop: "1px solid var(--c-divider)" }}
    >
      <h2 className="section-label">04 / Credentials</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14">
        <div className="flex flex-col gap-10">
          {education.length > 0 && (
            <div>
              <Heading>Education</Heading>
              <div className="flex flex-col gap-4">
                {education.map((edu, i) => (
                  <Reveal key={edu.id} delay={i * 0.06}>
                    <div className="rounded-[14px] p-6" style={card}>
                      <div
                        className="font-mono text-meta-sm mb-2"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {edu.period}
                      </div>
                      <div
                        className="font-sans font-bold text-meta-lg mb-1"
                        style={{ color: "var(--c-text)" }}
                      >
                        {edu.title}
                      </div>
                      <div className="text-meta-md" style={{ color: "var(--c-muted)" }}>
                        {edu.issuer}
                      </div>
                      {edu.note && <span className="tag-accent mt-3">{edu.note}</span>}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {publications.length > 0 && (
            <div>
              <Heading>Publication</Heading>
              {publications.map((pub) => (
                <Reveal key={pub.id}>
                  <MaybeLink
                    url={pub.url}
                    className={`block rounded-[14px] p-6 ${pub.url ? "card-hoverable" : ""}`}
                    style={card}
                  >
                    <p
                      lang="id"
                      className="font-sans font-bold text-meta-lg leading-[1.5] mb-3"
                      style={{ color: "var(--c-text)" }}
                    >
                      &ldquo;{pub.title}&rdquo;
                    </p>
                    <div className="text-meta-md mb-3" style={{ color: "var(--c-muted)" }}>
                      {pub.issuer}
                    </div>
                    {pub.note && <span className="tag-accent">{pub.note}</span>}
                    <div>
                      <LinkHint url={pub.url} label="BACA ARTIKEL" />
                    </div>
                  </MaybeLink>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {certifications.length > 0 && (
          <div>
            <Heading>Training &amp; Certificates</Heading>
            <div className="flex flex-col">
              {certifications.map((cert, i) => (
                <Reveal key={cert.id} delay={i * 0.05}>
                  <MaybeLink
                    url={cert.url}
                    className="experience-row grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-5 pl-5 -ml-5"
                    style={{ borderTop: "1px solid var(--c-divider)" }}
                  >
                    <div>
                      <div
                        className="font-sans font-semibold text-meta-lg mb-1"
                        style={{ color: "var(--c-text)" }}
                      >
                        {cert.title}
                      </div>
                      <div className="text-meta-md" style={{ color: "var(--c-muted)" }}>
                        {cert.issuer}
                      </div>
                      {cert.note && (
                        <div
                          className="font-mono text-meta-xs mt-1.5"
                          style={{ color: "var(--c-muted3)" }}
                        >
                          ID: {cert.note}
                        </div>
                      )}
                      <LinkHint url={cert.url} label="VERIFIKASI" />
                    </div>
                    <div
                      className="font-mono text-meta-sm sm:text-right"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {cert.period}
                    </div>
                  </MaybeLink>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
