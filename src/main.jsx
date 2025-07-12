import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'

import '@/styles/index.css'
import App from './components/templates/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
