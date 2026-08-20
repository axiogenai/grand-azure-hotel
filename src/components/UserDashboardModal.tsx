import React, { useState } from 'react';
import { 
  User, 
  Award, 
  Bed, 
  Ticket, 
  UtensilsCrossed, 
  Calendar, 
  Printer, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock 
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { storage } from '../utils/storage';

export function UserDashboardModal({
  isOpen,
  onClose,
  user,
  bookings,
  coupons,
  dining,
  onLogout,
  onApplyCouponToBooking,
  onOpenScratchModal,
  onCancelBooking
}) {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'coupons' | 'dining'

  if (!isOpen || !user) return null;

  const handlePrintVoucher = () => {
    soundEffects.playClickSound();
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content luxury-glass"
        style={{
          maxWidth: '840px',
          width: '100%',
          padding: '2.25rem',
          position: 'relative',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--sand-200)',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {/* Member Profile Header */}
        <div 
          style={{
            background: 'linear-gradient(135deg, rgba(16,27,60,0.85) 0%, rgba(7,11,24,0.95) 100%)',
            border: '1px solid var(--glass-border)',
            borderRadius: '1rem',
            padding: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            marginBottom: '1.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
              alt={user.name} 
              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-500)' }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF' }}>{user.name}</h3>
                <span 
                  style={{
                    background: 'linear-gradient(135deg, #DEB54C, #937119)',
                    color: 'var(--navy-950)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.05em'
                  }}
                >
                  {user.tier || 'VIP Member'}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--sand-200)' }}>
                {user.email} • Member since {user.memberSince || '2025'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--sand-300)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Privilege Points
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-400)', fontFamily: 'var(--font-brand)' }}>
                {(user.points || 12500).toLocaleString()} pts
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playClickSound();
                onLogout();
                onClose();
              }}
              className="btn-secondary"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.75rem' }}
              title="Sign Out"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
          <button
            onClick={() => {
              soundEffects.playClickSound();
              setActiveTab('bookings');
            }}
            style={{
              background: activeTab === 'bookings' ? 'var(--gold-500)' : 'rgba(255,255,255,0.06)',
              color: activeTab === 'bookings' ? 'var(--navy-950)' : 'var(--sand-200)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.5rem 1.2rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Bed size={15} />
            <span>My Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClickSound();
              setActiveTab('coupons');
            }}
            style={{
              background: activeTab === 'coupons' ? 'var(--gold-500)' : 'rgba(255,255,255,0.06)',
              color: activeTab === 'coupons' ? 'var(--navy-950)' : 'var(--sand-200)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.5rem 1.2rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Ticket size={15} />
            <span>Scratch Wallet ({coupons.length})</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClickSound();
              setActiveTab('dining');
            }}
            style={{
              background: activeTab === 'dining' ? 'var(--gold-500)' : 'rgba(255,255,255,0.06)',
              color: activeTab === 'dining' ? 'var(--navy-950)' : 'var(--sand-200)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.5rem 1.2rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <UtensilsCrossed size={15} />
            <span>Dining Reservations ({dining.length})</span>
          </button>
        </div>

        {/* TAB 1: Room Bookings */}
        {activeTab === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.4rem' }}>
            {bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--sand-200)' }}>
                <Bed size={40} color="var(--gold-400)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <h4 style={{ color: '#FFFFFF', marginBottom: '0.4rem' }}>No bookings found</h4>
                <p style={{ fontSize: '0.84rem' }}>Explore our luxurious suites & villas to make your first reservation.</p>
              </div>
            ) : (
              bookings.map((b) => (
                <div 
                  key={b.id}
                  style={{
                    background: 'rgba(16, 27, 60, 0.65)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '0.85rem',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.88rem', fontWeight: 800, color: 'var(--gold-300)' }}>
                          {b.id}
                        </span>
                        <span 
                          style={{
                            background: b.status === 'Confirmed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: b.status === 'Confirmed' ? 'var(--emerald-400)' : 'var(--ruby-500)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px',
                            fontSize: '0.68rem',
                            fontWeight: 700
                          }}
                        >
                          {b.status}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
                        {b.roomName}
                      </h4>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-400)', fontFamily: 'var(--font-brand)' }}>
                        ${b.totalPaid.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--sand-300)' }}>Total Paid ({b.paymentMethod})</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--sand-200)', background: 'rgba(7, 11, 24, 0.6)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <div>
                      <strong>Dates:</strong> {b.checkIn} → {b.checkOut} ({b.nights}N)
                    </div>
                    <div>
                      <strong>Guests:</strong> {b.guests} Guests
                    </div>
                    {b.couponCode && b.couponCode !== 'NONE' && (
                      <div style={{ color: 'var(--emerald-400)' }}>
                        <strong>Coupon Used:</strong> {b.couponCode} (-${b.discountAmount})
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                    <button
                      onClick={handlePrintVoucher}
                      className="btn-secondary"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem' }}
                    >
                      <Printer size={13} />
                      <span>Print Voucher</span>
                    </button>
                    {b.status === 'Confirmed' && (
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to cancel this reservation? (Free 24h cancellation guarantee)')) {
                            onCancelBooking(b.id);
                          }
                        }}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: 'var(--ruby-500)',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Cancel Stay
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: Scratch Coupons Wallet */}
        {activeTab === 'coupons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--sand-200)' }}>
                Your unlocked unique serial discount codes:
              </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenScratchModal();
                }}
                className="btn-gold"
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.75rem' }}
              >
                <Sparkles size={13} />
                <span>Scratch A Card</span>
              </button>
            </div>

            {coupons.map((c, i) => (
              <div 
                key={c.uniqueCode || i}
                style={{
                  background: 'rgba(16, 27, 60, 0.65)',
                  border: c.isRedeemed ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--glass-border)',
                  borderRadius: '0.85rem',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: c.isRedeemed ? 0.6 : 1
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--gold-300)', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700 }}>
                      {c.badge || 'VIP'}
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: '#FFFFFF' }}>{c.title}</strong>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--gold-300)', marginTop: '0.2rem' }}>
                    Code: <strong>{c.uniqueCode}</strong> (Expires {c.expiryDate})
                  </div>
                </div>

                <div>
                  {c.isRedeemed ? (
                    <span style={{ fontSize: '0.72rem', color: 'var(--sand-300)', background: 'rgba(255,255,255,0.08)', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                      Redeemed
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        onApplyCouponToBooking(c);
                        onClose();
                      }}
                      className="btn-gold"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem' }}
                    >
                      Use Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Dining Reservations */}
        {activeTab === 'dining' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.4rem' }}>
            {dining.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--sand-200)' }}>
                <UtensilsCrossed size={40} color="var(--gold-400)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <h4 style={{ color: '#FFFFFF', marginBottom: '0.4rem' }}>No table reservations</h4>
                <p style={{ fontSize: '0.84rem' }}>Reserve a table at L'Aura or Celeste Rooftop to dine in elegance.</p>
              </div>
            ) : (
              dining.map((d, i) => (
                <div 
                  key={d.id || i}
                  style={{
                    background: 'rgba(16, 27, 60, 0.65)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '0.85rem',
                    padding: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--gold-400)', fontWeight: 700 }}>
                      Ref: {d.id}
                    </div>
                    <h4 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginTop: '0.1rem' }}>
                      {d.restaurantName}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--sand-200)', marginTop: '0.2rem' }}>
                      {d.date} at {d.timeSlot} • {d.partySize} Guests • {d.tableType}
                    </div>
                    {d.notes && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--sand-300)', marginTop: '0.2rem', fontStyle: 'italic' }}>
                        Note: "{d.notes}"
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', background: 'rgba(16, 185, 129, 0.12)', padding: '0.3rem 0.7rem', borderRadius: '9999px', fontWeight: 700 }}>
                    Confirmed
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
