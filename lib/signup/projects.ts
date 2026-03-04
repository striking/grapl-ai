export interface SignupProjectConfig {
  slug: string;
  name: string;
  headline: string;
  description: string;
  source: string;
}

export const SIGNUP_PROJECTS = {
  defecttrack: {
    slug: "defecttrack",
    name: "DefectTrack",
    headline: "Catch defects before handover.",
    description:
      "DefectTrack helps teams capture, triage, and close defects fast across every site.",
    source: "defecttrack-page",
  },
  subsafe: {
    slug: "subsafe",
    name: "SubSafe",
    headline: "Subcontractor compliance without admin pain.",
    description:
      "SubSafe centralizes onboarding and compliance tracking so crews can start work faster.",
    source: "subsafe-page",
  },
  tradiquote: {
    slug: "tradiquote",
    name: "TradiQuote",
    headline: "Turn site notes into polished quotes.",
    description:
      "TradiQuote transforms rough scope details into client-ready quotes in minutes.",
    source: "tradiquote-page",
  },
} as const satisfies Record<string, SignupProjectConfig>;

export type SignupProjectSlug = keyof typeof SIGNUP_PROJECTS;
