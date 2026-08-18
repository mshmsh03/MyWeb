// The site is published to GitHub Pages as a *project* page, so everything is
// served from https://mshmsh03.github.io/MyWeb/ rather than the domain root.
// basePath is what makes every generated URL — links, the CSS and JS chunk
// tags, the router's own history entries — carry that prefix.
//
// It is read from the environment so pointing a custom domain at the repo
// later is a one-variable change (NEXT_PUBLIC_BASE_PATH="") rather than an
// edit across the codebase. It is re-exported through `env` so lib/site-data.js
// can prefix the handful of asset URLs Next does not rewrite for us.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/MyWeb';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next 16 auto-writes AGENTS.md/CLAUDE.md on every dev/build run; this repo
  // doesn't want those generated files.
  agentRules: false,

  // GitHub Pages only hands back files that already exist on disk, so the whole
  // app is pre-rendered at build time and `out/` is what gets published.
  output: 'export',

  // With `output: 'export'` this decides the shape of the emitted files:
  // `/en/about/index.html` (reachable as /en/about/) rather than
  // `/en/about.html`. Directory-per-route is the form Pages serves without any
  // rewrite rules, so every internal link ends in a slash to match.
  trailingSlash: true,

  basePath: BASE_PATH,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },

  // next/image's optimizer is a server feature and cannot run on Pages.
  images: { unoptimized: true },

  // NOTE: redirects()/rewrites() do not exist in a static export — there is no
  // server to run them. The pre-Next flat URLs (/about.html …) and the site
  // root are preserved by the redirect stubs in public/ instead.
};

module.exports = nextConfig;
