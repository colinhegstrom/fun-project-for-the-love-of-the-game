import { useState } from 'react'

/* Drag (or arrow-key) the handle to wipe between two photos.
   With no photos set it renders labelled drop-zones so you can see where
   your own images go. */
export default function BeforeAfter({
  before = '',
  after = '',
  beforeLabel = 'Before',
  afterLabel = 'After',
}) {
  const [pos, setPos] = useState(50)

  const Panel = ({ src, tone, hint }) =>
    src ? (
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        draggable="false"
      />
    ) : (
      <div className={`grid h-full w-full place-content-center gap-2 text-center ${tone}`}>
        <span className="font-display text-xs uppercase tracking-widest">{hint}</span>
        <span className="px-6 text-xs opacity-70">
          Add a photo to /public and point to it in site.js
        </span>
      </div>
    )

  return (
    <div className="relative select-none overflow-hidden rounded-3xl border-2 border-ink chunk-lg">
      <div className="relative aspect-[4/3] w-full bg-moss-100">
        {/* AFTER sits underneath, fully visible */}
        <div className="absolute inset-0">
          <Panel src={after} tone="bg-moss-100 text-moss-800 grain" hint={afterLabel} />
        </div>

        {/* BEFORE is clipped from the right by the slider position */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Panel src={before} tone="bg-moss-800 text-bone" hint={beforeLabel} />
        </div>

        {/* the divider */}
        <div
          className="pointer-events-none absolute inset-y-0 w-1 bg-zing"
          style={{ left: `calc(${pos}% - 2px)` }}
        >
          <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full border-2 border-ink bg-zing font-display text-xs">
            ↔
          </div>
        </div>

        {/* the real control: draggable and keyboard-accessible */}
        <input
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Reveal the before and after photo"
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />

        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border-2 border-ink bg-bone px-3 py-1 font-display text-[0.65rem] uppercase tracking-widest">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border-2 border-ink bg-zing px-3 py-1 font-display text-[0.65rem] uppercase tracking-widest">
          {afterLabel}
        </span>
      </div>
    </div>
  )
}
