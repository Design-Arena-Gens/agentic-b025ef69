import { Hero } from "@/components/home/hero";
import { TeamGrid } from "@/components/team/team-grid";
import { Badge } from "@/components/ui/badge";

const signals = [
  {
    title: "Signal-based matching",
    description: "Our matching graph weighs mission, craft, availability, and vibe intensity to align squads fast.",
  },
  {
    title: "Role-locked squads",
    description:
      "Every crew stays lean with 3-6 humans across Product, Tech, Design, Growth, Community, and Ops roles.",
  },
  {
    title: "Momentum analytics",
    description:
      "See velocity, rituals, and communication style before you join. No more guessing a team’s energy.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Hero />
      <section className="mx-auto max-w-6xl rounded-3xl bg-white/70 p-10 shadow-soft">
        <header className="mb-8 flex flex-col gap-3">
          <Badge tone="neutral">Why Team Forge</Badge>
          <h2 className="text-3xl font-semibold text-ink-900">
            Founder chemistry engineered from day zero.
          </h2>
          <p className="max-w-2xl text-sm text-ink-500">
            Forget endless Discord channels. Team Forge engineers squads with the exact roles and vibe you need so
            you can ship products, launch companies, and solve real problems from the first sprint.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {signals.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white/90 p-6 shadow-inner-soft"
            >
              <h3 className="text-lg font-semibold text-ink-800">{item.title}</h3>
              <p className="mt-3 text-sm text-ink-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <TeamGrid />
    </div>
  );
}
