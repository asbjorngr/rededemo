/**
 * Import-script for Rede 2 2026
 *
 * Leser docx-filer, analyserer med Claude, laster opp bilder,
 * og oppretter alt innhold i Sanity.
 *
 * Kjør: npx tsx scripts/import-edition.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { createClient } from '@sanity/client'
import mammoth from 'mammoth'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'

// --- Config ---

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

const CONTENT_DIR = path.join(
  process.cwd(),
  'content',
  'Rede 2 2026'
)

// --- Article definitions ---

interface ArticleDef {
  folder: string
  docxFiles: string[]
  title: string
  type: 'scrollytelling' | 'standard'
  imageDir?: string
  slug: string
  tags: string[]
}

const ARTICLES: ArticleDef[] = [
  {
    folder: 'Kjepphest',
    docxFiles: ['kjepphest_rede2_26.docx'],
    title: 'Gøy med kjepphest',
    type: 'scrollytelling',
    imageDir: 'bilder',
    slug: 'goy-med-kjepphest',
    tags: ['fritid', 'sport', 'barn'],
  },
  {
    folder: 'Alma Mater_mat og profil',
    docxFiles: ['Amla mater_rede2_26.docx'],
    title: 'Fransk finesse bak disken',
    type: 'scrollytelling',
    imageDir: 'Filemail.com - Alma Mater bilder',
    slug: 'fransk-finesse-bak-disken',
    tags: ['mat', 'kultur', 'nabolag'],
  },
  {
    folder: 'Promenade',
    docxFiles: ['Forsvarsrunden_rede2_26.docx'],
    title: 'Forsvarsrunden',
    type: 'scrollytelling',
    imageDir: 'Bilder Forvarsrunden',
    slug: 'forsvarsrunden',
    tags: ['fritid', 'nabolag', 'kultur'],
  },
  {
    folder: 'Støtte til lag og foreninger',
    docxFiles: ['TOBB støtte curling_rede2_ 26.docx'],
    title: 'Curlingfeber på Hoeggen',
    type: 'standard',
    imageDir: 'wetransfer_curling_2026-03-03_1245 2',
    slug: 'curlingfeber-pa-hoeggen',
    tags: ['sport', 'fritid', 'nabolag'],
  },
  {
    folder: 'Grønn Plattform',
    docxFiles: ['Grønn plattform med Vendom, DIPLOM og TOBB_rede2_26.docx'],
    title: 'Grønn Plattform',
    type: 'standard',
    slug: 'gronn-plattform',
    tags: ['bolig', 'bærekraft'],
  },
  {
    folder: 'Bank og megler',
    docxFiles: ['Bank_rede2_26.docx', 'Eiendomsmegler_rede2_26.docx'],
    title: 'Bank og megler',
    type: 'standard',
    slug: 'bank-og-megler',
    tags: ['økonomi', 'bolig'],
  },
  {
    folder: 'Trygghet rundt boligselskapsmodellen',
    docxFiles: ['Felleskostnader_rede2_26.docx', 'Utfordringer i boligselskap i nord1_rede2_26.docx'],
    title: 'Trygghet rundt boligselskapsmodellen',
    type: 'standard',
    slug: 'trygghet-boligselskap',
    tags: ['bolig', 'økonomi'],
  },
  {
    folder: 'Medlem_forskjøpsrett',
    docxFiles: ['Medlem nr 80000_rede2_26.docx'],
    title: 'Medlem nummer 80 000!',
    type: 'standard',
    slug: 'medlem-nummer-80000',
    tags: ['bolig'],
  },
  {
    folder: 'Medlem case',
    docxFiles: ['Ole Elias_rede2_26.docx'],
    title: 'Ole Elias',
    type: 'standard',
    slug: 'ole-elias',
    tags: ['bolig', 'nabolag'],
  },
  {
    folder: 'Hit Padel',
    docxFiles: ['hit padel_rede2_26.docx'],
    title: 'Hit Padel',
    type: 'standard',
    imageDir: 'Hit Padel',
    slug: 'hit-padel',
    tags: ['sport', 'fritid'],
  },
  {
    folder: 'Høyt&Lavt',
    docxFiles: ['Høyt&lavt_rede2_26.docx'],
    title: 'Høyt og lavt',
    type: 'standard',
    imageDir: 'wetransfer_adelie-zip-line-jpg_2026-03-23_1719',
    slug: 'hoyt-og-lavt',
    tags: ['fritid', 'barn'],
  },
  {
    folder: 'Trondheim Kino',
    docxFiles: ['Trondheim Kino_rede2_26.docx'],
    title: 'Trondheim Kino',
    type: 'standard',
    imageDir: 'Trondheim Kino bilder til TOBB',
    slug: 'trondheim-kino',
    tags: ['kultur', 'fritid'],
  },
  {
    folder: 'Kåseri',
    docxFiles: ['Rede 2602_taklekkasje.docx'],
    title: 'Farvel til tørt inneklima',
    type: 'standard',
    slug: 'farvel-til-tort-inneklima',
    tags: ['bolig'],
  },
]

const TAG_LIST = [
  'bolig', 'økonomi', 'fritid', 'kultur', 'mat',
  'sport', 'nabolag', 'bærekraft', 'barn',
]

// --- Helpers ---

async function readDocx(filePath: string): Promise<string> {
  const result = await mammoth.extractRawText({ path: filePath })
  return result.value
}

async function findImages(dir: string): Promise<string[]> {
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir)
  return files
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map((f) => path.join(dir, f))
    .slice(0, 8) // Max 8 bilder per artikkel for å spare tid/plass
}

async function uploadImage(
  filePath: string,
  filename: string
): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } }> {
  const buffer = fs.readFileSync(filePath)
  const asset = await sanity.assets.upload('image', buffer, {
    filename,
    contentType: filePath.toLowerCase().endsWith('.png')
      ? 'image/png'
      : 'image/jpeg',
  })
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  }
}

function textToPortableText(text: string) {
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return paragraphs.map((p) => {
    // Detect headings (short lines, no period at end)
    const isHeading =
      p.length < 80 &&
      !p.endsWith('.') &&
      !p.endsWith(',') &&
      !p.startsWith('–') &&
      !p.startsWith('"') &&
      !p.startsWith('«')

    return {
      _type: 'block',
      _key: randomKey(),
      style: isHeading ? 'h2' : 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: randomKey(),
          text: p.replace(/\n/g, ' '),
          marks: [],
        },
      ],
    }
  })
}

function randomKey(): string {
  return Math.random().toString(36).substring(2, 10)
}

// --- AI Analysis ---

async function analyzeArticle(
  text: string,
  title: string,
  type: 'scrollytelling' | 'standard',
  imageCount: number
): Promise<{
  teaser: string
  ogDescription: string
  estimatedReadTime: number
  sections?: Array<{
    _type: string
    [key: string]: unknown
  }>
}> {
  const sectionPrompt =
    type === 'scrollytelling'
      ? `
Lag også en sections-array for scrollytelling. Bruk disse seksjonstypene:
- heroSection: {_type: "heroSection", title: string, subtitle?: string, titlePosition: "center"|"bottomLeft"|"bottomRight", imageIndex: number}
- textWithImage: {_type: "textWithImage", text: string, imageIndex: number, imagePosition: "left"|"right", imageSize: "small"|"medium"|"large"}
- fullscreenParallax: {_type: "fullscreenParallax", overlayText: string, imageIndex: number, overlayPosition: "left"|"center"|"right", darkenOverlay: number}
- pullQuote: {_type: "pullQuote", quote: string, attribution?: string, style: "large"|"decorated"|"minimal"}
- factBox: {_type: "factBox", title: string, content: string, style: "highlight"|"sidebar"|"fullWidth"}
- gallery: {_type: "gallery", imageIndices: number[], layout: "grid"|"carousel"|"masonry"}

Det er ${imageCount} bilder tilgjengelig (indeks 0-${imageCount - 1}).
Bruk imageIndex for å referere til bilder. Første bilde (indeks 0) bør brukes i hero.
Lag 5-8 seksjoner med god variasjon. Varier overganger.`
      : ''

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `Analyser denne norske magasinartikkelen og gi meg:

1. "teaser": En kort, engasjerende teaser på 1-2 setninger (norsk bokmål)
2. "ogDescription": En SEO-vennlig beskrivelse på maks 160 tegn
3. "estimatedReadTime": Estimert lesetid i minutter
${sectionPrompt}

Svar KUN med gyldig JSON, ingen annen tekst.

Tittel: ${title}

Tekst:
${text.substring(0, 6000)}`,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  // Parse JSON from response (handle potential markdown wrapping)
  let jsonStr = content.text.trim()
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  return JSON.parse(jsonStr)
}

// --- Build Sanity sections from AI output ---

function buildSections(
  aiSections: Array<{ _type: string; [key: string]: unknown }>,
  uploadedImages: Array<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } }>
) {
  return aiSections.map((section) => {
    const key = randomKey()

    switch (section._type) {
      case 'heroSection':
        return {
          _type: 'heroSection',
          _key: key,
          title: section.title,
          subtitle: section.subtitle,
          titlePosition: section.titlePosition || 'center',
          transition: 'none',
          image: uploadedImages[section.imageIndex as number] || uploadedImages[0],
        }

      case 'textWithImage':
        return {
          _type: 'textWithImage',
          _key: key,
          text: textToPortableText(section.text as string),
          imagePosition: section.imagePosition || 'right',
          imageSize: section.imageSize || 'medium',
          transition: 'crossfade',
          image: uploadedImages[section.imageIndex as number] || uploadedImages[1],
        }

      case 'fullscreenParallax':
        return {
          _type: 'fullscreenParallax',
          _key: key,
          overlayText: textToPortableText(section.overlayText as string),
          overlayPosition: section.overlayPosition || 'center',
          darkenOverlay: section.darkenOverlay || 40,
          transition: 'crossfade',
          backgroundImage: uploadedImages[section.imageIndex as number] || uploadedImages[0],
        }

      case 'pullQuote':
        return {
          _type: 'pullQuote',
          _key: key,
          quote: section.quote,
          attribution: section.attribution,
          style: section.style || 'large',
          transition: 'crossfade',
        }

      case 'factBox':
        return {
          _type: 'factBox',
          _key: key,
          title: section.title,
          content: textToPortableText(section.content as string),
          style: section.style || 'highlight',
          transition: 'none',
        }

      case 'gallery':
        return {
          _type: 'gallery',
          _key: key,
          layout: section.layout || 'grid',
          transition: 'crossfade',
          images: ((section.imageIndices as number[]) || []).map((idx) => {
            const img = uploadedImages[idx]
            return {
              ...img,
              _key: randomKey(),
              alt: 'Bilde fra artikkelen',
            }
          }),
        }

      default:
        console.warn(`  ⚠ Ukjent seksjonstype: ${section._type}`)
        return null
    }
  }).filter(Boolean)
}

// --- Main import ---

async function main() {
  console.log('🚀 Starter import av Rede 2 2026\n')

  // 1. Create edition
  console.log('📖 Oppretter utgave...')
  const edition = await sanity.create({
    _type: 'edition',
    title: 'Rede nr 2 2026',
    number: 2,
    year: 2026,
    publishedAt: '2026-04-01T00:00:00Z',
  })
  console.log(`   ✓ Utgave: ${edition._id}\n`)

  // 2. Create tags
  console.log('🏷️  Oppretter tags...')
  const tagMap: Record<string, string> = {}
  for (const tagName of TAG_LIST) {
    const existing = await sanity.fetch(
      `*[_type == "tag" && title == $title][0]._id`,
      { title: tagName }
    )
    if (existing) {
      tagMap[tagName] = existing
      console.log(`   ✓ ${tagName} (eksisterer)`)
    } else {
      const tag = await sanity.create({
        _type: 'tag',
        title: tagName,
        slug: { _type: 'slug', current: tagName },
      })
      tagMap[tagName] = tag._id
      console.log(`   ✓ ${tagName}`)
    }
  }
  console.log('')

  // 3. Import articles
  for (const article of ARTICLES) {
    console.log(`📝 ${article.title} (${article.type})`)

    // Read docx
    let fullText = ''
    for (const docx of article.docxFiles) {
      const docxPath = path.join(CONTENT_DIR, article.folder, docx)
      if (fs.existsSync(docxPath)) {
        const text = await readDocx(docxPath)
        fullText += text + '\n\n'
      } else {
        console.warn(`   ⚠ Finner ikke: ${docxPath}`)
      }
    }
    fullText = fullText.trim()

    if (!fullText) {
      console.warn(`   ⚠ Ingen tekst funnet, hopper over`)
      continue
    }

    // Find and upload images
    let uploadedImages: Array<{
      _type: 'image'
      asset: { _type: 'reference'; _ref: string }
    }> = []

    if (article.imageDir) {
      const imageDir = path.join(CONTENT_DIR, article.folder, article.imageDir)
      const imagePaths = await findImages(imageDir)
      console.log(`   📷 ${imagePaths.length} bilder funnet`)

      for (const imgPath of imagePaths) {
        try {
          const filename = path.basename(imgPath)
          console.log(`   ↑ ${filename}`)
          const img = await uploadImage(imgPath, filename)
          uploadedImages.push(img)
        } catch (err) {
          console.error(`   ✗ Feil ved opplasting: ${(err as Error).message}`)
        }
      }
    }

    // Also check for images directly in the article folder
    const directImages = await findImages(
      path.join(CONTENT_DIR, article.folder)
    )
    const newDirectImages = directImages.filter(
      (img) =>
        !uploadedImages.length ||
        !article.imageDir ||
        !img.includes(article.imageDir)
    )
    for (const imgPath of newDirectImages.slice(0, 3)) {
      try {
        const filename = path.basename(imgPath)
        console.log(`   ↑ ${filename} (direkte)`)
        const img = await uploadImage(imgPath, filename)
        uploadedImages.push(img)
      } catch (err) {
        console.error(`   ✗ Feil: ${(err as Error).message}`)
      }
    }

    // AI analysis
    console.log(`   🤖 Analyserer med Claude...`)
    let analysis
    try {
      analysis = await analyzeArticle(
        fullText,
        article.title,
        article.type,
        uploadedImages.length
      )
      console.log(`   ✓ Teaser: "${analysis.teaser.substring(0, 60)}..."`)
    } catch (err) {
      console.error(`   ✗ AI-analyse feilet: ${(err as Error).message}`)
      analysis = {
        teaser: fullText.substring(0, 150) + '...',
        ogDescription: article.title,
        estimatedReadTime: Math.ceil(fullText.split(/\s+/).length / 200),
      }
    }

    // Build Sanity document
    const doc: Record<string, unknown> = {
      _type: 'article',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      type: article.type,
      edition: { _type: 'reference', _ref: edition._id },
      publishedAt: '2026-04-01T00:00:00Z',
      tags: article.tags.map((t) => ({
        _type: 'reference',
        _ref: tagMap[t],
        _key: randomKey(),
      })),
      teaser: analysis.teaser,
      ogDescription: analysis.ogDescription,
      estimatedReadTime: analysis.estimatedReadTime,
    }

    // Hero image
    if (uploadedImages.length > 0) {
      doc.heroImage = {
        ...uploadedImages[0],
        alt: article.title,
      }
    }

    // Content: sections for scrollytelling, body for standard
    if (article.type === 'scrollytelling' && analysis.sections) {
      doc.sections = buildSections(analysis.sections, uploadedImages)
      console.log(`   ✓ ${(doc.sections as unknown[]).length} seksjoner`)
    } else {
      doc.body = textToPortableText(fullText)
    }

    // Create document
    const created = await sanity.create(doc)
    console.log(`   ✓ Opprettet: ${created._id}\n`)
  }

  console.log('✅ Import ferdig!')
}

main().catch((err) => {
  console.error('❌ Import feilet:', err)
  process.exit(1)
})
