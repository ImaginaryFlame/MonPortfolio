import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'
import { i18nConfig } from './config/languages'

export default defineConfig({
  name: 'default',
  title: 'flame-portfolio',

  projectId: '64yujm4t',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },

  cors: {
    allowOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:3002',
      'http://127.0.0.1:3003',
      'http://127.0.0.1:5173'
    ],
    allowCredentials: true,
    allowHeaders: ['Authorization', 'Content-Type'],
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  },

  i18n: i18nConfig,

  document: {
    productionUrl: async (prev, context) => {
      const { document } = context;
      if (!document._id) return prev;
      
      const baseUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3003';
      return `${baseUrl}/${document._type}/${document._id}`;
    },
  }
})
