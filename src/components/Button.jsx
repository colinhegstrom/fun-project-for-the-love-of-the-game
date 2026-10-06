import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

const MotionLink = motion(Link)

const base =
  'inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-display text-sm whitespace-nowrap uppercase tracking-wide transition-colors'

const variants = {
  solid: 'bg-ink text-bone hover:bg-moss-700',
  zing: 'bg-zing text-ink hover:bg-moss-300',
  outline: 'bg-transparent text-ink hover:bg-ink hover:text-bone',
  bone: 'bg-bone text-ink hover:bg-zing',
}

/* Chunky button that squashes on press. Renders a Link, an <a> or a <button>. */
export default function Button({
  to,
  href,
  variant = 'solid',
  className = '',
  children,
  ...rest
}) {
  const reduce = useReducedMotion()
  const classes = `${base} ${variants[variant]} chunk ${className}`

  const spring = reduce
    ? {}
    : {
        whileHover: { y: -3, x: -1 },
        whileTap: { y: 2, x: 1, scale: 0.97 },
        transition: { type: 'spring', stiffness: 400, damping: 15 },
      }

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...spring} {...rest}>
        {children}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...spring} {...rest}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button className={classes} {...spring} {...rest}>
      {children}
    </motion.button>
  )
}
