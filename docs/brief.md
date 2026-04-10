# Brief: Rede digitalt

Type: Brief
Deltagere Superponni: Øystein Eugene Hermstad, Trine, Elise Gumaer
Dato: April 9, 2026 10:56 PM
Last Edited Time: April 10, 2026 3:41 PM
Created By: Asbjørn Grønli

# Rede Digitalt — Prosjektbrief

> **Versjon:** 2.0
**Dato:** 10. april 2026
**Status:** Komplett MVP-spec — klar for Claude Code
> 

---

## 1. Prosjektet i korthet

**Rede** er TOBBs medlemsmagasin som i dag lever i print og som enkel PDF-blaløsning på Issuu. Byrået skal bygge en digital plattform — **rede.tobb.no** — som transformerer dette til en moderne, engasjerende innholdsopplevelse med scrollytelling, video, podcast og flermediebruk.

**Mål:** Gjøre eksisterende innhold mer engasjerende, spesielt for unge voksne (18-30).

**Plattformen skal være åpen for alle** — ingen innlogging.

---

## 2. Målgruppe og tone

- **Primær målgruppe:** Unge voksne (18-30)
- **Språk:** Norsk bokmål
- **Visuelt uttrykk:** TOBBs merkevare i bunn (farger, fonter, logo), men med frihet til å være fargerikt, lekent og uformelt i de digitale formatene
- **Tonalitet i leseopplevelsen:** Varierer med artikkelen — en personlig historie føles annerledes enn en faktasak. AI-en må "lese rommet" og tilpasse stemning per artikkel.

---

## 3. Plattformens struktur

### 3.1 Forsiden (oppdagelsesflaten)

En visuelt rik flate der man oppdager innhold. Følelsen av **"en verden av innhold"**.

**Referanser:** Snapchat Discover (rikdom/mangfold), Netflix (hero + tematiske rader), NRK (temabasert organisering).

**Organisering:**

- Innhold organiseres primært etter **temaer/tags** (bolig, økonomi, nabolag osv.), ikke etter utgave
- Kombinasjon av artikkelkort i grid, vertikal feed og horisontale karuseller
- Video og podcast (TOBBcast) har **egne synlige seksjoner/kort** på forsiden
- Lederen fra siste utgave synlig som teaser, med fullverdig lyd/video-opplevelse når man går inn

**Design:**

- Animasjoner og mikrointeraksjoner er viktige for førsteinntrykket (hover-effekter, smooth transitions)
- Eksakt visuelt layout er åpent for iterasjon — visuell stil ikke endelig besluttet
- **Viktig prioritering: Artiklene er showet — forsiden trenger bare å være god nok til å få folk inn i innholdet**

### 3.2 Artikkelopplevelsen — To nivåer

### Scrollytelling (premium)

Full behandling med alle byggeklosser. Ca. 3-5 per utgave, håndplukket.

**Navigasjon:**

- Én sammenhengende scroll-flyt (ingen harde brudd eller kapittelnavigasjon)
- Progress-indikator som viser hvor langt man har kommet

**Følelse:** Varierer med innholdet — en miks av filmatisk, interaktiv og redaksjonell avhengig av artikkelens karakter.

**Åtte seksjonstyper (byggeklosser):**

| Seksjonstype | Beskrivelse |
| --- | --- |
| Hero-seksjon | Fullskjerm bilde/video med tittel |
| Tekst med bilde | Klassisk artikkelformat |
| Fullskjerm bilde/video med parallax | Tekst over visuelt bakgrunnselement |
| Sitat / pull-quote | Stort, visuelt fremhevet sitat |
| Video-seksjon | Embedded video |
| Podcast/lyd-seksjon | Embedded lyd med visuell tidslinje |
| Faktaboks / infografikk | Fremhevet fakta eller visuell datavisning |
| Galleri | Flere bilder i samling |

Ulike seksjonstyper kombineres i samme artikkel for variasjon og rytme. AI-en velger hvilke som passer basert på innholdets tone, og lager naturlige overganger mellom dem.

### Standard artikkel (pen og lesbar)

For artikler som ikke får full scrollytelling-behandling.

- Godt designet lesevisning med tekst og bilder — tenk Medium/Substack
- Rent, typografisk sterkt, behagelig å lese
- Ingen avanserte scroll-effekter
- Minimalt manuelt arbeid å publisere
- Sikrer at **alt** innhold lever på plattformen

### 3.3 Lederen

Hybrid-element:

- **På forsiden:** Kort intro/teaser
- **Når man går inn:** Egen fullverdig opplevelse med lyd/video

### 3.4 Innholdstyper på plattformen

- Artikler (scrollytelling + standard)
- Videoer fra TOBBs innholdsprodusent
- TOBBcast-episoder (podcast)
- Lederen (hybrid: teaser + full opplevelse)

### 3.5 Arkiv

Alle artikler fra alle utgaver tilgjengelig, organisert etter temaer/tags. Inspirert av NRK-modellen med scrollytellinger under temaer.

### 3.6 Sosial interaksjon

- **MVP:** Delingsknapper
- **Senere:** Kommentarfelt (eventuelt)

---

## 4. Responsivitet

- Mobil og desktop **like viktige fra start**
- Scrollytelling-komponenter designes responsivt
- Effekter tilpasses per flate (f.eks. parallax med tekst ved siden av bilde på desktop → stacked vertikalt på mobil)

### 4.1 Responsivitetsstrategi per seksjonstype

Hver seksjonstype må ha en definert oppførsel for begge flater:

| Seksjonstype | Desktop | Mobil |
| --- | --- | --- |
| **Hero-seksjon** | Fullskjerm med tittel-overlay, evt. bakgrunnsvideo | Fullskjerm, video erstattes med poster-bilde + play-knapp for å spare data |
| **Tekst med bilde** | Tekst og bilde side om side (50/50 eller 60/40) | Stacked vertikalt — bilde over tekst |
| **Fullskjerm parallax** | Parallax-effekt med tekst ved siden av eller over bildet | Enklere parallax eller statisk bilde med tekst stacked under. Parallax-intensitet reduseres for ytelse |
| **Sitat / pull-quote** | Stort, sentrert med god luft og dekorativt element | Noe mindre font, men fortsatt visuelt markert |
| **Video-seksjon** | Inline video med autoplay (muted) | Poster-bilde med play-knapp, brukeren velger å spille. Sparer data og batteri |
| **Podcast/lyd** | Visuell tidslinje med waveform, bred layout | Kompakt spiller, tidslinje forenklet |
| **Faktaboks** | Kan ha kolonne-layout, infografikk i full bredde | Single-column, infografikk skalert ned eller forenklet |
| **Galleri** | Grid eller karusell med forhåndsvisning | Horisontal swipe-karusell |

---

## 5. Teknisk stack

| Komponent | Valg | Begrunnelse |
| --- | --- | --- |
| **Frontend** | Next.js (React) | SSR/SSG for SEO, rikt animasjonsøkosystem |
| **CMS** | Sanity (headless) | API-first, Claude Code kan importere direkte, visuelt grensesnitt for TOBB på sikt, norsk, generøst free tier |
| **Hosting** | Vercel | Enkelt, billig, perfekt med Next.js |
| **Scroll-animasjoner** | GSAP / Framer Motion (eller lignende) | Industri-standard for scroll-drevne animasjoner |
| **SEO** | Server-side rendering, semantisk HTML, Open Graph-tags | Google-synlighet er viktig |
| **Tilgjengelighet** | Grunnleggende (god kontrast, lesbarhet) | Ikke full WCAG, men grunnleggende a11y |

### Media-håndtering

| Medietype | Løsning |
| --- | --- |
| **Video** | Sanity asset-håndtering (Mux under panseret) for adaptiv streaming. Korte klipp (<30s) kan serveres statisk. |
| **Podcast** | Spotify-embed (TOBBcast publiseres allerede på Spotify) |
| **Bilder** | Via Sanity/CDN |
| **Lyd (leder)** | Sanity assets |

### 5.1 Sanity innholdsmodell (skjemaer)

Innholdsmodellen i Sanity definerer hvordan alt innhold struktureres. Disse skjemaene er det Claude Code bygger, og de danner grunnlaget for hele plattformen.

### Artikkel (scrollytelling)

```
article {
  title: string              // Artikkelens tittel
  slug: slug                 // URL-vennlig versjon av tittel
  type: 'scrollytelling' | 'standard'
  publishedAt: datetime
  edition: reference → edition   // Hvilken Rede-utgave
  tags: array of string      // Tematiske tags (bolig, økonomi, nabolag...)
  author: string
  teaser: text               // Kort intro for forsiden (1-2 setninger)
  ogDescription: text        // Open Graph / SEO-beskrivelse
  ogImage: image             // Delingsbilde for SoMe
  heroImage: image           // Hovedbilde
  estimatedReadTime: number  // Minutter
  sections: array of section // Byggeklossene (kun for scrollytelling)
  body: portableText         // Brødtekst (kun for standard-artikler)
}
```

### Seksjon (byggekloss i scrollytelling)

```
section {
  _type: 'heroSection' | 'textWithImage' | 'fullscreenParallax' |
         'pullQuote' | 'videoSection' | 'audioSection' |
         'factBox' | 'gallery'

  // Felles felter for alle seksjonstyper:
  transition: string           // Fri tekst eller forhåndsdefinerte verdier — se seksjon 6 for meny av muligheter
  backgroundColor: color       // Valgfri bakgrunnsfarge

  // Type-spesifikke felter:

  heroSection {
    image: image
    video: file              // Valgfri bakgrunnsvideo
    title: string
    subtitle: string
    titlePosition: 'center' | 'bottomLeft' | 'bottomRight'
  }

  textWithImage {
    text: portableText
    image: image
    imagePosition: 'left' | 'right'
    imageSize: 'small' | 'medium' | 'large'
  }

  fullscreenParallax {
    backgroundImage: image
    backgroundVideo: file    // Valgfri
    overlayText: portableText
    overlayPosition: 'left' | 'center' | 'right'
    darkenOverlay: number    // 0-100, for lesbarhet
  }

  pullQuote {
    quote: text
    attribution: string     // Hvem sa det
    style: 'large' | 'decorated' | 'minimal'
  }

  videoSection {
    video: file              // Opplastet via Sanity
    caption: string
    autoplay: boolean
    layout: 'fullWidth' | 'contained'
  }

  audioSection {
    audioFile: file          // For egenprodusert lyd
    spotifyEmbed: url        // For TOBBcast
    title: string
    description: text
  }

  factBox {
    title: string
    content: portableText
    style: 'highlight' | 'sidebar' | 'fullWidth'
    icon: string             // Valgfri visuell markør
  }

  gallery {
    images: array of image (med caption)
    layout: 'grid' | 'carousel' | 'masonry'
  }
}
```

### Utgave (Rede-nummer)

```
edition {
  title: string              // F.eks. "Rede nr 1 2026"
  number: number
  year: number
  publishedAt: datetime
  coverImage: image
}
```

### Leder

```
editorial {
  title: string
  slug: slug
  edition: reference → edition
  teaserText: text           // Kort intro for forsiden
  fullText: portableText     // Hele lederen
  audioFile: file            // Lydversjon
  videoFile: file            // Valgfri videoversjon
  publishedAt: datetime
}
```

### Video (frittstående)

```
videoPost {
  title: string
  slug: slug
  description: text
  video: file
  thumbnail: image
  tags: array of string
  publishedAt: datetime
  duration: number           // Sekunder
}
```

### Podcast-episode

```
podcastEpisode {
  title: string
  slug: slug
  description: text
  spotifyUrl: url
  thumbnail: image
  tags: array of string
  publishedAt: datetime
  duration: number           // Minutter
  episodeNumber: number
}
```

---

## 6. Overganger og animasjonsregler

Animasjoner er en viktig del av scrollytelling-opplevelsen. Denne seksjonen definerer **prinsipper og en meny av muligheter** — ikke en rigid liste. Claude Code og byrået velger fritt mellom teknikkene basert på hva innholdet krever.

### 6.1 Animasjonsteknikker (meny — ikke uttømmende)

Disse teknikkene kan kombineres fritt. Listen er et utgangspunkt, ikke en begrensning — Claude Code kan og bør utforske flere muligheter der innholdet krever det.

**Inngangsanimasjoner (element dukker opp):**

- **Fade in** — element fader sakte inn. Rolig, elegant. God for tekst og sitater.
- **Slide up / slide in** — element glir inn fra en kant. Gir følelse av å "avdekke" noe.
- **Scale up** — element starter lite og vokser til full størrelse. Skaper fokus og oppmerksomhet.
- **Clip/mask reveal** — innhold avsløres gjennom en bevegelig maske, som en gardin som trekkes til side. Dramatisk og filmatisk.
- **Staggered reveal** — flere elementer dukker opp etter hverandre i sekvens (f.eks. ord i en tittel, bilder i et galleri).
- **Blur-to-sharp** — element starter uskarpt og blir skarpt. Gir en drømmende, myk inngang.
- **Counter / number ticker** — tall teller opp til en verdi. Perfekt for statistikk og faktabokser.

**Scroll-drevne effekter (styres av scroll-posisjon):**

- **Parallax** — lag beveger seg med ulik hastighet og gir dybde. Klassiker for fullskjerm-bilder.
- **Scrub** — animasjon er direkte koblet til scroll-posisjon, slik at brukeren "spiller" animasjonen med scrolling. Gir full kontroll.
- **Pin/sticky** — element festes i viewport mens annet innhold scroller forbi. Kraftig for å la tekst scrolle over et fast bilde, eller for å holde en grafikk synlig mens data endres.
- **Zoom** — bilde eller element zoomer inn/ut basert på scroll. Cinematisk, god for å gå fra oversikt til detalj.
- **Horisontal scroll** — innhold scroller horisontalt mens brukeren scroller vertikalt. Brytes opp med for noe som galleri eller tidslinje.
- **Perspective / 3D-transformasjoner** — subtile 3D-rotasjoner og perspektivendringer. Gir dybde uten å være over the top.

**Overgangseffekter (mellom seksjoner):**

- **Hard cut** — ingen overgang, umiddelbart bytte. Markerer tydelig skifte i tone eller tema.
- **Crossfade** — forrige seksjon fader ut mens neste fader inn. Myk og sømløs.
- **Wipe / slide transition** — én seksjon skyver vekk den forrige. Energisk.
- **Color/bakgrunn-shift** — bakgrunnsfargen endres gradvis mellom seksjoner. Subtil stemningsendring.
- **Ingen overgang** — seksjoner flyter naturlig etter hverandre uten spesialeffekt. Ofte det riktige valget.

**Mikrointeraksjoner (små detaljer som gir liv):**

- Hover-effekter på kort (subtil skala, fargeshift, skygge-endring)
- Smooth page transitions mellom forside og artikkel
- Progress-indikator som følger scroll
- Animerte ikoner eller illustrasjoner som reagerer på scroll
- Tekst-highlight som "maler" over nøkkelfraser når de scrolles inn i view

### 6.2 Prinsipper for animasjonsbruk

- **Innholdet styrer valget.** En emosjonell overgang (sakte fade) passer en personlig historie. Et brått cut passer et dramatisk vendepunkt. En parallax-effekt forsterker et landskapsbilde. Ikke velg animasjon for animasjonens skyld.
- **Varier innad i artikkelen.** Aldri bruk samme teknikk mellom alle seksjoner. Variasjon skaper rytme og holder leseren engasjert.
- **Forsterke, ikke distrahere.** Hvis leseren legger merke til animasjonen mer enn innholdet, er den for mye. De beste animasjonene er de man ikke aktivt tenker over.
- **Scroll-drevet > tidsbasert.** Animasjoner som styres av scroll-posisjon (scrub) gir brukeren kontroll og føles mer naturlig enn animasjoner som bare spilles av på tid.
- **Respekter `prefers-reduced-motion`.** Alt innhold må være tilgjengelig uten animasjoner. Brukere som har slått av animasjoner i nettleseren skal fortsatt få alt innhold — dette er også et NRK-prinsipp.
- **GPU-vennlig.** Animer kun `transform` og `opacity` for best ytelse. Unngå å animere `width`, `height`, `margin` eller `padding` — det trigger layout-rekalkulering og skaper hakking.
- **Hold det raskt.** Inngangsanimasjoner bør ikke vare mer enn 600ms. Scroll-drevne animasjoner styres naturlig av brukerens scroll-hastighet.
- **Vær modig, men med smak.** Dette er et magasin for unge voksne — det kan være lekent og overraskende. Men holdepunktet er alltid: tjener dette innholdet?

---

## 7. Ytelse og performance

### 7.1 Performance-budsjett

Scrollytelling med bilder og video kan bli tungt. Disse retningslinjene sikrer god opplevelse også på mobil med 4G:

| Metrikk | Mål |
| --- | --- |
| **Largest Contentful Paint (LCP)** | Under 2.5s |
| **First Input Delay (FID)** | Under 100ms |
| **Cumulative Layout Shift (CLS)** | Under 0.1 |
| **Total sidestørrelse (forsiden)** | Under 3MB initialt |
| **Total sidestørrelse (artikkel)** | Under 5MB initialt (inkl. bilder, ekskl. video) |

### 7.2 Strategier

- Lazy-load bilder og video — last kun det som er i eller nær viewport
- Bruk responsive bilder (srcset) via Sanity CDN — lever riktig størrelse per enhet
- Video: poster-bilde først, last video først når bruker scroller nær eller trykker play
- Bruk Next.js Image-komponent for automatisk optimalisering
- Unngå tunge JavaScript-biblioteker — GSAP er ~30kb gzipped, som er akseptabelt
- Prefetch neste seksjon mens bruker leser nåværende

---

## 8. Anti-AI-design-retningslinjer

**KRITISK:** Løsningen må IKKE se AI-generert ut. AI-verktøy har en gjenkjennbar visuell "default" som vi aktivt må unngå.

### 8.1 UNNGÅ (typiske AI-design-feller)

- Gradient-bakgrunner (spesielt blått → lilla)
- Overdreven bruk av avrundede hjørner og bløte skygger på kort
- Symmetriske, perfekte grid-layouts der alt er likt
- Generiske hero-seksjoner med mørk overlay over stock-foto
- Samme visuelle template for alle artikler
- Overdreven whitespace uten formål
- "Glassmorphism" eller frosted glass-effekter
- Generiske ikoner fra lucide/heroicons som visuell pynt
- Sans-serif body text i lys grå (#666) på hvit bakgrunn
- Perfekt sentrert alt — særlig titler med undertekst + knapp-combo
- Rounded pill-buttons med gradient
- Card-layouts med identisk padding og border-radius overalt

### 8.2 GJØR I STEDET

- La innholdet drive designet — hver artikkel kan ha sitt eget visuelt preg
- Bruk asymmetri og variasjon i layout mellom seksjoner
- Bruk TOBBs faktiske merkevarefarger, ikke generiske blånyanser
- La bilder og video ta plass — ikke klem dem inn i symmetriske rammer
- Varier typografi mellom seksjonstyper (en pull-quote ser helt annerledes ut enn brødtekst)
- Bruk redaksjonell design-tenkning: kontrast, hierarki, rytme
- Hent inspirasjon fra magasindesign og editorial layout, ikke fra SaaS-landingssider
- Tørr å la noen seksjoner "puste" mens andre er tette og intense
- Bruk editorial grid med varierende spaltebredder
- Tenk "print editorial meets digital" — ikke "tech dashboard"

### 8.3 Designprinsipp

Tenk **"digital redaksjonell design"** — ikke "tech-startup-nettside". Rede skal føles som et magasin med personlighet, ikke en produktside. Se referansene i seksjon 9 for konkrete eksempler på riktig retning.

---

## 9. Referanser og inspirasjon

### 9.1 Scrollytelling-referanser (studer disse nøye)

| Referanse | URL | Hva vi henter |
| --- | --- | --- |
| **NRK: Jakten på klimaendringene** | https://www.nrk.no/jakten-pa-klimaendringene-1.14375177 | Norsk scrollytelling-referanse. Fullskjerm visuelt, parallax, integrerte dataelementer, filmatisk stemning. Viser hvordan tekst og visuelt spiller sammen. |
| **NRK: The Hunt for Darcula** | https://www.nrk.no/spesial/the-hunt-for-darcula-1.17399157 | Ferskt eksempel (2025) på scrollytelling med video, animasjoner og datadrevne elementer. NRK bruker Sanity som CMS. |
| **NRK: Inside the Scam Network** | https://www.nrk.no/spesial/inside-the-scam-network-1.17399135 | Internasjonal versjon av Darcula-saken. Viser NRKs scrollytelling i praksis. |
| **NRK Spesial (samleside)** | https://www.nrk.no/spesial/ | Samlesiden for NRKs digitale historier — oversikt over alle scrollytellinger. |
| **NRK Design-prosjekter** | https://info.nrk.no/design/designprosjekter/ | NRKs egne designcases og metodikk bak de visuelle historiene. |
| **Chrome Case Study: NRK** | https://developer.chrome.com/blog/nrk-casestudy | Teknisk gjennomgang av NRKs scroll-driven animations, CMS-integrasjon med Sanity, og tilgjengelighet. |
| **The Pudding** | https://pudding.cool/ | Datadrevet, visuelt overraskende. Hver historie har sitt eget visuelle uttrykk — aldri template-følelse. |
| **The Pudding: Responsive scrollytelling** | https://pudding.cool/process/responsive-scrollytelling/ | Best practices for scrollytelling på mobil vs desktop. |
| **Maglr: 10 best scrollytelling examples** | https://www.maglr.com/blog/best-scrollytelling-examples | Kuratert samling av gode scrollytelling-eksempler fra ulike bransjer — nyttig for variasjon og inspirasjon. |
| Emergence projects | [https://emergenceprojects.com/2/](https://emergenceprojects.com/2/) | Illustrasjoner som reagerer på scrolling og beveger seg med markøren. Eksempel på hvordan type bevegelser som kan brukes når man scroller.  |
| Joyseet | [https://joyseet.com](https://joyseet.com/) | Eksempel på hvordan bilder kan dukke opp på skjermen. Ikke eksempel på scrollytelling, men eksempel på noe som kan være bakt inn i en sak.  |
|  |  |  |
| NRK Slik lurer de deg | [https://www.nrk.no/nyttig/xl/slik-lurer-de-deg-1.17628217](https://www.nrk.no/nyttig/xl/slik-lurer-de-deg-1.17628217) | Eksempel på scrollytelling der innholdet i saken blir gamified |
| Everything. Can. Be. Scanned. | [https://readymag.website/u11873052/4090383/](https://readymag.website/u11873052/4090383/) | Kul eksempel på hvordan man kan trykke på elementer for å bevege på de. Ikke scrollytelling, men eksempel på noe som kan være bakt inn i en sak.  |
| Frelsesarmeen | [https://www.vg.no/annonsorinnhold/frelsesarmeen/fattigdom-i-norge/?fbclid=IwAR05TMyUQal-ulLVKgRf6Pi3y92F-feXgcmCBG19jFle5GWtAd9xW2RMmSw](https://www.vg.no/annonsorinnhold/frelsesarmeen/fattigdom-i-norge/?fbclid=IwAR05TMyUQal-ulLVKgRf6Pi3y92F-feXgcmCBG19jFle5GWtAd9xW2RMmSw) | Eksempel på scrollytelling.  |
| Vev design | [https://www.vev.design/blog/scrollytelling-website/](https://www.vev.design/blog/scrollytelling-website/) | Samling av flere scrollytelling-eksempler. |

**Merk:** NRK-URL-er kan kreve norsk IP eller blokkere automatisert henting. Claude Code bør åpne disse manuelt i nettleser for å studere dem visuelt, eller bruke Chrome-case-studien som teknisk referanse.

### 9.2 Forside / oppdagelsesflate (konseptuelle referanser)

| Referanse | Hva vi henter |
| --- | --- |
| **Snapchat Discover** | Rikdom og mangfold av innhold, visuell oppdagelse, mobil-først, "en verden av innhold" |
| **Netflix** | Hero + tematiske rader, oppdagelsesfølelse, visuelt dominert |
| **NRK TV** (tv.nrk.no) | Temabasert organisering, horisontale karuseller, norsk referanse for innholdsplattform |

### 9.3 Standard artikkel-referanser

| Referanse | Hva vi henter |
| --- | --- |
| **Medium** | Rent, typografisk sterkt, fokus på lesbarhet |
| **Substack** | Enkel men pen artikkelvisning, god bruk av bilder |

---

## 10. Merkevare og design

- **Brand assets:** Tilgjengelig (farger, fonter, logo)
- **Frihet:** Innenfor TOBBs rammer, men med rom for lekent og fargerikt digitalt uttrykk
- **Visuelt layout forside:** Ikke endelig besluttet — itereres
- **Responsivt:** Mobil og desktop like viktige

---

## 11. AI-pipeline (innholdstransformasjon)

### 11.1 Flyt

```
1. INPUT
   Byrået laster opp PDF + råfiler (tekst, bilder) til Claude Code.
   Hele utgaven prosesseres samlet.

2. AI-ANALYSE
   Claude Code leser alt, forstår kontekst og relasjoner mellom artikler.
   For hver artikkel foreslår AI-en:
   - Komplett seksjonsstruktur med seksjonstyper
   - Naturlige overganger mellom seksjoner
   - Bildeplassering basert på originalrekkefølge
   - Lette tekstredigeringer tilpasset digitalt format
   - Teaser-tekster og overskrifter for digital bruk
   - Open Graph-beskrivelser og SEO-metadata
   - Tematiske tags

3. PREVIEW
   Resultatet vises i en forhåndsvisning (draft mode i Next.js).

4. JUSTERING
   Byrået tweaker og finpusser det som trengs.

5. PUBLISERING
   Innholdet pushes til Sanity og deployes via Vercel.
```

### 11.2 AI-ens mandat

- **Beholde** originalinnholdet, men **tilpasse lett** for digitalt format
- **Velge** seksjonstyper basert på innholdets tone og karakter
- **Foreslå** alt — byrået godkjenner
- **"Lese rommet"** og tilpasse stemning per artikkel
- **Generere** teaser-tekster, digitale overskrifter og SEO-metadata

### 11.3 Publiseringsmodell

- **Nå:** Byrået håndterer alt teknisk. TOBB leverer råmateriale.
- **På sikt:** TOBB-ansatte kan logge inn i Sanity og redigere/publisere selv.
- **Innholdsrytme:** Rede kommer 3-4 ganger i året med 10+ artikler per utgave.
- **Video/podcast:** Følger Rede-utgavenes rytme for MVP. Løpende publisering på sikt.

---

## 12. MVP-scope

| Aspekt | Beslutning |
| --- | --- |
| **Mål** | Fungerende løsning med ekte innhold for å selge inn konseptet til TOBB |
| **Tidsramme** | Et par dager |
| **Innhold** | 2-3 ferdige scrollytelling-artikler (vise variasjon) + forside med innholdsmiks |
| **Flyten** | Forside → klikk inn → full scrollytelling-opplevelse |
| **Multimedia i MVP** | Alt må med — tekst, bilder, video, lyd — for å selge visjonen |
| **Analytics** | Ikke prioritert for MVP |
| **Sosial interaksjon** | Delingsknapper |
| **Testutgave** | Spesifikk Rede-utgave er valgt (råmateriale må samles) |

### 12.1 MVP-innhold i detalj

For at MVP-en skal overbevise TOBB, må den vise bredden i konseptet:

**Forsiden:**

- Én featured artikkel / hero-element øverst
- Minst 5-6 artikkelkort synlige (scrollytelling + standard) for å gi "en verden av innhold"-følelsen
- Én TOBBcast-seksjon med minst 1 episode (Spotify-embed)
- Én video-seksjon med minst 1 video
- Lederen som teaser-kort
- Temaer/tags synlige som navigasjonselement

**Artikler:**

- 2-3 scrollytelling-artikler med full behandling — velg artikler som viser variasjon:
    - Én personlig/emosjonell historie (vise filmatisk stemning)
    - Én faktabasert/praktisk sak (vise infografikk, faktaboks)
    - Evt. én som mikser video/lyd (vise multimedia-kapabilitet)
- 3-5 standard-artikler (tekst + bilder, pen lesbar design)

**Lederen:**

- Full opplevelse med lyd eller video når man klikker inn

**Sider som må fungere:**

- Forside
- Scrollytelling-artikkelvisning
- Standard artikkelvisning
- Leder-visning

**Sider som KAN vente:**

- Arkiv / tema-oversiktssider
- Søkefunksjonalitet
- Om Rede-side

---

## 13. Åpne spørsmål

- [ ]  Eksakt visuelt layout for forsiden (ulike preferanser, kan itereres)
- [ ]  Detaljert fargepalett og fonter fra TOBB brand guidelines
- [ ]  Hvilken spesifikk Rede-utgave brukes til MVP
- [ ]  Har lederen eksisterende lyd/video, eller må det produseres?
- [ ]  Konkrete TOBBcast-episoder og videoer for MVP-en

---

## 14. Neste steg

1. Samle råmateriale for valgt Rede-utgave (PDF, tekst, bilder, evt. video/lyd)
2. Dele TOBBs brand assets (farger, fonter, logo)
3. Ta denne briefen inn i Claude Code og begynne å bygge

## Bra å ha svar på

## Visuelle referanser er kritisk viktige

Det "AI-lukter"-problemet er reelt. Claude Code (og alle LLM-er) har en tendens til å generere det samme: bløte gradienter, overdreven avrunding, symmetriske grid-layouts, mye hvitt rom med blå aksenter. Det ser "pent" ut ved første øyekast, men det er umiddelbart gjenkjennbart som AI-generert.

**Konkrete URL-er i spec-en er den beste motgiften.** Når Claude Code kan se på en faktisk side og forstå "denne estetikken er det vi skal treffe", har den noe konkret å navigere etter i stedet for sine egne defaults.

Her er referansene jeg mener bør inn i spec-en:

**For scrollytelling-opplevelsen:**

- **nrk.no/spesial/** — NRKs samleside for digitale historier. NRK bruker scroll-drevne animasjoner bygget med deres eget verktøy integrert i Sanity CMS [Chrome Developers](https://developer.chrome.com/blog/nrk-casestudy) — faktisk akkurat samme CMS vi skal bruke. Spesielt verdt å se på: de bruker korte tekster med fullskjerm-visuelt, filmplakat-lignende titelsider, og animasjoner som forsterker narrativet.
- **pudding.cool** — The Pudding er mestere i å la data og innhold drive designet, ikke omvendt. De har også en veldig nyttig artikkel om responsive scrollytelling best practices [The Pudding](https://pudding.cool/process/responsive-scrollytelling/).
- Eksempel
- Eksempel

**For forside / oppdagelsesflate:**

Her trenger vi faktisk referanser som

*ikke*

er de typiske AI-referansene. Snapchat Discover og Netflix er gode konseptuelle referanser, men de er vanskelige å linke til statisk. Jeg anbefaler at vi formulerer designprinsipper i stedet for én fast referanse.

**1. An1ti-AI-design-retningslinjer**

Spec-en bør ha en egen seksjon som eksplisitt sier hva vi

*ikke* vil. 

For eksempel: unngå symmetriske layouts, unngå gradient-blått som aksentfarge, unngå generiske hero-bilder med overlay, varier mellom artikler (ikke samme template-følelse). Det er ofte lettere å styre et AI-verktøy med negative eksempler enn positive.