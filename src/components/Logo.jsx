/* The EWC Cleaning badge from /public. `animate` is kept so existing callers still work. */
export default function Logo({ className = 'h-9 w-9', animate = true }) {
  return (
    <span className={`block overflow-hidden rounded-full ${className}`}>
      <img
        src="/carwashlogo.jpg"
        alt="EWC Cleaning logo"
        className="h-full w-full scale-[1.06] object-cover"
      />
    </span>
  )
}
