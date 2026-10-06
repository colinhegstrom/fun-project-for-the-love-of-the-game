/* ---------------------------------------------------------------------------
   EVERY piece of real-world info lives in this one file.
   Change it here and it updates across the whole site.
   Anything marked TODO is a placeholder I invented — swap it for the real thing.
   --------------------------------------------------------------------------- */

export const site = {
  // TODO: your business name. Short is better — it goes in the logo and nav.
  name: 'EWC CLEANING',

  // TODO: the one-liner under the big headline.
  tagline: 'Bins that stop stinking. Cars that start shining.',

  // TODO: widen or narrow this once you know how far you'll drive.
  serviceArea: 'Providence',

  phone: '(401) 525-4235',
  email: 'colinhegstrom@gmail.com',

  /* Set this to '' and every Instagram link on the site disappears on its own. */
  instagram: 'ewc_cleaning', // without the @

  /* The contact form sends through https://web3forms.com. Enter your email there
     to get a free access key, then paste it below. Submissions go to that email. */
  web3formsKey: 'bca096ca-9230-4eb5-a322-11049409a872',

  // Add a photo by dropping a file in /public and setting photo: '/colin.jpg'.
  crew: [
    {
      name: 'Colin Hegstrom',
      role: 'Co-founder',
      line: 'TODO: one line about Colin. Keep it short and a little funny.',
      photo: '',
    },
    {
      name: 'Wyatt Boyd',
      role: 'Co-founder',
      line: 'TODO: one line about Wyatt.',
      photo: '',
    },
    {
      name: 'Evan Paudel',
      role: 'Co-founder',
      line: 'TODO: one line about Evan.',
      photo: '',
    },
  ],

  // Prices shown on the Home and Services pages.
  services: [
    {
      id: 'bins',
      kicker: 'Service 01',
      title: 'Trash & Recycling Bin Cleaning',
      blurb:
        'Monday is trash day, so we clean trash and recycling bins Monday nights only — right after pickup, while they are empty. We blast each one inside and out, scrub the lid, deodorize it, and roll it back. You never touch the gross part.',
      includes: [
        'High-pressure rinse, inside and out',
        'Scrub-down of lid and handles',
        'Deodorizer so it stops smelling',
        'Wastewater collected, not dumped on your lawn',
        'Monday nights only, right after trash pickup',
      ],
      tiers: [
        { name: 'Per bin', price: '$10', unit: 'per bin', note: 'Trash or recycling, same price. Monday nights only.' },
      ],
    },
    {
      id: 'cars',
      kicker: 'Service 02',
      title: 'Car Washing',
      blurb:
        'Hand wash at your house — outside only, or inside and out. No spinning brushes, no swirl marks, no waiting in a line at the gas station.',
      includes: [
        'Two-bucket hand wash and dry',
        'Wheels, tires and door jambs',
        'Exterior windows, dried streak-free',
        'Headlight wipe-down, included',
        'Add the interior: vacuum, wipe-down and inside windows',
      ],
      tiers: [
        { name: 'Exterior wash', price: '$20', unit: 'per vehicle', note: 'Cars, trucks, SUVs and minivans — same price.' },
        { name: 'Exterior + interior', price: '$35', unit: 'per vehicle', note: 'The full wash outside, plus a clean inside. Any size vehicle.' },
      ],
    },
  ],

  /* Extras shown on the Services page, e.g. { name: 'Pet hair removal', price: '+$10' }.
     Leave it empty and the whole Add-ons section is hidden. */
  addons: [],

  steps: [
    {
      title: 'Text us',
      body: 'Send your address and what you need. No app, no account, no 40-field form.',
    },
    {
      title: 'We show up',
      body: 'We hook up to your outside hose and bring the soap and the gear. You keep doing whatever you were doing.',
    },
    {
      title: 'It is clean',
      body: 'Pay when it is done, with cash or Apple Pay.',
    },
  ],

  faqs: [
    {
      q: 'When do you clean bins?',
      a: 'Monday nights only. Monday is trash day, so we come by after pickup when the cans are empty. Just leave them out after the truck comes. Car washes can be booked any day.',
    },
    {
      /* TODO: if your pressure washer needs an outlet too, add that here. */
      q: 'Do you need to use my hose?',
      a: 'Yes — we run off your outside spigot. We bring everything else: soap, brushes, towels and the pressure washer. Just leave the water turned on and make sure we can reach the bins or the car.',
    },
    {
      q: 'What if it rains?',
      a: 'We text you and move you to the next open slot. You never lose your spot.',
    },
    {
      q: 'How do I pay?',
      a: 'Cash or Apple Pay when the job is finished. No deposit, no subscription you have to call to cancel.',
    },
  ],

  promises: [
    'We show up when we said we would.',
    'You get a real person on the other end of the text.',
    'If you are not happy, we come back and redo it free.',
    'No contracts, no hidden fees, no upsell speech.',
  ],
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export const instagramUrl = site.instagram
  ? `https://instagram.com/${site.instagram}`
  : ''
/* Texts only — every phone link opens a message, never a call. */
export const smsHref = `sms:${site.phone.replace(/[^\d+]/g, '')}`
export const mailHref = `mailto:${site.email}`
