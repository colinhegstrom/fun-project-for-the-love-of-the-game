import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { site, smsHref } from '../content/site.js'
import Blobs from '../components/Blobs.jsx'
import Button from '../components/Button.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal from '../components/Reveal.jsx'
import BeforeAfter from '../components/BeforeAfter.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CTABand from '../components/CTABand.jsx'

const HEADLINE = ['Your', 'bins.', 'Your', 'car.', 'Actually', 'clean.']

/* Soap bubbles drifting up behind the hero. Decorative only. */
function Bubbles() {
  const reduce = useReducedMotion()
  if (reduce) return null

  const bubbles = [
    { left: '3%', size: 18, delay: 2.2, dur: 10 },
    { left: '8%', size: 14, delay: 0, dur: 9 },
    { left: '15%', size: 12, delay: 5.1, dur: 9 },
    { left: '22%', size: 24, delay: 1.8, dur: 11 },
    { left: '31%', size: 20, delay: 3.9, dur: 12 },
    { left: '41%', size: 10, delay: 3.4, dur: 8 },
    { left: '50%', size: 26, delay: 0.5, dur: 12 },
    { left: '57%', size: 14, delay: 4.6, dur: 9 },
    { left: '63%', size: 30, delay: 0.9, dur: 13 },
    { left: '71%', size: 12, delay: 3, dur: 8 },
    { left: '78%', size: 16, delay: 2.6, dur: 10 },
    { left: '85%', size: 28, delay: 5.6, dur: 13 },
    { left: '91%', size: 22, delay: 4.2, dur: 12 },
    { left: '96%', size: 12, delay: 1.2, dur: 9 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full border-2 border-moss-400/60 bg-bone/40"
          style={{ left: b.left, width: b.size, height: b.size }}
          animate={{ y: [40, -520], opacity: [0, 0.9, 0], x: [0, i % 2 ? 24 : -24, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function ServiceCard({ service, index }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -10, rotate: index % 2 ? 1.2 : -1.2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 14 }}
      className="flex h-full w-full flex-col gap-5 rounded-3xl border-2 border-ink bg-bone p-7 chunk-lg sm:p-9"
    >
      <span className="inline-flex w-fit rounded-full border-2 border-ink bg-zing px-3 py-1 font-display text-[0.65rem] uppercase tracking-widest">
        {service.kicker}
      </span>

      <h3 className="font-display text-2xl uppercase leading-tight sm:text-3xl">{service.title}</h3>
      <p className="text-moss-800">{service.blurb}</p>

      <ul className="mt-1 flex flex-col gap-2.5">
        {service.includes.slice(0, 3).map((item) => (
          <li key={item} className="flex gap-3 text-sm text-moss-900">
            <span aria-hidden="true" className="font-display text-moss-500">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end justify-between gap-4 border-t-2 border-dashed border-moss-200 pt-5">
        <div>
          <span className="block font-display text-[0.6rem] uppercase tracking-widest text-moss-600">
            Starting at
          </span>
          <span className="font-display text-3xl">{service.tiers[0].price}</span>
        </div>
        <Link
          to="/services"
          className="font-display text-xs uppercase tracking-widest text-moss-700 underline decoration-zing decoration-4 underline-offset-4 hover:text-ink"
        >
          See all prices →
        </Link>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const reduce = useReducedMotion()

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-moss-50">
        <Blobs />
        <Bubbles />

        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-bone px-4 py-1.5 font-display text-[0.65rem] uppercase tracking-widest chunk"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-moss-500" />
                Now booking in {site.serviceArea}
              </motion.span>

              <h1 className="mt-7 font-display text-[2.6rem] uppercase leading-[0.92] sm:text-6xl lg:text-7xl">
                {HEADLINE.map((word, i) => (
                  <motion.span
                    key={i}
                    className={`mr-3 inline-block ${
                      word === 'Actually' ? 'text-moss-500' : ''
                    } ${word === 'clean.' ? 'text-moss-500' : ''}`}
                    initial={reduce ? false : { opacity: 0, y: 36, rotate: i % 2 ? 4 : -4 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 140,
                      damping: 14,
                      delay: 0.08 * i,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-moss-800 sm:text-xl"
              >
                We scrub out trash cans and hand-wash cars right at your house. You text
                us, we show up with the soap and the gear and hook up to your hose.
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <Button to="/contact" variant="solid">
                  Get a price
                </Button>
                <Button href={smsHref} variant="bone">
                  Text {site.phone}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        className="bg-zing"
        items={[
          'Trash cans deodorized',
          'Cars hand washed',
          'Bins cleaned Monday nights',
          'Same-week slots',
        ]}
      />

      {/* ---------------- WHAT WE DO ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          kicker="What we do"
          title="Two jobs. Done properly."
          sub="No giant menu of services we are secretly bad at. We picked the two things nobody wants to do themselves and got very good at them."
        />

        <div className="mt-12 grid gap-7 md:grid-cols-2">
          {site.services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.12} className="flex">
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- BEFORE / AFTER ---------------- */}
      <section className="border-y-2 border-ink bg-moss-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2">
          <SectionHeading
            kicker="Receipts"
            title="Drag it. We will wait."
            sub="This is the part people do not believe until they see it. Slide the handle and watch a can go from biohazard to boring."
          />
          <Reveal delay={0.1}>
            {/* TODO: drop two photos in /public and set them here,
                e.g. before="/bin-before.jpg" after="/bin-after.jpg" */}
            <BeforeAfter
              before=""
              after=""
              beforeLabel="Before"
              afterLabel="After"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          kicker="How it works"
          title="Three steps. That is the whole process."
          align="center"
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {site.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12} className="relative">
              <div className="flex h-full flex-col gap-4 rounded-3xl border-2 border-ink bg-bone p-7 chunk">
                <motion.span
                  className="grid h-14 w-14 place-content-center rounded-full border-2 border-ink bg-zing font-display text-xl"
                  whileHover={reduce ? undefined : { scale: 1.12, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {i + 1}
                </motion.span>
                <h3 className="font-display text-xl uppercase">{step.title}</h3>
                <p className="text-moss-800">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- PROMISES ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <SectionHeading
            kicker="The deal"
            title="What you get every single time."
            sub="We are a few friends with a pressure washer and a reputation to build. That means we cannot afford to do a bad job, and honestly we do not want to."
          />

          <ul className="flex flex-col gap-4">
            {site.promises.map((promise, i) => (
              <Reveal key={promise} delay={i * 0.08}>
                <li className="flex items-start gap-4 rounded-2xl border-2 border-ink bg-moss-50 p-5 chunk">
                  <span className="grid h-8 w-8 shrink-0 place-content-center rounded-full bg-moss-500 font-display text-xs text-bone">
                    ✓
                  </span>
                  <span className="text-moss-900">{promise}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABand />
    </>
  )
}
