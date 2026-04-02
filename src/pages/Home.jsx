import HeroGrid from "../composants/hero-grid"
import HeroText from "../composants/hero-text"
import Separator from "../composants/Separator"
import Categories from "../composants/Categories"
import Nouveaute from "../composants/Nouveaute"
import BestSellers from "../composants/BestSellers"

export default function Home() {
  return (
    <>
      <main className="min-h-[calc(85vh-80px)] pt-4 sm:pt-8 px-3 sm:px-6">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl">
          <section className="bg-[#e83975] flex items-center">
            <HeroText />
          </section>

          <section className="h-[280px] sm:h-[360px] lg:h-auto">
            <HeroGrid />
          </section>
        </div>
      </main>

      <Separator />
      <Categories />
      <Nouveaute />
      <BestSellers  />
     
    </>
  )
}