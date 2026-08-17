export const DINING_DATA = [
  {
    id: 'restaurant-laura',
    name: "L'Aura Grand Gastronomy",
    tagline: '3 Michelin Stars • Haute French Culinary Art',
    chef: 'Executive Chef Laurent Mercier',
    dressCode: 'Elegant / Black Tie Optional',
    hours: 'Dinner: 6:00 PM – 11:30 PM (Wed–Sun)',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    description: 'An unforgettable multisensory journey overlooking the nocturnal illuminated bay. Rare black truffles, Brittany lobster, and Grand Cru wine pairings orchestrated by Master Sommeliers.',
    specialties: [
      'Poached Blue Brittany Lobster with Coral Emulsion',
      'A5 Miyazaki Wagyu Rossini with Périgord Truffle',
      'Grand Grand Marnier Soufflé with Madagascar Vanilla Gold Leaf'
    ],
    tableTypes: [
      { id: 'window', name: 'Oceanfront Glass Panorama Table', extraFee: 0 },
      { id: 'terrace', name: 'Private Starlit Balcony Table', extraFee: 50 },
      { id: 'chef', name: "Chef's Table in the Wine Cellar", extraFee: 120 }
    ],
    timeSlots: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']
  },
  {
    id: 'restaurant-saffron-silk',
    name: 'Saffron & Jade Silk Pavilion',
    tagline: 'Modern Pan-Asian & Coastal Teppanyaki',
    chef: 'Master Chef Kenji Takahashi & Chef Priya Nair',
    dressCode: 'Smart Casual',
    hours: 'Lunch: 12:00 PM – 3:30 PM • Dinner: 6:30 PM – 11:00 PM',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Celebrating the ancient spice routes with contemporary flair. Savor fresh Bluefin tuna otoro sushi, robata-grilled king crab, and aromatic saffron curries beside tranquil koi water gardens.',
    specialties: [
      'Robata-Grilled Alaskan King Crab with Yuzu Shiso Butter',
      'Smoked Duck Breast with Kashmiri Saffron Honey Glaze',
      'Omakase Sashimi Platter with Fresh Shizuoka Wasabi'
    ],
    tableTypes: [
      { id: 'teppan', name: 'Teppanyaki Master Counter', extraFee: 30 },
      { id: 'garden', name: 'Lotus Garden Pavilion Booth', extraFee: 0 },
      { id: 'private', name: 'Private Tatami Dining Salon', extraFee: 80 }
    ],
    timeSlots: ['12:30', '13:30', '18:30', '19:15', '20:00', '20:45']
  },
  {
    id: 'restaurant-celeste-rooftop',
    name: 'Celeste Starlight Lounge & Raw Bar',
    tagline: 'Rooftop Mixology & Mediterranean Crudo',
    chef: 'Mixologist Matteo Rossi',
    dressCode: 'Resort Chic',
    hours: '4:00 PM – 1:30 AM Daily',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    description: 'Perched high on the 12th floor promontory with live lounge saxophone, open flame fire pits, bespoke botanical cocktails, and pristine raw seafood bars.',
    specialties: [
      'Gillardeau Oyster Flight with Champagne Mignonette',
      'Wild Mediterranean Hamachi Ceviche with Blood Orange',
      'Smoked Golden Negroni infused with 24K Edible Gold'
    ],
    tableTypes: [
      { id: 'firepit', name: 'Sunset Firepit Lounge Sofas', extraFee: 25 },
      { id: 'bar', name: 'Mixology Front Counter', extraFee: 0 },
      { id: 'vip-cabana', name: 'VIP Skyline Skybed Cabana', extraFee: 90 }
    ],
    timeSlots: ['16:30', '17:30', '18:30', '19:30', '21:00', '22:30']
  }
];
