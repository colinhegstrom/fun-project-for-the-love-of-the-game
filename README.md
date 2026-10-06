# Suds & Bins — website

A four-page marketing site: landing page, about, services + prices, contact.
React + Vite + Tailwind + Framer Motion. No backend, no database.

## Run it

You need Node (or Bun). Bun is already on this machine.

```bash
bun install      # or: npm install
bun run dev      # or: npm run dev
```

Open http://localhost:5173. Edits show up instantly.

```bash
bun run build    # production files land in dist/
bun run preview  # check the built version locally
```

## Change the words, prices and contact info

**Everything real lives in [`src/content/site.js`](src/content/site.js).** Business
name, phone, email, Instagram handle, service area, prices, crew bios, FAQs.
Change it there once and it updates on every page. Anything marked `TODO` in that
file is a placeholder you should replace.

You do not need to touch any other file to launch this.

## Add photos

1. Drop image files into the `public/` folder.
2. Point to them with a leading slash.

- **Crew photos:** in `site.js`, set a person's `photo` to `'/alex.jpg'`.
- **Before/after slider:** in [`src/pages/Home.jsx`](src/pages/Home.jsx), find
  `<BeforeAfter` and set `before="/bin-before.jpg"` and `after="/bin-after.jpg"`.

Until you add them you'll see labelled placeholders, so nothing looks broken.

## Make the contact form reach your inbox

Right now, hitting "Send it" opens the visitor's email app with the details
filled in. That works, but some people on phones give up at that point. To get
submissions straight to your inbox instead:

1. Sign up free at https://formspree.io
2. Create a form, pick the email that should receive it.
3. Copy the form ID (looks like `xdkzjabc`) into `formspreeId` in `site.js`.

That's it — the page already knows what to do with it. Free tier is 50
submissions a month.

## Put it on the internet

The build output is plain static files, so anything works. Easiest:

1. Push this repo to GitHub.
2. Go to https://vercel.com or https://netlify.com, sign in with GitHub, pick
   this repo. Both detect Vite automatically.
3. Buy a domain and point it there.

`public/_redirects` is already set up so refreshing `/services` doesn't 404 on
Netlify. Vercel handles this on its own.

## Where things are

```
src/
  content/site.js      all business info — start here
  pages/               Home, About, Services, Contact, NotFound
  components/          nav, footer, buttons, animations, before/after slider
  index.css            colors and fonts (the green ramp lives in @theme)
```

To change the colors, edit the `@theme` block at the top of
[`src/index.css`](src/index.css). `--color-zing` is the bright accent green;
`--color-moss-*` is the main ramp, dark at 900 and light at 50.
