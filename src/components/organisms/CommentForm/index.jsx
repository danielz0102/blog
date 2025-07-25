import { useId } from 'react'
import { useFetcher } from 'react-router'

export function CommentForm({ postId }) {
  const fetcher = useFetcher()
  const inputId = useId()

  return (
    <div>
      <h3>Leave a Comment</h3>
      {fetcher.data?.error && <p>{fetcher.data.error}</p>}
      <fetcher.Form
        method="post"
        action={`/posts/${postId}/comment`}
        aria-label="Comment Form"
      >
        <div className="form-field">
          <label htmlFor={inputId}>Comment</label>
          <textarea name="content" id={inputId} placeholder="Comment..." />
        </div>
        <button type="submit">Post</button>
      </fetcher.Form>
    </div>
  )
}
