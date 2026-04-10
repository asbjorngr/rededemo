'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '@/sanity/schemas'
import { projectId, dataset } from '@/sanity/env'

export default defineConfig({
  name: 'rede-digitalt',
  title: 'Rede Digitalt',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
