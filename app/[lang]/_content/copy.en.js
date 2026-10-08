// Every English word on the site. The pages in ../_pages/ lay these out; the
// Arabic and Kurdish files beside this one have exactly the same shape.

export default {
  role: 'Computer Engineering Student — Software & Hardware',
  offer:
    'I build and deploy websites in English, Arabic and Kurdish, build point-of-sale systems for shops, and diagnose and repair hardware.',

  no: 'No.',
  more: 'Read more',
  fields: { job: 'Job', done: 'Work done' },

  // The ticket the visitor fills in.
  ticket: {
    title: 'Job ticket',
    no: 'No.',
    customer: 'Customer',
    customerHint: 'Your name or business',
    job: 'Job',
    jobs: {
      website: 'Website',
      pos: 'POS system',
      repair: 'Hardware repair',
      hire: 'Job or internship offer',
    },
    details: 'Details',
    detailsHint: 'What do you need, and by when?',
    takenBy: 'Taken by',
    send: 'Send on WhatsApp',
    email: 'Email it instead',
    call: 'Call',
    subject: 'Job ticket',
    copyLabel: 'Your message',
    blank: 'Fill in the ticket above and your message is written here.',
    message: { hello: 'Hello Mustafa,', from: 'This is', need: 'I need:', join: ', ' },
  },

  // The first screen: the three devices on the bench and its two actions.
  bench: {
    devices: { websites: 'Websites', pos: 'Point of sale', hardware: 'Hardware' },
    start: 'Start a request',
    see: 'See the work',
  },

  // The request builder. Its choices, field hints and message wording are
  // the ticket's, above.
  // The site viewer (the laptop's exhibit).
  viewer: {},

  request: {
    title: 'Start a request',
    lead: 'Choose what you need and your message is written as you go. The site sends nothing itself: the message opens in your own WhatsApp or email.',
    need: 'What do you need?',
    optional: 'optional',
    blank: 'Your message appears here as you write it.',
    subject: 'Request from your website',
  },

  // The teardown (the computer's exhibit).
  teardown: {},

  home: {
    jobs: 'Past jobs',
    allJobs: 'All projects',
    services: 'What I take on',
  },

  services: [
    {
      title: 'Website Development',
      text: 'Design and development of websites, including multilingual sites supporting Arabic and Kurdish.',
    },
    {
      title: 'Point-of-Sale Systems',
      text: 'A till built around your shop, kiosk or restaurant, in Kurdish, Arabic and English. Works without internet.',
    },
    {
      title: 'Hardware Maintenance & Repair',
      text: 'Diagnosing and resolving hardware issues, including part replacement and device maintenance.',
    },
  ],

  next: {
    heading: 'The next ticket is yours.',
    start: 'Fill in a ticket',
    whatsapp: 'WhatsApp',
    email: 'Email me',
    call: 'Call me',
  },

  jobs: {
    ellinSite: {
      name: 'Ellin Company',
      job: 'Company website in three languages',
      done: 'Design, build, deployment and hosting for a construction contractor, in English, Arabic and Kurdish.',
      alt: 'Home page of the Ellin Company website',
    },
    bvSite: {
      name: 'Bright Volition',
      job: 'Company website in three languages',
      done: 'Rebuilt for an industrial supply and engineering firm, then moved to new hosting with every old link still working.',
      alt: 'Home page of the Bright Volition website',
    },
    chrispySite: {
      name: 'Chrispy',
      job: 'Menu website',
      done: 'One-page menu for a street-food kiosk’s Instagram link, in Kurdish and English, with a builder that adds up an order as you tap.',
    },
    qasa: {
      name: 'Qasa POS',
      job: 'Sample point-of-sale system',
      done: 'A sample till that shows what I can build for a business: sales, stock, shifts and reports in Kurdish, Arabic and English, working without internet.',
      alt: 'The sell screen of the Qasa point-of-sale system',
    },
    chrispyPos: {
      name: 'Chrispy POS',
      job: 'Point-of-sale system for a street-food kiosk',
      done: 'Qasa rebuilt around the kiosk: its own menu and prices, add-ons, kitchen tickets, cash drawer and daily reports.',
    },
    krofi: {
      name: 'Krofi',
      job: 'Rebrand and printed menu',
      done: 'Logo, colours, Kurdish and English type, product mockups and a printed menu for a sweets kiosk.',
    },
    chrispyMenu: {
      name: 'Chrispy',
      job: 'Printed menu',
      done: 'Four A4 pages in English and Kurdish, with the Kurdish pages laid out as a true right-to-left mirror.',
    },
    ellinCard: {
      name: 'Ellin Company',
      job: 'Business card',
      done: 'Double-sided cards in Arabic, Kurdish and English, delivered as print-shop files.',
    },
    ellinProfile: {
      name: 'Ellin Company',
      job: 'Company profile',
      done: 'Company profile design for a construction firm, produced in Canva.',
    },
    bvProfile: {
      name: 'Bright Volition',
      job: 'Company profile',
      done: 'A 24-page profile in English, plus an Arabic edition rebuilt page by page as a right-to-left mirror.',
    },
  },

  projects: {
    title: 'Projects',
    lead: 'Websites, point-of-sale systems and print work built for real businesses.',
    groups: { website: 'Websites', software: 'Software', print: 'Print' },
  },

  qasa: {
    role: 'A sample point-of-sale system',
    lead: 'Qasa is a sample till I built to show what I can make for a business. It runs on the shop’s own computer, works in Kurdish, Arabic and English, and needs no internet connection or account. For a client, I build a version of it around how they sell.',
    // [label, value, machine string?]
    facts: [
      ['Runs on', 'Windows · Linux · macOS', true],
      ['Languages', 'Kurdish · Arabic · English'],
      ['Fits', 'Shops · restaurants · kiosks'],
      ['Checked by', 'Over 100 automated tests'],
    ],
    leadAlt:
      'Qasa’s sell screen: a grid of products on the left and the order, drawn like a paper receipt, on the right',
    leadCaption: 'The sell screen. The order on the right is drawn like the receipt it will print.',
    money: {
      heading: 'Built for how shops here take money',
      rows: [
        [
          'Dinars, rounded the way cash works',
          'Totals are rounded to the nearest 250 dinars, so the amount on the screen is an amount a customer can actually hand over.',
        ],
        [
          'Dollars at the shop’s own rate',
          'Customers can pay in dollars at the rate the shop sets. The change comes back in dinars.',
        ],
        ['Customer debt accounts', 'A sale can go on a customer’s account, and the shop can see who owes what.'],
        [
          'Receipts that print Kurdish correctly',
          'Receipts are drawn as an image before printing, so Kurdish and Arabic come out right on inexpensive thermal printers.',
        ],
      ],
    },
    rtl: {
      heading: 'Right to left',
      alt: 'The same sell screen in Kurdish, mirrored: navigation on the right, the order on the left',
      text: 'The whole screen mirrors for Kurdish and Arabic. Navigation moves to the right and the order to the left. Prices stay in the same digits and the same typeface in every language, so a cashier reads them the same way.',
    },
    inside: {
      heading: 'What is in it',
      alt: 'Qasa’s reports screen with sales totals, a sales-by-hour chart and best sellers',
      caption: 'Reports, with export to Excel.',
      rows: [
        ['Sell', 'Product grid, search, barcode scanner, sizes, discounts, hold and recall.'],
        ['Pay', 'Cash in dinars or dollars, card, wallet, on account, or split between them.'],
        ['Tables', 'Running orders per table, dine-in, takeaway and delivery, kitchen tickets.'],
        ['Stock', 'Products and categories, receiving, counting, low-stock warnings.'],
        ['Shifts', 'Opening cash, cash in and out with a reason, end-of-shift count and report.'],
        ['Reports', 'Sales by hour, product, category, payment method and staff, with export to Excel.'],
        ['Staff', 'Owner, manager and cashier roles. A manager’s PIN approves discounts, voids and refunds.'],
        [
          'Safety',
          'Daily backups with restore, automatic lock when the till is left alone, a pause after repeated wrong PINs.',
        ],
      ],
    },
    client: 'Built for a client',
  },

  about: {
    title: 'About',
    name: 'Name',
    clients: 'Clients',
    rows: [
      ['Currently', 'Computer Engineering student at Tishk International University, Erbil.'],
      [
        'What I do',
        'Experienced in both software and hardware: website development and deployment, point-of-sale systems, and hardware diagnostics and repair (including part replacement).',
      ],
      [
        'Why',
        'Motivated by understanding systems end-to-end — from website code to hardware internals — and by solving practical, real-world problems.',
      ],
      ['Languages', 'English, Arabic and Kurdish.'],
    ],
  },

  contact: {
    title: 'Contact',
    lead: 'Available to help with building, repairing, or troubleshooting your next project.',
    open: 'Open to internship opportunities, freelance work, and collaboration.',
    direct: 'Direct',
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    send: {
      heading: 'What to send',
      rows: [
        ['Website', 'What the business does, which languages it needs, and when it should be live.'],
        ['POS system', 'What you sell, how many counters you have, and which receipt printer you use.'],
        ['Repair', 'The device and model, what it does or does not do, and when it started.'],
      ],
    },
  },
};
