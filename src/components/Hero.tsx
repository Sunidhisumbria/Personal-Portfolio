"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;
const rotatingWords = ["marketplaces", "streaming platforms", "payment flows", "real-time apps", "REST APIs"];
const floatingBadges = [
  { label: "React", className: "-left-20 top-4 sm:-left-14 sm:top-6", delay: 0 },
  { label: "Node.js", className: "-right-20 top-1/3 sm:-right-12", delay: 1.2 },
  { label: "Next.js", className: "-left-16 bottom-3 sm:-left-10 sm:bottom-4", delay: 0.6 },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const firstName = profile.name.split(" ")[0];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % rotatingWords.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="bg-noise relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      {/* Background: drifting aurora blobs + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-aurora absolute -top-1/3 left-[10%] h-[620px] w-[620px] rounded-full bg-accent/20 blur-[120px]" />
        <div
          className="animate-aurora absolute -top-1/4 right-[5%] h-[520px] w-[520px] rounded-full bg-accent-2/20 blur-[120px]"
          style={{ animationDelay: "-9s" }}
        />
        <div className="bg-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-5 pb-20 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted"
          >
            {profile.name} · {profile.role}
            {profile.location && ` · ${profile.location.split(" /")[0]}`}
          </motion.p>

          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            {["Hi,", "I'm", `${firstName}.`].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.12 }}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-2 flex flex-wrap items-end gap-x-[0.3em] text-3xl leading-[1.25] text-muted sm:text-5xl"
            >
              <span className="block h-[1.25em]">I build</span>
              {/* Same height + line-height as "I build" so both share a baseline */}
              <span className="relative block h-[1.25em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[index]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="text-gradient block whitespace-nowrap"
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.15 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background shadow-[0_0_40px_-8px_var(--accent)] transition-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">See my work</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="relative z-10 size-4 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-medium backdrop-blur transition-all hover:-translate-y-0.5 hover:border-muted/60"
            >
              Get in touch
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className="rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-medium backdrop-blur transition-all hover:-translate-y-0.5 hover:border-muted/60"
              >
                Download CV
              </a>
            )}
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: profile.links.github, label: "GitHub", Icon: GitHubIcon },
                { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="rounded-full p-2.5 text-muted transition-all hover:-translate-y-0.5 hover:bg-surface-2 hover:text-foreground"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Photo with spinning gradient ring and floating tech badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="relative order-first mx-auto shrink-0 md:order-none md:mx-0"
        >
          <div className="relative size-44 overflow-hidden rounded-[2rem] p-[2px] sm:size-72">
            <div className="animate-spin-slow absolute -inset-1/2 bg-[conic-gradient(from_0deg,var(--accent),transparent_30%,var(--accent-2),transparent_70%,var(--accent))]" />
            <Image
              src={profile.photo}
              alt={profile.name}
              width={300}
              height={300}
              priority
              className="relative size-full rounded-[calc(2rem-2px)] bg-surface object-cover object-[50%_30%]"
            />
          </div>
          <div className="absolute -inset-6 -z-10 rounded-full bg-accent/20 blur-3xl" />

          {floatingBadges.map((b) => (
            <motion.span
              key={b.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 1.2 + b.delay * 0.3, duration: 0.5 },
                scale: { delay: 1.2 + b.delay * 0.3, duration: 0.5 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: b.delay },
              }}
              className={`absolute rounded-full border border-border bg-surface/80 px-3 py-1.5 font-mono text-xs text-foreground shadow-lg backdrop-blur-md ${b.className}`}
            >
              <span className="mr-1.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
              {b.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-border pt-2">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-muted"
          />
        </span>
      </motion.a>
    </section>
  );
}
