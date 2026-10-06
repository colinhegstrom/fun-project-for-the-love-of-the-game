import { motion, useReducedMotion } from 'framer-motion'

/* Rotating sticker. Text rides a circular path; the middle holds a line or two. */
export default function SpinBadge({
  text = 'LOCAL • BY HAND • ON TIME •',
  lines = ['NO', 'BRUSHES'],
  className = 'h-32 w-32',
}) {
  const reduce = useReducedMotion()

  return (
    <div className={`relative ${className}`}>
      <motion.svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <defs>
          <path
            id="badge-circle"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
          />
        </defs>
        <circle cx="60" cy="60" r="58" fill="var(--color-ink)" />
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="var(--color-zing)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
        <text
          fill="var(--color-bone)"
          className="font-display"
          fontSize="10.5"
          letterSpacing="2.2"
        >
          <textPath href="#badge-circle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </motion.svg>

      <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
        {lines.map((line) => (
          <span
            key={line}
            className="font-display text-[0.7rem] uppercase leading-tight text-zing sm:text-xs"
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}
