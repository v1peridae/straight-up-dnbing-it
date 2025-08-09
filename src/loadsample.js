const doRequest = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.arrayBuffer();
};

const getSampleFileName = (key) => {
  const base = process.env.PUBLIC_URL || '';
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${normalizedBase}/samples/${key}.ogg`;
};

const canPlayOggVorbis = () => {
  if (typeof document === 'undefined') return true;
  const audio = document.createElement('audio');
  return !!(audio && audio.canPlayType && audio.canPlayType('audio/ogg; codecs="vorbis"'));
};

const loadSample = (ctx, buffers, name) => new Promise((resolve, reject) => {
  if (buffers[name]) {
    resolve();
    return;
  }

  if (!canPlayOggVorbis()) {
    const err = new Error('This browser cannot decode OGG/Vorbis. Please use Chrome or Firefox.');
    console.error(err.message);
    reject(err);
    return;
  }

  const url = getSampleFileName(name);
  doRequest(url)
    .then((rawBuffer) => {
      try {
        ctx.decodeAudioData(
          rawBuffer,
          (buffer) => {
            buffers[name] = buffer;
            resolve();
          },
          (e) => {
            const err = new Error(`Unable to decode audio data for ${url}`);
            console.error(err.message, e);
            reject(err);
          }
        );
      } catch (e) {
        const err = new Error(`decodeAudioData threw for ${url}: ${e && e.message ? e.message : e}`);
        console.error(err.message);
        reject(err);
      }
    })
    .catch((e) => {
      console.error(`Error fetching ${url}:`, e);
      reject(e);
    });
});

export default loadSample;
