import { MetadataRoute } from "next";
import { getExperiments } from "@/lib/experiments";
import { SIGNUP_PROJECTS } from "@/lib/signup/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://grapl.ai";
  const signupRoutes: MetadataRoute.Sitemap = Object.values(SIGNUP_PROJECTS).map(
    (project) => ({
      url: `${baseUrl}/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  try {
    const experiments = await getExperiments();
    const experimentRoutes: MetadataRoute.Sitemap = experiments.map((experiment) => ({
      url: `${baseUrl}/${experiment.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...baseRoutes, ...signupRoutes, ...experimentRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [...baseRoutes, ...signupRoutes];
  }
}
