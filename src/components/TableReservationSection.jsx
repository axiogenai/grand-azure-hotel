import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  Wine, 
  Sparkles, 
  Ticket, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  UtensilsCrossed, 
  AlertCircle,
  User,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { DINING_TABLE_ZONES, MENU_ITEMS } from '../data/restaurantData';
import { soundEffects } from '../utils/soundEffects';

export function TableReservationSection({
  activeCoupon,
  prefilledParams,
  selectedDish,
  guestDetails,
  onProceedToPayment,
  onOpenScratch
}) {
  const [date, setDate] = useState('2026-09-18');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [selectedZone, setSelectedZone] = useState(DINING_TABLE_ZONES[0]);
  const [selectedTastingMenu, setSelectedTastingMenu] = useState(null);
  
  // Diner contact info (Auto-populated from scratch/spin details)
  const [dinerName, setDinerName] = useState(guestDetails?.name || 'Alexander Wright');
  const [dinerEmail, setDinerEmail] = useState(guestDetails?.email || 'alexander.wright@gmail.com');
  const [dinerPhone, setDinerPhone] = useState(guestDetails?.phone || '+1 (555) 234-5678');
  const [dinerAddress, setDinerAddress] = useState(guestDetails?.address || '742 Evergreen Terrace, Ocean Promontory, CA 90265');
  const [specialNotes, setSpecialNotes] = useState('Anniversary dinner. High ocean view requested.');

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(activeCoupon || null);
  const [couponError, setCouponError] = useState('');

  // Synchronize incoming parameters
  useEffect(() => {
    if (prefilledParams) {
      if (prefilledParams.date) setDate(prefilledParams.date);
      if (prefilledParams.time) setTime(prefilledParams.time);
      if (prefilledParams.guests) setGuests(prefilledParams.guests);
      if (prefilledParams.seatingZone) {
        const found = DINING_TABLE_ZONES.find(z => z.id === prefilledParams.seatingZone);
        if (found) setSelectedZone(found);
      }
    }
    if (selectedDish) {
      setSelectedTastingMenu(selectedDish);
    }
    if (activeCoupon) {
      setAppliedCoupon(activeCoupon);
      setCouponInput(activeCoupon.uniqueCode);
    }
    if (guestDetails) {
      if (guestDetails.name) setDinerName(guestDetails.name);
      if (guestDetails.email) setDinerEmail(guestDetails.email);
      if (guestDetails.phone) setDinerPhone(guestDetails.phone);
      if (guestDetails.address) setDinerAddress(guestDetails.address);
    }
  }, [prefilledParams, selectedDish, activeCoupon, guestDetails]);

  // Pricing calculations
  const menuPrice = selectedTastingMenu ? selectedTastingMenu.price * guests : 0;
  const coverFee = selectedZone.extraFee * guests;
  const tableDeposit = 50;
  const subtotal = menuPrice > 0 ? menuPrice + coverFee : tableDeposit + coverFee;
  const tax = Math.round(subtotal * 0.1);

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      const raw = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      return Math.min(raw, appliedCoupon.maxDiscount || 200);
    }
    if (appliedCoupon.discountType === 'fixed_amount') {
      return Math.min(appliedCoupon.discountValue, subtotal);
    }
    return 0;
  };

  const discountAmount = calculateDiscount();
  const totalAmount = Math.max(0, subtotal + tax - discountAmount);

  const handleApplyCouponCode = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code.startsWith('DINE') || code.includes('50') || code.includes('GOLD') || code.includes('CHEF') || code.includes('WINE')) {
      const promoCoupon = {
        id: `custom-dine-${Date.now()}`,
        title: 'VIP Guest Dining Discount',
        uniqueCode: code,
        discountType: 'percentage',
        discountValue: 25,
        maxDiscount: 100,
        badge: '✨ APPLIED VOUCHER'
      };
      setAppliedCoupon(promoCoupon);
      soundEffects.playWinChime();
    } else {
      setCouponError('Invalid coupon code. Try spinning the lucky wheel above!');
    }
  };

  const handleSubmitReservation = (e) => {
    e.preventDefault();
    soundEffects.playClickSound();

    const reservationPayload = {
      date,
      time,
      guests,
      zone: selectedZone,
      tastingMenu: selectedTastingMenu,
      dinerName,
      dinerEmail,
      dinerPhone,
      dinerAddress,
      specialNotes,
      subtotal,
      tax,
      discountAmount,
      coupon: appliedCoupon,
      totalAmount
    };

    onProceedToPayment(reservationPayload);
  };

  return (
    <section id="reserve" style={{ padding: '6rem 1.5rem', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container-luxury">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span 
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold-700)',
              fontWeight: 800
            }}
          >
            Immediate Table Booking
          </span>
          <h2 
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              marginTop: '0.4rem',
              marginBottom: '1rem',
              color: 'var(--text-main)'
            }}
          >
            Reserve Your <span className="gold-gradient-text">Dining Experience</span>
          </h2>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.94rem', lineHeight: 1.7 }}>
            Confirm your table reservation with zero account friction. Your verified details and spin wheel discounts are pre-filled below.
          </p>
        </div>

        {/* 2-Column Booking Layout */}
        <div 
          className="luxury-glass"
          style={{
            padding: '3rem 2.5rem',
            background: '#FFFFFF',
            boxShadow: 'var(--shadow-luxury)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* Left: Form */}
          <form onSubmit={handleSubmitReservation} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', paddingBottom: '0.6rem', fontWeight: 600 }}>
              1. Date, Time & Atmosphere
            </h3>

            {/* Date, Time, Guests */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  <Calendar size={12} style={{ display: 'inline', marginRight: '3px' }} /> Date
                </label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FAF8F5',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.85rem',
                    color: 'var(--text-main)',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  <Clock size={12} style={{ display: 'inline', marginRight: '3px' }} /> Seating Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FAF8F5',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.85rem',
                    color: 'var(--text-main)',
                    fontSize: '0.86rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="17:30">5:30 PM (Sunset)</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:30">7:30 PM (Prime)</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:30">9:30 PM (Late)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  <Users size={12} style={{ display: 'inline', marginRight: '3px' }} /> Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                  style={{
                    width: '100%',
                    background: '#FAF8F5',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.85rem',
                    color: 'var(--text-main)',
                    fontSize: '0.86rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="8">8+ Guests</option>
                </select>
              </div>
            </div>

            {/* Table Zone Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.5rem', fontWeight: 700 }}>
                Select Table Location & Atmosphere
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {DINING_TABLE_ZONES.map(zone => (
                  <div
                    key={zone.id}
                    onClick={() => {
                      soundEffects.playClickSound();
                      setSelectedZone(zone);
                    }}
                    style={{
                      background: selectedZone.id === zone.id ? 'var(--gold-100)' : '#FAF8F5',
                      border: selectedZone.id === zone.id ? '1.5px solid var(--gold-500)' : '1px solid rgba(0,0,0,0.06)',
                      borderRadius: '0.65rem',
                      padding: '0.85rem 1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {zone.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-sub)' }}>
                        {zone.desc}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      {zone.extraFee > 0 ? (
                        <span style={{ fontSize: '0.78rem', color: 'var(--gold-700)', fontWeight: 800 }}>+${zone.extraFee}/guest</span>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--emerald-600)', fontWeight: 700 }}>Included</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasting Menu */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.74rem', color: 'var(--gold-800)', fontWeight: 700 }}>
                  Pre-Select Tasting Menu (Optional)
                </label>
                {selectedTastingMenu && (
                  <button
                    type="button"
                    onClick={() => setSelectedTastingMenu(null)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.72rem', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Remove Selection
                  </button>
                )}
              </div>
              <select
                value={selectedTastingMenu?.id || 'none'}
                onChange={(e) => {
                  if (e.target.value === 'none') {
                    setSelectedTastingMenu(null);
                  } else {
                    const item = MENU_ITEMS.find(m => m.id === e.target.value);
                    if (item) setSelectedTastingMenu(item);
                  }
                }}
                style={{
                  width: '100%',
                  background: '#FAF8F5',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  borderRadius: '0.6rem',
                  padding: '0.7rem 0.85rem',
                  color: 'var(--text-main)',
                  fontSize: '0.86rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="none">À La Carte Dining (Order tableside tonight)</option>
                <option value="tasting-prestige">Imperial 7-Course Gastronomy Journey ($240/person)</option>
                <option value="tasting-seaside">5-Course Azure Coastal Harvest ($165/person)</option>
              </select>
            </div>

            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', paddingBottom: '0.6rem', marginTop: '0.5rem', fontWeight: 600 }}>
              2. Guest Contact & Address (Auto-Filled)
            </h3>

            {/* Name & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.3rem', fontWeight: 700 }}>
                  <User size={12} style={{ display: 'inline', marginRight: '3px' }} /> Full Name
                </label>
                <input 
                  type="text"
                  value={dinerName}
                  onChange={(e) => setDinerName(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FAF8F5',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.85rem',
                    color: 'var(--text-main)',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.3rem', fontWeight: 700 }}>
                  <Phone size={12} style={{ display: 'inline', marginRight: '3px' }} /> Mobile Phone
                </label>
                <input 
                  type="tel"
                  value={dinerPhone}
                  onChange={(e) => setDinerPhone(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FAF8F5',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.85rem',
                    color: 'var(--text-main)',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>
            </div>

            {/* Email & Address */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.3rem', fontWeight: 700 }}>
                  <Mail size={12} style={{ display: 'inline', marginRight: '3px' }} /> Gmail / Email
                </label>
                <input 
                  type="email"
                  value={dinerEmail}
                  onChange={(e) => setDinerEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FAF8F5',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.85rem',
                    color: 'var(--text-main)',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.3rem', fontWeight: 700 }}>
                  <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} /> Address
                </label>
                <input 
                  type="text"
                  value={dinerAddress}
                  onChange={(e) => setDinerAddress(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FAF8F5',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.85rem',
                    color: 'var(--text-main)',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.3rem', fontWeight: 700 }}>
                Special Occasion / Dietary Notes
              </label>
              <input 
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Anniversary dinner, shellfish allergy"
                style={{
                  width: '100%',
                  background: '#FAF8F5',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  borderRadius: '0.6rem',
                  padding: '0.7rem 0.85rem',
                  color: 'var(--text-main)',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-gold"
              style={{ width: '100%', padding: '0.95rem', fontSize: '0.92rem', marginTop: '0.5rem' }}
            >
              <span>Confirm Reservation & Proceed</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Right: Bill Summary */}
          <div 
            style={{
              background: '#FAF8F5',
              border: '1px solid var(--border-light)',
              borderRadius: '0.85rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', paddingBottom: '0.6rem', fontWeight: 600 }}>
                Dining Summary & Savings
              </h4>

              {/* Coupon Redemption Box */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--gold-hairline)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.74rem', color: 'var(--gold-800)', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Ticket size={14} /> Voucher Code
                  </label>
                  <button
                    type="button"
                    onClick={onOpenScratch}
                    style={{ background: 'transparent', border: 'none', color: 'var(--gold-700)', fontSize: '0.72rem', textDecoration: 'underline', cursor: 'pointer', fontWeight: 700 }}
                  >
                    🎁 Spin Lucky Wheel
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text"
                    placeholder="Enter code (e.g. DINE-50OF-XXXX)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={{
                      flex: 1,
                      background: '#FAF8F5',
                      border: '1px solid rgba(168, 124, 20, 0.35)',
                      borderRadius: '0.5rem',
                      padding: '0.6rem 0.85rem',
                      color: 'var(--text-main)',
                      fontSize: '0.84rem',
                      fontFamily: 'monospace',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleApplyCouponCode}
                    className="btn-gold"
                    style={{ padding: '0.6rem 1.1rem', fontSize: '0.78rem' }}
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--ruby-600)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={12} /> {couponError}
                  </div>
                )}

                {appliedCoupon && (
                  <div style={{ marginTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--emerald-50)', border: '1px solid var(--emerald-600)', borderRadius: '0.5rem', padding: '0.45rem 0.75rem' }}>
                    <div style={{ fontSize: '0.76rem', color: 'var(--emerald-700)', fontWeight: 700 }}>
                      ✓ {appliedCoupon.title} ({appliedCoupon.uniqueCode})
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponInput('');
                      }}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Line items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>Date & Time:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{date} at {time}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>Seating Zone:</span>
                  <span style={{ color: 'var(--text-main)' }}>{selectedZone.name}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>Party Size:</span>
                  <span style={{ color: 'var(--text-main)' }}>{guests} Guests</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.6rem' }}>
                  <span style={{ color: 'var(--text-sub)' }}>
                    {selectedTastingMenu ? `${selectedTastingMenu.name} ($${selectedTastingMenu.price} × ${guests})` : 'Table Reservation Deposit:'}
                  </span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>${subtotal - coverFee}</span>
                </div>

                {coverFee > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-sub)' }}>Specialty Seating Cover:</span>
                    <span style={{ color: 'var(--text-main)' }}>+${coverFee}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>Taxes & Hospitality (10%):</span>
                  <span style={{ color: 'var(--text-main)' }}>+${tax}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--emerald-700)', fontWeight: 800, background: 'var(--emerald-50)', padding: '0.45rem 0.75rem', borderRadius: '6px' }}>
                    <span>🎁 Coupon Discount:</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total */}
            <div style={{ borderTop: '1.5px solid rgba(168, 124, 20, 0.25)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.92rem', color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Total Due:
                </span>
                <span style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--gold-700)', fontFamily: 'var(--font-serif)' }}>
                  ${totalAmount.toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                🔒 256-Bit SSL Encrypted • Direct Table Lock
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
