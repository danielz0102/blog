import { createBrowserRouter } from 'react-router'

import App from '@templates/App'
import { userLoader } from '@/lib/loaders/userLoader'
import { UnexpectedError } from './UnexpectedError'

import { Home } from './Home'
import { postsLoader } from './Home/loader'

import { AuthForm } from '@organisms/AuthForm'
import { authAction } from '@/lib/actions/authAction'

import { Post } from './Post'
import { postLoader } from './Post/loader'
import { commentAction } from './Post/comment/action'

import { NotFound } from './NotFound'
import { logoutAction } from './Logout/action'

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
        loader: postLoader,
        children: [
          {
            path: 'comment',
            action: commentAction
          }
        ]
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
