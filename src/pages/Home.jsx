import HeroGrid from '../composants/hero-grid'; // Bloc visuel principal (image) : import sans extension `.jsx` autorisé par Vite.
import HeroText from '../composants/hero-text'; // Texte + boutons du hero, traduits via `useLanguage` à l’intérieur du composant.
import Separator from '../composants/Separator'; // Séparateur décoratif SVG entre sections.
import Categories from '../composants/Categories'; // Grille des catégories cliquables vers `/shop?category=…`.
import Nouveaute from '../composants/Nouveaute'; // Grille « nouveautés » avec `ProductCard`.
import BestSellers from '../composants/BestSellers'; // Bandeau best-sellers responsive.

export default function Home() {
  // Page d’accueil : `main` occupe la hauteur utile ; grille 1 col sur mobile puis 2 cols à partir de `lg` pour le hero.
  return (
    <>
      <main className="min-h-[85vh] pt-8 sm:pt-12 px-3 sm:px-6">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl">
          <section className="min-h-[320px] bg-[#e83975] flex items-center order-2 lg:order-1">
            <HeroText />
          </section>

          <section className="min-h-[280px] lg:min-h-[520px] order-1 lg:order-2">
            <HeroGrid />
          </section>
        </div>
      </main>

      <Separator />
      <Categories />
      <Nouveaute />
      <BestSellers />
    </>
  );
}
