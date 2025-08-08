import CloseIcon from '~/components/atoms/CloseIcon'

export interface DialogProps {
  children: React.ReactNode
  ref: React.RefObject<HTMLDialogElement | null>
}

export function Dialog({ children, ref }: DialogProps) {
  return (
    <dialog
      ref={ref}
      className="absolute inset-1/2 -translate-1/2 rounded-lg p-4"
    >
      <button
        aria-label="Close"
        onClick={() => ref?.current?.close()}
        className="absolute top-2 right-2 cursor-pointer"
      >
        <CloseIcon />
      </button>
      {children}
    </dialog>
  )
}
