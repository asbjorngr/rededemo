interface PodcastSectionProps {
  episode: {
    _id: string
    title: string
    description?: string
    spotifyUrl?: string
    thumbnail?: { asset: { _ref: string }; alt?: string }
    duration?: number
    episodeNumber?: number
    tags?: { _id: string; title: string }[]
  }
}

export function PodcastSection({ episode }: PodcastSectionProps) {
  const embedUrl = episode.spotifyUrl
    ? episode.spotifyUrl.replace('open.spotify.com/', 'open.spotify.com/embed/')
    : null

  return (
    <section className="bg-navy px-6 py-16 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white/[0.06] p-6 backdrop-blur-sm lg:p-10">
          <p className="mb-2 font-heading text-[10px] uppercase tracking-[0.4em] text-white/40">
            {episode.episodeNumber ? `Episode ${episode.episodeNumber}` : 'Podcast'}
          </p>
          <h3 className="mb-3 font-display text-xl leading-snug text-white lg:text-2xl">
            {episode.title}
          </h3>
          {episode.description && (
            <p className="mb-6 text-[15px] leading-[1.7] text-white/50">
              {episode.description}
            </p>
          )}

          {embedUrl && (
            <div className="overflow-hidden rounded-xl">
              <iframe
                src={embedUrl}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-0"
                title={episode.title}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
