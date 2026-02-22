import { MetadataRoute } from 'next'
import { getExperiments } from '@/lib/experiments'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://grapl.ai'

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  try {
    const experiments = await getExperiments()
    const experimentRoutes: MetadataRoute.Sitemap = experiments.map((experiment) => ({
      url: `${baseUrl}/${experiment.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    return [...baseRoutes, ...experimentRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return baseRoutes
  }
}
