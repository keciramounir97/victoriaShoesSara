// Constantes partagées catégories : fichier séparé pour satisfaire eslint-plugin-react-refresh (un seul export composant par fichier dans Categories.jsx).

export const categoryIds = [
  { id: 'heels', icon: '👠' },
  { id: 'sneakers', icon: '👟' },
  { id: 'boots', icon: '🥾' },
  { id: 'sandals', icon: '🩴' },
  { id: 'flats', icon: '🥿' },
];

export const categoryLabels = {
  fr: {
    heels: 'Talons',
    sneakers: 'Baskets',
    boots: 'Bottes',
    sandals: 'Sandales',
    flats: 'Plates',
  },
  en: {
    heels: 'Heels',
    sneakers: 'Sneakers',
    boots: 'Boots',
    sandals: 'Sandals',
    flats: 'Flats',
  },
};
