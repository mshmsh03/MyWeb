import { EMAIL, WHATSAPP_HREF } from './site-data';

// What the visitor asks for, written out as the message they will send. `t`
// is the copy holding the greeting and joining words (`message`) and the
// names of the four needs (`jobs`); `picked` is a list of keys of `jobs`.
export function compose(t, name, picked, details) {
  const lines = [t.message.hello];
  if (name.trim()) lines.push(`${t.message.from} ${name.trim()}.`);
  if (picked.length) lines.push(`${t.message.need} ${picked.map((k) => t.jobs[k]).join(t.message.join)}.`);
  if (details.trim()) lines.push(details.trim());
  return lines.join('\n');
}

// The message handed to the visitor's own WhatsApp or mail app. Until they
// have written anything, the links open an empty chat and an empty email.
export function sendLinks(message, touched, subject) {
  if (!touched) return { whatsapp: WHATSAPP_HREF, mail: `mailto:${EMAIL}` };
  return {
    whatsapp: `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}`,
    mail: `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
  };
}

// The props for a link that opens the request builder with a need chosen and,
// optionally, a line already written. On a page that has the builder, `base`
// is '#request' and the builder reads the choice off the link when it is
// clicked; from any other page `base` is the contact page, and the choice
// travels in the address.
export function requestLinkProps(base, need, detail) {
  if (base.startsWith('#')) {
    return { href: base, 'data-need': need, ...(detail ? { 'data-detail': detail } : {}) };
  }
  const query = new URLSearchParams({ need, ...(detail ? { detail } : {}) });
  return { href: `${base}?${query}#request` };
}
