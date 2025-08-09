// Seedable RNG helpers (xmur3 hash -> mulberry32 PRNG)
//got help from ai here :P
let rng = Math.random;

function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function mulberry32(a) {
  return function() {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const setSeed = (seedInput) => {
  const seedString = String(seedInput || '').trim();
  if (!seedString) {
    rng = Math.random;
    return;
  }
  const seed = xmur3(seedString)();
  rng = mulberry32(seed);
};

export const randRange = (min, max) => min + Math.floor(rng() * (max - min + 1));
export const sample = arr => (arr.length > 0 ? arr[randRange(0, arr.length - 1)] : undefined);

export const rand = value => rng() < (value / 100.0);

const randInt = max => Math.floor(rng() * max);

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export const shuffle = list => {
  const arr = [...list];
  for (let slot = arr.length - 1; slot > 0; slot--) { 
    const element = randInt(slot + 1);
    swap(arr, element, slot);
  }
  return arr;
};

export const takeRandom = (num, arr) => shuffle(arr).slice(0, num);
