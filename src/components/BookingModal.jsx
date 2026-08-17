import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Bed, 
  Check, 
  Sparkles, 
  Ticket, 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft, 
  Info, 
  AlertCircle 
} from 'lucide-react';
import { ROOMS_DATA, BESPOKE_ADDONS } from '../data/roomsData';
import { soundEffects } from '../utils/soundEffects';

export function BookingModal({
  isOpen,
  onClose,
  initialRoom,
  initialParams,
  appliedCoupon,
  coupons,
  onProceedToPayment,
  onOpenScratchModal
}) {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(initialRoom || ROOMS_DATA[0]);
  const [checkIn, setCheckIn] = useState('2026-09-15');
  const [checkOut, setCheckOut] = useState('2026-09-19');
  const [guests, setGuests] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  // Guest details
  const [guestName, setGuestName] = useState('Eleanor Vance');
  const [guestEmail, setGuestEmail] = useState('eleanor@luxury.com');
  const [guestPhone, setGuestPhone] = useState('+1 (555) 234-5678');
  const [specialRequests, setSpecialRequests] = useState('Oceanfront high-floor requested. Extra plush pillows.');

  // Coupon state
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [activeCoupon, setActiveCoupon] = useState(appliedCoupon || null);
  const [couponError, setCouponError] = useState('');

  // Sync initial parameters when opened
  useEffect(() => {
    if (initialRoom) {
      setSelectedRoom(initialRoom);
    }
    if (initialParams) {
      if (initialParams.checkIn) setCheckIn(initialParams.checkIn);
      if (initialParams.checkOut) setCheckOut(initialParams.checkOut);
      if (initialParams.guests) setGuests(initialParams.guests);
      if (initialParams.roomType && initialParams.roomType !== 'all') {
        const found = ROOMS_DATA.find(r => r.category === initialParams.roomType);
        if (found) setSelectedRoom(found);
      }
    }
    if (appliedCoupon) {
      setActiveCoupon(appliedCoupon);
      setCouponCodeInput(appliedCoupon.uniqueCode);
    }
  }, [initialRoom, initialParams, appliedCoupon, isOpen]);

  // Calculate nights
  const calculateNights = () => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return isNaN(diffDays) || diffDays <= 0 ? 1 : diffDays;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights();
  const roomBasePrice = selectedRoom.pricePerNight * nights;
  
  // Calculate add-ons price
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = BESPOKE_ADDONS.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const subtotal = roomBasePrice + addonsTotal;
  const taxesAndFees = Math.round(subtotal * 0.12);

  // Calculate discount from coupon
  const calculateDiscount = () => {
    if (!activeCoupon) return 0;
    if (activeCoupon.discountType === 'percentage') {
      const rawDiscount = Math.round((subtotal * activeCoupon.discountValue) / 100);
      return Math.min(rawDiscount, activeCoupon.maxDiscount || 99999);
    }
    if (activeCoupon.discountType === 'fixed_amount') {
      return Math.min(activeCoupon.discountValue, subtotal);
    }
    return 0;
  };

  const discountAmount = calculateDiscount();
  const grandTotal = Math.max(0, subtotal + taxesAndFees - discountAmount);

  const toggleAddon = (addonId) => {
    soundEffects.playClickSound();
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleApplyCustomCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const query = couponCodeInput.trim().toUpperCase();
    if (!query) return;

    // Check in user coupons or demo pools
    const found = coupons.find(c => c.uniqueCode.toUpperCase() === query);
    if (found) {
      if (found.isRedeemed) {
        setCouponError('This coupon identifier has already been redeemed.');
        return;
      }
      setActiveCoupon(found);
      soundEffects.playWinChime();
    } else if (query.startsWith('AURA-') || query.includes('VIP') || query.includes('GOLD') || query.includes('50')) {
      // Mock accept valid formatted codes
      const generated = {
        id: `prize-custom-${Date.now()}`,
        title: 'Special VIP Promotional Discount',
        uniqueCode: query,
        discountType: 'percentage',
        discountValue: 20,
        maxDiscount: 500,
        badge: '✨ PROMO CODE'
      };
      setActiveCoupon(generated);
      soundEffects.playWinChime();
    } else {
      setCouponError('Invalid coupon code. Try scratching a card in the Rewards portal!');
    }
  };

  const handleNextStep = () => {
    soundEffects.playClickSound();
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    soundEffects.playClickSound();
    setStep(step - 1);
  };

  const handleProceedToPay = () => {
    soundEffects.playClickSound();
    const bookingSummary = {
      room: selectedRoom,
      checkIn,
      checkOut,
      nights,
      guests,
      addons: selectedAddons.map(id => BESPOKE_ADDONS.find(a => a.id === id)),
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      subtotal,
      taxesAndFees,
      discountAmount,
      coupon: activeCoupon,
      grandTotal
    };

    onProceedToPayment(bookingSummary);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content luxury-glass"
        style={{
          maxWidth: '900px',
          width: '100%',
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Steps Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-400)', fontWeight: 700 }}>
              Bespoke Reservation Portal • Step {step} of 3
            </span>
            <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
              {step === 1 && 'Select Sanctuary & Dates'}
              {step === 2 && 'Bespoke Curated Add-Ons'}
              {step === 3 && 'Guest Details & Coupon Redemption'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--sand-100)', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Main Grid: Steps on Left, Live Bill on Right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Left Column: Interactive Form Steps */}
          <div>
            {/* STEP 1: Dates & Room */}
            {step === 1 && (
              <div>
                {/* Room Selector */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Select Suite or Villa
                  </label>
                  <select
                    value={selectedRoom.id}
                    onChange={(e) => {
                      const r = ROOMS_DATA.find(item => item.id === e.target.value);
                      if (r) setSelectedRoom(r);
                    }}
                    style={{
                      width: '100%',
                      background: 'rgba(7, 11, 24, 0.7)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '0.6rem',
                      padding: '0.75rem',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {ROOMS_DATA.map(r => (
                      <option key={r.id} value={r.id} style={{ background: '#0B132B' }}>
                        {r.name} — ${r.pricePerNight}/night ({r.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Room Preview Card */}
                <div style={{ display: 'flex', gap: '1rem', background: 'rgba(7, 11, 24, 0.6)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '1.25rem' }}>
                  <img 
                    src={selectedRoom.image} 
                    alt={selectedRoom.name}
                    style={{ width: '90px', height: '70px', objectFit: 'cover', borderRadius: '0.5rem' }} 
                  />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--sand-50)' }}>{selectedRoom.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold-400)' }}>{selectedRoom.view}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--sand-200)' }}>{selectedRoom.size} • {selectedRoom.bed}</div>
                  </div>
                </div>

                {/* Dates */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} /> Check-In
                    </label>
                    <input 
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'rgba(7, 11, 24, 0.7)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '0.6rem',
                        padding: '0.65rem 0.85rem',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} /> Check-Out
                    </label>
                    <input 
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'rgba(7, 11, 24, 0.7)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '0.6rem',
                        padding: '0.65rem 0.85rem',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Guests */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.4rem', fontWeight: 600 }}>
                    <Users size={12} style={{ display: 'inline', marginRight: '4px' }} /> Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      background: 'rgba(7, 11, 24, 0.7)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '0.6rem',
                      padding: '0.65rem 0.85rem',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests (Requires Villa)</option>
                    <option value="4">4 Guests</option>
                    <option value="6">5-6 Guests (Penthouse)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-gold"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <span>Continue to Add-Ons</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 2: Bespoke Add-ons */}
            {step === 2 && (
              <div>
                <p style={{ fontSize: '0.82rem', color: 'var(--sand-200)', marginBottom: '1.25rem' }}>
                  Enhance your stay with our signature luxury amenities and curated VIP experiences:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {BESPOKE_ADDONS.map(addon => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        style={{
                          background: isSelected ? 'rgba(212, 175, 55, 0.15)' : 'rgba(7, 11, 24, 0.6)',
                          border: isSelected ? '1px solid var(--gold-500)' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '0.75rem',
                          padding: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ paddingRight: '0.75rem' }}>
                          <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--sand-50)' }}>
                            {addon.name}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--sand-200)' }}>
                            {addon.description}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-400)' }}>
                            +${addon.price}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: isSelected ? 'var(--emerald-400)' : 'var(--sand-300)' }}>
                            {isSelected ? '✓ Added' : '+ Select'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '0.75rem', justifyContent: 'center' }}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-gold"
                    style={{ flex: 1.5, padding: '0.75rem' }}
                  >
                    <span>Guest Info & Coupon</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Guest Details & Coupon Input */}
            {step === 3 && (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.3rem', fontWeight: 600 }}>
                      Full Name
                    </label>
                    <input 
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'rgba(7, 11, 24, 0.7)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '0.6rem',
                        padding: '0.65rem 0.85rem',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.3rem', fontWeight: 600 }}>
                        Email Address
                      </label>
                      <input 
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'rgba(7, 11, 24, 0.7)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '0.6rem',
                          padding: '0.65rem 0.85rem',
                          color: '#FFFFFF',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.3rem', fontWeight: 600 }}>
                        Phone Number
                      </label>
                      <input 
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'rgba(7, 11, 24, 0.7)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '0.6rem',
                          padding: '0.65rem 0.85rem',
                          color: '#FFFFFF',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Coupon Redemption Section */}
                  <div style={{ background: 'rgba(7, 11, 24, 0.8)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem', padding: '1rem', marginTop: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--gold-400)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Ticket size={14} /> Apply Scratch Coupon / Promo Code
                      </label>
                      <button
                        type="button"
                        onClick={onOpenScratchModal}
                        style={{ background: 'transparent', border: 'none', color: 'var(--gold-300)', fontSize: '0.72rem', textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        🎁 Scratch A Card
                      </button>
                    </div>

                    <form onSubmit={handleApplyCustomCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text"
                        placeholder="Enter unique code (e.g. AURA-GOLD-XXXX)"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value)}
                        style={{
                          flex: 1,
                          background: 'rgba(16, 27, 60, 0.8)',
                          border: '1px solid rgba(212, 175, 55, 0.4)',
                          borderRadius: '0.5rem',
                          padding: '0.55rem 0.8rem',
                          color: '#FFFFFF',
                          fontSize: '0.82rem',
                          fontFamily: 'monospace',
                          outline: 'none'
                        }}
                      />
                      <button
                        type="submit"
                        className="btn-gold"
                        style={{ padding: '0.55rem 1rem', fontSize: '0.78rem' }}
                      >
                        Apply
                      </button>
                    </form>

                    {couponError && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--ruby-500)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={12} /> {couponError}
                      </div>
                    )}

                    {activeCoupon && (
                      <div style={{ marginTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--emerald-400)', borderRadius: '0.5rem', padding: '0.45rem 0.75rem' }}>
                        <div style={{ fontSize: '0.76rem', color: 'var(--emerald-400)', fontWeight: 600 }}>
                          ✓ {activeCoupon.title} applied ({activeCoupon.uniqueCode})
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCoupon(null);
                            setCouponCodeInput('');
                          }}
                          style={{ background: 'transparent', border: 'none', color: 'var(--sand-200)', fontSize: '0.7rem', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '0.75rem', justifyContent: 'center' }}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToPay}
                    className="btn-gold"
                    style={{ flex: 1.5, padding: '0.75rem' }}
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Price Summary Receipt */}
          <div 
            style={{
              background: 'rgba(7, 11, 24, 0.8)',
              border: '1px solid var(--glass-border)',
              borderRadius: '1rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--sand-50)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                Reservation Summary
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--sand-200)' }}>Sanctuary:</span>
                  <strong style={{ color: '#FFFFFF', textAlign: 'right' }}>{selectedRoom.name}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--sand-200)' }}>Dates:</span>
                  <span style={{ color: '#FFFFFF' }}>{checkIn} to {checkOut} ({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--sand-200)' }}>Guests:</span>
                  <span style={{ color: '#FFFFFF' }}>{guests} Guests</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
                  <span style={{ color: 'var(--sand-200)' }}>Nightly Rate (${selectedRoom.pricePerNight} × {nights}):</span>
                  <span style={{ color: '#FFFFFF' }}>${roomBasePrice.toLocaleString()}</span>
                </div>

                {addonsTotal > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--sand-200)' }}>Bespoke Add-Ons:</span>
                    <span style={{ color: '#FFFFFF' }}>+${addonsTotal.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--sand-200)' }}>Taxes & Resort Hospitality (12%):</span>
                  <span style={{ color: '#FFFFFF' }}>+${taxesAndFees.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--emerald-400)', fontWeight: 700, background: 'rgba(16,185,129,0.1)', padding: '0.35rem 0.5rem', borderRadius: '4px' }}>
                    <span>🎁 Coupon Discount:</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total */}
            <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.3)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--sand-200)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Total Due:
                </span>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--gold-400)', fontFamily: 'var(--font-brand)' }}>
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--sand-300)', textAlign: 'center' }}>
                🔒 256-Bit SSL Encrypted • Direct Rate Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
