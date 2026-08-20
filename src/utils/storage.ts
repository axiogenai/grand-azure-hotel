// LocalStorage persistent state manager

const STORAGE_KEYS = {
  USER: 'aura_grand_user',
  COUPONS: 'aura_grand_coupons',
  BOOKINGS: 'aura_grand_bookings',
  DINING: 'aura_grand_dining',
  SCRATCH_COUNT: 'aura_grand_scratch_count',
  LAST_SCRATCH_DATE: 'aura_grand_last_scratch_date'
};

// Initial Demo VIP user
export const DEMO_USERS = [
  {
    id: 'user-vip-1',
    name: 'Lady Eleanor Vance',
    email: 'vip@auragrand.com',
    password: 'password123',
    phone: '+1 (555) 234-5678',
    tier: 'Black Diamond Member',
    tierLevel: 'diamond',
    points: 14500,
    memberSince: '2023',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'user-guest-1',
    name: 'Alexander Wright',
    email: 'guest@hotel.com',
    password: 'password123',
    phone: '+1 (555) 876-5432',
    tier: 'Gold Ambassador',
    tierLevel: 'gold',
    points: 4800,
    memberSince: '2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  }
];

// Initial preloaded bookings for rich demonstration
const INITIAL_BOOKINGS = [
  {
    id: 'AG-2026-9812',
    roomId: 'room-overwater-villa',
    roomName: 'Azure Overwater Horizon Villa',
    checkIn: '2026-09-12',
    checkOut: '2026-09-16',
    nights: 4,
    guests: 2,
    ratePerNight: 1250,
    subtotal: 5000,
    taxes: 600,
    discountAmount: 250,
    couponCode: 'AURA-GOLD-DEMO84',
    totalPaid: 5350,
    status: 'Confirmed',
    paymentMethod: 'Visa •••• 4242',
    addons: ['Chauffeured Rolls-Royce Phantom Transfer', 'Dom Pérignon Vintage Champagne on Arrival'],
    createdAt: '2026-08-01T14:30:00.000Z'
  }
];

// Initial preloaded coupons
const INITIAL_COUPONS = [
  {
    id: 'prize-gold-resort-credit-1',
    title: '$250 Instant Resort Credit',
    tier: 'Gold Ambassador',
    badge: '🥇 VIP REWARD',
    discountType: 'fixed_amount',
    discountValue: 250,
    maxDiscount: 250,
    minSpend: 600,
    uniqueCode: 'AURA-GOLD-DEMO84',
    createdAt: '2026-08-01T10:00:00.000Z',
    expiryDate: 'Oct 31, 2026',
    isRedeemed: true,
    color: '#DEB54C',
    perkText: '$250 Off Total Bill'
  },
  {
    id: 'prize-suite-upgrade-discount-1',
    title: '25% OFF Suites & Overwater Villas',
    tier: 'Silver Elite',
    badge: '🥈 POPULAR REWARD',
    discountType: 'percentage',
    discountValue: 25,
    maxDiscount: 750,
    minSpend: 500,
    uniqueCode: 'AURA-SILVER-7749',
    createdAt: '2026-08-10T12:00:00.000Z',
    expiryDate: 'Nov 15, 2026',
    isRedeemed: false,
    color: '#93C5FD',
    perkText: '25% Off Room Booking'
  }
];

export const storage = {
  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : DEMO_USERS[0]; // default to VIP demo for immediate rich UX
    } catch {
      return DEMO_USERS[0];
    }
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  getCoupons: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return data ? JSON.parse(data) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  },

  addCoupon: (coupon) => {
    const coupons = storage.getCoupons();
    const exists = coupons.some(c => c.uniqueCode === coupon.uniqueCode);
    if (!exists) {
      const updated = [coupon, ...coupons];
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(updated));
      return updated;
    }
    return coupons;
  },

  markCouponRedeemed: (couponCode) => {
    const coupons = storage.getCoupons();
    const updated = coupons.map(c => {
      if (c.uniqueCode.toUpperCase() === couponCode.toUpperCase()) {
        return { ...c, isRedeemed: true };
      }
      return c;
    });
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(updated));
    return updated;
  },

  getBookings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  },

  addBooking: (booking) => {
    const bookings = storage.getBookings();
    const updated = [booking, ...bookings];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated;
  },

  cancelBooking: (bookingId) => {
    const bookings = storage.getBookings();
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated;
  },

  getDining: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DINING);
      return data ? JSON.parse(data) : [
        {
          id: 'DIN-2026-441',
          restaurantName: "L'Aura Grand Gastronomy",
          date: '2026-09-13',
          timeSlot: '19:30',
          partySize: 2,
          tableType: "Oceanfront Glass Panorama Table",
          status: 'Confirmed',
          notes: 'Anniversary celebration. Window table requested.'
        }
      ];
    } catch {
      return [];
    }
  },

  addDining: (reservation) => {
    const dining = storage.getDining();
    const updated = [reservation, ...dining];
    localStorage.setItem(STORAGE_KEYS.DINING, JSON.stringify(updated));
    return updated;
  }
};
