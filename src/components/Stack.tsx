import { stack } from "@/data/portfolio";
import { Stagger, StaggerItem } from "./motion";
import { Spotlight } from "./Spotlight";
import { Section } from "./ui";

const icons: Record<string, string> = {
  Frontend: "M4 5h16v11H4z M8 20h8 M12 16v4",
  Backend: "M4 6h16v5H4z M4 13h16v5H4z M8 8.5h.01 M8 15.5h.01",
  Data: "M12 3c4.4 0 8 1.3 8 3v12c0 1.7-3.6 3-8 3s-8-1.3-8-3V6c0-1.7 3.6-3 8-3Z M4 6c0 1.7 3.6 3 8 3s8-1.3 8-3 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  Auth: "M6 11h12v10H6z M8 11V7a4 4 0 0 1 8 0v4",
  Integrations: "M9 3v4 M15 3v4 M7 7h10v4a5 5 0 0 1-10 0V7Z M12 16v5",
  Workflow: "M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M18 9a9 9 0 0 1-9 9",
};

export function Stack() {
  return (
    <Section
      id="stack"
      eyebrow="Tech stack"
      title={
        <>
          Tools I <span className="text-gradient">build with</span>
        </>
      }
    >
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((s) => (
          <StaggerItem key={s.group}>
            <Spotlight className="group h-full rounded-3xl border border-border bg-surface p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
                    <path d={icons[s.group] ?? icons.Workflow} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="font-semibold">{s.group}</h3>
                <span className="ml-auto font-mono text-xs text-muted">{String(s.items.length).padStart(2, "0")}</span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-sm text-foreground/85 transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
