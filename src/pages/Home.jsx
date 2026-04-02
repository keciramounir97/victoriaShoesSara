import HeroGrid from "../composants/hero-grid"
import HeroText from "../composants/hero-text"
import Separator from "../composants/Separator"
import Categories from "../composants/Categories"
import Nouveaute from "../composants/Nouveaute"
import BestSellers from "../composants/BestSellers"

export default function Home() {
  return (
    <>
      <main className=" min-h-[calc(85vh-80px)] pt-15 px-6">
        
        <div className="h-full grid grid-cols-2 gap-0">
          
          {/* TEXT */}
          <section className="min-w-[35vw] bg-[#e83975] flex items-center px-12">
            <HeroText />
          </section>

          {/* IMAGE */}
          <section className="h-full ">
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