import { about, achievements, education, highlights } from "@/data/portfolio";
import { CountUp, Stagger, StaggerItem } from "./motion";
import { Spotlight } from "./Spotlight";
import { Section } from "./ui";

const card = "h-full rounded-3xl border border-border bg-surface p-6 sm:p-7";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          A developer who ships <span className="text-gradient">across the stack</span>
        </>
      }
    >
      <Stagger className="grid auto-rows-auto gap-4 md:grid-cols-3">
        <StaggerItem className="md:col-span-2 md:row-span-2">
          <Spotlight className={card}>
            <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {about.map((p, i) => (
                <p key={p} className={i === 0 ? "text-foreground" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </Spotlight>
        </StaggerItem>

        {highlights.map((h) => (
          <StaggerItem key={h.label}>
            <Spotlight className={`${card} flex flex-col justify-between gap-6`}>
              <p className="text-sm text-muted">{h.label}</p>
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <CountUp value={h.value} />
              </p>
            </Spotlight>
          </StaggerItem>
        ))}

        <StaggerItem>
          <Spotlight className={card}>
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
                <path d="M22 10 12 5 2 10l10 5 10-5Z M6 12v5c3 2 9 2 12 0v-5" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-muted">Education</p>
            <p className="mt-2 font-medium">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">{education.school}</p>
          </Spotlight>
        </StaggerItem>

        <StaggerItem>
          <Spotlight className={card}>
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent-2/10 text-accent-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
                <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-muted">Achievements</p>
            <ul className="mt-2 space-y-2 text-sm">
              {achievements.map((a) => (
                <li key={a} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-2" />
                  {a}
                </li>
              ))}
            </ul>
          </Spotlight>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
