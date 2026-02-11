import Link from "next/link";
import type { Experiment } from "@/lib/experiments";

interface ExperimentCardProps {
  experiment: Experiment;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <Link
      href={`/${experiment.slug}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gray-800/80 bg-gray-900/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-emerald-500/10 motion-safe:animate-[fade-up_0.6s_ease-out]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-start justify-between">
          <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
            {experiment.icon}
          </span>
          <StatusBadge status={experiment.status} />
        </div>
        <h3 className="relative mt-4 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-emerald-300">
          {experiment.name}
        </h3>
        <p className="relative mt-1 text-sm font-medium text-emerald-400/90">
          {experiment.tagline}
        </p>
        <p className="relative mt-3 text-sm text-gray-400 leading-relaxed">
          {experiment.description}
        </p>
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: "beta" | "coming-soon" }) {
  if (status === "beta") {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
        Beta
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-gray-500/10 px-3 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-500/20">
      Coming Soon
    </span>
  );
}
