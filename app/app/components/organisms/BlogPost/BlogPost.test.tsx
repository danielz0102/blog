import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import { BlogPost } from '.'
import type { Post } from '~/types'

test('renders blog post with correct info', () => {
  const post: Post = {
    id: crypto.randomUUID(),
    title: 'Test Post',
    createdAt: '2023-10-01T12:00:00Z',
    content: 'This is a test post content.',
    comments: []
  }

  const { queryByText } = render(<BlogPost post={post} />)

  expect(queryByText(post.title)).toBeInTheDocument()
  expect(queryByText(post.createdAt)).toBeInTheDocument()
  expect(queryByText(post.content)).toBeInTheDocument()
})
