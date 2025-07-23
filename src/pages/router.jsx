import { createBrowserRouter } from 'react-router'

import App from '@templates/App'
import { Home } from './Home'
import { NotFound } from './NotFound'

import { authAction } from '@/lib/actions/authAction'
import { logoutAction } from '../lib/actions/logout'

import { postsLoader } from './Home/loader'
import { userLoader } from '../lib/loaders/userLoader'
import { AuthForm } from '@organisms/AuthForm'

export const appRouter = createBrowserRouter([
  {
    Component: App,
    loader: userLoader,
    children: [
      {
        index: true,
        Component: Home,
        loader: postsLoader
      },
      {
        path: '/login',
        Component: AuthForm,
        action: authAction
      },
      {
        path: '/sign-up',
        element: <AuthForm signUp />,
        action: authAction
      },
      {
        path: '/logout',
        action: logoutAction
      },
      {
        path: '*',
        Component: NotFound
      }
    ]
  }
])
