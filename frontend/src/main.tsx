import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './watcher/listener.js'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:6000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
    <App />
     </QueryClientProvider>

  </StrictMode>,
)
