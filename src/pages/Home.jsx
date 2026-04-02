import HeroGrid from "../composants/hero-grid"
import HeroText from "../composants/hero-text"
import Separator from "../composants/Separator"
import Categories from "../composants/Categories"
import Nouveaute from "../composants/Nouveaute"
import BestSellers from "../composants/BestSellers"

export default function Home() {
  return (
    <>
      <main className="px-3 pt-4 sm:px-6">
        <div className="grid min-h-[calc(85vh-120px)] overflow-hidden rounded-3xl border border-rose-100 shadow-md dark:border-zinc-700 md:grid-cols-2">
          <section className="bg-[#e83975] flex items-center px-5 py-12 sm:px-12">
            <HeroText />
          </section>

          <section className="min-h-[280px] md:min-h-full">
            <HeroGrid />
          </section>
        </div>
      </main>

      <Separator />
      <Categories />
      <Nouveaute />
      <BestSellers />
    </>
  )
}