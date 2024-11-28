import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AccessibilityContextProvider from './context/AccessibilityContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AccessibilityContextProvider>
    <App />
    </AccessibilityContextProvider>
  </StrictMode>,
)
