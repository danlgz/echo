import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './global.css';
import { AuthProvider } from './context/auth';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </React.StrictMode>,
  );
}
