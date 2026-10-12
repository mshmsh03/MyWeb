import { IBM_Plex_Mono } from 'next/font/google';

// The face Qasa prints its prices and receipts in. Only the till uses it, for
// money figures and the printed receipt. It is not preloaded, but the static
// till is in the page's HTML and is laid out on load, so both weights still
// download with the home page (about 20KB), not when the till is reached.
// Arabic and Kurdish words on the receipt stay in the site's Arabic face.
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-till-mono',
});
