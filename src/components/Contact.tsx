import { profile } from "@/data/portfolio";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./motion";
import { Spotlight } from "./Spotlight";
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from "./ui";

function MailIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <path d="M3 6h18v12H3z M3 7l9 6 9-6" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
    </svg>
  );
}

export function Contact() {
  const channels = [
    profile.email && { href: `mailto:${profile.email}`, label: "Email", value: profile.email, Icon: MailIcon },
    profile.phone && { href: `tel:${profile.phone.replace(/\s/g, "")}`, label: "Phone", value: profile.phone, Icon: PhoneIcon },
    { href: profile.links.linkedin, label: "LinkedIn", value: "sunidhisumbria", Icon: LinkedInIcon, external: true },
    { href: profile.links.github, label: "GitHub", value: "Sunidhisumbria", Icon: GitHubIcon, external: true },
  ].filter(Boolean) as { href: string; label: string; value: string; Icon: typeof MailIcon; external?: boolean }[];

  return (
    <section id="contact" className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-12 sm:px-8">
      <Reveal>
        <div className="bg-noise relative overflow-hidden rounded-[2.5rem] border border-border bg-surface">
          <div className="pointer-events-none absolute inset-0">
            <div className="animate-aurora absolute -bottom-1/2 -left-1/4 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[110px]" />
            <div
              className="animate-aurora absolute -right-1/4 -top-1/2 h-[500px] w-[500px] rounded-full bg-accent-2/15 blur-[110px]"
              style={{ animationDelay: "-7s" }}
            />
          </div>

          <div className="relative grid gap-12 p-6 sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-16">
            <div>
              <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                <span className="h-px w-8 bg-accent/60" />
                Contact
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
                Have a role or a project <span className="text-gradient">in mind?</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted">
                I&apos;m open to full-time positions and freelance work
                {profile.location ? `, remote or around ${profile.location}` : ", remote or on-site"}.
                Let&apos;s talk about what you&apos;re building.
              </p>

              <ul className="mt-10 space-y-2">
                {channels.map(({ href, label, value, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-all hover:border-border hover:bg-background/40"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-muted transition-colors group-hover:text-accent">
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-muted">{label}</span>
                        <span className="block truncate text-sm font-medium">{value}</span>
                      </span>
                      <span className="ml-auto text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                        <ArrowUpRight />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Spotlight className="rounded-3xl border border-border bg-background/50 p-6 backdrop-blur-xl sm:p-8">
              <h3 className="text-lg font-semibold">Send me a message</h3>
              <p className="mt-1 text-sm text-muted">It goes straight to my inbox.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Spotlight>
          </div>
        </div>
      </Reveal>

      <footer className="mt-12 flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind CSS & Motion.
        </p>
        <a href="#top" className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
          Back to top
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5 transition-transform group-hover:-translate-y-0.5">
            <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </footer>
    </section>
  );
}
