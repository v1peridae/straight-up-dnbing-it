import catalog from './catalog';

const mapIndexed = (fn, arr) => arr.map((item, index) => fn(item, index));
const reject = (predicate, arr) => arr.filter(item => !predicate(item));
const propEq = (prop, value) => obj => obj[prop] === value;

const indexToTime = (spec, index) => {
  const oneBeat = 60.0 / spec.bpm;
  const amountBeats = spec.bars * 4;
  const amountEights = amountBeats * 2;
  const sampleLenSecs = oneBeat * amountBeats;
  const sliceLen = sampleLenSecs / amountEights;
  return index * sliceLen;
};

const generateHitMap = sampleName => {
  const spec = catalog[sampleName];
  const hits = spec.hits.split('');
  const mappedHits = hits.map((v, k) => ({ index: k, hit: v, time: indexToTime(spec, k)}));
  return mappedHits.filter(item => item.hit !== '0');
};

export default generateHitMap;
