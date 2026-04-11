import { defineType, defineField } from 'sanity'

export const horizontalImageStrip = defineType({
  name: 'horizontalImageStrip',
  title: 'Horisontal bilderekke',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      description: 'Valgfri overskrift over bilderekken',
    }),
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt-tekst', type: 'string' },
            { name: 'caption', title: 'Bildetekst', type: 'string' },
          ],
        },
      ],
      validation: (rule) => rule.min(3).max(10),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Bakgrunnsfarge',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Horisontal bilderekke' }
    },
  },
})
