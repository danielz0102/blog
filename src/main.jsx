import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'

import '@/styles/index.css'
import App from '@templates/App'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'

import { loginAction } from './pages/Login/action'
import { userLoader } from './lib/loaders/userLoader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: userLoader,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
