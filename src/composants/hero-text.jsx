export default function HeroText() {
  return (
    <div className="h-full w-full flex flex-col justify-center px-10 text-white">
      <p className="uppercase tracking-[0.3em] text-sm mb-4">
        New Collection 2026
      </p>

      <h1 className="text-5xl font-extrabold leading-tight mb-4">
        Step Into
        <br />
        <span className="text-yellow-200">Victoria Elegance</span>
      </h1>

      <p className="text-sm text-pink-100 mb-8 max-w-md">
        Premium women&apos;s footwear crafted for comfort, style, and
        performance. Discover heels, sneakers, and athleisure designed to keep
        you moving beautifully.
      </p>

      <div className="flex items-center gap-4">
        <button className="px-6 py-3 rounded-full bg-white text-pink-700 font-semibold text-sm hover:bg-pink-50 transition-colors">
          Shop Now
        </button>
        <button className="px-6 py-3 rounded-full border border-pink-100 text-white font-semibold text-sm hover:bg-pink-600/40 transition-colors">
          Explore Collection
        </button>
      </div>
    </div>
  )
}
