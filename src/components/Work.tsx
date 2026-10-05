"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { projects, sideProjects, type Project } from "@/data/portfolio";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { Spotlight } from "./Spotlight";
import { ArrowUpRight, Chip, GitHubIcon, Section } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

function Preview({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Subtle parallax: the browser frame drifts slightly while the card scrolls past.
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div ref={ref} style={{ y }} className="group/preview relative">
      <div
        className="absolute -inset-4 -z-10 rounded-[2rem] opacity-40 blur-2xl transition-opacity duration-500 group-hover/preview:opacity-80"
        style={{ background: `radial-gradient(closest-side, ${project.accent}55, transparent)` }}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          <span className="mx-auto flex items-center gap-1.5 truncate rounded-md bg-background px-3 py-0.5 font-mono text-[11px] text-muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3">
              <path d="M6 11h12v10H6z M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            {project.domain}
          </span>
          <span className="w-12" />
        </div>
        <div className="relative aspect-[144/79] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              width={1440}
              height={790}
              className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-105"
            />
          ) : (
            <div
              className="flex size-full items-end p-6"
              style={{
                background: `radial-gradient(120% 90% at 100% 0%, ${project.accent}40, transparent 60%), radial-gradient(80% 80% at 0% 100%, ${project.accent}22, transparent 70%)`,
              }}
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                  {project.category}
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight sm:text-5xl">{project.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease }}
    >
      <Spotlight className="grid gap-10 overflow-hidden rounded-[2rem] border border-border bg-surface p-5 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:p-10">
        <motion.div
          initial={{ opacity: 0, x: flipped ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className={`self-center ${flipped ? "lg:order-2" : ""}`}
        >
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer" className="block">
              <Preview project={project} />
            </a>
          ) : (
            <Preview project={project} />
          )}
        </motion.div>

        <div className="relative">
          <span
            className="pointer-events-none absolute -top-4 right-0 select-none font-mono text-7xl font-bold opacity-10 sm:text-8xl"
            style={{ color: project.accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="font-mono text-xs uppercase tracking-[0.15em]" style={{ color: project.accent }}>
            {project.category}
          </p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight">{project.name}</h3>
          <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

          <ul className="mt-6 space-y-3 text-sm leading-relaxed">
            {project.points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.07 }}
                className="flex gap-3"
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth={2.5} className="mt-0.5 size-4 shrink-0" style={{ stroke: project.accent }}>
                  <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-foreground/85">{p}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-muted/60"
            >
              Visit live site
              <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight />
              </span>
            </a>
          )}
        </div>
      </Spotlight>
    </motion.article>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title={
        <>
          Production platforms <span className="text-gradient">I&apos;ve built</span>
        </>
      }
    >
      <div className="space-y-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>

      <Reveal className="mt-28">
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span className="h-px w-8 bg-accent/60" />
          Side projects
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight">Things I build on my own</h3>
      </Reveal>
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
        {sideProjects.map((p) => (
          <StaggerItem key={p.name}>
            <a href={p.url} target="_blank" rel="noreferrer" className="block h-full">
              <Spotlight className="group h-full rounded-3xl border border-border bg-surface p-7 transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">{p.name}</h4>
                  <span className="flex size-9 items-center justify-center rounded-full border border-border text-muted transition-all group-hover:rotate-12 group-hover:border-accent/50 group-hover:text-accent">
                    <GitHubIcon className="size-4" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </Spotlight>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
