import { requestLinkProps } from '@/lib/request';
import { LANGS, SITES, SIZES, SIZE_KEYS, address, marksOn, shotSrc, site } from './sites';

// What the site viewer looks like in a given state. No hooks and no state of
// its own: the server renders it once as the static version (every control
// disabled, Ellin Company on a desktop in the page's language), and
// ViewerLive renders it again with its state and handlers. The two are the
// same markup, so swapping one for the other moves nothing.
//
// `copy` is the viewer's copy with the site names and alt text from `jobs`
// and the request label beside it. `shotLang` is the language of the
// screenshot on show, which the visitor changes.

const latin = (s) => (/^[ -~]+$/.test(s) ? <span className="ltr-fixed">{s}</span> : s);

// The chips of a choice: a real radio group, chosen as a signal fill with a
// tick so the state never rests on colour alone.
function Choice({ legend, name, options, labels, value, onChange, live }) {
  return (
    <fieldset disabled={!live} className="m-0 min-w-0 border-0 p-0">
      <legend className="label p-0 text-chalk">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((key) => (
          <label key={key} className="cursor-pointer has-disabled:cursor-default">
            <input
              type="radio"
              name={name}
              value={key}
              {...(live ? { checked: key === value, onChange: () => onChange(key) } : { defaultChecked: key === value })}
              className="peer sr-only"
            />
            <span className="vw-ease inline-flex min-h-12 items-center gap-2 rounded-part border border-chalk-dim/55 px-4 font-medium text-chalk peer-checked:border-signal peer-checked:bg-signal peer-checked:text-graphite peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ruler peer-enabled:hover:border-chalk peer-checked:[&>svg]:block peer-[:disabled:not(:checked)]:opacity-60">
              <svg viewBox="0 0 16 16" className="hidden size-4" aria-hidden="true">
                <path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {labels[key]}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function ViewerView({
  copy,
  requestHref,
  siteId,
  shotLang,
  size,
  live = false,
  open = null,
  resizing = false,
  under = null,
  fade = null,
  ready = false,
  frameRef,
  onSite,
  onTabKey,
  onLang,
  onSize,
  onMark,
  onShotLoad,
  onShotIn,
}) {
  const s = site(siteId);
  const { width, height } = SIZES[size];
  const src = shotSrc(s, size, shotLang);
  const marks = marksOn(s, size, shotLang);
  const lines = copy.marks[siteId];
  const alt = `${copy.alts[siteId]}${copy.shot[shotLang]}${size === 'phone' ? copy.shot.phone : ''}`;

  return (
    <div>
      <div className="flex flex-wrap gap-x-10 gap-y-5">
        <Choice
          legend={copy.language}
          name="viewer-lang"
          options={LANGS}
          labels={copy.languages}
          value={shotLang}
          onChange={onLang}
          live={live}
        />
        <Choice
          legend={copy.size}
          name="viewer-size"
          options={SIZE_KEYS}
          labels={copy.sizes}
          value={size}
          onChange={onSize}
          live={live}
        />
      </div>

      {/* The browser window. `data-frame` is what the laptop's screen grows
          into when the laptop is chosen on the bench. */}
      <div
        ref={frameRef}
        data-frame
        data-size={size}
        data-resizing={resizing ? '' : undefined}
        className="vw-frame mt-7"
      >
        <div className="vw-strip">
          <span className="vw-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <div role="tablist" aria-label={copy.sites} className="vw-tabs" onKeyDown={onTabKey}>
            {SITES.map(({ id }) => {
              const on = id === siteId;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`viewer-tab-${id}`}
                  aria-selected={on}
                  aria-controls="viewer-panel"
                  tabIndex={on ? 0 : -1}
                  disabled={!live}
                  onClick={onSite && (() => onSite(id))}
                  className="vw-tab vw-ease"
                >
                  {latin(copy.names[id])}
                </button>
              );
            })}
          </div>
        </div>

        <div className="vw-bar on-screen">
          <a href={address(s, shotLang)} target="_blank" rel="noopener" className="vw-address vw-ease">
            <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-graphite-soft" aria-hidden="true">
              <path d="M5 7V5.2a3 3 0 0 1 6 0V7" fill="none" stroke="currentColor" strokeWidth="1.7" />
              <rect x="3" y="7" width="10" height="7.5" rx="1.6" fill="currentColor" />
            </svg>
            <span className="ltr-fixed vw-url">
              <span className="vw-scheme">https://</span>
              {s.host}/{shotLang}/
            </span>
            <span className="vw-go">
              <span className="vw-visit">{copy.visit}</span>
              <svg viewBox="0 0 16 16" className="size-4 shrink-0 rtl:-scale-x-100" aria-hidden="true">
                <path d="M6 3.5h6.5V10M12.5 3.5 4 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="sr-only">{copy.newTab}</span>
            </span>
          </a>
        </div>

        <div
          role="tabpanel"
          id="viewer-panel"
          aria-labelledby={`viewer-tab-${siteId}`}
          className="vw-screen on-screen"
          style={{ '--ar': `${width} / ${height}` }}
        >
          {/* Keyed by address, so the picture being replaced is the same
              element, already decoded, and never blinks. */}
          {under ? <img key={under} src={under} alt="" className="vw-shot" /> : null}
          <img
            key={src}
            src={src}
            width={width}
            height={height}
            alt={alt}
            loading={live ? undefined : 'lazy'}
            decoding="async"
            className="vw-shot"
            data-fade={under ? fade : undefined}
            data-ready={under && ready ? '' : undefined}
            onLoad={onShotLoad}
            onError={onShotIn}
            onAnimationEnd={onShotIn}
          />
          {/* A mark is a button the size of a fingertip around a small
              numbered dot. Its line is part of its name, and shows beside
              it on hover, on focus, or once pressed. */}
          {marks.map((m) => (
            <button
              key={m.id}
              type="button"
              className="vw-mark"
              data-h={m.x < 34 ? 'l' : m.x > 66 ? 'r' : undefined}
              data-v={m.y > 62 ? 'u' : undefined}
              data-open={open === m.id ? '' : undefined}
              style={{ '--x': `${m.x.toFixed(2)}%`, '--y': `${m.y.toFixed(2)}%` }}
              aria-expanded={live ? open === m.id : undefined}
              disabled={!live}
              onClick={onMark && (() => onMark(m.id))}
            >
              <span className="vw-dot">{m.n}</span> <span className="vw-tip">{lines[m.id]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The same lines, readable without pointing at anything. */}
      <div className="mt-8">
        <p className="label m-0 text-chalk-dim">{latin(copy.names[siteId])}</p>
        <ol role="list" className="m-0 mt-3 grid list-none gap-x-8 gap-y-3 p-0 md:grid-cols-3">
          {marks.map((m) => (
            <li key={m.id} className="vw-line vw-ease flex items-start gap-3" data-on={open === m.id ? '' : undefined}>
              <span className="vw-dot mt-px shrink-0" aria-hidden="true">
                {m.n}
              </span>
              <span>{lines[m.id]}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-12">
        <p className="display wd-display m-0 text-[1.3rem] leading-tight font-extrabold rtl:leading-normal">{copy.ask}</p>
        <a
          {...requestLinkProps(requestHref, 'website')}
          className="vw-ease inline-flex min-h-12 items-center rounded-part bg-signal px-5 font-semibold text-graphite hover:bg-[#ff8a5c]"
        >
          {copy.start}
        </a>
      </div>
    </div>
  );
}
