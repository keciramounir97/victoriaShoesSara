import goldHeels from "./assets/products/gold-heels.jpg"
import silverHeels from "./assets/products/silver-heels.jpg"
import blueSandal from "./assets/products/blue-sandal.jpg"
import blackSandal from "./assets/products/black-sandal.jpg"
import pinkHeels from "./assets/products/pink-heels.jpg"
import beigeSneakers from "./assets/products/beige-sneakers.jpg"
import blueSneakers from "./assets/products/blue-sneakers.jpg"
import brownFlat from "./assets/products/brown-flat.jpg"
import whiteFlat from "./assets/products/white-flat.jpg"
import boots from "./assets/products/boots.jpg"
import blackboots from "./assets/products/black-boots.webp"
import zaraSandale from "./assets/products/zara-sandale.jpg"
import heels from "./assets/products/heels.jpg"

export const products = [
    {
      id: 1,
      name: 'Rose Gold Stiletto Heels',
      brand: 'Luxe Collection',
      price: 4500,
      originalPrice: 5000,
      category: 'heels',
      sizes: ['35', '36', '37', '38', '39', '40', '41'],
      colors: [
        { name: 'Rose Gold', hex: '#B76E79' },
        { name: 'Silver', hex: '#C0C0C0' },
        { name: 'Gold', hex: '#FFD700' },
      ],
      images: [
      goldHeels,
      silverHeels,
       
      ],
      description: 'Elegant rose gold stiletto heels perfect for special occasions. Features a comfortable 4-inch heel with cushioned insole.',
      rating: 4.8,
      reviews: 124,
      isNew: true,
    },
    {
      id: 2,
      name: 'Beige Leather Sneakers',
      brand: 'Nike ',
      price: 4500,
      originalPrice: 5200,
      category: 'sneakers',
      sizes: ['35', '36', '37', '38', '39', '40', '41'],
      colors: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Blush', hex: '#FFB6C1' },
        { name: 'Navy', hex: '#000080' },
      ],
      images: [
        beigeSneakers,
        blueSneakers,
      ],
      description: 'Premium beige leather sneakers with rose gold accent details. Memory foam insole provides exceptional comfort.',
      rating: 4.9,
      reviews: 256,
      isBestseller: true,
    },
    {
      id: 3,
      name: 'Brown Suede Ankle Boots',
      brand: 'Evening Star',
      price: 8000,
      originalPrice: 9000,
      category: 'boots',
      sizes: ['35', '36', '37', '38', '39', '40'],
      colors: [
        { name: 'Brown', hex: '#5C4033' },
        { name: 'Burgundy', hex: '#800020' },
        { name: 'Tan', hex: '#D2B48C' },
      ],
      images: [
        boots,
        
      ],
      description: 'Sophisticated black suede ankle boots with a stable 3-inch block heel.',
      rating: 4.7,
      reviews: 89,
    },
    {
      id: 4,
      name: 'Blue Strappy Sandals',
      brand: 'Summer Bliss',
      price: 5000,
      originalPrice: 5500,
      category: 'sandals',
      sizes: ['35', '36', '37', '38', '39', '40', '41'],
      colors: [
        { name: 'Rose Pink', hex: '#FF66CC' },
        { name: 'Gold', hex: '#FFD700' },
        { name: 'Silver', hex: '#C0C0C0' },
      ],
      images: [
        blueSandal,
        blackSandal,
      ],
      description: 'Delicate rose pink strappy sandals with elegant gold hardware.',
      rating: 4.6,
      reviews: 67,
      isNew: true,
    },
    {
      id: 5,
      name: 'Nude Ballet Flats',
      brand: 'Classic Comfort',
      price: 4000,
      originalPrice: 4300,
      category: 'flats',
      sizes: ['35', '36', '37', '38', '39', '40', '41'],
      colors: [
        { name: 'Nude', hex: '#E3BC9A' },
        { name: 'Black', hex: '#000000' },
        { name: 'Navy', hex: '#000080' },
      ],
      images: [
        brownFlat,
      whiteFlat,
      ],
      description: 'Timeless nude ballet flats with a charming gold bow detail.',
      rating: 4.8,
      reviews: 198,
      isBestseller: true,
    },
    {
      id: 6,
      name: 'Nude Pointed Pumps',
      brand: 'Executive Chic',
      price: 5000,
      originalPrice: 6000,
      category: 'heels',
      sizes: ['35', '36', '37', '38', '39', '40'],
      colors: [
        { name: 'Nude', hex: '#E3BC9A' },
        { name: 'Black', hex: '#000000' },
        { name: 'Red', hex: '#FF0000' },
      ],
      images: [
        heels,
        
      ],
      description: 'Classic nude pointed toe pumps with rose gold accent heel.',
      rating: 4.7,
      reviews: 145,
    },
    {
      id: 7,
      name: 'White Platform Sneakers',
      brand: 'Street Style',
      price: 5400,
      originalPrice: 6000,
      category: 'sneakers',
      sizes: ['35', '36', '37', '38', '39', '40', '41'],
      colors: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' },
        { name: 'Pink', hex: '#FFC0CB' },
      ],
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      ],
      description: 'Trendy white chunky platform sneakers with subtle gold details.',
      rating: 4.5,
      reviews: 112,
      isNew: true,
    },
    {
      id: 8,
      name: 'Brown Knee-High Boots',
      brand: 'Autumn Grace',
      price: 6000,
      originalPrice: 7000,
      category: 'boots',
      sizes: ['35', '36', '37', '38', '39', '40'],
      colors: [
        { name: 'Brown', hex: '#8B4513' },
        { name: 'Black', hex: '#000000' },
        { name: 'Cognac', hex: '#9A463D' },
      ],
      images: [
        boots,
        
      ],
      description: 'Elegant brown leather knee-high riding boots.',
      rating: 4.9,
      reviews: 78,
      isBestseller: true,
    },
    {
      id: 9,
      name: 'Rose Satin Heels',
      brand: 'Romance',
      price: 5600,
      originalPrice: 6400,
      category: 'heels',
      sizes: ['35', '36', '37', '38', '39', '40', '41'],
      colors: [
        { name: 'Rose', hex: '#FF007F' },
        { name: 'Champagne', hex: '#F7E7CE' },
        { name: 'Ivory', hex: '#FFFFF0' },
      ],
      images: [
        pinkHeels,
        
      ],
      description: 'Stunning rose satin heels perfect for weddings and special occasions.',
      rating: 4.6,
      reviews: 93,
      isNew: true,
    },
    {
      id: 10,
      name: 'Gladiator Sandals',
      brand: 'Bohemian Soul',
      price: 3400,
      originalPrice: 4000,
      category: 'sandals',
      sizes: ['35', '36', '37', '38', '39', '40', '41'],
      colors: [
        { name: 'Tan', hex: '#D2B48C' },
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
      ],
      images: [
        zaraSandale,
      
      ],
      description: 'Stylish tan leather gladiator sandals with braided details.',
      rating: 4.4,
      reviews: 56,
    },
    {
      id: 11,
      name: 'Leather Loafers',
      brand: 'Preppy Chic',
      price: 4000,
      originalPrice: 4500,
      category: 'flats',
      sizes: ['35', '36', '37', '38', '39', '40', '41'],
      colors: [
        { name: 'Burgundy', hex: '#800020' },
        { name: 'Black', hex: '#000000' },
        { name: 'Navy', hex: '#000080' },
      ],
      images: [
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
      ],
      description: 'Classic burgundy leather loafers with gold horsebit detail.',
      rating: 4.7,
      reviews: 134,
    },
    {
      id: 12,
      name: 'Chelsea Boots',
      brand: 'Modern Edge',
      price: 9000,
      originalPrice: 10000,
      category: 'boots',
      sizes: ['35', '36', '37', '38', '39', '40'],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Grey', hex: '#808080' },
        { name: 'Tan', hex: '#D2B48C' },
      ],
      images: [
        blackboots,
        
      ],
      description: 'Sleek black Chelsea boots with elastic side panels.',
      rating: 4.8,
      reviews: 167,
    },
  ];