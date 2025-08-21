import { TINYMCE_API_KEY } from 'astro:env/client'
import { Editor } from '@tinymce/tinymce-react'

import { useState, useRef } from 'react'

export interface TextEditorProps {
  initialValue?: string
  name: string
  id: string
}

export default function TextEditor({
  initialValue,
  name,
  id,
}: TextEditorProps) {
  const [loading, setLoading] = useState(true)
  const editorRef = useRef<TinyMCEEditor>(null)

  return (
    <>
      {loading && <Loader />}
      <Editor
        apiKey={TINYMCE_API_KEY}
        initialValue={initialValue}
        textareaName={name}
        id={id}
        onInit={(_, editor) => {
          setLoading(false)
          editorRef.current = editor
        }}
        onChange={() => editorRef.current?.save()}
        init={{
          onboarding: false,
        }}
      />
    </>
  )
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded border border-gray-300 bg-gray-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        <p className="text-center text-gray-600">Loading editor...</p>
      </div>
    </div>
  )
}
