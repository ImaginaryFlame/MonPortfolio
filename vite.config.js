import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Ajout de la configuration HMR améliorée
      fastRefresh: true,
    }),
    // Plugin pour analyser la taille des bundles
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    // Configuration PWA pour la mise en cache
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg}'],
        // Réduire la limite pour éviter les problèmes
        maximumFileSizeToCacheInBytes: 2 * 1024 * 1024, // 2 MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.sanity\.io\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sanity-images',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 jours
              },
            },
          },
        ],
      },
      manifest: {
        name: 'MonPortfolio - Flamme Créative',
        short_name: 'MonPortfolio',
        description: 'Portfolio créatif de Flame - Univers narratifs, développement et créations artistiques',
        theme_color: '#f97316',
        background_color: '#111827',
        display: 'standalone',
        icons: [
          {
            src: '/assets/img/20220726_002242.webp',
            sizes: '192x192',
            type: 'image/webp'
          }
        ]
      }
    })
  ],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Optimisations pour le développement
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: true
    },
  },
  // Optimisations simplifiées pour la production
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Augmenter la limite pour éviter les warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Chunking simple et stable
        manualChunks: {
          // Bibliothèques React de base
          'react-vendor': ['react', 'react-dom'],
          // Router séparé
          'router': ['react-router-dom'],
          // CMS et API
          'cms': ['@sanity/client', '@sanity/image-url'],
          // FontAwesome
          'icons': [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/react-fontawesome',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/free-solid-svg-icons'
          ],
        },
      }
    },
    // Optimisations de compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Optimisations des dépendances
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@sanity/client',
    ],
  },
  // Configuration pour la production
  define: {
    // Optimiser les variables d'environnement
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
})
