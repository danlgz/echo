import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './global.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>,
  );
}
