import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import Badge from './Badge';
import '../styles/productCard.css';
import { useLanguage } from '../context/LanguageContext';

const ProductCard = ({ product, wishlist, toggleWishlist, openQuickView, openProductDetail }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <div 
      className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-transparent dark:border-zinc-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openProductDetail(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-rose-50 to-amber-50">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <Badge className="bg-rose-500 text-white shadow-lg">{t('productNew')}</Badge>
          )}
          {product.isBestseller && (
            <Badge className="bg-amber-500 text-white shadow-lg">{t('productBestseller')}</Badge>
          )}
        </div>
        
        {/* Hover Overlay avec icônes */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="wishlist w-11 h-11 bg-white rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-rose-50 shadow-lg"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                wishlist.includes(product.id) 
                  ? 'fill-rose-500 text-rose-500' 
                  : 'text-gray-700 hover:text-rose-500'
              }`} 
            />
          </button>
          
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="eye w-11 h-11 bg-white rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-rose-50 shadow-lg"
          >
            <Eye className="w-5 h-5 text-gray-700 hover:text-rose-500" />
          </button>
          
          {/* Quick Add Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle quick add to cart with default options
              console.log('Quick add:', product.name);
            }}
            className="shoppingBag w-11 h-11 bg-white rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-rose-50 shadow-lg"
          >
            <ShoppingBag className="w-5 h-5 text-gray-700 hover:text-rose-500" />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 dark:text-zinc-400 mb-1">{product.brand}</p>
        <h4 className="product-name font-semibold text-gray-900 dark:text-zinc-100 mb-2 line-clamp-1">{product.name}</h4>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-amber-400 text-amber-400' 
                    : 'fill-gray-200 text-gray-200'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-zinc-400 ml-1">({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-rose-600">{product.price} Da</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 dark:text-zinc-500 line-through">{product.originalPrice} Da</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;