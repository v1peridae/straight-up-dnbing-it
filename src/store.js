const store = {
  tempo: null,
  currentIndex: 0,
  pattern: { drumloop: [], sub: [] },
  setTempo: (tempo) => { store.tempo = tempo; },
  setCurrentIndex: (i) => { store.currentIndex = i; },
  setPattern: (pattern) => { store.pattern = pattern; }
};

export default store;
