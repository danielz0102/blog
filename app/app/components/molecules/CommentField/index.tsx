import type { HtmlHTMLAttributes } from 'react'

import FormField from '../FormField'

export default function CommentField(
  props: HtmlHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <FormField>
      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        name="comment"
        placeholder="Write a comment..."
        className="field-sizing-content rounded border border-zinc-600 bg-zinc-700 px-4 py-2 ring-zinc-400 outline-0 transition-shadow focus-visible:ring-2"
        required
        {...props}
      />
    </FormField>
  )
}
