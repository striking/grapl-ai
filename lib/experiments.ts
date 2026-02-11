import experimentsData from "@/data/experiments.json";

export interface Experiment {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "beta" | "coming-soon";
  icon: string;
}

export function getExperiments(): Experiment[] {
  return experimentsData as Experiment[];
}

export function getExperiment(slug: string): Experiment | undefined {
  return experimentsData.find((e) => e.slug === slug) as Experiment | undefined;
}
