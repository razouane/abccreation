/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://abccreation.tn',
  generateRobotsTxt: true,
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/mentions-legales', '/confidentialite'],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      'https://abccreation.tn/sitemap.xml',
    ],
  },

  transform: async (config, path) => {
    // Pages haute priorité
    const highPriority = ['/', '/contact', '/impression-flyers-tunis', '/cartes-visite-tunis']
    const mediumPriority = [
      '/packaging-personnalise-tunisie',
      '/grand-format-signaletique',
      '/cadeaux-publicitaires',
      '/conception-graphique',
      '/calendriers-personnalises',
      '/restauration-hotellerie',
    ]

    let priority = config.priority
    if (highPriority.includes(path)) priority = 1.0
    else if (mediumPriority.includes(path)) priority = 0.9
    else if (path.startsWith('/blog')) priority = 0.8

    return {
      loc: path,
      changefreq: path === '/' ? 'weekly' : config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}
