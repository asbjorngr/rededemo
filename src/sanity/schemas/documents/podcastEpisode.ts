import { defineType, defineField } from 'sanity'

export const podcastEpisode = defineType({
  name: 'podcastEpisode',
  title: 'Podcast-episode',
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
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify-URL',
      type: 'url',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Miniatyrbilde',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publisert',
      type: 'datetime',
    }),
    defineField({
      name: 'duration',
      title: 'Varighet (minutter)',
      type: 'number',
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episodenummer',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      episodeNumber: 'episodeNumber',
      media: 'thumbnail',
    },
    prepare({ title, episodeNumber, media }) {
      return {
        title,
        subtitle: episodeNumber ? `Episode ${episodeNumber}` : undefined,
        media,
      }
    },
  },
})
