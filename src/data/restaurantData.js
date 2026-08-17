export const RESTAURANT_INFO = {
  name: "L'AURA GRAND",
  subtitle: "Haute Gastronomy & Starlight Lounge",
  tagline: "3 Michelin Stars • Oceanfront Fine Dining",
  chef: "Master Chef Laurent Mercier",
  address: "1000 Azure Way, Ocean Promontory, CA 90265",
  phone: "+1 (800) 287-2589",
  email: "reservations@lauragrand.luxury",
  hours: {
    lunch: "Wednesday – Sunday: 12:00 PM – 3:30 PM",
    dinner: "Daily: 5:30 PM – 11:30 PM",
    lounge: "Daily: 4:00 PM – 1:30 AM"
  },
  accolades: [
    "3 Michelin Stars (2024, 2025, 2026)",
    "World's 50 Best Restaurants #4",
    "Wine Spectator Grand Award Winner",
    "Forbes 5-Star Dining Distinction"
  ]
};

export const MENU_CATEGORIES = [
  { id: 'tasting', name: "Chef's Tasting Menus" },
  { id: 'starters', name: 'Starters & Caviar' },
  { id: 'mains', name: 'Signature Mains & Steaks' },
  { id: 'seafood', name: 'Ocean Catch & Lobster' },
  { id: 'desserts', name: 'Artisanal Desserts' },
  { id: 'wines', name: 'Sommelier Wine & Cocktails' }
];

export const MENU_ITEMS = [
  // Tasting Menus
  {
    id: 'tasting-prestige',
    name: 'The Imperial 7-Course Gastronomy Journey',
    category: 'tasting',
    price: 240,
    badge: '3-Michelin Signature',
    description: 'Brittany blue lobster, A5 Miyazaki Wagyu, Oscietra caviar, Périgord black truffles, and Grand Marnier gold leaf soufflé with optional Grand Cru wine pairing.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    dietary: ['Chef Special', 'Wine Pairing Available']
  },
  {
    id: 'tasting-seaside',
    name: '5-Course Azure Coastal Harvest',
    category: 'tasting',
    price: 165,
    badge: 'Most Popular',
    description: 'Wild sea bass carpaccio, hand-dived scallops with saffron emulsion, roasted langoustines, and Meyer lemon verbena sorbet.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    dietary: ['Fresh Catch', 'Gluten Free']
  },

  // Starters
  {
    id: 'starter-caviar',
    name: 'Royal Oscietra Caviar Imperial Service (50g)',
    category: 'starters',
    price: 145,
    badge: 'Luxury Delight',
    description: 'Traditional warm buckwheat blinis, organic egg mimosa, crème fraîche, and chives served on sculpted crystal ice.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    dietary: ['Signature Starter']
  },
  {
    id: 'starter-truffle-carpaccio',
    name: 'Black Winter Truffle Beef Tenderloin Carpaccio',
    category: 'starters',
    price: 48,
    badge: 'Chef Favorite',
    description: 'Aged Parmigiano-Reggiano 36-month foam, shaved black truffles, caper emulsion, and toasted brioche tuile.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten Free Option']
  },
  {
    id: 'starter-scallops',
    name: 'Pan-Seared Hokkaido Scallops with Saffron Foam',
    category: 'starters',
    price: 52,
    badge: 'Seafood Masterpiece',
    description: 'Parsnip mousseline, crispy Ibérico pancetta, and golden saffron reduction with micro herbs.',
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=800&q=80',
    dietary: ['Dairy Free Option']
  },

  // Mains
  {
    id: 'main-wagyu-rossini',
    name: 'A5 Miyazaki Wagyu Rossini with Seared Foie Gras',
    category: 'mains',
    price: 135,
    badge: 'Crown Signature',
    description: 'Tender A5 Wagyu tenderloin topped with Hudson Valley foie gras, Périgord black truffle jus, and pomme purée.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    dietary: ['Chef Special']
  },
  {
    id: 'main-duck-breast',
    name: 'Dry-Aged Challandais Duck Breast with Spiced Honey',
    category: 'mains',
    price: 68,
    badge: 'French Classic',
    description: 'Caramelized heirloom baby beets, blood orange glaze, lavender honey, and crispy wild duck skin crumble.',
    image: 'https://images.unsplash.com/photo-1514944298352-f5dcfa47c0b6?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten Free']
  },

  // Seafood
  {
    id: 'seafood-blue-lobster',
    name: 'Whole Poached Brittany Blue Lobster Thermidor',
    category: 'seafood',
    price: 125,
    badge: 'Signature Seafood',
    description: 'Cognac cream sauce, Gruyère crust, wild chanterelles, and tarragon foam served in lobster shell.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    dietary: ['Fresh Daily']
  },
  {
    id: 'seafood-turbot',
    name: 'Wild Atlantic Turbot Fillet with Morel Velouté',
    category: 'seafood',
    price: 78,
    badge: 'Catch of the Day',
    description: 'Slow-poached in seaweed butter with spring asparagus, braised leeks, and Vin Jaune emulsion.',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten Free']
  },

  // Desserts
  {
    id: 'dessert-souffle',
    name: 'Grand Marnier Gold Leaf Warm Soufflé',
    category: 'desserts',
    price: 28,
    badge: 'Tableside Service',
    description: 'Puffed to perfection with 24K edible gold leaf, poured with warm Madagascar bourbon vanilla bean crème anglaise.',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian']
  },
  {
    id: 'dessert-chocolate-sphere',
    name: 'Valrhona Dark Chocolate Melting Starlight Sphere',
    category: 'desserts',
    price: 26,
    badge: 'Visual Wonder',
    description: 'Filled with hazelnut praline crunch, passionfruit coulis, and gold dust, melted tableside with hot salted caramel.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian']
  },

  // Wines & Cocktails
  {
    id: 'wine-dom-perignon',
    name: 'Dom Pérignon Vintage 2013 Champagne (Bottle)',
    category: 'wines',
    price: 380,
    badge: 'Sommelier Choice',
    description: 'Notes of mirabelle plum, fresh mint, and toasted almond with vibrant precision and silky effervescence.',
    image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=800&q=80',
    dietary: ['Grand Cru']
  },
  {
    id: 'cocktail-smoked-gold',
    name: 'The 24K Smoked Gold Old Fashioned',
    category: 'wines',
    price: 32,
    badge: 'Mixology Star',
    description: 'WhistlePig 12-Year Rye, organic saffron maple syrup, Angostura bitters, smoked in applewood dome with 24K gold flake ice sphere.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    dietary: ['Signature Cocktail']
  }
];

export const DINING_TABLE_ZONES = [
  { id: 'window', name: 'Oceanfront Glass Panorama Table', extraFee: 0, desc: 'Uninterrupted 180° views of the illuminated azure ocean' },
  { id: 'terrace', name: 'Starlit Candlelit Balcony Table', extraFee: 25, desc: 'Romantic open-air terrace with gentle sea breeze and heaters' },
  { id: 'chef', name: "Chef's Wine Cellar Table (VIP)", extraFee: 60, desc: 'Private seating beside rare vintage vaults with sommelier attention' },
  { id: 'booth', name: 'Intimate Velvet Pavilion Booth', extraFee: 0, desc: 'Private curved velvet booth for quiet conversation' }
];

export const SCRATCH_DISCOUNT_PRIZES = [
  {
    id: 'dine-50-jackpot',
    title: '50% OFF Your Entire Dining Bill',
    badge: '💎 50% CHEF JACKPOT',
    discountType: 'percentage',
    discountValue: 50,
    maxDiscount: 200,
    minSpend: 100,
    description: 'Enjoy a monumental 50% discount on all food & tasting menus tonight (up to $200).'
  },
  {
    id: 'dine-50-dollar',
    title: '$50 Instant Dining Voucher',
    badge: '🥇 $50 DINING CREDIT',
    discountType: 'fixed_amount',
    discountValue: 50,
    maxDiscount: 50,
    minSpend: 120,
    description: 'Get $50 deducted instantly from your total restaurant bill or tasting reservation.'
  },
  {
    id: 'dine-free-wine',
    title: 'Complimentary Bottle of Sommelier Wine',
    badge: '🍷 FREE WINE BOTTLE ($75 Value)',
    discountType: 'fixed_amount',
    discountValue: 75,
    maxDiscount: 75,
    minSpend: 150,
    description: 'Enjoy a complimentary bottle of Sommelier-selected French red or white wine ($75 value).'
  },
  {
    id: 'dine-free-dessert',
    title: 'Complimentary Gold Leaf Soufflé for 2',
    badge: '🍨 FREE DESSERT ($40 Value)',
    discountType: 'fixed_amount',
    discountValue: 40,
    maxDiscount: 40,
    minSpend: 80,
    description: 'Two complimentary signature Grand Marnier Gold Leaf soufflés with tableside presentation.'
  },
  {
    id: 'dine-25-percent',
    title: '25% OFF Table Reservation & Tasting',
    badge: '🥈 25% OFF BILL',
    discountType: 'percentage',
    discountValue: 25,
    maxDiscount: 100,
    minSpend: 80,
    description: 'Save 25% on your choice of Chef Tasting Menu or À La Carte selection.'
  }
];

export function generateRestaurantCouponCode(badge) {
  const prefix = 'DINE';
  const tag = badge ? badge.replace(/[^A-Z0-9]/g, '').substring(0, 4) : 'GOLD';
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const randChar = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${tag}-${randChar}${randNum}`;
}
