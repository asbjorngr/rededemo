import { defineType, defineField } from 'sanity'

export const factBox = defineType({
  name: 'factBox',
  title: 'Faktaboks',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Innhold',
      type: 'blockContent',
    }),
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Fremhevet', value: 'highlight' },
          { title: 'Sidebar', value: 'sidebar' },
          { title: 'Full bredde', value: 'fullWidth' },
        ],
      },
      initialValue: 'highlight',
    }),
    defineField({
      name: 'icon',
      title: 'Ikon',
      type: 'string',
      description: 'Valgfri visuell markør (emoji eller tekst)',
    }),
    defineField({
      name: 'transition',
      title: 'Overgang',
      type: 'string',
      options: {
        list: [
          { title: 'Ingen', value: 'none' },
          { title: 'Crossfade', value: 'crossfade' },
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
      title: 'title',
    },
    prepare({ title }) {
      return { title: title || 'Faktaboks', subtitle: 'Fakta' }
    },
  },
})
