'use client'

export function ProgressBar() {
  return (
    <div className="fixed top-0 left-0 z-50 h-[3px] w-full">
      <div
        className="h-full bg-gold origin-left"
        style={{
          animation: 'grow-progress auto linear',
          animationTimeline: 'scroll()',
        }}
      />
      <style>{`
        @keyframes grow-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  )
}
