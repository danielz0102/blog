export default function CommentField({ defaultValue = '' }) {
  return (
    <>
      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        name="comment"
        placeholder="Write a comment..."
        required
        defaultValue={defaultValue}
      />
    </>
  )
}
