import { motion, useReducedMotion } from 'framer-motion'
import { instagramUrl, site } from '../content/site.js'
import Blobs from '../components/Blobs.jsx'
import Button from '../components/Button.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CTABand from '../components/CTABand.jsx'

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

function CrewCard({ person, index }) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -8, rotate: index % 2 ? 1.4 : -1.4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 14 }}
      className="flex h-full w-full flex-col overflow-hidden rounded-3xl border-2 border-ink bg-bone chunk-lg"
    >
      <div className="aspect-[4/5] w-full border-b-2 border-ink bg-moss-100">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-content-center gap-2 text-center grain">
            <span className="font-display text-5xl text-moss-500">{initials(person.name)}</span>
            <span className="px-6 font-display text-[0.6rem] uppercase tracking-widest text-moss-600">
              Add photo in site.js
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-display text-xl uppercase leading-tight">{person.name}</h3>
        <p className="font-display text-[0.65rem] uppercase tracking-widest text-moss-600">
          {person.role}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-moss-800">{person.line}</p>
      </div>
    </motion.article>
  )
}

export default function About() {
  return (
    <>
      {/* ---------------- PAGE HEADER ---------------- */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-moss-50">
        <Blobs />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionHeading
            kicker="About us"
            title="A few friends and a pressure washer."
            sub="We live here. You have probably seen us around the neighborhood. Now we are the ones making it look good."
          />
        </div>
      </section>

      <Marquee
        className="bg-ink text-bone"
        reverse
        items={['Local kids', 'Real work', 'Fair prices', 'Clean bins', 'Good manners']}
      />

      {/* ---------------- MISSION ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <SectionHeading
              kicker="Our mission"
              title="Take the worst chore off your list. Earn our own way doing it."
            />
            <Reveal delay={0.08} className="flex flex-col gap-5 text-lg leading-relaxed text-moss-800">
              <p>
                We started {site.name} for two honest reasons. The first is that we wanted to
                earn our own money instead of asking for it. The second is that there are
                jobs everybody puts off forever — and a trash can nobody has rinsed since
                last summer is at the top of that list.
              </p>
              <p>
                So we made a deal with the neighborhood. You hand us the thing you have been
                avoiding. We show up when we said we would, do it carefully, and leave the
                place cleaner than we found it. You get your Saturday back. We get to build
                something that is actually ours.
              </p>
              <p>
                That is it. No complicated story. Just work we are willing to put our names on.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <figure className="rounded-3xl border-2 border-ink bg-zing p-8 chunk-lg sm:p-10">
              <blockquote className="font-display text-2xl uppercase leading-tight sm:text-3xl">
                “If it is gross, boring, or takes all afternoon, that is our job now.”
              </blockquote>
              <figcaption className="mt-6 font-display text-[0.65rem] uppercase tracking-widest">
                — The whole business plan, honestly
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CREW ---------------- */}
      <section className="border-y-2 border-ink bg-moss-50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            kicker="The crew"
            title="The people who will show up at your door."
            sub="You will get the same faces every visit. If something is wrong, you can tell us directly."
          />

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {site.crew.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.1} className="flex">
                <CrewCard person={person} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- INSTAGRAM ---------------- */}
      {site.instagram && (
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-col items-start gap-7 rounded-3xl border-2 border-ink bg-ink p-8 text-bone chunk-lg sm:p-12 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex rounded-full border-2 border-zing px-3 py-1 font-display text-[0.6rem] uppercase tracking-widest text-zing">
                  Follow along
                </span>
                <h2 className="mt-5 font-display text-3xl uppercase leading-[1.05] sm:text-4xl">
                  Every before and after goes on Instagram.
                </h2>
                <p className="mt-4 text-moss-100">
                  Jobs from this week, the occasional disaster can, and whenever we have open
                  slots. Say hi in the DMs — we answer those too.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 md:items-end">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-2xl text-zing underline decoration-2 underline-offset-4 sm:text-3xl"
                >
                  @{site.instagram}
                </a>
                <Button
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="zing"
                >
                  Open Instagram
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ---------------- VALUES ---------------- */}
      <section className="border-t-2 border-ink bg-moss-50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            kicker="How we work"
            title="Small business rules we actually keep."
            align="center"
          />

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: 'On time',
                d: 'If we are running late you hear it from us before you have to ask.',
              },
              {
                t: 'By hand',
                d: 'Every can and every panel gets scrubbed by a person paying attention.',
              },
              {
                t: 'Clean exit',
                d: 'We sweep up, coil the hose and put your bins back exactly where they were.',
              },
              {
                t: 'Straight prices',
                d: 'What we quote is what you pay. No surprise fees at the end.',
              },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border-2 border-ink bg-bone p-6 chunk">
                  <span className="font-display text-sm uppercase tracking-widest text-moss-600">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg uppercase">{v.t}</h3>
                  <p className="text-sm leading-relaxed text-moss-800">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Want us on your street?"
        sub="Tell us where you are and what you need cleaned."
      />
    </>
  )
}
