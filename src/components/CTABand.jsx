import { site, smsHref } from '../content/site.js'
import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import SpinBadge from './SpinBadge.jsx'

export default function CTABand({
  title = 'Ready for a bin you can stand next to?',
  sub = 'Tell us what you need. We will text you back with a time.',
}) {
  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-ink text-bone">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-16 text-center sm:px-8 md:flex-row md:justify-between md:text-left">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl uppercase leading-[1.05] sm:text-4xl">{title}</h2>
          <p className="mt-4 text-moss-100">{sub}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button to="/contact" variant="zing">
              Book a clean
            </Button>
            <Button href={smsHref} variant="outline" className="border-bone text-bone hover:bg-bone hover:text-ink">
              Text {site.phone}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="shrink-0">
          <SpinBadge
            text="SHOW UP • SCRUB • REPEAT • "
            lines={['ONE', 'TEXT']}
            className="h-36 w-36 sm:h-44 sm:w-44"
          />
        </Reveal>
      </div>
    </section>
  )
}
