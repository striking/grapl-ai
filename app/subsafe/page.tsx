import type { Metadata } from "next";
import { ProjectSignupPage } from "@/components/ProjectSignupPage";
import { SIGNUP_PROJECTS } from "@/lib/signup/projects";

const project = SIGNUP_PROJECTS.subsafe;

export const metadata: Metadata = {
  title: `${project.name} Signup — grapl.ai`,
  description: project.description,
};

export default function SubSafePage() {
  return <ProjectSignupPage project={project} />;
}
