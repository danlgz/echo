import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoaderCircleIcon } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './context/auth';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  const queryClient = new QueryClient();

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </QueryClientProvider>
      <Toaster
        icons={{
          loading: <LoaderCircleIcon size={14} className="animate-spin" />,
        }}
      />
    </React.StrictMode>,
  );
}
