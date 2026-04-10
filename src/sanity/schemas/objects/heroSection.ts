import { defineType, defineField } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero-seksjon',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt-tekst', type: 'string' },
        { name: 'credit', title: 'Fotograf', type: 'string' },
      ],
    }),
    defineField({
      name: 'video',
      title: 'Bakgrunnsvideo',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Valgfri — erstatter bildet som bakgrunn',
    }),
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Undertittel',
      type: 'string',
    }),
    defineField({
      name: 'titlePosition',
      title: 'Tittelplassering',
      type: 'string',
      options: {
        list: [
          { title: 'Sentrert', value: 'center' },
          { title: 'Nederst til venstre', value: 'bottomLeft' },
          { title: 'Nederst til høyre', value: 'bottomRight' },
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'transition',
      title: 'Overgang',
      type: 'string',
      options: {
        list: [
          { title: 'Ingen', value: 'none' },
          { title: 'Crossfade', value: 'crossfade' },
          { title: 'Wipe', value: 'wipe' },
          { title: 'Fargeskift', value: 'colorShift' },
          { title: 'Hard cut', value: 'hardCut' },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Bakgrunnsfarge',
      type: 'string',
      description: 'Valgfri CSS-farge (f.eks. #003865)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return { title: title || 'Hero-seksjon', subtitle: 'Hero', media }
    },
  },
})
