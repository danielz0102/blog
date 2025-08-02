import { useRef, useEffect } from 'react'

type DialogProps = {
  children: React.ReactNode
  open?: boolean
}

export function Dialog({ children, open = false }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  return (
    <dialog ref={dialogRef}>
      <button aria-label="Close" onClick={() => dialogRef.current?.close()}>
        x
      </button>
      {children}
    </dialog>
  )
}
