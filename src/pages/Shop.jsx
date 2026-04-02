import { useMemo, useState } from "react";
import ProductCard from "../composants/ProductCard.jsx";
import { products } from "../data.js";
import { categories } from "../composants/Categories.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function Shop() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState([]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const result = products.filter((product) => {
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
      const queryMatch =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });

    if (sortBy === "price-asc") {
      return [...result].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...result].sort((a, b) => b.price - a.price);
    }

    return [...result].sort((a, b) => b.rating - a.rating);
  }, [query, selectedCategory, sortBy]);

  const toggleWishlist = (productId) => {
    setWishlist((previousValue) =>
      previousValue.includes(productId)
        ? previousValue.filter((id) => id !== productId)
        : [...previousValue, productId],
    );
  };

  const openProductDetail = () => {};
  const openQuickView = () => {};

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-700">{t("shop.title")}</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">{t("shop.subtitle")}</p>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white/80 p-4 sm:p-5 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("shop.searchPlaceholder")}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 outline-none"
            />

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 outline-none bg-white"
            >
              <option value="all">{t("shop.allCategories")}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 outline-none bg-white"
            >
              <option value="popular">{t("shop.sortPopular")}</option>
              <option value="price-asc">{t("shop.sortPriceAsc")}</option>
              <option value="price-desc">{t("shop.sortPriceDesc")}</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{t("shop.results", { count: filteredProducts.length })}</p>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-pink-200 p-8 text-center text-gray-500">
            {t("shop.empty")}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                openQuickView={openQuickView}
                openProductDetail={openProductDetail}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
