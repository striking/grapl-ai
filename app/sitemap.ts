import { MetadataRoute } from 'next'
import { experiments } from '@/data/experiments'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://grapl.ai'

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  const experimentRoutes: MetadataRoute.Sitemap = experiments.map((experiment) => ({
    url: `${baseUrl}/${experiment.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...baseRoutes, ...experimentRoutes]
}
