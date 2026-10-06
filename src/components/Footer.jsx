import { Link } from 'react-router-dom'
import { instagramUrl, mailHref, navLinks, site, smsHref } from '../content/site.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-moss-900 text-bone">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-bone">
              <Logo className="h-11 w-11" animate={false} />
            </span>
            <span className="font-display text-lg uppercase leading-none">{site.name}</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-moss-100">{site.tagline}</p>
          <p className="font-display text-[0.65rem] uppercase tracking-widest text-zing">
            Serving {site.serviceArea}
          </p>
        </div>

        <div>
          <h2 className="font-display text-xs uppercase tracking-widest text-zing">Pages</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-moss-100 transition-colors hover:text-zing">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xs uppercase tracking-widest text-zing">Get in touch</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li>
              <a href={smsHref} className="text-moss-100 transition-colors hover:text-zing">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={mailHref} className="break-all text-moss-100 transition-colors hover:text-zing">
                {site.email}
              </a>
            </li>
            {site.instagram && (
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-moss-100 transition-colors hover:text-zing"
                >
                  @{site.instagram}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-moss-700 px-5 py-5 text-center sm:px-8">
        <p className="font-display text-[0.6rem] uppercase tracking-widest text-moss-200">
          © {new Date().getFullYear()} {site.name} · Built by the people who do the scrubbing
        </p>
      </div>
    </footer>
  )
}
