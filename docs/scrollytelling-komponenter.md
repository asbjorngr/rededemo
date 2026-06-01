# Scrollytelling-komponenter

Oversikt over byggeklossene som utgjør en scrollytelling-artikkel i Rede. Brukes av redaktører (i Sanity) og utviklere (når komponenter legges til/endres).

**Sist oppdatert:** 2026-05-04

## Arkitektur på toppnivå

`ScrollytellingRenderer` er orkesteren. Den tar en artikkel fra Sanity, leser `sections`-arrayen, og mapper hver Sanity-type (f.eks. `heroSection`) til en React-komponent via `SECTION_MAP`. På toppen rendres `ProgressBar` (gullstripe som fylles fra venstre etter scroll-progresjon på hele siden). Alt pakkes i `ScrollyThemeProvider` som setter ett av tre humør (`warm` / `documentary` / `playful`) som påvirker animasjonstiming og aksentfarge.

**Filer:**
- `src/components/scrollytelling/ScrollytellingRenderer.tsx` — orkester
- `src/components/scrollytelling/ProgressBar.tsx` — gullstripe på toppen
- `src/components/scrollytelling/ScrollyThemeContext.tsx` — tema-context
- `src/components/scrollytelling/theme-config.ts` — tre tema-presets
- `src/components/scrollytelling/sections/` — alle 14 seksjonskomponenter

## De 14 byggeklossene

Delt i fem familier etter rolle.

### 1. Åpning og lesefelt (kjernen i en artikkel)

| Sanity-navn | Hva det er | Atferd |
|---|---|---|
| **heroSection** | Fullscreen åpningsbilde med tittel, ingress, byline og "Hør artikkelen"-knapp | Bildet **pinnes** til toppen — neste seksjon scroller _over_ heroen som et sceneteppe. Tittel og meta fader inn ved last. |
| **textWithImage** | Brødtekst-seksjon (lengste arbeidshesten). Kan ha tittel, lede (stort intro-avsnitt), ett bilde og en kropp | Hvis det er **første** tekstseksjon etter hero: første avsnitt blir display-størrelse "lede". Bilder zoomer subtilt inn ved scroll. Avsnitt fades inn med stagger. Sitater (`«` eller `–`) detekteres automatisk — første blir gull blockquote, resten dempet kursiv. |
| **stickyPortrait** | Side-ved-side: portrett venstre eller høyre, tekst på andre siden | Desktop: **bildet pinnes** mens teksten scroller forbi (filmaktig fokus på personen). Mobil: stablet vertikalt. |

### 2. Visuelle pauser / pacing-elementer

| Sanity-navn | Hva det er | Atferd |
|---|---|---|
| **fullscreenParallax** | Fullscreen kantløst bilde med kort tekst over | Bildet er **130% av høyden** og forskyves med scrub-parallax (klassisk dybdeeffekt). Tekst bunnsjustert, fader inn. Kort tekst (<80 tegn) blir display-tittel; lang blir brødtekst. |
| **pullQuote** | Stort sentrert sitat | Ord-for-ord-fade ved scroll-inn. Stor `"` i bakgrunnen som dekor. |
| **gallery** | Horisontalt sveipbart kortgalleri | Snap-scroll, ingen GSAP-animasjon. Støtter hotspot og foto-credit. |
| **horizontalImageStrip** | Som Gallery, enklere — uten hotspot/foto-credit | Funksjonelt nesten identisk med Gallery. **Kandidat for konsolidering.** |

### 3. Faktaformidling

| Sanity-navn | Hva det er | Atferd |
|---|---|---|
| **factBox** | Tittel + brødtekst i åpent layout (ingen synlig ramme tross navnet) | Glir inn nedenfra ved scroll. Punktlister får gull-prikker. |
| **countUpFact** | Ett stort tall som teller fra 0 til mål | Tellingen scrubs ved scroll-inn. Tilpasser durasjon og easing per tema (rolig i `warm`, sprett i `playful`). Norsk tallformatering. |
| **numberedStop** | Nummerert stoppunkt (1, 2, 3) for guide-/rute-/listestruktur | Forrige stopps **linje tegnes ned** først (SVG strokeDashoffset), deretter sirkel som skalerer inn, deretter innhold. Bygger visuell vertikal kjede. |

### 4. Media-embeds

| Sanity-navn | Hva det er | Atferd |
|---|---|---|
| **videoSection** | YouTube, Vimeo eller native video | Auto-pause når ute av viewport, auto-play når inne (IntersectionObserver). Konverterer URL til embed-form. |
| **audioSection** | Spotify-podcast-embed | Konverterer Spotify-URL til `/embed/`-variant. Fades inn. |

### 5. Interaktivt og spesielt

| Sanity-navn | Hva det er | Atferd |
|---|---|---|
| **interactiveQuiz** | Tre modi: `quiz` (riktig svar), `poll` (prosent-bars), `didYouKnow` (vis svar-knapp) | Quiz: viser grønn/rød etter klikk. Poll: animerte gulle bars. Visste du at: knapp avslører svar. |
| **recipeCard** | Stylet oppskriftskort | Roterer 2° på siden, slenger seg inn med rotasjon -3°→2° ved scroll. Dekorative hjørner. Brukes i Alma Mater-artikkelen. |

## Hvordan de henger sammen

- **Alle får samme bakgrunnsfarge** (`scrollyBackground` på artikkelen, default `#003865` TOBB-blå) injisert av rendereren — de tegner seg samme "scene".
- **Tema styrer rytmen.** `theme-config.ts` har tre presets:
  - **warm** — rolig, gullaksent (`#F6BE00`), lange durasjoner, `power3.out`
  - **documentary** — nøktern, teal-aksent (`#487A7B`), korte fades, `power2.out`
  - **playful** — sprett, lilla-aksent (`#6B3077`), korte durasjoner, `back.out` / `elastic.out`
  
  Komponenter som leser `useScrollyTheme()`: StickyPortrait, RecipeCard, CountUpFact, NumberedStop.
- **`prefers-reduced-motion` respekteres** via `gsap.matchMedia()` overalt — folk som har slått av animasjon får statiske versjoner.
- **Hero pinner seg, neste seksjon avslører den.** Det er den ene "spesielle" interaksjonen mellom seksjoner. Resten er uavhengige skiver som kan stables i hvilken som helst rekkefølge.
- **Pacing-tanken**: heavy reading (textWithImage, stickyPortrait) brytes opp av lette pauser (fullscreenParallax, pullQuote, countUpFact) og engasjement (interactiveQuiz). Dette er det redaktøren komponerer i Sanity.

## Foreslåtte navnerevisjoner

Disse er **forslag**, ikke implementert. Hvis dere vil rydde, kan vi gjøre en migrasjon i Sanity samtidig:

| Nåværende | Foreslått | Hvorfor |
|---|---|---|
| `factBox` | `factBlock` eller `infoBlock` | Ingen "boks" lenger — bare tittel + tekst i åpent layout |
| `gallery` + `horizontalImageStrip` | Slå sammen til `imageStrip` med `style`-variant | Gjør nesten det samme, forskjellen er marginal |
| `numberedStop` | `numberedStep` | "Stop" passer for ruter/guider, men hvis det også brukes for trinn 1, 2, 3 generelt er "step" tydeligere |
| `stickyPortrait` | `personSpread` eller `portraitFeature` | Beskriver mekanikken (pin), ikke innholdet |
| `pullQuote` | `bigQuote` | "Pull-quote" betyr typisk et sitat _hentet ut av_ brødteksten — hvis brukt som hovedsitat blir `bigQuote` tydeligere |
| `interactiveQuiz` | Splitt til `quiz`, `poll`, `reveal` | `didYouKnow` er ikke en quiz — overlasting av én komponent |

## Animasjons-stack

- **GSAP + ScrollTrigger** — kjernen, brukes i 14+ filer
- **Lenis** — smooth scroll (i `SmoothScroll.tsx`). Kandidat for å erstattes av GSAP ScrollSmoother for tettere integrasjon og innebygd parallax.
- **Framer Motion** — installert men IKKE i bruk. Kan fjernes.
