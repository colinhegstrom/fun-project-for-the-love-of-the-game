import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { instagramUrl, mailHref, site, smsHref } from '../content/site.js'
import Blobs from '../components/Blobs.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SpinBadge from '../components/SpinBadge.jsx'

const SERVICE_OPTIONS = [
  'Trash & recycling bin cleaning',
  'Car wash',
  'Both',
  'Something else',
]

const EMPTY = {
  name: '',
  address: '',
  email: '',
  phone: '',
  service: SERVICE_OPTIONS[0],
  message: '',
}

const fieldClass =
  'w-full rounded-2xl border-2 border-ink bg-bone px-4 py-3 text-base placeholder:text-moss-400 focus:border-moss-600'

const labelClass =
  'font-display text-[0.65rem] uppercase tracking-widest text-moss-700'

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const reduce = useReducedMotion()

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()

    // spam trap filled in: pretend it worked, send nothing
    if (e.target.elements._gotcha?.value) {
      setStatus('sent')
      return
    }

    setStatus('sending')

    try {
      // Web3Forms emails the submission to whatever address the access key was made for.
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `Booking request — ${form.service}`,
          from_name: `${site.name} website`,
          replyto: form.email,
          name: form.name,
          address: form.address,
          email: form.email,
          phone: form.phone || '—',
          service: form.service,
          message: form.message || '(no extra details)',
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Form service rejected the submission')
      }

      setStatus('sent')
      setForm(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ---------------- PAGE HEADER ---------------- */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-moss-50">
        <Blobs />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-5 py-16 sm:px-8 sm:py-24 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            kicker="Contact"
            title="Tell us what needs cleaning."
            sub="Name, address, how to reach you, which service. That is genuinely all we need — we will text back with a time."
          />
          <Reveal delay={0.1} className="shrink-0 self-center">
            <SpinBadge
              text="TEXT • EMAIL • DM • "
              lines={['WE', 'REPLY']}
              className="h-36 w-36 sm:h-40 sm:w-40"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- FORM + DETAILS ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-start">
          {/* ---- the form ---- */}
          <Reveal>
            <div className="rounded-3xl border-2 border-ink bg-moss-50 p-7 chunk-lg sm:p-10">
              {status === 'sent' ? (
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="flex flex-col items-start gap-5 py-6"
                >
                  <span className="grid h-16 w-16 place-content-center rounded-full border-2 border-ink bg-zing font-display text-2xl">
                    ✓
                  </span>
                  <h2 className="font-display text-2xl uppercase leading-tight sm:text-3xl">
                    Got it. Talk soon.
                  </h2>
                  <p className="text-moss-800">
                    Your request is in our inbox. We usually reply the same day — sooner if it is
                    not a school night.
                  </p>
                  <Button variant="outline" onClick={() => setStatus('idle')}>
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate={false}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className={labelClass}>
                      Your name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Alex Rivera"
                      className={fieldClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="address" className={labelClass}>
                      Service address *
                    </label>
                    <input
                      id="address"
                      name="address"
                      required
                      autoComplete="street-address"
                      value={form.address}
                      onChange={update('address')}
                      placeholder="12 Hope St, Providence"
                      className={fieldClass}
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className={labelClass}>
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={update('email')}
                        placeholder="you@email.com"
                        className={fieldClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className={labelClass}>
                        Phone (optional)
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder="Best for a quick text"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="service" className={labelClass}>
                      What do you need? *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={update('service')}
                      className={fieldClass}
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className={labelClass}>
                      Anything else? (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="How many cans, where they live, days that work for you…"
                      className={`${fieldClass} resize-y`}
                    />
                  </div>

                  {/* spam trap — real people never fill this in */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  {status === 'error' && (
                    <p
                      role="alert"
                      className="rounded-2xl border-2 border-ink bg-bone px-4 py-3 text-sm"
                    >
                      That did not go through. Try again, or email us directly at{' '}
                      <a href={mailHref} className="underline decoration-zing decoration-2">
                        {site.email}
                      </a>
                      .
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="solid"
                    disabled={status === 'sending'}
                    className="w-full disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send it'}
                  </Button>

                  <p className="text-xs text-moss-700">
                    We only use this to reply about your job. No lists, no spam, ever.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* ---- direct contact details ---- */}
          <div className="flex flex-col gap-5">
            {[
              {
                label: 'Text us',
                value: site.phone,
                href: smsHref,
                note: 'Texts only — we do not answer calls.',
              },
              {
                label: 'Email',
                value: site.email,
                href: mailHref,
                note: 'Good for photos of the job.',
              },
              ...(site.instagram
                ? [
                    {
                      label: 'Instagram',
                      value: `@${site.instagram}`,
                      href: instagramUrl,
                      note: 'DMs are open.',
                      external: true,
                    },
                  ]
                : []),
            ].map((card, i) => (
              <Reveal key={card.label} delay={0.1 + i * 0.08}>
                <a
                  href={card.href}
                  {...(card.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="block rounded-3xl border-2 border-ink bg-bone p-6 transition-colors chunk hover:bg-zing"
                >
                  <span className={labelClass}>{card.label}</span>
                  <span className="mt-2 block break-words font-display text-xl uppercase">
                    {card.value}
                  </span>
                  <span className="mt-1 block text-sm text-moss-700">{card.note}</span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.34}>
              <div className="rounded-3xl border-2 border-ink bg-ink p-6 text-bone chunk">
                <span className="font-display text-[0.65rem] uppercase tracking-widest text-zing">
                  Where we work
                </span>
                <p className="mt-3 font-display text-lg uppercase">{site.serviceArea}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
