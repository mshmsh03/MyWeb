import { requestLinkProps } from '@/lib/request';
import { OPEN_AT_REST, OPEN_STEPS, PARTS, SUSPECTS, SYMPTOMS, openWord } from './parts';

// The teardown, drawn. Both versions render this: the server draws it with no
// handlers (every control disabled, the computer part-way open, the parts
// list showing what each part does), and TeardownLive draws it with them. The
// two are the same markup, so swapping one for the other moves nothing.
//
// `on` holds the handlers; without it the view is the static version.
// `frameRef` is the drawing, whose --open the live version moves on a spring.

// A box with the faces the viewer can see (see bench.css). The computer is
// turned so that its front, its top and the side it opens on face the reader;
// in right-to-left the whole drawing is mirrored, so the same three faces do.
function Box({ className, faces = ['tp', 'ft', 'rt'], children = {} }) {
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

// Where each part's number is pinned, in the computer's own frame (x out of
// the open side, y up, z toward the front); whether its flag stands above or
// hangs below the pin; and whether it runs toward the end of the line or back
// toward its start, so that no two flags cross.
const PINS = {
  cooler: { x: -23, y: 381, z: -99, place: 'up', run: 'end' },
  memory: { x: -53, y: 380, z: -34, place: 'up', run: 'start' },
  storage: { x: -70, y: 104, z: 90, place: 'up', run: 'start' },
  psu: { x: 54, y: 90, z: -150, place: 'up', run: 'end' },
  board: { x: -87, y: 200, z: 16, place: 'up', run: 'start' },
};

// The data a part carries in the drawing: which part, whether it is chosen
// or usually responsible, and the click that chooses it.
function partProps(id, part, suspects, on) {
  return {
    'data-part': id,
    'data-chosen': part === id || undefined,
    'data-suspect': suspects.includes(id) || undefined,
    onClick: on ? () => on.part(id) : undefined,
  };
}

// The computer. Each part is a group that slides out of the case along the
// axis through the open side, as far as its --out when fully open.
function Model({ part, suspects, on }) {
  const group = (id) => partProps(id, part, suspects, on);
  return (
    <>
      <span className="contact" style={{ '--sw': '470px', '--sd': '600px' }} />

      {/* The case, open on the side facing the reader: its front and top
          from outside, and the three walls seen through the opening. */}
      <Box className="body td-case" faces={['tp', 'ft']} />
      <Box className="td-tray" faces={['rt']} />
      <Box className="td-floor" faces={['tp']} />
      <Box className="td-rear" faces={['ft']} />

      <span className="td-part" {...group('board')}>
        <Box className="td-board">
          {{
            rt: (
              <span className="td-pcb">
                <span className="io" />
                <span className="vrm vrm-top" />
                <span className="vrm vrm-side" />
                <span className="socket" />
                <span className="slots" />
                <span className="atx" />
                <span className="pcie pcie-1" />
                <span className="m2" />
                <span className="pcie pcie-2" />
                <span className="chipset" />
              </span>
            ),
          }}
        </Box>
      </span>

      <span className="td-part" {...group('psu')}>
        <Box className="body td-psu">{{ rt: <span className="td-sticker" /> }}</Box>
      </span>

      <span className="td-part" {...group('storage')}>
        <Box className="td-drive">{{ rt: <span className="td-platter" /> }}</Box>
      </span>

      <span className="td-part" {...group('memory')}>
        <Box className="td-ram td-ram-1" />
        <Box className="td-ram td-ram-2" />
      </span>

      <span className="td-part" {...group('cooler')}>
        <Box className="td-cooler">{{ rt: <span className="td-fan" /> }}</Box>
      </span>

      {/* The glass side panel, lifted off and slid away as the case opens. */}
      <span className="td-panel">
        <Box className="td-glass" faces={['rt']} />
      </span>
    </>
  );
}

// The numbers pinned to the parts. They move with their parts, but they are
// a drawing of their own laid over the computer, so no part can hide one.
function Pins({ copy, part, suspects, on }) {
  return PARTS.map((id, i) => {
    const { x, y, z, place, run } = PINS[id];
    return (
      <span key={id} className="td-part" {...partProps(id, part, suspects, on)}>
        <span className="td-pin" data-place={place} data-run={run} style={{ '--ax': `${x}px`, '--ay': `${y}px`, '--az': `${z}px` }}>
          <button type="button" tabIndex={-1} disabled={!on} className="td-flag">
            <span className="td-num">{i + 1}</span>
            <span className="td-name label">{copy.part[id].name}</span>
          </button>
        </span>
      </span>
    );
  });
}

// The number on a part, as on the drawing.
function Num({ n, mark }) {
  return (
    <span className="td-num relative shrink-0">
      {n}
      {mark && (
        <span className="td-mark" aria-hidden="true">
          !
        </span>
      )}
    </span>
  );
}

// Colours ease only while effects are on, like every other change here.
const EASE = 'in-data-[motion=on]:transition-colors';
const CHIP = `inline-flex min-h-12 items-center rounded-part border border-chalk-dim/55 px-4 font-medium text-chalk ${EASE}`;
const BUTTON = `td-btn inline-flex min-h-11 items-center rounded-part border border-chalk-dim/55 px-4 font-semibold text-chalk ${EASE}`;

export default function TeardownView({ copy, requestHref, open, part, symptom, on, frameRef }) {
  const suspects = symptom ? SUSPECTS[symptom] : [];
  const word = copy.at[openWord(open)];

  return (
    <div className="td grid grid-cols-[minmax(0,1fr)] items-start gap-x-12 gap-y-10 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" data-live={on ? '' : undefined}>
      {/* The drawing is a picture of the controls beside it: every part in it
          is also a button in the list, so it is hidden from assistive
          technology and its own buttons are left out of the tab order. Once
          live, --open is the spring's to write: the value given here stays
          the same on every render, so React never writes over it. */}
      <div className="td-frame-wrap">
        <div
          ref={frameRef}
          data-frame
          className="td-frame"
          aria-hidden="true"
          style={{ '--open': (on ? OPEN_AT_REST : open / OPEN_STEPS).toFixed(3) }}
        >
          <div className="td-mirror">
            <div className="td-stage">
              <div className="td-dev">
                <div className="td-pose">
                  <Model part={part} suspects={suspects} on={on} />
                </div>
              </div>
              <div className="td-dev">
                <div className="td-pose">
                  <Pins copy={copy} part={part} suspects={suspects} on={on} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-8">
        {/* Opening it: a slider for the reader who drags, two buttons for
            the reader who would rather press. */}
        <div role="group" aria-labelledby="td-open" className="grid max-w-[36rem] gap-3">
          <span id="td-open" className="label text-chalk">
            {copy.open}
          </span>
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <button
              type="button"
              disabled={!on}
              onClick={on?.close}
              className={BUTTON}
            >
              {copy.close}
            </button>
            <input
              type="range"
              min={0}
              max={OPEN_STEPS}
              step={5}
              {...(on ? { value: open, onChange: (e) => on.open(Number(e.target.value)) } : { defaultValue: open })}
              disabled={!on}
              aria-labelledby="td-open"
              aria-valuetext={word}
              className="td-range w-full min-w-0"
              style={{ '--fill': `${open}%` }}
            />
            <button
              type="button"
              disabled={!on}
              onClick={on?.openAll}
              className={BUTTON}
            >
              {copy.openAll}
            </button>
          </div>
        </div>

        <div role="group" aria-labelledby="td-parts">
          <span id="td-parts" className="label text-chalk">
            {copy.parts}
          </span>
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-2.5 p-0">
            {PARTS.map((id, i) => {
              const likely = suspects.includes(id);
              return (
                <li key={id}>
                  <button
                    type="button"
                    disabled={!on}
                    onClick={on ? () => on.part(id) : undefined}
                    aria-pressed={part === id}
                    data-suspect={likely || undefined}
                    className={`td-chip ${CHIP} gap-2.5 ps-2.5`}
                  >
                    <Num n={i + 1} mark={likely} />
                    {copy.part[id].name}
                    {likely && <span className="sr-only">({copy.likely})</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* What the chosen part does and how it fails; with none chosen, all
            five and what each does (teardown.css stacks the versions). */}
        <div className="td-stack border-t border-mat-line pt-5">
          <ol className="td-layer m-0 grid list-none gap-3 p-0" data-shown={!part}>
            {PARTS.map((id, i) => (
              <li key={id} className="flex gap-3">
                <Num n={i + 1} mark={suspects.includes(id)} />
                <p className="m-0 max-w-[60ch] text-chalk-dim">
                  <span className="font-semibold text-chalk">{copy.part[id].name}.</span> {copy.part[id].does}
                </p>
              </li>
            ))}
          </ol>
          {PARTS.map((id, i) => (
            <div key={id} className="td-layer" data-shown={part === id}>
              <h3 className="m-0 flex items-center gap-3 text-[1.25rem] leading-snug font-bold">
                <Num n={i + 1} mark={suspects.includes(id)} />
                {copy.part[id].name}
              </h3>
              <p className="m-0 mt-2 max-w-[60ch] text-chalk-dim">{copy.part[id].does}</p>
              <h4 className="label m-0 mt-5 text-chalk">{copy.signs}</h4>
              <ul className="td-signs m-0 mt-2 list-none p-0">
                {copy.part[id].signs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* What it is doing: each symptom lights up the parts usually behind it. */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="label p-0 text-chalk">{copy.symptoms}</legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {SYMPTOMS.map((id) => (
            <label key={id} className="td-choice">
              <input
                type="radio"
                name="td-symptom"
                value={id}
                {...(on ? { checked: symptom === id, onChange: () => on.symptom(id) } : {})}
                disabled={!on}
                className="sr-only"
              />
              <span className={`${CHIP} gap-2.5`}>
                <span className="td-dot" aria-hidden="true" />
                {copy.symptom[id]}
              </span>
            </label>
          ))}
          <button
            type="button"
            disabled={!on || !symptom}
            onClick={on?.clear}
            className={`td-clear inline-flex min-h-12 items-center px-2 font-semibold text-chalk underline decoration-chalk-dim/60 underline-offset-4 ${EASE}`}
          >
            {copy.clear}
          </button>
        </div>
        <p aria-live="polite" className="td-suspects m-0 mt-4 max-w-[60ch] text-chalk-dim">
          {symptom ? (
            <>
              {copy.suspects}{' '}
              {suspects.map((id, i) => (
                <span key={id}>
                  {i > 0 && copy.join}
                  <span className="font-semibold text-chalk">{copy.part[id].name}</span>
                </span>
              ))}
              .
            </>
          ) : (
            copy.hint
          )}
        </p>
      </fieldset>

      <div className="grid justify-items-start gap-4 border-t border-mat-line pt-6 xl:border-0 xl:pt-0">
        <p className="m-0 max-w-[60ch] text-chalk-dim">{copy.repairs}</p>
        <a
          {...requestLinkProps(requestHref, 'repair', symptom ? copy.report[symptom] : undefined)}
          className={`inline-flex min-h-12 items-center rounded-part bg-signal px-5 font-semibold text-graphite hover:bg-[#ff8a5c] ${EASE}`}
        >
          {copy.send}
        </a>
      </div>
    </div>
  );
}
