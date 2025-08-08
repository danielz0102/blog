export default function Date({ date }: { date: string }) {
  return (
    <time dateTime={date} className="text-sm text-zinc-400">
      {date}
    </time>
  )
}
