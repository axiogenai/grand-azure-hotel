import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Building, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { storage } from '../utils/storage';

export function PaymentGatewayModal({
  isOpen,
  onClose,
  bookingData,
  onPaymentSuccess
}) {
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'apple_pay' | 'google_pay' | 'property'
  
  // Card Form State
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState(bookingData?.guestName || 'LADY ELEANOR VANCE');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [isFlipped, setIsFlipped] = useState(false);

  // Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');

  if (!isOpen || !bookingData) return null;

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

  const handleExecutePayment = (e) => {
    e.preventDefault();
    soundEffects.playClickSound();
    setIsProcessing(true);

    // Step 1: Secure Handshake
    setProcessStep('Establishing 256-Bit TLS Secure Merchant Handshake...');

    setTimeout(() => {
      // Step 2: 3D Secure Authorization
      setProcessStep('Verifying 3D Secure & Bank Authorization...');
      soundEffects.playScratchSound();
    }, 1200);

    setTimeout(() => {
      // Step 3: Vault & Room Guarantee
      setProcessStep('Reserving Suite Allocation & Issuing Voucher...');
    }, 2400);

    setTimeout(() => {
      setIsProcessing(false);
      soundEffects.playWinChime();

      // Create confirmed booking object
      const confirmedBooking = {
        id: `AG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        roomId: bookingData.room.id,
        roomName: bookingData.room.name,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        nights: bookingData.nights,
        guests: bookingData.guests,
        ratePerNight: bookingData.room.pricePerNight,
        subtotal: bookingData.subtotal,
        taxes: bookingData.taxesAndFees,
        discountAmount: bookingData.discountAmount,
        couponCode: bookingData.coupon?.uniqueCode || 'NONE',
        totalPaid: bookingData.grandTotal,
        status: 'Confirmed',
        paymentMethod: paymentMethod === 'card' ? `${getCardType()} •••• ${cardNumber.slice(-4)}` : paymentMethod === 'apple_pay' ? 'Apple Pay Express' : 'Resort Concierge Check-In',
        addons: bookingData.addons.map(a => a.name),
        guestName: bookingData.guestName,
        guestEmail: bookingData.guestEmail,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      storage.addBooking(confirmedBooking);

      // If coupon used, mark it as redeemed in storage
      if (bookingData.coupon?.uniqueCode) {
        storage.markCouponRedeemed(bookingData.coupon.uniqueCode);
      }

      onPaymentSuccess(confirmedBooking);
    }, 3600);
  };

  return (
    <div className="modal-backdrop" onClick={!isProcessing ? onClose : undefined}>
      <div 
        className="modal-content luxury-glass"
        style={{
          maxWidth: '700px',
          width: '100%',
          padding: '2.25rem',
          position: 'relative',
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(212, 175, 55, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {!isProcessing ? (
          <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-400)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  <Lock size={13} />
                  <span>Encrypted Payment Processing</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
                  Complete Your Reservation
                </h3>
              </div>
              <button 
                onClick={onClose}
                style={{ background: 'transparent', border: 'none', color: 'var(--sand-100)', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Payment Method Selector Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.75rem' }}>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                style={{
                  background: paymentMethod === 'card' ? 'rgba(212, 175, 55, 0.18)' : 'rgba(7, 11, 24, 0.6)',
                  border: paymentMethod === 'card' ? '1px solid var(--gold-500)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.6rem',
                  padding: '0.65rem 0.5rem',
                  color: paymentMethod === 'card' ? 'var(--gold-300)' : 'var(--sand-200)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <CreditCard size={18} />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                style={{
                  background: paymentMethod === 'apple_pay' ? 'rgba(212, 175, 55, 0.18)' : 'rgba(7, 11, 24, 0.6)',
                  border: paymentMethod === 'apple_pay' ? '1px solid var(--gold-500)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.6rem',
                  padding: '0.65rem 0.5rem',
                  color: paymentMethod === 'apple_pay' ? 'var(--gold-300)' : 'var(--sand-200)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Smartphone size={18} />
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('google_pay')}
                style={{
                  background: paymentMethod === 'google_pay' ? 'rgba(212, 175, 55, 0.18)' : 'rgba(7, 11, 24, 0.6)',
                  border: paymentMethod === 'google_pay' ? '1px solid var(--gold-500)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.6rem',
                  padding: '0.65rem 0.5rem',
                  color: paymentMethod === 'google_pay' ? 'var(--gold-300)' : 'var(--sand-200)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Smartphone size={18} />
                <span>Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('property')}
                style={{
                  background: paymentMethod === 'property' ? 'rgba(212, 175, 55, 0.18)' : 'rgba(7, 11, 24, 0.6)',
                  border: paymentMethod === 'property' ? '1px solid var(--gold-500)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.6rem',
                  padding: '0.65rem 0.5rem',
                  color: paymentMethod === 'property' ? 'var(--gold-300)' : 'var(--sand-200)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Building size={18} />
                <span>Pay at Resort</span>
              </button>
            </div>

            {/* Credit Card View */}
            {paymentMethod === 'card' && (
              <div>
                {/* 3D Animated Card Preview */}
                <div className="card-perspective" style={{ width: '100%', maxWidth: '380px', height: '210px', margin: '0 auto 1.5rem' }}>
                  <div className={`credit-card-flipper ${isFlipped ? 'flipped' : ''}`} style={{ width: '100%', height: '100%' }}>
                    {/* Front of Card */}
                    <div 
                      className="card-front"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, #1C2A4F 0%, #0B132B 50%, #16244D 100%)',
                        border: '1px solid var(--gold-500)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(212, 175, 55, 0.3)',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '28px', background: 'linear-gradient(135deg, #DEB54C, #AA820A)', borderRadius: '5px', opacity: 0.85 }} />
                        <span style={{ fontFamily: 'var(--font-brand)', fontSize: '0.9rem', letterSpacing: '0.15em', color: 'var(--gold-400)', fontWeight: 800 }}>
                          {getCardType()}
                        </span>
                      </div>

                      <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', letterSpacing: '0.15em', color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                        {cardNumber}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <div style={{ fontSize: '0.55rem', color: 'var(--sand-300)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            Cardholder Name
                          </div>
                          <div style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {cardHolder || 'LADY ELEANOR VANCE'}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.55rem', color: 'var(--sand-300)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            Expires
                          </div>
                          <div style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 600 }}>
                            {expiry || '12/28'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card (CVV) */}
                    <div 
                      className="card-back"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, #0B132B 0%, #16244D 100%)',
                        border: '1px solid var(--gold-500)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                        padding: '1.25rem 0',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{ width: '100%', height: '38px', background: '#000000', marginTop: '0.5rem' }} />
                      <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--sand-200)', marginBottom: '0.2rem' }}>CVV / CVC</span>
                        <div style={{ width: '70px', height: '28px', background: '#FFFFFF', color: '#000000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontWeight: 800 }}>
                          {cvv || '888'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Inputs Form */}
                <form onSubmit={handleExecutePayment}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.3rem', fontWeight: 600 }}>
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
                          background: 'rgba(7, 11, 24, 0.7)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '0.6rem',
                          padding: '0.65rem 0.85rem',
                          color: '#FFFFFF',
                          fontSize: '0.85rem',
                          fontFamily: 'monospace',
                          outline: 'none'
                        }}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.3rem', fontWeight: 600 }}>
                          Cardholder Name
                        </label>
                        <input 
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          onFocus={() => setIsFlipped(false)}
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
                        <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.3rem', fontWeight: 600 }}>
                          Expires
                        </label>
                        <input 
                          type="text"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          onFocus={() => setIsFlipped(false)}
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
                        <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.3rem', fontWeight: 600 }}>
                          CVV
                        </label>
                        <input 
                          type="password"
                          maxLength={4}
                          placeholder="888"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          onFocus={() => setIsFlipped(true)}
                          onBlur={() => setIsFlipped(false)}
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
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ width: '100%', padding: '0.9rem', fontSize: '0.9rem' }}
                  >
                    <span>Authorize & Pay ${bookingData.grandTotal.toLocaleString()}</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}

            {/* Apple Pay / Google Pay Simulation */}
            {(paymentMethod === 'apple_pay' || paymentMethod === 'google_pay') && (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <Smartphone size={48} color="var(--gold-400)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  One-Touch Fast Checkout with {paymentMethod === 'apple_pay' ? 'Apple Pay' : 'Google Pay'}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--sand-200)', marginBottom: '1.75rem' }}>
                  Touch ID / Face ID verification with encrypted biometric token.
                </p>
                <button
                  onClick={handleExecutePayment}
                  className="btn-gold"
                  style={{ width: '100%', maxWidth: '320px', padding: '0.9rem', fontSize: '0.9rem' }}
                >
                  Pay with {paymentMethod === 'apple_pay' ? ' Pay' : 'G Pay'} (${bookingData.grandTotal.toLocaleString()})
                </button>
              </div>
            )}

            {/* Pay Upon Arrival at Resort */}
            {paymentMethod === 'property' && (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <Building size={48} color="var(--gold-400)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  Pay Upon Check-In at Aura Grand Azure
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--sand-200)', marginBottom: '1.75rem' }}>
                  Your suite will be held guaranteed. Settle with cash, card, or cryptocurrency upon personal butler greeting.
                </p>
                <button
                  onClick={handleExecutePayment}
                  className="btn-gold"
                  style={{ width: '100%', maxWidth: '320px', padding: '0.9rem' }}
                >
                  Confirm Reservation Without Upfront Charge
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Multi-Stage Bank Authorization Loader */
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <div 
              style={{
                width: '70px',
                height: '70px',
                border: '4px solid rgba(212, 175, 55, 0.2)',
                borderTopColor: 'var(--gold-500)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1.5rem'
              }}
            />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Processing Transaction
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--gold-300)', fontWeight: 600, minHeight: '30px' }}>
              {processStep}
            </p>
            <div style={{ fontSize: '0.74rem', color: 'var(--sand-300)', marginTop: '1.5rem' }}>
              🔒 256-Bit Merchant Encryption Protocol • PCI-DSS Level 1 Certified
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
