import { createBrowserRouter } from 'react-router'

import App from '@templates/App'
import { Home } from './Home'
import { Post } from './Post'
import { NotFound } from './NotFound'
import { UnexpectedError } from './UnexpectedError'
import { AuthForm } from '@organisms/AuthForm'

import { authAction } from '@/lib/actions/authAction'
import { logoutAction } from '@/lib/actions/logout'

import { postsLoader } from './Home/loader'
import { postLoader } from './Post/loader'
import { userLoader } from '@/lib/loaders/userLoader'

export const appRouter = createBrowserRouter([
  {
    Component: App,
    loader: userLoader,
    ErrorBoundary: UnexpectedError,
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
        path: '/posts/:id',
        Component: Post,
        loader: postLoader
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
