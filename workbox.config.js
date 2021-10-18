module.exports = {
  globDirectory: 'dist/client/',
  globPatterns: ['**/*.{js,css,svg,ico,html,json}'],
  templatedURLs: { '/': 'index.html' },
  swDest: 'dist/client/sw.js',
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/cdn\.shopify\.com\/s\/files/g,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'shopify-cdn',
        expiration: {
          maxEntries: 50
        }
      }
    }
  ]
}
