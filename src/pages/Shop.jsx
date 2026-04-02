import { useMemo, useState } from "react";
import { products } from "../data";
import ProductCard from "../composants/ProductCard";
import { categories } from "../composants/Categories";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function Shop() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const visibleProducts = useMemo(() => {
    const searched = products.filter((product) => {
      const isInCategory = selectedCategory === "all" || product.category === selectedCategory;
      const searchText = search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) || product.brand.toLowerCase().includes(searchText);
      return isInCategory && matchesSearch;
    });

    if (sortBy === "price-asc") {
      return [...searched].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...searched].sort((a, b) => b.price - a.price);
    }
    if (sortBy === "rating") {
      return [...searched].sort((a, b) => b.rating - a.rating);
    }
    return searched;
  }, [search, selectedCategory, sortBy]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const labels = language === "fr"
    ? {
        title: "Boutique",
        subtitle: "Trouvez la paire parfaite pour chaque occasion.",
        all: "Toutes",
        searchPlaceholder: "Rechercher un produit ou une marque...",
        noResults: "Aucun produit trouvé avec ces filtres.",
        sortBy: "Trier par",
        featured: "Recommandés",
        priceAsc: "Prix croissant",
        priceDesc: "Prix décroissant",
        bestRated: "Mieux notés",
      }
    : {
        title: "Shop",
        subtitle: "Find the perfect pair for every occasion.",
        all: "All",
        searchPlaceholder: "Search product or brand...",
        noResults: "No products match your current filters.",
        sortBy: "Sort by",
        featured: "Featured",
        priceAsc: "Price: low to high",
        priceDesc: "Price: high to low",
        bestRated: "Top rated",
      };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-rose-700 dark:text-rose-300">{labels.title}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{labels.subtitle}</p>
      </div>

      <div className="mb-6 grid gap-3 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 sm:grid-cols-3">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={labels.searchPlaceholder}
          className="h-11 rounded-xl border border-rose-200 px-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
        />

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="h-11 rounded-xl border border-rose-200 px-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
        >
          <option value="all">{labels.all}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="h-11 rounded-xl border border-rose-200 px-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
        >
          <option value="featured">{labels.sortBy}: {labels.featured}</option>
          <option value="price-asc">{labels.priceAsc}</option>
          <option value="price-desc">{labels.priceDesc}</option>
          <option value="rating">{labels.bestRated}</option>
        </select>
      </div>

      {visibleProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-rose-200 p-10 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          {labels.noResults}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              openQuickView={setSelectedProduct}
              openProductDetail={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-3 sm:items-center"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl dark:bg-zinc-900"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-300">{selectedProduct.brand}</p>
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.name}
              className="my-4 h-60 w-full rounded-xl object-cover"
            />
            <p className="text-sm">{selectedProduct.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-rose-600">{selectedProduct.price} Da</p>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
