'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useScrollyTheme } from '../ScrollyThemeContext'

interface QuizOption {
  text: string
  isCorrect?: boolean
  pollPercent?: number
  _key?: string
}

interface InteractiveQuizProps {
  data: {
    style?: 'quiz' | 'poll' | 'didYouKnow'
    question?: string
    options?: QuizOption[]
    answer?: string
    backgroundColor?: string
  }
  index: number
}

export function InteractiveQuiz({ data }: InteractiveQuizProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const theme = useScrollyTheme()

  const style = data.style || 'quiz'
  const options = data.options || []

  useEffect(() => {
    const mm = gsap.matchMedia()
    const { animation } = theme

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 50,
          opacity: 0,
          duration: animation.duration,
          ease: animation.ease,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => mm.revert()
  }, [theme])

  const bgColor = data.backgroundColor || '#003865'
  const accent = theme.colors.accent
  const accentRgb = theme.colors.accentRgb

  function handleSelect(index: number) {
    if (selected !== null && style === 'quiz') return // Already answered
    setSelected(index)
    if (style === 'quiz' || style === 'poll') {
      setRevealed(true)
    }
  }

  // "Visste du at?" style
  if (style === 'didYouKnow') {
    return (
      <section
        ref={sectionRef}
        className="flex min-h-[60vh] items-center justify-center px-6 py-24 lg:px-16"
        style={{ backgroundColor: bgColor }}
      >
        <div ref={cardRef} className="mx-auto w-full max-w-xl text-center">
          <p className="mb-4 font-heading text-[11px] uppercase tracking-[0.4em]" style={{ color: accent }}>
            Visste du at?
          </p>
          <p className="mb-8 font-display text-2xl leading-snug text-white lg:text-3xl">
            {data.question}
          </p>

          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="cursor-pointer rounded-sm border-2 px-8 py-3 font-heading text-[11px] uppercase tracking-[0.3em] transition-colors"
              style={{
                borderColor: accent,
                color: accent,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `rgba(${accentRgb}, 0.15)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Vis svaret
            </button>
          ) : (
            <div className="rounded-sm p-6" style={{ backgroundColor: `rgba(${accentRgb}, 0.1)`, border: `1px solid rgba(${accentRgb}, 0.2)` }}>
              <p className="text-[17px] leading-[1.7] text-white/80">
                {data.answer}
              </p>
            </div>
          )}
        </div>
      </section>
    )
  }

  // Quiz + Poll style
  return (
    <section
      ref={sectionRef}
      className="flex min-h-[60vh] items-center justify-center px-6 py-24 lg:px-16"
      style={{ backgroundColor: bgColor }}
    >
      <div ref={cardRef} className="mx-auto w-full max-w-xl">
        {/* Question */}
        <p className="mb-2 font-heading text-[11px] uppercase tracking-[0.4em]" style={{ color: accent }}>
          {style === 'quiz' ? 'Sporsmal' : 'Hva tror du?'}
        </p>
        <h3 className="mb-8 font-display text-2xl leading-snug text-white lg:text-3xl">
          {data.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {options.map((opt, i) => {
            const isSelected = selected === i
            const isCorrect = opt.isCorrect
            const showResult = revealed

            let borderColor = `rgba(${accentRgb}, 0.2)`
            let bg = 'transparent'
            if (showResult && style === 'quiz') {
              if (isCorrect) {
                borderColor = '#22c55e'
                bg = 'rgba(34, 197, 94, 0.1)'
              } else if (isSelected && !isCorrect) {
                borderColor = '#ef4444'
                bg = 'rgba(239, 68, 68, 0.1)'
              }
            } else if (isSelected) {
              borderColor = accent
              bg = `rgba(${accentRgb}, 0.1)`
            }

            return (
              <button
                key={opt._key || i}
                onClick={() => handleSelect(i)}
                className="flex w-full cursor-pointer items-center gap-4 rounded-sm border-2 px-5 py-4 text-left transition-colors"
                style={{ borderColor, backgroundColor: bg }}
                disabled={style === 'quiz' && revealed}
              >
                <span className="text-[16px] text-white/80">{opt.text}</span>

                {/* Poll percentages */}
                {showResult && style === 'poll' && opt.pollPercent != null && (
                  <span className="ml-auto shrink-0 font-heading text-sm" style={{ color: accent }}>
                    {opt.pollPercent}%
                  </span>
                )}

                {/* Quiz correct/wrong indicator */}
                {showResult && style === 'quiz' && isCorrect && (
                  <span className="ml-auto shrink-0 text-green-400">&#10003;</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Answer explanation */}
        {revealed && data.answer && (
          <div className="mt-6 rounded-sm p-5" style={{ backgroundColor: `rgba(${accentRgb}, 0.08)` }}>
            <p className="text-[15px] leading-[1.7] text-white/70">{data.answer}</p>
          </div>
        )}
      </div>
    </section>
  )
}
