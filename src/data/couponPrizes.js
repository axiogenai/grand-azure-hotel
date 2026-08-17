export const COUPON_PRIZE_POOL = [
  {
    id: 'prize-diamond-jackpot',
    title: '50% OFF Entire Stay (Grand Jackpot)',
    tier: 'Black Diamond',
    badge: '💎 JACKPOT REWARD',
    discountType: 'percentage',
    discountValue: 50,
    maxDiscount: 1500,
    minSpend: 800,
    description: 'Enjoy a monumental 50% discount on your entire reservation at any Villa or Penthouse.',
    perkText: '50% Discount on Rooms (Up to $1,500 max)',
    color: '#D4AF37',
    expiryDays: 30,
    weight: 15
  },
  {
    id: 'prize-gold-resort-credit',
    title: '$250 Instant Resort Credit',
    tier: 'Gold Ambassador',
    badge: '🥇 VIP REWARD',
    discountType: 'fixed_amount',
    discountValue: 250,
    maxDiscount: 250,
    minSpend: 600,
    description: 'Receive $250 off your room booking or resort spending on luxury dining, spa, and activities.',
    perkText: '$250 Off Total Bill',
    color: '#DEB54C',
    expiryDays: 45,
    weight: 25
  },
  {
    id: 'prize-suite-upgrade-discount',
    title: '25% OFF Suites & Overwater Villas',
    tier: 'Silver Elite',
    badge: '🥈 POPULAR REWARD',
    discountType: 'percentage',
    discountValue: 25,
    maxDiscount: 750,
    minSpend: 500,
    description: 'Save 25% on our award-winning Azure Overwater Horizon Villas and Oceanfront Suites.',
    perkText: '25% Off Room Booking',
    color: '#93C5FD',
    expiryDays: 60,
    weight: 30
  },
  {
    id: 'prize-michelin-dining-voucher',
    title: 'Complimentary 5-Course Michelin Dining for 2',
    tier: 'Gastronomy Special',
    badge: '🍽️ CHEF SPECIAL',
    discountType: 'fixed_amount',
    discountValue: 180,
    maxDiscount: 180,
    minSpend: 400,
    description: 'Dine under the stars at L’Aura with a complimentary 5-course tasting menu curated by Chef Mercier ($180 value).',
    perkText: '$180 Dining & Stay Credit',
    color: '#F472B6',
    expiryDays: 30,
    weight: 15
  },
  {
    id: 'prize-thermal-spa-bliss',
    title: 'Complimentary 90-Min Thermal Spa Treatment',
    tier: 'Wellness Elite',
    badge: '🧖‍♀️ SPA REWARD',
    discountType: 'fixed_amount',
    discountValue: 150,
    maxDiscount: 150,
    minSpend: 350,
    description: 'Complete mind and body rejuvenation with hydrotherapy access and signature aromatherapeutic massage ($150 value).',
    perkText: '$150 Spa & Stay Credit',
    color: '#34D399',
    expiryDays: 45,
    weight: 15
  }
];

// Helper to generate unique serial coupon code
export function generateUniqueCouponCode(tier) {
  const prefix = 'AURA';
  const tag = tier ? tier.split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '') : 'LUX';
  const randomAlphaNum = Math.random().toString(36).substring(2, 6).toUpperCase();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${tag}-${randomAlphaNum}${randomDigits}`;
}

// Randomly pick a prize based on weighted probability
export function drawRandomPrize() {
  const totalWeight = COUPON_PRIZE_POOL.reduce((acc, prize) => acc + prize.weight, 0);
  let randomNum = Math.random() * totalWeight;

  for (const prize of COUPON_PRIZE_POOL) {
    if (randomNum < prize.weight) {
      const code = generateUniqueCouponCode(prize.tier);
      const createdAt = new Date().toISOString();
      const expiryDate = new Date(Date.now() + prize.expiryDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      return {
        ...prize,
        uniqueCode: code,
        createdAt,
        expiryDate,
        isRedeemed: false
      };
    }
    randomNum -= prize.weight;
  }

  // Fallback
  const fallback = COUPON_PRIZE_POOL[1];
  return {
    ...fallback,
    uniqueCode: generateUniqueCouponCode(fallback.tier),
    createdAt: new Date().toISOString(),
    expiryDate: 'Dec 31, 2026',
    isRedeemed: false
  };
}
