import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { site } from '../content/site.js'
import Blobs from '../components/Blobs.jsx'
import Button from '../components/Button.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CTABand from '../components/CTABand.jsx'

/* One price per service today, but the grid keeps up if we add tiers back. */
const TIER_GRID = {
  1: 'max-w-sm',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
}

function TierCard({ tier, index }) {
  const reduce = useReducedMotion()
  const featured = Boolean(tier.featured)

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -8, rotate: index % 2 ? 1 : -1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 15 }}
      className={`relative flex h-full w-full flex-col gap-4 rounded-3xl border-2 border-ink p-7 chunk-lg ${
        featured ? 'bg-ink text-bone' : 'bg-bone text-ink'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 right-5 rounded-full border-2 border-ink bg-zing px-3 py-1 font-display text-[0.6rem] uppercase tracking-widest text-ink">
          {tier.note}
        </span>
      )}

      <h4 className="font-display text-lg uppercase tracking-wide">{tier.name}</h4>

      <div className="flex flex-col">
        <span className={`font-display text-4xl leading-none ${featured ? 'text-zing' : 'text-moss-600'}`}>
          {tier.price}
        </span>
        <span className={`mt-2 text-xs ${featured ? 'text-moss-100' : 'text-moss-700'}`}>
          {tier.unit}
        </span>
      </div>

      {!featured && (
        <p className="text-sm text-moss-700">{tier.note}</p>
      )}
      {featured && <p className="text-sm text-moss-100">Best value for most houses.</p>}

      <div className="mt-auto pt-4">
        <Button
          to="/contact"
          variant={featured ? 'zing' : 'outline'}
          className="w-full px-4 py-2.5"
        >
          Book it
        </Button>
      </div>
    </motion.div>
  )
}

function Faq({ item, isOpen, onToggle }) {
  const reduce = useReducedMotion()

  return (
    <div className="border-b-2 border-moss-200">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-6 py-5 text-left"
        >
          <span className="font-display text-base uppercase leading-snug sm:text-lg">
            {item.q}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 18 }}
            className="grid h-9 w-9 shrink-0 place-content-center rounded-full border-2 border-ink bg-zing font-display text-lg"
            aria-hidden="true"
          >
            +
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.26, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 leading-relaxed text-moss-800">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Services() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      {/* ---------------- PAGE HEADER ---------------- */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-moss-50">
        <Blobs />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionHeading
            kicker="Services & prices"
            title="Here is what it costs. No quote form required."
            sub="Real prices on the page, because nobody likes hunting for them. Bigger jobs or a whole row of cans? Text us and we will work it out."
          />
        </div>
      </section>

      <Marquee
        className="bg-zing"
        speed="slow"
        items={['Real prices up front', 'No contracts', 'Same-week slots', 'Text to book']}
      />

      {/* ---------------- SERVICE BLOCKS ---------------- */}
      {site.services.map((service, blockIndex) => (
        <section
          key={service.id}
          id={service.id}
          className={`scroll-mt-24 border-b-2 border-ink ${
            blockIndex % 2 ? 'bg-moss-50' : 'bg-bone'
          }`}
        >
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              <div className="flex flex-col gap-6">
                <SectionHeading kicker={service.kicker} title={service.title} sub={service.blurb} />

                <Reveal delay={0.1}>
                  <h3 className="font-display text-[0.65rem] uppercase tracking-widest text-moss-600">
                    Every visit includes
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-moss-900">
                        <span aria-hidden="true" className="font-display text-moss-500">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <div
                className={`grid gap-6 ${
                  TIER_GRID[Math.min(service.tiers.length, 3)]
                }`}
              >
                {service.tiers.map((tier, i) => (
                  <Reveal key={tier.name} delay={i * 0.1} className="flex">
                    <TierCard tier={tier} index={i} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ---------------- ADD-ONS ---------------- */}
      {site.addons.length > 0 && (
        <section className="border-b-2 border-ink bg-ink text-bone">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <SectionHeading
              light
              kicker="Add-ons"
              title="Extras, priced the same way."
              sub="Tack any of these onto a visit. We will tell you the total before we start."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {site.addons.map((addon, i) => (
                <Reveal key={addon.name} delay={i * 0.06}>
                  <div className="flex items-center justify-between gap-4 rounded-2xl border-2 border-moss-700 bg-moss-900 px-5 py-4">
                    <span className="text-sm text-bone">{addon.name}</span>
                    <span className="font-display text-base text-zing">{addon.price}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-10">
              <p className="max-w-2xl text-sm text-moss-100">
                Prices are per visit and cover {site.serviceArea}.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- FAQ ---------------- */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading kicker="Questions" title="Things people ask us." align="center" />

        <div className="mt-12">
          {site.faqs.map((item, i) => (
            <Faq
              key={item.q}
              item={item}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
            />
          ))}
        </div>
      </section>

      <CTABand
        title="Pick a service and we will pick a time."
        sub="Takes about thirty seconds to ask."
      />
    </>
  )
}
