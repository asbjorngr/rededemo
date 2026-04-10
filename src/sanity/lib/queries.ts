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
    }
  }`
)
