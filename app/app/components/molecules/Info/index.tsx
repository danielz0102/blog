import InfoIcon from '~/components/atoms/InfoIcon'

export default function Info({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex gap-2 rounded border border-zinc-600 bg-zinc-900 p-4 text-zinc-400">
      <InfoIcon />
      {children}
    </p>
  )
}
