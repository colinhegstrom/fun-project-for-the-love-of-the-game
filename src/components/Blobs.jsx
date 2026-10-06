import { motion, useReducedMotion } from 'framer-motion'

/* Slow-drifting green shapes for section backgrounds. Purely decorative. */
export default function Blobs({ className = '' }) {
  const reduce = useReducedMotion()

  const shapes = [
    { cls: 'left-[-12%] top-[-18%] h-72 w-72 bg-moss-300', d: 0 },
    { cls: 'right-[-10%] top-[22%] h-96 w-96 bg-moss-200', d: 1.4 },
    { cls: 'bottom-[-20%] left-[28%] h-80 w-80 bg-zing/60', d: 2.6 },
  ]

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl opacity-50 ${s.cls}`}
          animate={
            reduce ? undefined : { x: [0, 26, -18, 0], y: [0, -22, 16, 0], scale: [1, 1.08, 0.96, 1] }
          }
          transition={{
            duration: 16 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: s.d,
          }}
        />
      ))}
    </div>
  )
}
