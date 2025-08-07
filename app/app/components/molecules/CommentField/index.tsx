import type { HtmlHTMLAttributes } from 'react'

export default function CommentField(
  props: HtmlHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <>
      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        name="comment"
        placeholder="Write a comment..."
        required
        {...props}
      />
    </>
  )
}
