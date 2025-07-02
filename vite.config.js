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
        globPatterns: ['**/*.{js,css,html,ico,svg}', '**/assets/img/*.webp'],
        // Augmenter la limite pour les gros assets
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
        // Exclure les gros fichiers du cache
        globIgnores: [
          '**/assets/img/projects/little-archaeologist/**',
          '**/assets/img/**/Unity-Project/**',
          '**/assets/img/**/*.png',
          '**/assets/img/**/*.jpg',
          '**/anime-moon-landscape-horizon-46-4K.jpg'
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.sanity\.io\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sanity-images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
              },
            },
          },
          {
            urlPattern: /\.(?:webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'optimized-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 jours pour les images
              },
            },
          },
          // Cache séparé pour les gros projets (sans précache)
          {
            urlPattern: /\/assets\/img\/projects\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'project-images',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 24 * 60 * 60, // 1 jour seulement
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
  // Optimisations avancées pour la production
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Augmenter la limite pour éviter les warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Chunking manuel optimisé
        manualChunks: {
          // Bibliothèques React de base
          'react-vendor': ['react', 'react-dom'],
          // Router séparé
          'router': ['react-router-dom'],
          // Bibliothèques d'animation (très lourdes)
          'animations': ['framer-motion'],
          // FontAwesome optimisé (seulement les icônes utilisées)
          'icons': [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/react-fontawesome'
          ],
          // CMS et API
          'cms': ['@sanity/client', '@sanity/image-url'],
          // Utilitaires CSS légers
          'css-utils': ['clsx', 'tailwind-merge'],
          // Séparer les gros composants d'univers
          'univers': (id) => {
            if (id.includes('Univers/')) {
              return 'univers-narratifs'
            }
          },
          // Séparer le Studio
          'studio': (id) => {
            if (id.includes('Studio/')) {
              return 'studio-components'
            }
          },
          // Séparer l'Atelier
          'atelier': (id) => {
            if (id.includes('Atelier/')) {
              return 'atelier-components'
            }
          }
        },
        // Optimiser les noms de fichiers
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            return '[name]-[hash].js'
          }
          return 'chunks/[name]-[hash].js'
        },
        assetFileNames: (assetInfo) => {
          // Organiser les assets par type
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash].[ext]'
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash].[ext]'
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return 'assets/fonts/[name]-[hash].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    },
    // Optimisations de compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        reduce_vars: true,
        reduce_funcs: true,
      },
      mangle: {
        safari10: true,
      },
    },
    // Réduire la taille des CSS
    cssCodeSplit: true,
  },
  // Optimisations des dépendances
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@sanity/client',
      'clsx',
      'tailwind-merge'
    ],
    // Exclure les gros modules du pré-bundling
    exclude: ['framer-motion']
  },
  // Configuration pour la production
  define: {
    // Optimiser les variables d'environnement
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
})
