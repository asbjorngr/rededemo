import { defineQuery } from 'next-sanity'

export const ARTICLES_QUERY = defineQuery(
  `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    type,
    teaser,
    heroImage,
    tags[]->{ _id, title, slug },
    edition->{ _id, title, number, year }
  }`
)

export const ARTICLE_BY_SLUG_QUERY = defineQuery(
  `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    type,
    teaser,
    heroImage,
    body,
    sections,
    scrollyTheme,
    scrollyBackground,
    tags[]->{ _id, title, slug },
    edition->{ _id, title, number, year },
    author->{ _id, name, bio, portrait }
  }`
)

export const EDITION_QUERY = defineQuery(
  `*[_type == "edition"] | order(year desc, number desc) [0] {
    _id,
    title,
    number,
    year,
    coverImage,
    publishedAt,
    "articles": *[_type == "article" && references(^._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      type,
      teaser,
      heroImage,
      tags[]->{ _id, title, slug }
    }
  }`
)

export const RELATED_ARTICLES_QUERY = defineQuery(
  `*[_type == "article" && _id != $id && type == "scrollytelling"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    type,
    teaser,
    heroImage,
    tags[]->{ _id, title, slug }
  }`
)

export const MENU_QUERY = defineQuery(
  `{
    "tags": *[_type == "tag"] | order(title asc) { _id, title, slug },
    "featured": *[_type == "article" && type == "scrollytelling"] | order(publishedAt desc) [0] {
      _id, title, slug, heroImage, tags[]->{ _id, title }
    }
  }`
)

export const TAG_PAGE_QUERY = defineQuery(
  `{
    "tag": *[_type == "tag" && slug.current == $slug][0] { _id, title, slug },
    "articles": *[_type == "article" && references(*[_type == "tag" && slug.current == $slug][0]._id)] | order(publishedAt desc) {
      _id, title, slug, type, teaser, heroImage,
      tags[]->{ _id, title, slug }
    }
  }`
)

export const FRONTPAGE_QUERY = defineQuery(
  `{
    "edition": *[_type == "edition"] | order(year desc, number desc) [0] {
      _id, title, number, year, coverImage
    },
    "articles": *[_type == "article"] | order(publishedAt desc) {
      _id, title, slug, type, teaser, heroImage,
      tags[]->{ _id, title, slug }
    },
    "editorial": *[_type == "editorial"][0] {
      _id, title, slug, teaserText
    },
    "podcast": *[_type == "podcastEpisode"] | order(publishedAt desc) [0] {
      _id, title, slug, description, spotifyUrl, thumbnail, duration, episodeNumber,
      tags[]->{ _id, title }
    }
  }`
)
