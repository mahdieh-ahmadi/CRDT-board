import { Button } from "@/components/general/Button";
import { Container } from "@/components/general/Container";
import { FeatureCard } from "@/components/home/FeatureCard";
import { Navbar } from "@/components/general/Navbar";
import { Section } from "@/components/home/Section";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-white">
      <Navbar />

      <main className="space-y-16 pb-24">
        <section className="border-b border-zinc-200/60 bg-gradient-to-b from-white to-zinc-50 py-16 dark:border-zinc-800/60 dark:from-black dark:to-zinc-950">
          <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                Collaborative, fast, conflict-free
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  Build real-time boards without worrying about conflicts.
                </h1>
                <p className="max-w-2xl text-lg text-zinc-700 dark:text-zinc-300">
                  CRDT Board helps your team ideate together with instant sync,
                  version-safe updates, and dashboards that stay consistent no
                  matter how many people edit.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
                <Button href="/dashboard">Go to dashboard</Button>
                <Button href="#features" variant="secondary">
                  See how it works
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Real-time sync built-in
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Offline safe edits
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Roles & visibility controls
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950">
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                Live collaboration snapshot
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { name: "Design squad", status: "Active", color: "bg-emerald-500" },
                  { name: "Product review", status: "Reviewing", color: "bg-blue-500" },
                  { name: "Research board", status: "Draft", color: "bg-amber-500" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl border border-zinc-200/80 px-4 py-3 text-sm dark:border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      <div className="font-medium text-zinc-900 dark:text-white">
                        {item.name}
                      </div>
                    </div>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 px-4 py-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                Share a link, invite the team, and edits stay in sync—even
                offline. Perfect for retros, mapping, and live handoffs.
              </div>
            </div>
          </Container>
        </section>

        <Section
          id="features"
          eyebrow="Why CRDT Board"
          title="Aligned teams without collisions."
          description="Purpose-built for distributed teams to sketch, plan, and ship together. Every interaction is conflict-free thanks to CRDT-driven syncing."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Conflict-free editing"
              description="Edits merge automatically, so sticky notes, cards, and comments always stay in a single source of truth."
              icon="⚡"
            />
            <FeatureCard
              title="Structured dashboards"
              description="Move from brainstorm to execution with dashboards that connect tasks, owners, and timelines."
              icon="📊"
            />
            <FeatureCard
              title="Invite and share"
              description="Share a board link or embed in your workspace; permissions keep the right people in control."
              icon="🔗"
            />
          </div>
        </Section>

        <Section
          id="workflow"
          eyebrow="Team flow"
          title="From idea to shipped without losing context."
          description="Use boards for discovery, planning, and delivery. A dashboard keeps your active boards and decision logs together."
        >
          <div className="grid gap-6 rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 sm:grid-cols-3">
            {[
              {
                title: "Start a board",
                body: "Kick off with templates for journeys, retros, and research debriefs.",
              },
              {
                title: "Co-edit live",
                body: "Sketch together with presence cursors, comments, and reactions that never conflict.",
              },
              {
                title: "Publish to dashboard",
                body: "Pin important boards to the dashboard so the team has a single launch point.",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {item.title}
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Ready to start collaborating?
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Jump into the dashboard to create your first CRDT-powered board.
              </p>
            </div>
            <Button href="/dashboard">Open dashboard</Button>
          </div>
        </Section>
      </main>
    </div>
  );
}
