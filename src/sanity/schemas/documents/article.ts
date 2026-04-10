import { defineType, defineField } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Artikkel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Artikkeltype',
      type: 'string',
      options: {
        list: [
          { title: 'Scrollytelling', value: 'scrollytelling' },
          { title: 'Standard', value: 'standard' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'edition',
      title: 'Utgave',
      type: 'reference',
      to: [{ type: 'edition' }],
    }),
    defineField({
      name: 'author',
      title: 'Forfatter',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publisert',
      type: 'datetime',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hovedbilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
        },
        {
          name: 'credit',
          title: 'Fotograf',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser',
      type: 'text',
      rows: 2,
      description: 'Kort intro for forsiden (1-2 setninger)',
    }),
    defineField({
      name: 'ogDescription',
      title: 'OG-beskrivelse',
      type: 'text',
      rows: 2,
      description: 'Beskrivelse for deling i sosiale medier',
    }),
    defineField({
      name: 'estimatedReadTime',
      title: 'Lesetid (minutter)',
      type: 'number',
    }),
    defineField({
      name: 'scrollyTheme',
      title: 'Scrollytelling-tema',
      type: 'string',
      options: {
        list: [
          { title: 'Varm / intim (gylne, mørke toner)', value: 'warm' },
          { title: 'Dokumentarisk / rolig (grønn/teal)', value: 'documentary' },
          { title: 'Leken / energisk (lilla)', value: 'playful' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => parent?.type !== 'scrollytelling',
      description: 'Velg fargetema for scrollytelling-opplevelsen',
    }),
    defineField({
      name: 'sections',
      title: 'Seksjoner',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textWithImage' },
        { type: 'fullscreenParallax' },
        { type: 'pullQuote' },
        { type: 'videoSection' },
        { type: 'audioSection' },
        { type: 'factBox' },
        { type: 'gallery' },
      ],
      hidden: ({ parent }) => parent?.type !== 'scrollytelling',
      description: 'Byggeklosser for scrollytelling-artikler',
    }),
    defineField({
      name: 'body',
      title: 'Brødtekst',
      type: 'blockContent',
      hidden: ({ parent }) => parent?.type !== 'standard',
      description: 'Brødtekst for standard-artikler',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'heroImage',
    },
    prepare({ title, type, media }) {
      return {
        title,
        subtitle: type === 'scrollytelling' ? '📜 Scrollytelling' : '📄 Standard',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Publiseringsdato',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
