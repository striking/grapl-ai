import { ExperimentCard } from "@/components/ExperimentCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { getExperiments } from "@/lib/experiments";

export default function Home() {
  const experiments = getExperiments();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),_transparent_55%)]" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl motion-safe:animate-[float-slow_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-10 sm:pb-32">
          <nav className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-base font-semibold text-emerald-300 shadow-lg shadow-emerald-500/10">
                g
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                grapl.ai
              </span>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <span>AI micro-apps</span>
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              <span>Built in Brisbane</span>
            </div>
          </nav>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              AI micro-apps
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl font-display">
              AI tools that help you
              <span className="block text-emerald-300">
                grapple with everyday challenges
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-gray-300 sm:text-xl">
              Small tools. Big impact. Launching focused experiments that solve one problem
              at a time.
            </p>
            <div className="mt-10 max-w-md mx-auto">
              <WaitlistForm />
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Focused by design",
                body: "Every micro-app tackles a single, real-world bottleneck.",
              },
              {
                title: "Human in the loop",
                body: "Clear prompts, clear outcomes, and no surprise automation.",
              },
              {
                title: "Built to ship fast",
                body: "Experiment, learn, and iterate weekly with the community.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-800/80 bg-gray-900/70 p-5 text-left text-sm text-gray-300 shadow-inner shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-gray-900/90"
              >
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-gray-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Experiments Grid */}
      <main className="mx-auto max-w-6xl px-6 pb-24">
        <section className="relative rounded-3xl border border-gray-800/80 bg-gray-950/40 p-8 shadow-2xl shadow-black/30 backdrop-blur sm:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white font-display">Experiments</h2>
              <p className="mt-2 text-gray-400">
                We build focused AI tools that solve real problems. Try them out.
              </p>
            </div>
            <div className="text-sm text-gray-400">
              Updated weekly • Join the waitlist for early access
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiments.map((experiment) => (
              <ExperimentCard key={experiment.slug} experiment={experiment} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 py-10">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} grapl.ai — Built in Brisbane 🇦🇺
        </div>
      </footer>
    </div>
  );
}
