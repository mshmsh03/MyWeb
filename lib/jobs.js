// The ticket book: every piece of work on the site, in the order it is
// numbered. What a ticket *says* is copy and lives per language in
// app/[lang]/_content/; this file holds only what is the same in all three.
//
// `kind` decides the paper a ticket is printed on (see STOCK below), `shot`
// names an entry in SHOTS (`shots` overrides it for a language that has its
// own), `href` is a client's own live site, and `page` is a page of this site
// that says more.
export const JOBS = [
  { id: 'ellinSite', kind: 'website', shot: 'ellin', href: 'https://www.ellincompany.com', domain: 'www.ellincompany.com' },
  { id: 'bvSite', kind: 'website', shot: 'brightVolition', href: 'https://brightvolition.com', domain: 'brightvolition.com' },
  { id: 'chrispySite', kind: 'website' },
  { id: 'qasa', kind: 'software', shot: 'qasaSell', shots: { ku: 'qasaSellKu' }, page: 'projects/qasa' },
  { id: 'chrispyPos', kind: 'software' },
  { id: 'krofi', kind: 'print' },
  { id: 'chrispyMenu', kind: 'print' },
  { id: 'ellinCard', kind: 'print' },
  { id: 'ellinProfile', kind: 'print' },
  { id: 'bvProfile', kind: 'print' },
].map((job, i) => ({ ...job, no: i + 1 }));

export const KINDS = ['website', 'software', 'print'];

// A carbon-copy book has three papers, and here each kind of work gets one,
// so a visitor can tell a website from a print job before reading a word.
export const STOCK = { website: 'sheet', software: 'canary', print: 'pink' };

// The ticket the visitor fills in is the next one in the book.
export const NEXT_NO = JOBS.length + 1;

export const job = (id) => JOBS.find((j) => j.id === id);

// Ticket numbers are printed the way a numbering machine prints them.
export const serial = (no) => String(no).padStart(3, '0');
