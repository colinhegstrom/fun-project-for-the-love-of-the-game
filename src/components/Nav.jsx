import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { navLinks, site, smsHref } from '../content/site.js'
import Logo from './Logo.jsx'
import Button from './Button.jsx'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  // close the drawer whenever the route changes
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // don't let the page scroll behind the open drawer
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }) =>
    `relative font-display text-xs uppercase tracking-widest transition-colors ${
      isActive ? 'text-moss-600' : 'text-ink hover:text-moss-600'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 border-ink transition-colors ${
        solid ? 'bg-bone/95 backdrop-blur' : 'bg-bone'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <span className="text-ink">
            <Logo className="h-10 w-10" />
          </span>
          <span className="font-display text-base uppercase leading-none tracking-tight sm:text-lg">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-[3px] w-full rounded bg-zing"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={smsHref} variant="zing" className="px-5 py-2.5">
            Text us
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-content-center rounded-full border-2 border-ink chunk md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className="relative block h-3.5 w-5">
            <motion.span
              className="absolute left-0 block h-[2.5px] w-5 rounded bg-ink"
              animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
              transition={reduce ? { duration: 0 } : undefined}
            />
            <motion.span
              className="absolute left-0 block h-[2.5px] w-5 rounded bg-ink"
              animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
              transition={reduce ? { duration: 0 } : undefined}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.26, ease: 'easeOut' }}
            className="overflow-hidden border-t-2 border-ink bg-moss-900 md:hidden"
          >
            <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.05 + i * 0.05 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `block border-b border-moss-700 py-4 font-display text-xl uppercase ${
                        isActive ? 'text-zing' : 'text-bone'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <Button href={smsHref} variant="zing" className="mt-6 w-full">
                Text {site.phone}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
