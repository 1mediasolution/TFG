// Ensure window.fetch is writable and has both getter and setter
try {
  if (typeof window !== 'undefined' && window.fetch) {
    const origFetch = window.fetch.bind(window);
    let currentFetch = origFetch;
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get: () => currentFetch,
      set: (fn) => {
        currentFetch = fn;
      }
    });
  }
} catch {
  // ignore
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
