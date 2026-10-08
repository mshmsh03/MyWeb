import { Tower } from '@/components/bench/devices';
import { requestLinkProps } from '@/lib/request';

// The teardown (the computer's exhibit). Placeholder until it is built: the
// computer from the bench, larger.
//
// `data-frame` marks the element the computer's glass grows into when the
// computer is chosen on the bench.
export default function Teardown({ t, requestHref = '#request' }) {
  return (
    <div>
      <div
        data-frame
        className="bench-solo relative mx-auto w-full max-w-[420px] [--floor:24px] [--plot-h:330px] [--s:0.92] [--turn:38deg] sm:[--plot-h:400px] sm:[--s:1.12]"
      >
        <div className="plot">
          <span className="dev" aria-hidden="true">
            <span className="dev-pose tower">
              <Tower />
            </span>
          </span>
        </div>
      </div>
      <a
        {...requestLinkProps(requestHref, 'repair')}
        className="mt-7 inline-flex min-h-12 items-center rounded-part border border-chalk-dim/60 px-5 font-semibold text-chalk transition-colors hover:border-chalk"
      >
        {t.bench.start}
      </a>
    </div>
  );
}
