import Reveal from './Reveal.jsx'

export default function SectionHeading({ kicker, title, sub, align = 'left', light = false }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start'

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {kicker && (
        <span
          className={`inline-flex rounded-full border-2 px-3 py-1 font-display text-[0.65rem] uppercase tracking-widest ${
            light ? 'border-zing text-zing' : 'border-ink bg-zing text-ink'
          }`}
        >
          {kicker}
        </span>
      )}
      <h2
        className={`font-display text-3xl leading-[1.05] uppercase sm:text-4xl md:text-5xl ${
          light ? 'text-bone' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`text-base leading-relaxed sm:text-lg ${light ? 'text-moss-100' : 'text-moss-800'}`}>
          {sub}
        </p>
      )}
    </Reveal>
  )
}
