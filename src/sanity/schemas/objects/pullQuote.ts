import { defineType, defineField } from 'sanity'

export const pullQuote = defineType({
  name: 'pullQuote',
  title: 'Sitat',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Sitat',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Kilde',
      type: 'string',
      description: 'Hvem sa dette',
    }),
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Stort', value: 'large' },
          { title: 'Dekorert', value: 'decorated' },
          { title: 'Minimalt', value: 'minimal' },
        ],
      },
      initialValue: 'large',
    }),
    defineField({
      name: 'transition',
      title: 'Overgang',
      type: 'string',
      options: {
        list: [
          { title: 'Ingen', value: 'none' },
          { title: 'Crossfade', value: 'crossfade' },
          { title: 'Hard cut', value: 'hardCut' },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Bakgrunnsfarge',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
    },
    prepare({ quote }) {
      return {
        title: quote ? `«${quote.slice(0, 60)}…»` : 'Sitat',
        subtitle: 'Pull-quote',
      }
    },
  },
})
