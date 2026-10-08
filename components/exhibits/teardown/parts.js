// The five parts of the teardown, in the order they are numbered on the
// drawing and listed beside it. Their words are in the copy files under
// `teardown.part`, keyed the same way.
export const PARTS = ['cooler', 'memory', 'storage', 'psu', 'board'];

// The symptoms a visitor can pick, and the parts that usually cause each one.
// General and modest: the parts to look at first, not a diagnosis. A hot
// processor slows itself down to protect itself, so the cooler is a suspect
// for a slow computer too.
export const SYMPTOMS = ['power', 'slow', 'hot', 'screen'];
export const SUSPECTS = {
  power: ['psu', 'board'],
  slow: ['storage', 'memory', 'cooler'],
  hot: ['cooler', 'psu'],
  screen: ['memory', 'board'],
};

// How far open the computer is drawn before anyone touches it, from 0
// (closed) to 1 (every part out): far enough that the parts can be told
// apart, with room left to open it the rest of the way.
export const OPEN_AT_REST = 0.5;

// The slider's steps, and the words a screen reader hears for its position.
export const OPEN_STEPS = 100;
export const openWord = (value) => (value <= 0 ? 'closed' : value >= OPEN_STEPS ? 'open' : 'part');
