import { createBrowserRouter } from 'react-router'

import App from '@templates/App'
import { Home } from './Home'
import { Login } from './Login'
import { NotFound } from './NotFound'

import { authAction } from '@/lib/actions/authAction'
import { logoutAction } from '../lib/actions/logout'

import { postsLoader } from './Home/loader'
import { userLoader } from '../lib/loaders/userLoader'

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
        Component: Login,
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
