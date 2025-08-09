import type { Post } from '~/types'

import { Link, useFetcher } from 'react-router'
import { useRef, type HtmlHTMLAttributes } from 'react'

import Input from '~/components/atoms/Input'

export interface PostSearchBarProps {
  className?: HtmlHTMLAttributes<HTMLDivElement>['className']
}

export default function PostSearchBar({ className = '' }: PostSearchBarProps) {
  const fetcher = useFetcher<Post[]>()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetcher.load(`/posts/search?title=${event.target.value}`)
  }

  const onClickLink = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      fetcher.load(`/posts/search?title=`)
    }
  }

  return (
    <div
      className={`relative flex w-full flex-col items-center md:max-w-2xl ${className}`}
    >
      <Input
        ref={inputRef}
        type="search"
        name="title"
        onChange={handleChange}
        placeholder="Search posts... 🔍"
        className="w-full"
      />
      {fetcher.data && fetcher.data.length > 0 && (
        <div className="absolute top-full right-0 left-0 z-10 mt-1 max-h-64 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {fetcher.data.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className="block border-b border-gray-100 px-4 py-3 text-sm text-gray-700 transition-colors duration-150 outline-none last:border-b-0 hover:bg-gray-100 focus:bg-gray-100"
              onClick={onClickLink}
            >
              <span className="truncate font-medium">{post.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
