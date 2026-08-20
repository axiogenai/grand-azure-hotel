import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  UtensilsCrossed, 
  Building 
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export function CheckoutPaymentModal({
  isOpen,
  onClose,
  reservationData,
  onPaymentSuccess
}) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState(reservationData?.dinerName || 'ALEXANDER WRIGHT');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');

  if (!isOpen || !reservationData) return null;

  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted || '•••• •••• •••• ••••');
  };

  const getCardType = () => {
    const raw = cardNumber.replace(/\s/g, '');
    if (raw.startsWith('4')) return 'VISA';
    if (raw.startsWith('5')) return 'MASTERCARD';
    if (raw.startsWith('3')) return 'AMEX';
    return 'VISA';
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    soundEffects.playClickSound();
    setIsProcessing(true);

    setProcessStep('Verifying 256-Bit TLS Restaurant Merchant Handshake...');

    setTimeout(() => {
      setProcessStep('Authorizing Dining Reservation & Table Lock...');
      soundEffects.playScratchSound();
    }, 1200);

    setTimeout(() => {
      setProcessStep('Generating Luxury QR Pass & Dining Reference...');
    }, 2400);

    setTimeout(() => {
      setIsProcessing(false);
      soundEffects.playWinChime();

      const confirmedObj = {
        id: `RES-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: reservationData.date,
        time: reservationData.time,
        guests: reservationData.guests,
        zoneName: reservationData.zone.name,
        tastingMenuName: reservationData.tastingMenu ? reservationData.tastingMenu.name : 'À La Carte Dining',
        dinerName: reservationData.dinerName,
        dinerEmail: reservationData.dinerEmail,
        dinerPhone: reservationData.dinerPhone,
        dinerAddress: reservationData.dinerAddress,
        specialNotes: reservationData.specialNotes,
        subtotal: reservationData.subtotal,
        tax: reservationData.tax,
        discountAmount: reservationData.discountAmount,
        couponCode: reservationData.coupon?.uniqueCode || 'NONE',
        totalPaid: reservationData.totalAmount,
        paymentMethod: paymentMethod === 'card' ? `${getCardType()} •••• ${cardNumber.slice(-4)}` : paymentMethod === 'apple_pay' ? 'Apple Pay Express' : 'Pay at Restaurant Table',
        createdAt: new Date().toISOString()
      };

      onPaymentSuccess(confirmedObj);
    }, 3600);
  };

  return (
    <div className="modal-backdrop" onClick={!isProcessing ? onClose : undefined}>
      <div 
        className="modal-content luxury-glass"
        style={{
          maxWidth: '660px',
          width: '100%',
          padding: '2.5rem',
          background: '#FFFFFF',
          border: '1.5px solid var(--gold-500)',
          position: 'relative',
          boxShadow: 'var(--shadow-hover)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {!isProcessing ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', paddingBottom: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-700)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  <Lock size={13} />
                  <span>Secure Dining Reservation Checkout</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '0.2rem', fontWeight: 600 }}>
                  Confirm Your Table
                </h3>
              </div>
              <button 
                onClick={onClose}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Payment Method Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.75rem' }}>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                style={{
                  background: paymentMethod === 'card' ? 'var(--gold-100)' : '#FAF8F5',
                  border: paymentMethod === 'card' ? '1.5px solid var(--gold-500)' : '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '0.65rem',
                  padding: '0.75rem 0.5rem',
                  color: paymentMethod === 'card' ? 'var(--gold-800)' : 'var(--text-sub)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.2s'
                }}
              >
                <CreditCard size={18} />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                style={{
                  background: paymentMethod === 'apple_pay' ? 'var(--gold-100)' : '#FAF8F5',
                  border: paymentMethod === 'apple_pay' ? '1.5px solid var(--gold-500)' : '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '0.65rem',
                  padding: '0.75rem 0.5rem',
                  color: paymentMethod === 'apple_pay' ? 'var(--gold-800)' : 'var(--text-sub)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.2s'
                }}
              >
                <Smartphone size={18} />
                <span>Apple / Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('table')}
                style={{
                  background: paymentMethod === 'table' ? 'var(--gold-100)' : '#FAF8F5',
                  border: paymentMethod === 'table' ? '1.5px solid var(--gold-500)' : '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '0.65rem',
                  padding: '0.75rem 0.5rem',
                  color: paymentMethod === 'table' ? 'var(--gold-800)' : 'var(--text-sub)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.2s'
                }}
              >
                <UtensilsCrossed size={18} />
                <span>Pay at Restaurant</span>
              </button>
            </div>

            {/* Credit Card View */}
            {paymentMethod === 'card' && (
              <div>
                <div className="card-perspective" style={{ width: '100%', maxWidth: '360px', height: '190px', margin: '0 auto 1.5rem' }}>
                  <div className={`credit-card-flipper ${isFlipped ? 'flipped' : ''}`} style={{ width: '100%', height: '100%' }}>
                    <div 
                      className="card-front"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                        border: '1px solid var(--gold-500)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: '#FFFFFF'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '38px', height: '26px', background: 'linear-gradient(135deg, #E6C56E, #B88A1B)', borderRadius: '4px' }} />
                        <span style={{ fontFamily: 'var(--font-brand)', fontSize: '0.85rem', color: 'var(--gold-300)', fontWeight: 800 }}>
                          {getCardType()}
                        </span>
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: '#FFFFFF' }}>{cardNumber}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '0.55rem', color: '#94A3B8', textTransform: 'uppercase' }}>Diner Name</div>
                          <div style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 600 }}>{cardHolder}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.55rem', color: '#94A3B8', textTransform: 'uppercase' }}>Expires</div>
                          <div style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 600 }}>{expiry}</div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="card-back"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '1rem',
                        background: '#0F172A',
                        border: '1px solid var(--gold-500)',
                        padding: '1.25rem 0',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{ width: '100%', height: '35px', background: '#000000', marginTop: '0.5rem' }} />
                      <div style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <span style={{ fontSize: '0.6rem', color: '#94A3B8' }}>CVV</span>
                        <div style={{ width: '60px', height: '26px', background: '#FFFFFF', color: '#000', marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          {cvv}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleProcessPayment}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.3rem', fontWeight: 700 }}>
                        Card Number
                      </label>
                      <input 
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber.replace(/•/g, '4')}
                        onChange={handleCardNumberChange}
                        onFocus={() => setIsFlipped(false)}
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

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.65rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.3rem', fontWeight: 700 }}>
                          Name on Card
                        </label>
                        <input 
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          onFocus={() => setIsFlipped(false)}
                          style={{ width: '100%', background: '#FAF8F5', border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '0.6rem', padding: '0.7rem', color: 'var(--text-main)', fontSize: '0.86rem', outline: 'none' }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.3rem', fontWeight: 700 }}>
                          Expiry
                        </label>
                        <input 
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          onFocus={() => setIsFlipped(false)}
                          style={{ width: '100%', background: '#FAF8F5', border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '0.6rem', padding: '0.7rem', color: 'var(--text-main)', fontSize: '0.86rem', outline: 'none' }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.3rem', fontWeight: 700 }}>
                          CVV
                        </label>
                        <input 
                          type="password"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          onFocus={() => setIsFlipped(true)}
                          onBlur={() => setIsFlipped(false)}
                          style={{ width: '100%', background: '#FAF8F5', border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '0.6rem', padding: '0.7rem', color: 'var(--text-main)', fontSize: '0.86rem', outline: 'none' }}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn-gold" style={{ width: '100%', padding: '0.9rem', fontSize: '0.9rem' }}>
                    <span>Authorize & Confirm (${reservationData.totalAmount.toLocaleString()})</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}

            {/* Apple Pay */}
            {paymentMethod === 'apple_pay' && (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <Smartphone size={44} color="var(--gold-700)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 600 }}>One-Touch Biometric Express Checkout</h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', marginBottom: '1.5rem' }}>
                  Confirm your table reservation securely with Apple Pay or Google Pay.
                </p>
                <button onClick={handleProcessPayment} className="btn-gold" style={{ width: '100%', maxWidth: '320px', padding: '0.9rem' }}>
                  Pay with  Pay (${reservationData.totalAmount.toLocaleString()})
                </button>
              </div>
            )}

            {/* Pay at Table */}
            {paymentMethod === 'table' && (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <UtensilsCrossed size={44} color="var(--gold-700)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 600 }}>Pay Upon Dining Tonight</h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', marginBottom: '1.5rem' }}>
                  Your table is guaranteed. Settle your dining bill with cash or card directly with your server tonight.
                </p>
                <button onClick={handleProcessPayment} className="btn-gold" style={{ width: '100%', maxWidth: '320px', padding: '0.9rem' }}>
                  Confirm Table ($0 Due Upfront)
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Processing Loader */
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <div style={{ width: '65px', height: '65px', border: '4px solid rgba(168, 124, 20, 0.2)', borderTopColor: 'var(--gold-500)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 600 }}>Securing Your Dining Table</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--gold-700)', fontWeight: 700 }}>{processStep}</p>
          </div>
        )}
      </div>
    </div>
  );
}
