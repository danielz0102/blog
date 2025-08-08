import type { UUID } from 'crypto'
import type { Comment } from '~/types'

import Date from '~/components/atoms/Date'
import TrashIcon from '~/components/atoms/TrashIcon'
import EditIcon from '~/components/atoms/EditIcon'

export type CommentProps = {
  comment: Comment
  userId?: UUID
  onDeleteClick: (comment: Comment) => void
  onUpdateClick: (comment: Comment) => void
}

export default function Comment({
  comment,
  userId,
  onDeleteClick,
  onUpdateClick
}: CommentProps) {
  const handleDeleteClick = () => {
    onDeleteClick(comment)
  }

  const handleUpdateClick = () => {
    onUpdateClick(comment)
  }

  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h3 className="font-medium">{comment.user.username}</h3>
        <Date date={comment.createdAt} />
      </div>
      <p className="text-zinc-200">{comment.content}</p>
      {comment.user.id === userId && (
        <div className="flex gap-2">
          <button
            onClick={handleDeleteClick}
            aria-label="Delete"
            className="cursor-pointer text-red-400 outline-0 transition-transform focus-visible:scale-125"
          >
            <TrashIcon />
          </button>
          <button
            onClick={handleUpdateClick}
            aria-label="Update"
            className="cursor-pointer outline-0 transition-transform focus-visible:scale-125"
          >
            <EditIcon />
          </button>
        </div>
      )}
    </article>
  )
}
