import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Ticket, 
  Copy, 
  Check, 
  ArrowRight, 
  Coins, 
  RotateCcw, 
  ShieldCheck, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  Edit3 
} from 'lucide-react';
import { SCRATCH_DISCOUNT_PRIZES, generateRestaurantCouponCode } from '../data/restaurantData';
import { soundEffects } from '../utils/soundEffects';

export function ScratchCouponSection({ onApplyCouponToBooking, onClaimCoupon, onGuestDetailsCaptured }) {
  // Guest Details Form State (Required before scratching)
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [name, setName] = useState('Alexander Wright');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [email, setEmail] = useState('alexander.wright@gmail.com');
  const [address, setAddress] = useState('742 Evergreen Terrace, Ocean Promontory, CA 90265');
  const [formError, setFormError] = useState('');

  // Scratch Canvas State
  const canvasRef = useRef(null);
  const [currentPrize, setCurrentPrize] = useState(null);
  const [isScratchedEnough, setIsScratchedEnough] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    initPrize();
  }, []);

  const initPrize = () => {
    const randomPrize = SCRATCH_DISCOUNT_PRIZES[Math.floor(Math.random() * SCRATCH_DISCOUNT_PRIZES.length)];
    const uniqueCode = generateRestaurantCouponCode(randomPrize.badge);
    const prizeObj = {
      ...randomPrize,
      uniqueCode,
      createdAt: new Date().toISOString(),
      expiryDate: 'Valid for 30 Days'
    };

    setCurrentPrize(prizeObj);
    setIsScratchedEnough(false);
    setScratchProgress(0);
    setCopied(false);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setFormError('Please fill in your Name, Phone Number, Gmail/Email, and Address to unlock your scratch ticket.');
      return;
    }

    soundEffects.playWinChime();
    setIsDetailsSubmitted(true);

    const guestPayload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim()
    };

    if (onGuestDetailsCaptured) {
      onGuestDetailsCaptured(guestPayload);
    }

    setTimeout(() => {
      drawFoil();
    }, 100);
  };

  const drawFoil = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.globalCompositeOperation = 'source-over';

    // Metallic Gold Gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#A67C1E');
    grad.addColorStop(0.2, '#FDF6D8');
    grad.addColorStop(0.4, '#D4AF37');
    grad.addColorStop(0.6, '#F8E8AC');
    grad.addColorStop(0.8, '#AA820A');
    grad.addColorStop(1, '#6D5111');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Glitter Specks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 450; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      ctx.fillRect(x, y, 2, 2);
    }

    // Border Frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Text on Foil
    ctx.fillStyle = '#070B18';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`✨ EXCLUSIVE TICKET FOR ${name.toUpperCase()} ✨`, w / 2, h / 2 - 28);

    ctx.font = 'bold 22px "Playfair Display", serif';
    ctx.fillStyle = '#0B132B';
    ctx.fillText('SCRATCH WITH COIN', w / 2, h / 2 + 2);

    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#4A3E31';
    ctx.fillText('Rub with mouse or touch to reveal your discount code', w / 2, h / 2 + 30);
  };

  const getCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startScratch = (e) => {
    setIsDrawing(true);
    doScratch(e);
  };

  const doScratch = (e) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;
    const canvas = canvasRef.current;
    if (!canvas || isScratchedEnough) return;

    const { x, y } = getCoords(e);
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    soundEffects.playScratchSound();

    if (Math.random() > 0.4) {
      checkProgress();
    }
  };

  const stopScratch = () => {
    setIsDrawing(false);
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratchedEnough) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    let cleared = 0;
    const total = data.length / 4;

    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) cleared++;
    }

    const pct = Math.round((cleared / (total / 4)) * 100);
    setScratchProgress(Math.min(pct, 100));

    if (pct > 40 && !isScratchedEnough) {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsScratchedEnough(true);
    setScratchProgress(100);
    soundEffects.playWinChime();

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#DEB54C', '#FFFFFF', '#F472B6']
    });

    if (currentPrize && onClaimCoupon) {
      onClaimCoupon(currentPrize);
    }
  };

  const handleCopy = () => {
    if (!currentPrize) return;
    soundEffects.playClickSound();
    navigator.clipboard.writeText(currentPrize.uniqueCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApply = () => {
    soundEffects.playClickSound();
    if (currentPrize && onApplyCouponToBooking) {
      onApplyCouponToBooking(currentPrize);
    }
    const resEl = document.getElementById('reserve');
    if (resEl) {
      resEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="scratch-discounts" 
      style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, rgba(7, 11, 24, 0.95) 0%, rgba(16, 27, 60, 0.9) 50%, rgba(7, 11, 24, 0.95) 100%)',
        position: 'relative'
      }}
    >
      <div className="container-luxury" style={{ maxWidth: '880px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid var(--gold-500)',
              borderRadius: '9999px',
              padding: '0.35rem 1rem',
              color: 'var(--gold-300)',
              fontSize: '0.76rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}
          >
            <Sparkles size={14} color="var(--gold-400)" />
            <span>VIP Guest Dining Scratch Coupon</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: '#FFFFFF', marginBottom: '0.75rem' }}>
            Unlock Your <span className="gold-gradient-text">Dining Discount Ticket</span>
          </h2>
          <p style={{ color: 'var(--sand-200)', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            {isDetailsSubmitted 
              ? `Welcome, ${name}! Rub the gold metallic foil below to reveal your guaranteed 10% to 50% dining discount code.`
              : 'Enter your details below (Name, Phone Number, Gmail/Email & Address) to generate your personalized Golden Scratch Coupon Ticket!'}
          </p>
        </div>

        {/* STEP 1: Details Entry Form (Shown Before Scratching) */}
        {!isDetailsSubmitted ? (
          <div 
            className="luxury-glass"
            style={{
              padding: '2.5rem 2rem',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.25)',
              maxWidth: '640px',
              margin: '0 auto'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div 
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #DEB54C, #937119)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem',
                  color: 'var(--navy-950)'
                }}
              >
                <Ticket size={26} />
              </div>
              <h3 style={{ fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '0.3rem' }}>
                Enter Details To Receive Ticket
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--sand-200)' }}>
                Your details will be used to issue your unique voucher serial code and pre-fill your table reservation.
              </p>
            </div>

            <form onSubmit={handleDetailsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  <User size={13} style={{ display: 'inline', marginRight: '4px' }} /> Full Name
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Lady Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(7, 11, 24, 0.7)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.9rem',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              {/* Phone Number & Gmail in 2 cols */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    <Phone size={13} style={{ display: 'inline', marginRight: '4px' }} /> Mobile Phone Number
                  </label>
                  <input 
                    type="tel"
                    placeholder="e.g. +1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(7, 11, 24, 0.7)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '0.6rem',
                      padding: '0.7rem 0.9rem',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    <Mail size={13} style={{ display: 'inline', marginRight: '4px' }} /> Gmail / Email Address
                  </label>
                  <input 
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(7, 11, 24, 0.7)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '0.6rem',
                      padding: '0.7rem 0.9rem',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} /> Residential / Delivery Address
                </label>
                <input 
                  type="text"
                  placeholder="e.g. 742 Evergreen Terrace, Los Angeles, CA 90265"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(7, 11, 24, 0.7)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.9rem',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              {formError && (
                <div style={{ color: 'var(--ruby-500)', fontSize: '0.76rem', textAlign: 'center' }}>
                  {formError}
                </div>
              )}

              <button
                type="submit"
                className="btn-gold"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.9rem', marginTop: '0.5rem' }}
              >
                <span>Unlock My Golden Scratch Ticket</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--sand-300)', marginTop: '0.2rem' }}>
                <Lock size={12} color="var(--emerald-400)" />
                <span>100% Privacy Protected • Instant Scratch Access</span>
              </div>
            </form>
          </div>
        ) : (
          /* STEP 2: The Interactive Scratch Ticket (Unlocked After Details) */
          <div 
            className="luxury-glass"
            style={{
              padding: '2.25rem 2rem',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.25)',
              textAlign: 'center',
              animation: 'fadeIn 0.35s ease'
            }}
          >
            {/* Guest Info Badge Strip */}
            <div 
              style={{
                background: 'rgba(7, 11, 24, 0.8)',
                border: '1px solid var(--glass-border)',
                borderRadius: '0.75rem',
                padding: '0.65rem 1.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                fontSize: '0.76rem',
                color: 'var(--sand-200)'
              }}
            >
              <div>
                Issued to: <strong style={{ color: '#FFFFFF' }}>{name}</strong> ({phone}) • <span style={{ color: 'var(--gold-300)' }}>{email}</span>
              </div>
              <button
                onClick={() => setIsDetailsSubmitted(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--gold-400)',
                  cursor: 'pointer',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  textDecoration: 'underline'
                }}
              >
                <Edit3 size={12} /> Edit Details
              </button>
            </div>

            {/* The Physical Scratch Card Canvas */}
            <div 
              className="scratch-card-container"
              style={{
                width: '100%',
                maxWidth: '540px',
                height: '240px',
                borderRadius: '1rem',
                overflow: 'hidden',
                position: 'relative',
                border: '2px solid var(--gold-500)',
                boxShadow: '0 20px 45px rgba(0,0,0,0.8), 0 0 25px rgba(212, 175, 55, 0.3)',
                margin: '0 auto 1.5rem',
                cursor: 'crosshair'
              }}
            >
              {/* Revealed Prize Details Beneath Foil */}
              {currentPrize && (
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #101B3C 0%, #070B18 100%)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  <span 
                    style={{
                      background: 'rgba(212, 175, 55, 0.2)',
                      color: 'var(--gold-400)',
                      border: '1px solid var(--gold-500)',
                      padding: '0.2rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      marginBottom: '0.35rem'
                    }}
                  >
                    {currentPrize.badge}
                  </span>

                  <h3 
                    className="gold-gradient-text"
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      fontFamily: 'var(--font-brand)',
                      marginBottom: '0.25rem',
                      lineHeight: 1.2
                    }}
                  >
                    {currentPrize.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--sand-200)', maxWidth: '360px', marginBottom: '0.85rem' }}>
                    {currentPrize.description}
                  </p>

                  {/* Unique Serial Identifier Box */}
                  <div 
                    style={{
                      background: 'rgba(7, 11, 24, 0.95)',
                      border: '1px dashed var(--gold-400)',
                      borderRadius: '0.5rem',
                      padding: '0.45rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.58rem', color: 'var(--sand-300)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Unique Identifier (Serial)
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold-300)', letterSpacing: '0.12em' }}>
                        {currentPrize.uniqueCode}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gold Metallic Foil Layer */}
              <canvas
                ref={canvasRef}
                width={540}
                height={240}
                className="scratch-canvas"
                style={{
                  opacity: isScratchedEnough ? 0 : 1,
                  pointerEvents: isScratchedEnough ? 'none' : 'auto'
                }}
                onMouseDown={startScratch}
                onMouseMove={doScratch}
                onMouseUp={stopScratch}
                onTouchStart={startScratch}
                onTouchMove={doScratch}
                onTouchEnd={stopScratch}
              />
            </div>

            {/* Action Bar Beneath Card */}
            {isScratchedEnough ? (
              <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '540px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <button
                    onClick={handleCopy}
                    className="btn-outline-gold"
                    style={{ flex: 1, padding: '0.75rem' }}
                  >
                    {copied ? <Check size={16} color="var(--emerald-400)" /> : <Copy size={16} />}
                    <span>{copied ? 'Code Copied!' : 'Copy Code'}</span>
                  </button>

                  <button
                    onClick={handleApply}
                    className="btn-gold"
                    style={{ flex: 1.3, padding: '0.75rem' }}
                  >
                    <Ticket size={16} />
                    <span>Apply to Table Reservation</span>
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--sand-200)' }}>
                  <span style={{ color: 'var(--emerald-400)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ShieldCheck size={14} /> Details & Code attached to reservation
                  </span>
                  <button
                    onClick={() => {
                      initPrize();
                      setTimeout(() => drawFoil(), 50);
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--gold-400)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}
                  >
                    <RotateCcw size={12} /> Scratch Another Ticket
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-300)', marginBottom: '0.5rem' }}>
                  Scratching progress: <strong>{scratchProgress}%</strong> (Rub with mouse or touch until revealed)
                </div>
                <button
                  onClick={handleComplete}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.74rem', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Skip scratch & reveal coupon instantly
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
