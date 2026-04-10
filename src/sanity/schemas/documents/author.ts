import { defineType, defineField } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Forfatter',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biografi',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'portrait',
      title: 'Portrett',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'portrait',
    },
  },
})
