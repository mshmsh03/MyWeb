import { test } from 'node:test';
import assert from 'node:assert/strict';

// The teardown's words are written three times by hand; these keep the three
// in step with each other and with the parts and symptoms the drawing knows.

// The copy files and parts.js are ES modules in a package that does not say
// so (Next reads them either way), and Node warns about that on every import.
// Here the warning is known and harmless, so it alone is let go.
process.removeAllListeners('warning');
process.on('warning', (w) => {
  if (w.code !== 'MODULE_TYPELESS_PACKAGE_JSON') console.warn(w);
});
const { default: en } = await import('../../../app/[lang]/_content/copy.en.js');
const { default: ar } = await import('../../../app/[lang]/_content/copy.ar.js');
const { default: ku } = await import('../../../app/[lang]/_content/copy.ku.js');
const { OPEN_STEPS, PARTS, SUSPECTS, SYMPTOMS, openWord } = await import('./parts.js');

test('every symptom points at parts the drawing has', () => {
  assert.deepEqual(Object.keys(SUSPECTS).sort(), [...SYMPTOMS].sort());
  for (const [symptom, parts] of Object.entries(SUSPECTS)) {
    assert.ok(parts.length > 0, symptom);
    for (const p of parts) assert.ok(PARTS.includes(p), `${symptom}: ${p}`);
  }
});

test('the slider names its two ends and everything between', () => {
  assert.equal(openWord(0), 'closed');
  assert.equal(openWord(5), 'part');
  assert.equal(openWord(OPEN_STEPS - 5), 'part');
  assert.equal(openWord(OPEN_STEPS), 'open');
});

for (const [lang, copy] of Object.entries({ en, ar, ku })) {
  test(`${lang}: the teardown has every word it needs`, () => {
    const t = copy.teardown;
    assert.deepEqual(Object.keys(t).sort(), Object.keys(en.teardown).sort());
    assert.deepEqual(Object.keys(t.at).sort(), ['closed', 'open', 'part']);
    assert.deepEqual(Object.keys(t.part).sort(), [...PARTS].sort());
    for (const id of PARTS) {
      const { name, does, signs } = t.part[id];
      assert.ok(name && does, `${lang} ${id}`);
      assert.equal(signs.length, 3, `${lang} ${id} signs`);
    }
    assert.deepEqual(Object.keys(t.symptom).sort(), [...SYMPTOMS].sort());
    assert.deepEqual(Object.keys(t.report).sort(), [...SYMPTOMS].sort());
  });
}
