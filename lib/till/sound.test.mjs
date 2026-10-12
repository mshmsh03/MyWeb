import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CUES, cueLength, scheduleCue } from './sound.mjs';

// A stand-in for an AudioContext that records what a cue asks of it.
function recorder() {
  const sources = [];
  const param = (value = 0) => {
    const calls = [];
    return {
      value,
      calls,
      setValueAtTime: (v, t) => calls.push(['set', v, t]),
      linearRampToValueAtTime: (v, t) => calls.push(['linear', v, t]),
      exponentialRampToValueAtTime: (v, t) => calls.push(['exp', v, t]),
    };
  };
  const node = (extra) => ({ connect() {}, ...extra });
  const source = (kind, extra) => {
    const s = node({ kind, loop: false, start: (t) => (s.started = t), stop: (t) => (s.stopped = t), ...extra });
    sources.push(s);
    return s;
  };
  const gains = [];
  return {
    sources,
    gains,
    ctx: {
      createGain: () => {
        const g = node({ gain: param(1) });
        gains.push(g);
        return g;
      },
      createBiquadFilter: () => node({ frequency: param(), Q: param() }),
      createOscillator: () => source('oscillator', { frequency: param() }),
      createBufferSource: () => source('noise'),
    },
  };
}

test('every cue is short: over well under a second', () => {
  for (const name of Object.keys(CUES)) assert.ok(cueLength(name) < 0.7, `${name} lasts ${cueLength(name)}s`);
  assert.ok(cueLength('key') <= 0.05);
});

test('every cue is quiet: no note above a tenth of full scale, and its notes together well under full scale', () => {
  for (const [name, notes] of Object.entries(CUES)) {
    for (const n of notes) assert.ok(n.level > 0 && n.level <= 0.1, `${name} note at ${n.level}`);
    // Even if every note of a cue peaked at once.
    assert.ok(notes.reduce((sum, n) => sum + n.level, 0) < 0.6, name);
  }
});

test('a cue starts each note once, stops it as it ends, and loops nothing', () => {
  for (const name of Object.keys(CUES)) {
    const { ctx, sources } = recorder();
    scheduleCue(ctx, {}, name, {}, 10);
    assert.equal(sources.length, CUES[name].length);
    sources.forEach((s, i) => {
      const note = CUES[name][i];
      assert.equal(s.loop, false);
      assert.equal(s.started, 10 + note.at);
      assert.ok(s.stopped > s.started && s.stopped <= 10 + note.at + note.length + 0.02);
    });
  }
});

test('every note starts silent, peaks at its level and dies away before it stops', () => {
  const { ctx, gains } = recorder();
  scheduleCue(ctx, {}, 'print', {}, 0);
  gains.forEach((g, i) => {
    const note = CUES.print[i];
    const calls = g.gain.calls;
    assert.deepEqual(calls[0], ['set', 0, note.at]);
    assert.equal(Math.max(...calls.map((c) => c[1])), note.level);
    const last = calls.at(-1);
    assert.equal(last[0], 'exp');
    assert.ok(last[1] < 0.001);
    assert.ok(Math.abs(last[2] - (note.at + note.length)) < 1e-9);
  });
});

test('the printer is heard after the Charge tone has begun, not on top of its start', () => {
  const first = (name) => Math.min(...CUES[name].map((n) => n.at));
  assert.ok(first('print') > first('charge') + 0.1);
});
