/**
 * Eksporterer alle artikler fra Sanity som ren tekst.
 * Output: content/audio-tekster/<slug>.txt
 *
 * Bruk: node scripts/export-article-text.mjs
 */

import { createClient } from '@sanity/client'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'

const client = createClient({
  projectId: 'tqfezovu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const OUTPUT_DIR = join(process.cwd(), 'content', 'audio-tekster')

// --- Portable Text → ren tekst ---

function portableTextToPlain(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .filter((b) => b._type === 'block')
    .map((block) => {
      const text = (block.children || []).map((c) => c.text || '').join('')
      // Legg til linjeskift etter overskrifter
      if (block.style?.startsWith('h')) return text + '\n'
      return text
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// --- Seksjon → tekst (scrollytelling) ---

function sectionToText(section) {
  const parts = []

  switch (section._type) {
    case 'heroSection':
      if (section.title) parts.push(section.title)
      if (section.subtitle) parts.push(section.subtitle)
      break

    case 'textWithImage':
      if (section.text) parts.push(portableTextToPlain(section.text))
      break

    case 'pullQuote':
      if (section.quote) parts.push(`«${section.quote}»`)
      if (section.attribution) parts.push(`— ${section.attribution}`)
      break

    case 'factBox':
      if (section.title) parts.push(section.title)
      if (section.content) parts.push(portableTextToPlain(section.content))
      break

    case 'numberedStop':
      if (section.title) parts.push(section.title)
      if (section.text) parts.push(portableTextToPlain(section.text))
      break

    case 'countUpFact':
      if (section.label) {
        const num = [section.prefix, section.number, section.suffix]
          .filter(Boolean)
          .join('')
        parts.push(`${num} ${section.label}`)
      }
      break

    case 'recipeCard':
      if (section.title) parts.push(section.title)
      if (section.intro) parts.push(portableTextToPlain(section.intro))
      if (section.ingredients?.length) {
        parts.push('Ingredienser:')
        parts.push(section.ingredients.map((i) => `- ${i}`).join('\n'))
      }
      if (section.steps?.length) {
        parts.push('Fremgangsmåte:')
        parts.push(section.steps.map((s, i) => `${i + 1}. ${s}`).join('\n'))
      }
      break

    case 'interactiveQuiz':
      if (section.question) parts.push(section.question)
      break

    // Seksjoner uten tekst (gallery, video, audio, fullscreenParallax, etc.)
    default:
      break
  }

  return parts.filter(Boolean).join('\n')
}

// --- Hovedlogikk ---

async function main() {
  console.log('Henter artikler fra Sanity...\n')

  const articles = await client.fetch(`
    *[_type == "article"] | order(title asc) {
      _id,
      title,
      slug,
      type,
      teaser,
      body,
      sections,
      author->{ name }
    }
  `)

  await mkdir(OUTPUT_DIR, { recursive: true })

  let count = 0

  for (const article of articles) {
    const slug = article.slug?.current
    if (!slug) continue

    const parts = []

    // Tittel
    parts.push(article.title)
    parts.push('')

    // Ingress
    if (article.teaser) {
      parts.push(article.teaser)
      parts.push('')
    }

    // Innhold
    if (article.type === 'standard' && article.body) {
      parts.push(portableTextToPlain(article.body))
    } else if (article.type === 'scrollytelling' && article.sections) {
      for (const section of article.sections) {
        const text = sectionToText(section)
        if (text) {
          parts.push(text)
          parts.push('')
        }
      }
    }

    const fullText = parts.join('\n').replace(/\n{3,}/g, '\n\n').trim()
    const filename = `${slug}.txt`
    await writeFile(join(OUTPUT_DIR, filename), fullText, 'utf-8')

    const wordCount = fullText.split(/\s+/).length
    const estMinutes = Math.ceil(wordCount / 150) // ~150 ord/min for tale
    console.log(`  ${filename} (${wordCount} ord, ~${estMinutes} min)`)
    count++
  }

  console.log(`\n${count} artikler eksportert til content/audio-tekster/`)
}

main().catch(console.error)
