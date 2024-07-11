import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ReactGA from 'react-ga4'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import reportWebVitals from './reportWebVitals'
import App from './App'

// 구글 애널리틱스 초기화
if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS)
}

const queryClient = new QueryClient() // QueryClient 인스턴스 생성

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
