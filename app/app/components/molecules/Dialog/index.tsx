export interface DialogProps {
  children: React.ReactNode
  ref: React.RefObject<HTMLDialogElement | null>
}

export function Dialog({ children, ref }: DialogProps) {
  return (
    <dialog ref={ref}>
      <button aria-label="Close" onClick={() => ref?.current?.close()}>
        x
      </button>
      {children}
    </dialog>
  )
}
