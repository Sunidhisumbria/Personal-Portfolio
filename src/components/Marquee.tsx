import { stack } from "@/data/portfolio";

const items = stack.flatMap((s) => s.items);
const half = Math.ceil(items.length / 2);
const rows = [items.slice(0, half), items.slice(half)];

/** Two infinitely scrolling rows of tech names, moving in opposite directions. Pauses on hover. */
export function Marquee() {
  return (
    <div className="mask-fade-x relative space-y-3 overflow-hidden border-y border-border/60 bg-surface/30 py-6" aria-hidden>
      {rows.map((row, i) => (
        <div key={i} className="group flex w-max">
          {/* The list is rendered twice so translating by -50% loops seamlessly */}
          <div
            className={`flex shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused] ${
              i === 0 ? "animate-marquee" : "animate-marquee-reverse"
            }`}
          >
            {[...row, ...row].map((item, j) => (
              <span
                key={j}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
              >
                <span className={`size-1.5 rounded-full ${j % 3 === 0 ? "bg-accent" : j % 3 === 1 ? "bg-accent-2" : "bg-pink-300"}`} />
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
