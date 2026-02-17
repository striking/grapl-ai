import { notFound } from "next/navigation";
import Link from "next/link";
import { getExperiment, getExperiments } from "@/lib/experiments";
import { WaitlistForm } from "@/components/WaitlistForm";

// Enable ISR with 60-second revalidation
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const experiments = await getExperiments();
  return experiments.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const experiment = await getExperiment(slug);
  if (!experiment) return {};
  
  return {
    title: `${experiment.name} — grapl.ai`,
    description: experiment.description,
    openGraph: {
      title: `${experiment.name} — grapl.ai`,
      description: experiment.description,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${experiment.name} — grapl.ai`,
      description: experiment.description,
      images: ["/og.png"],
    },
  };
}

export default async function ExperimentPage({ params }: PageProps) {
  const { slug } = await params;
  const experiment = await getExperiment(slug);

  if (!experiment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),_transparent_55%)]" />
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl motion-safe:animate-[float-slow_14s_ease-in-out_infinite]" />
        <div className="relative mx-auto max-w-4xl px-6 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-gray-800/80 bg-gray-900/70 px-4 py-2 text-sm text-gray-300 transition-all hover:border-emerald-500/40 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to experiments
        </Link>

        {/* Header */}
        <div className="mt-8">
          <span className="text-6xl">{experiment.icon}</span>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <h1 className="text-balance text-4xl font-semibold text-white font-display">
              {experiment.name}
            </h1>
            {experiment.status === "beta" || experiment.status === "live" ? (
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                {experiment.status === "live" ? "Live" : "Beta"}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-gray-500/10 px-3 py-1 text-sm font-medium text-gray-400 ring-1 ring-inset ring-gray-500/20">
                Coming Soon
              </span>
            )}
          </div>
          <p className="mt-2 text-xl text-emerald-300">{experiment.tagline}</p>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            {experiment.description}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-gray-800/80 bg-gray-900/70 p-8 shadow-lg shadow-black/30 backdrop-blur">
          <div className="mb-6 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          {experiment.status === "beta" || experiment.status === "live" ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white font-display">
                Try {experiment.name}
              </h2>
              <p className="mt-2 text-gray-400">
                {experiment.status === "live" ? "Now available." : "Currently in beta. Get early access."}
              </p>
              <div className="mt-6 max-w-sm mx-auto">
                <WaitlistForm product={slug} />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white font-display">Coming Soon</h2>
              <p className="mt-2 text-gray-400">
                {experiment.name} is still in development. Join the waitlist to be first in line.
              </p>
              <div className="mt-6 max-w-sm mx-auto">
                <WaitlistForm product={slug} />
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
