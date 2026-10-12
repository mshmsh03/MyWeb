// The live till's sounds: a key's click, the tone of a sale charged and the
// receipt printer feeding paper. All three are made on the spot with the Web
// Audio API from oscillators and a little noise, so there is no file to fetch.
//
// The till plays them only once the visitor has turned its sound on, and
// that press is what creates the AudioContext (browsers allow one to start
// only from a gesture). Turning sound off closes it again.

// Each cue is a few notes. Times and lengths are in seconds from the moment
// the cue is played; levels are linear gain, kept low (the loudest note is
// under a tenth of full scale). A note rises over `attack`, holds for `hold`,
// then dies away by `length`. A note with `noise` plays white noise instead
// of an oscillator; `filter` shapes either: [type, frequency, Q].
const pulses = (count, every, note) => Array.from({ length: count }, (_, i) => ({ ...note, at: note.at + i * every }));

export const CUES = {
  // A key going down: a dry tick of filtered noise with a short pitched edge.
  key: [
    { noise: true, filter: ['bandpass', 3200, 1.4], at: 0, attack: 0.001, length: 0.02, level: 0.09 },
    { wave: 'triangle', freq: 1900, to: 1400, at: 0, attack: 0.001, length: 0.035, level: 0.03 },
  ],
  // Charge: two soft sine notes a fifth apart, the second a little later.
  charge: [
    { wave: 'sine', freq: 880, at: 0, attack: 0.01, length: 0.24, level: 0.05 },
    { wave: 'sine', freq: 1318.5, at: 0.09, attack: 0.01, length: 0.32, level: 0.04 },
  ],
  // The printer: the motor's low buzz under the paper being stepped through,
  // timed with the receipt sliding out (480ms with motion on). It starts just
  // after the Charge tone so the two do not blur together.
  print: [
    { wave: 'sawtooth', freq: 96, filter: ['lowpass', 700, 0.7], at: 0.14, attack: 0.02, hold: 0.36, length: 0.44, level: 0.035 },
    ...pulses(12, 0.034, { noise: true, filter: ['bandpass', 2400, 3], at: 0.15, attack: 0.002, length: 0.024, level: 0.04 }),
  ],
};

// When the last note of a cue has died away.
export const cueLength = (name) => Math.max(...CUES[name].map((n) => n.at + n.length));

// Envelopes fall to this rather than to zero: an exponential ramp cannot
// reach zero.
const FLOOR = 0.0001;

// Half a second of white noise, made once per context and shared by every
// noise note (none is longer than a few hundredths of a second).
export function noiseBuffer(ctx) {
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate / 2), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

// Puts one cue's notes on the context's clock, starting at `start`, into
// `out`. Every source is stopped as its note ends; none loops.
export function scheduleCue(ctx, out, name, noise, start) {
  for (const note of CUES[name]) {
    const t = start + note.at;
    const end = t + note.length;
    const peak = t + note.attack + (note.hold ?? 0);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(note.level, t + note.attack);
    gain.gain.setValueAtTime(note.level, peak);
    gain.gain.exponentialRampToValueAtTime(FLOOR, end);
    gain.connect(out);

    let input = gain;
    if (note.filter) {
      const [type, frequency, q] = note.filter;
      const filter = ctx.createBiquadFilter();
      filter.type = type;
      filter.frequency.value = frequency;
      filter.Q.value = q;
      filter.connect(gain);
      input = filter;
    }

    let source;
    if (note.noise) {
      source = ctx.createBufferSource();
      source.buffer = noise;
    } else {
      source = ctx.createOscillator();
      source.type = note.wave;
      source.frequency.setValueAtTime(note.freq, t);
      if (note.to) source.frequency.exponentialRampToValueAtTime(note.to, end);
    }
    source.connect(input);
    source.start(t);
    source.stop(end + 0.01);
  }
}

// The till's sound, switched on. Returns null where the browser has no Web
// Audio. Nothing plays while the page is hidden: the context is suspended
// then, and the notes already on their way are cut off with the output they
// were sent to, so none of them sound later when the page comes back.
export function createSound() {
  const Context = window.AudioContext ?? window.webkitAudioContext;
  if (!Context) return null;
  const ctx = new Context();
  const noise = noiseBuffer(ctx);
  const output = () => {
    const node = ctx.createGain();
    node.connect(ctx.destination);
    return node;
  };
  let out = output();
  const hidden = () => document.visibilityState === 'hidden';
  const onVisibility = () => {
    if (ctx.state === 'closed') return;
    if (hidden()) {
      out.disconnect();
      out = output();
      ctx.suspend();
    } else {
      ctx.resume();
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  return {
    play(name) {
      if (hidden() || ctx.state === 'closed') return;
      if (ctx.state === 'suspended') ctx.resume();
      scheduleCue(ctx, out, name, noise, ctx.currentTime + 0.005);
    },
    close() {
      document.removeEventListener('visibilitychange', onVisibility);
      if (ctx.state !== 'closed') ctx.close();
    },
  };
}
