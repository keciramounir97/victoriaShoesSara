// Image héro externe stable (picsum + seed) pour éviter un fichier `hero.jpg` absent dans le dépôt.
const HERO_SRC = 'https://picsum.photos/seed/victoria-hero/900/1200';

export default function HeroGrid() {
  return (
    <div className="h-full min-h-[280px] sm:min-h-[400px] w-full relative overflow-hidden">
      <img src={HERO_SRC} alt="Collection Victoria Shoes" className="h-full w-full object-cover object-center" />
    </div>
  );
}
