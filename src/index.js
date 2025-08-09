import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import init, {actions, resumeAudio} from './dnb';
import store from './store';
import {setSeed} from './random';
const isProd = process.env.NODE_ENV === 'production'
const url = new URL(window.location.href);
const seedParam = url.searchParams.get('code');
if (seedParam) {
  setSeed(seedParam);
}
init(isProd);
const acts = actions(isProd)

const resumeOnInteraction = () => {
  try { resumeAudio(); } catch (_) {}
  window.removeEventListener('click', resumeOnInteraction);
  window.removeEventListener('touchstart', resumeOnInteraction);
  window.removeEventListener('keydown', resumeOnInteraction);
};
window.addEventListener('click', resumeOnInteraction, { once: true });
window.addEventListener('touchstart', resumeOnInteraction, { once: true });
window.addEventListener('keydown', resumeOnInteraction, { once: true });

ReactDOM.render(
  <App store={store} actions={acts} />,
  document.getElementById('root')
);
