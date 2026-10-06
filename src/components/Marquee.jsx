/* Edge-to-edge scrolling strip. The item list is duplicated so the
   CSS translateX(-50%) loop is seamless. */
export default function Marquee({
  items,
  className = '',
  speed = 'normal',
  reverse = false,
  separator = '✦',
}) {
  const track = [...items, ...items]

  return (
    <div
      className={`relative flex overflow-hidden border-y-2 border-ink ${className}`}
      aria-hidden="true"
    >
      <div
        className={`marquee-track flex w-max shrink-0 items-center gap-6 py-3 ${
          speed === 'slow' ? 'marquee-track--slow' : ''
        } ${reverse ? 'marquee-track--reverse' : ''}`}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="font-display text-sm uppercase tracking-widest sm:text-base">
              {item}
            </span>
            <span className="opacity-40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
