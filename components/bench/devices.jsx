import { asset } from '@/lib/site-data';

// The three devices on the bench, drawn as boxes (see bench.css). They are
// pictures made of elements, so they are hidden from assistive technology;
// the link around each one carries its name.
//
// Each face is a span: these sit inside a link, where only phrasing content
// is allowed.

function Box({ className, faces = ['tp', 'ft', 'lt', 'rt'], children = {} }) {
  return (
    <span className={`bx ${className}`}>
      {faces.map((f) => (
        <span key={f} className={`f ${f}`}>
          {children[f] ?? null}
        </span>
      ))}
    </span>
  );
}

// The screens on the bench show the work in the page's own language: a
// client site, and the till. Ellin Company has a screenshot in all three
// languages; Qasa has English and Kurdish, and the Kurdish one stands in for
// Arabic because what it shows is the right-to-left mirror.
const SITE_SHOT = { en: 'ellin-600.webp', ar: 'ellin-ar-600.webp', ku: 'ellin-ku-600.webp' };
const TILL_SHOT = { en: 'qasa-sell-en-600.webp', ar: 'qasa-sell-ckb-600.webp', ku: 'qasa-sell-ckb-600.webp' };

export function Laptop({ lang }) {
  return (
    <>
      <span className="contact" style={{ '--sw': '420px', '--sd': '300px' }} />
      <Box className="body base" />
      <Box className="body lid" faces={['tp', 'ft', 'lt', 'rt']}>
        {{
          ft: (
            <span className="screen" data-screen="websites">
              <span className="browser-bar">
                <i />
                <i />
                <i />
                <b />
              </span>
              <img
                src={asset(`/assets/work/${SITE_SHOT[lang]}`)}
                width="600"
                height="286"
                alt=""
                fetchPriority="high"
                decoding="async"
              />
            </span>
          ),
        }}
      </Box>
    </>
  );
}

export function Till({ lang }) {
  return (
    <>
      <span className="contact" style={{ '--sw': '340px', '--sd': '280px' }} />
      <Box className="body drawer" />
      <Box className="body plate" />
      <Box className="body neck" />
      <Box className="body printer" />
      <Box className="paper" faces={['ft']} />
      <Box className="body display">
        {{
          ft: (
            <span className="screen" data-screen="pos">
              <img src={asset(`/assets/work/${TILL_SHOT[lang]}`)} width="600" height="360" alt="" decoding="async" />
            </span>
          ),
        }}
      </Box>
    </>
  );
}

// The parts behind the glass, drawn flat on the inside of the panel.
export function Inside() {
  return (
    <span className="inside">
      <span className="board" />
      <span className="cooler" />
      <span className="ram" />
      <span className="gpu" />
      <span className="psu" />
      <span className="drive" />
    </span>
  );
}

export function Tower() {
  const side = (
    <>
      <Inside />
      <span className="glass" />
    </>
  );
  return (
    <>
      <span className="contact" style={{ '--sw': '260px', '--sd': '380px' }} />
      <Box className="body case">
        {{
          lt: (
            <span className="relative block size-full" data-screen="hardware">
              {side}
            </span>
          ),
          rt: (
            <span className="relative block size-full" data-screen="hardware">
              {side}
            </span>
          ),
        }}
      </Box>
    </>
  );
}
