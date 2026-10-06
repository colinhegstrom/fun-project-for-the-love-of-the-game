import Blobs from '../components/Blobs.jsx'
import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-moss-50">
      <Blobs />
      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-6 px-5 py-24 text-center sm:px-8">
        <span className="font-display text-7xl text-moss-500 sm:text-8xl">404</span>
        <h1 className="font-display text-3xl uppercase leading-tight sm:text-4xl">
          This page got taken out with the trash.
        </h1>
        <p className="max-w-md text-moss-800">
          The link is broken, but the pressure washer still works. Try one of these instead.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button to="/">Back home</Button>
          <Button to="/services" variant="bone">
            See prices
          </Button>
        </div>
      </div>
    </section>
  )
}
