import { SignupCaptureForm } from "@/components/SignupCaptureForm";
import type { SignupProjectConfig } from "@/lib/signup/projects";

interface ProjectSignupPageProps {
  project: SignupProjectConfig;
}

export function ProjectSignupPage({ project }: ProjectSignupPageProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),_transparent_55%)]" />
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <main className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-16">
          <span className="text-xs uppercase tracking-[0.2em] text-emerald-300/90">
            Grapl AI • {project.name}
          </span>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {project.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-300">{project.description}</p>

          <section className="mt-10 rounded-2xl border border-gray-800/80 bg-gray-900/70 p-6 shadow-lg shadow-black/30 backdrop-blur">
            <p className="text-sm text-gray-400">
              Join the early access list for {project.name}.
            </p>
            <div className="mt-4">
              <SignupCaptureForm
                project={project.slug}
                source={project.source}
                successMessage={`Thanks for your interest in ${project.name}. We'll reach out soon.`}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
