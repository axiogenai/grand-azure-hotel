import React, { useState } from 'react';
import { 
  Ticket, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export function CouponWalletModal({
  isOpen,
  onClose,
  coupons,
  onApplyCoupon,
  onOpenScratchModal
}) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [filterTab, setFilterTab] = useState('active'); // 'active' | 'redeemed'

  const activeCoupons = coupons.filter(c => !c.isRedeemed);
  const redeemedCoupons = coupons.filter(c => c.isRedeemed);

  const displayedCoupons = filterTab === 'active' ? activeCoupons : redeemedCoupons;

  const handleCopy = (code) => {
    soundEffects.playClickSound();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApply = (coupon) => {
    soundEffects.playClickSound();
    onApplyCoupon(coupon);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content luxury-glass"
        style={{
          maxWidth: '620px',
          width: '100%',
          padding: '2rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-400)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <Ticket size={14} />
              <span>Personal Loyalty Wallet</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
              My Scratch Coupons & Credits
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--sand-100)', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
          <button
            onClick={() => {
              soundEffects.playClickSound();
              setFilterTab('active');
            }}
            style={{
              background: filterTab === 'active' ? 'var(--gold-500)' : 'rgba(255,255,255,0.06)',
              color: filterTab === 'active' ? 'var(--navy-950)' : 'var(--sand-200)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.45rem 1rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Active & Available ({activeCoupons.length})
          </button>
          <button
            onClick={() => {
              soundEffects.playClickSound();
              setFilterTab('redeemed');
            }}
            style={{
              background: filterTab === 'redeemed' ? 'var(--gold-500)' : 'rgba(255,255,255,0.06)',
              color: filterTab === 'redeemed' ? 'var(--navy-950)' : 'var(--sand-200)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.45rem 1rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Redeemed History ({redeemedCoupons.length})
          </button>
        </div>

        {/* Coupons List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.3rem', marginBottom: '1.5rem' }}>
          {displayedCoupons.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--sand-200)' }}>
              <Ticket size={40} color="var(--gold-400)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.4rem' }}>No {filterTab} coupons found</h4>
              <p style={{ fontSize: '0.84rem', marginBottom: '1.5rem' }}>
                Scratch your daily guest reward card to unlock up to 50% discount codes!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenScratchModal();
                }}
                className="btn-gold"
                style={{ padding: '0.65rem 1.4rem' }}
              >
                🎁 Scratch A Card Now
              </button>
            </div>
          ) : (
            displayedCoupons.map((coupon, i) => (
              <div 
                key={coupon.uniqueCode || i}
                style={{
                  background: 'rgba(16, 27, 60, 0.65)',
                  border: coupon.isRedeemed ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--glass-border)',
                  borderRadius: '0.85rem',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  opacity: coupon.isRedeemed ? 0.65 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span 
                      style={{
                        background: 'rgba(212, 175, 55, 0.15)',
                        color: 'var(--gold-300)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '9999px',
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.68rem',
                        fontWeight: 700
                      }}
                    >
                      {coupon.badge || 'VIP REWARD'}
                    </span>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--sand-50)', marginTop: '0.35rem' }}>
                      {coupon.title}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--sand-200)' }}>
                      {coupon.description}
                    </div>
                  </div>

                  {coupon.isRedeemed ? (
                    <span style={{ fontSize: '0.72rem', color: 'var(--sand-200)', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
                      Redeemed
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: 'var(--emerald-400)', background: 'rgba(16, 185, 129, 0.12)', padding: '0.25rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
                      Available
                    </span>
                  )}
                </div>

                {/* Unique Code Display & Expiry */}
                <div 
                  style={{
                    background: 'rgba(7, 11, 24, 0.7)',
                    border: '1px dashed rgba(212, 175, 55, 0.4)',
                    borderRadius: '0.6rem',
                    padding: '0.6rem 0.85rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.62rem', color: 'var(--sand-300)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Unique Identifier (Serial)
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-300)' }}>
                      {coupon.uniqueCode}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.62rem', color: 'var(--sand-300)' }}>Expires</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--sand-100)', fontWeight: 600 }}>{coupon.expiryDate}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                {!coupon.isRedeemed && (
                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.2rem' }}>
                    <button
                      onClick={() => handleCopy(coupon.uniqueCode)}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '0.45rem', fontSize: '0.75rem', justifyContent: 'center' }}
                    >
                      {copiedCode === coupon.uniqueCode ? <Check size={14} color="var(--emerald-400)" /> : <Copy size={14} />}
                      <span>{copiedCode === coupon.uniqueCode ? 'Copied' : 'Copy Code'}</span>
                    </button>
                    <button
                      onClick={() => handleApply(coupon)}
                      className="btn-gold"
                      style={{ flex: 1.2, padding: '0.45rem', fontSize: '0.75rem', justifyContent: 'center' }}
                    >
                      <span>Apply to Booking</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Bottom Callout */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--sand-200)' }}>
            Want more exclusive discounts?
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenScratchModal();
            }}
            className="btn-outline-gold"
            style={{ padding: '0.45rem 1rem', fontSize: '0.76rem' }}
          >
            <Sparkles size={13} />
            <span>Scratch Extra Card</span>
          </button>
        </div>
      </div>
    </div>
  );
}
