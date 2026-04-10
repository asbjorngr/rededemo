import { defineType, defineField } from 'sanity'

export const edition = defineType({
  name: 'edition',
  title: 'Utgave',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Nummer',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'År',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publisert',
      type: 'datetime',
    }),
    defineField({
      name: 'coverImage',
      title: 'Forsidebilde',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      number: 'number',
      year: 'year',
      media: 'coverImage',
    },
    prepare({ title, number, year, media }) {
      return {
        title: title || `Rede nr ${number} ${year}`,
        media,
      }
    },
  },
})
