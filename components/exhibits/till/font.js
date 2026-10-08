import { IBM_Plex_Mono } from 'next/font/google';

// The face Qasa prints its prices and receipts in. Only the till uses it, for
// money figures and the printed receipt, so it is not preloaded: the browser
// fetches it when the till's figures are first drawn. Arabic and Kurdish
// words on the receipt stay in the site's Arabic face.
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-till-mono',
});
