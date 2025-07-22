import { createBrowserRouter } from 'react-router'

import App from '@templates/App'
import { Home } from './Home'
import { Login } from './Login'
import { NotFound } from './NotFound'

import { loginAction } from './Login/action'
import { postsLoader } from './Home/loader'
import { logoutAction } from '../lib/actions/logout'
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
        action: loginAction
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
