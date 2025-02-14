import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalProvider } from './GlobalContext.jsx'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GlobalProvider>
        <App />
    </GlobalProvider>
    </BrowserRouter>
  </StrictMode>,
)
