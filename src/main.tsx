import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,            // 失败重试次数
            refetchOnWindowFocus: false, // 切回页面不自动重试
            staleTime: 1000 * 60, // 缓存有效期 1 分钟
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




