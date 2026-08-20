import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Ticket, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  RotateCcw,
  Award
} from 'lucide-react';
import { MichelinRosette, LuxuryCrest, GrandSeal } from './LuxuryIcons';
import { SmoothSmokeEffect } from './SmoothSmokeEffect';
import { soundEffects } from '../utils/soundEffects';

export function SpinAndScratchSection({ onApplyCouponToBooking, onGuestDetailsCaptured }) {
  // Modal State
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [name, setName] = useState('Alexander Wright');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [email, setEmail] = useState('alexander.wright@gmail.com');
  const [address, setAddress] = useState('742 Evergreen Terrace, Ocean Promontory, CA 90265');
  const [formError, setFormError] = useState('');
  const [hasDetails, setHasDetails] = useState(false);

  // 3D Parallax Card Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Scratch Ticket State & Probability (5% chance -> 10% Discount, 95% -> Next Time)
  const [ticketOutcome, setTicketOutcome] = useState(null);
  const canvasRef = useRef(null);
  const [isScratchedEnough, setIsScratchedEnough] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate Outcome
  const generateOutcome = () => {
    const isWinner = Math.random() < 0.05;

    if (isWinner) {
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const randChars = Math.random().toString(36).substring(2, 5).toUpperCase();
      const uniqueCode = `DINE-10OF-${randChars}${randNum}`;

      return {
        isWinner: true,
        title: '10% OFF ENTIRE BILL',
        subtitle: 'VIP Concierge Dining Privilege',
        discountType: 'percentage',
        discountValue: 10,
        maxDiscount: 60,
        uniqueCode,
        badge: '10OF'
      };
    } else {
      return {
        isWinner: false,
        title: 'BETTER LUCK NEXT TIME',
        subtitle: 'Thank you for dining with L\'Aura Grand',
        message: 'No discount on this voucher. 5 out of 100 tickets unlock 10% VIP discount.'
      };
    }
  };

  useEffect(() => {
    setTicketOutcome(generateOutcome());
  }, []);

  useEffect(() => {
    if (hasDetails) {
      setTimeout(() => {
        drawFoil();
      }, 100);
    }
  }, [hasDetails]);

  // Parallax Mouse Tilt Handler
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -7;
    const tiltY = ((x - centerX) / centerX) * 7;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Click on ticket
  const handleTicketClick = () => {
    soundEffects.playClickSound();
    if (!hasDetails) {
      setIsDetailsModalOpen(true);
    }
  };

  // Submit Details
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setFormError('Please fill in your Name, Phone Number, Gmail/Email, and Address.');
      return;
    }

    const detailsObj = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim()
    };

    setHasDetails(true);
    setIsDetailsModalOpen(false);

    if (onGuestDetailsCaptured) {
      onGuestDetailsCaptured(detailsObj);
    }

    const newOutcome = generateOutcome();
    setTicketOutcome(newOutcome);
    setIsScratchedEnough(false);
    setScratchProgress(0);
    setCopied(false);

    setTimeout(() => {
      drawFoil();
    }, 150);
  };

  // Draw Gold Foil on Canvas
  const drawFoil = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, w, h);

    // Deep Champagne Gold Brushed Foil
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#9E7412');
    grad.addColorStop(0.2, '#FAF3DE');
    grad.addColorStop(0.45, '#D4A838');
    grad.addColorStop(0.65, '#FFF9E6');
    grad.addColorStop(0.85, '#B88A1B');
    grad.addColorStop(1, '#6B4E08');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Guilloché Security Wave Lines on Foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 18) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.bezierCurveTo(i + 15, h * 0.3, i - 15, h * 0.7, i, h);
      ctx.stroke();
    }

    // Security Seal Border
    ctx.strokeStyle = 'rgba(107, 78, 8, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    // Embossed Foil Typography
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`MICHELIN VERIFIED PASS • ${name.toUpperCase()}`, w / 2, h / 2 - 28);

    ctx.font = 'bold 20px "Cinzel", "Playfair Display", serif';
    ctx.fillStyle = '#14171F';
    ctx.fillText('RUB TO UNCOVER REWARD', w / 2, h / 2 + 2);

    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#4B5565';
    ctx.fillText('Use mouse or finger to scratch off gold seal', w / 2, h / 2 + 30);
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
    if (!hasDetails) {
      handleTicketClick();
      return;
    }
    setIsDrawing(true);
    doScratch(e);
  };

  const doScratch = (e) => {
    if (!hasDetails) return;
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;
    const canvas = canvasRef.current;
    if (!canvas || isScratchedEnough) return;

    const { x, y } = getCoords(e);
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
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

    if (pct > 38 && !isScratchedEnough) {
      handleCompleteScratch();
    }
  };

  const handleCompleteScratch = () => {
    setIsScratchedEnough(true);
    setScratchProgress(100);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (ticketOutcome?.isWinner) {
      soundEffects.playWinChime();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B88A1B', '#D4A838', '#10B981', '#E11D48']
      });
    } else {
      soundEffects.playClickSound();
    }
  };

  const handleCopyCode = () => {
    if (!ticketOutcome?.uniqueCode) return;
    soundEffects.playClickSound();
    navigator.clipboard.writeText(ticketOutcome.uniqueCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyToReservation = () => {
    soundEffects.playClickSound();
    if (ticketOutcome?.isWinner && onApplyCouponToBooking) {
      onApplyCouponToBooking(ticketOutcome);
    }
    const resEl = document.getElementById('reserve');
    if (resEl) {
      resEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTryAnotherCard = () => {
    soundEffects.playClickSound();
    const newOutcome = generateOutcome();
    setTicketOutcome(newOutcome);
    setIsScratchedEnough(false);
    setScratchProgress(0);
    setCopied(false);

    setTimeout(() => {
      drawFoil();
    }, 100);
  };

  return (
    <section 
      id="scratch-discounts" 
      style={{
        padding: '5.5rem 1.5rem',
        background: 'linear-gradient(180deg, #FAF9F5 0%, #F4F1EA 50%, #FAF9F5 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Smooth Ambient Gold/Champagne Culinary Mist */}
      <SmoothSmokeEffect density={20} color="rgba(194, 147, 32, 0.09)" speed={0.5} />

      <div className="container-luxury" style={{ maxWidth: '940px', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'var(--gold-100)',
              border: '1px solid var(--gold-500)',
              borderRadius: '9999px',
              padding: '0.35rem 1.1rem',
              color: 'var(--gold-800)',
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}
          >
            <MichelinRosette size={14} color="var(--gold-700)" />
            <span>VIP Dining Pass Lottery</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: 500 }}>
            Scratch & Win <span className="gold-gradient-text">Exclusive Dining Rewards</span>
          </h2>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.94rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.65 }}>
            {!hasDetails 
              ? 'Click the official gold security pass below to enter your details and scratch the foil.'
              : `Scratch the gold security window below to verify if your pass unlocks the 10% VIP reward!`
            }
          </p>
        </div>

        {/* 3D PERSPECTIVE CONTAINER FOR THE PHYSICAL LUXURY TICKET */}
        <div 
          style={{
            perspective: '1200px',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}
        >
          {/* THE PHYSICAL LUXURY PASS (Two-Part Perforated Voucher) */}
          <div 
            className="physical-ticket"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={!hasDetails ? handleTicketClick : undefined}
            style={{
              background: 'linear-gradient(135deg, #FAF8F5 0%, #FFFFFF 50%, #F5F1E9 100%)',
              border: '2px solid rgba(168, 124, 20, 0.45)',
              borderRadius: '1.25rem',
              boxShadow: isHovered 
                ? '0 30px 60px rgba(20, 24, 33, 0.22), 0 0 35px rgba(184, 138, 27, 0.35)' 
                : '0 15px 40px rgba(20, 24, 33, 0.12), 0 0 20px rgba(184, 138, 27, 0.18)',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.3s ease' : 'transform 0.5s ease-out, box-shadow 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              cursor: hasDetails ? 'crosshair' : 'pointer'
            }}
          >
            {/* Holographic Sheen Reflection Layer */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.4) 40%, rgba(253, 224, 71, 0.25) 50%, transparent 65%)',
                pointerEvents: 'none',
                opacity: isHovered ? 1 : 0.4,
                transition: 'opacity 0.3s'
              }}
            />

            {/* LEFT SECTION: Perforated Ticket Stub */}
            <div 
              className="physical-ticket-left"
              style={{
                background: 'linear-gradient(180deg, #14171F 0%, #1F293D 100%)',
                color: '#FAF3DE',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              {/* Semi-circle notch top & bottom for authentic physical ticket cut */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '-12px',
                  right: '-12px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}
              />

              {/* Stub Header with Haute Michelin Crest */}
              <div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #DEB54C, #9E7412)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', margin: '0 auto 0.4rem', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                  <MichelinRosette size={18} color="#0F172A" />
                </div>
                <div style={{ fontFamily: 'var(--font-brand)', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.1em', color: '#FFFFFF' }}>
                  L'AURA
                </div>
                <div style={{ fontSize: '0.52rem', color: '#D4A838', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  3-MICHELIN STAR
                </div>
              </div>

              {/* Stub Barcode Simulation */}
              <div style={{ margin: '1rem 0' }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2.5px',
                    height: '38px',
                    opacity: 0.8
                  }}
                >
                  <div style={{ width: '3px', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ width: '1px', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ width: '4px', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ width: '2px', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ width: '1px', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ width: '3px', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ width: '2px', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ width: '4px', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ width: '1px', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ width: '3px', height: '100%', background: '#FFFFFF' }} />
                </div>
                <div style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#94A3B8', marginTop: '3px', letterSpacing: '0.1em' }}>
                  NO. 2026-VIP
                </div>
              </div>

              {/* Guest Name on Stub */}
              <div style={{ fontSize: '0.62rem', color: '#CBD5E1', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '0.4rem', width: '100%' }}>
                {hasDetails ? name.split(' ')[0] : 'GUEST PASS'}
              </div>
            </div>

            {/* RIGHT SECTION: Main Scratch Foil & Security Window */}
            <div 
              className="physical-ticket-right"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              {/* Ticket Top Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(168, 124, 20, 0.2)', paddingBottom: '0.5rem', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <LuxuryCrest size={18} color="var(--gold-700)" />
                  <div>
                    <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-800)' }}>
                      HAUTE GASTRONOMY VIP PASS
                    </span>
                    <div style={{ fontFamily: 'var(--font-brand)', fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.05em' }}>
                      L'AURA GRAND OCEAN LOUNGE
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.58rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>Series</span>
                  <strong style={{ fontSize: '0.72rem', color: 'var(--gold-800)', fontFamily: 'monospace' }}>2026-DRAW</strong>
                </div>
              </div>

              {/* CENTRAL FOIL SCRATCH WINDOW */}
              <div 
                className="scratch-canvas-container"
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  border: '2px solid #C29320',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)',
                  background: '#FFFFFF'
                }}
              >
                {/* UNDER FOIL: Real Outcome (Visible ONLY when foil is scraped) */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center, #FFFFFF 0%, #FAF8F5 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '0.85rem'
                  }}
                >
                  {ticketOutcome?.isWinner ? (
                    <>
                      <div style={{ background: 'var(--emerald-50)', color: 'var(--emerald-700)', border: '1px solid var(--emerald-600)', padding: '0.15rem 0.65rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MichelinRosette size={12} color="var(--emerald-700)" />
                        <span>5% WINNING PASS VERIFIED</span>
                      </div>
                      <div className="gold-gradient-text" style={{ fontSize: '1.65rem', fontWeight: 900, fontFamily: 'var(--font-brand)', lineHeight: 1.1 }}>
                        10% OFF ENTIRE BILL
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-sub)', marginTop: '0.15rem' }}>
                        Applied to: <strong>{name}</strong>
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-800)', letterSpacing: '0.12em', marginTop: '0.35rem', background: '#FFFFFF', padding: '0.2rem 0.85rem', borderRadius: '4px', border: '1px dashed var(--gold-500)' }}>
                        {ticketOutcome.uniqueCode}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '1.75rem', marginBottom: '0.15rem' }}>🍀</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-brand)', color: '#1E293B' }}>
                        BETTER LUCK NEXT TIME
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-sub)', maxWidth: '340px', marginTop: '0.2rem' }}>
                        No discount on this pass. Only 5 of 100 tickets win.
                      </div>
                    </>
                  )}
                </div>

                {/* Canvas Foil Layer */}
                <canvas
                  ref={canvasRef}
                  width={520}
                  height={150}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: isScratchedEnough ? 0 : 1,
                    pointerEvents: isScratchedEnough ? 'none' : 'auto',
                    zIndex: 20
                  }}
                  onMouseDown={startScratch}
                  onMouseMove={doScratch}
                  onMouseUp={stopScratch}
                  onTouchStart={startScratch}
                  onTouchMove={doScratch}
                  onTouchEnd={stopScratch}
                />

                {/* PRE-SCRATCH GOLD COVER: Dynamic Scraping Coin Animation (Attracts scratching!) */}
                {!hasDetails && (
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, #B88A1B 0%, #FFF6D6 25%, #D4A838 50%, #AA820A 80%, #704F05 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 30,
                      cursor: 'pointer'
                    }}
                  >
                    {/* Realistic Scratching Motion Guide */}
                    <div 
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {/* Floating Gold Coin Moving along a scraping path */}
                      <div 
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, #FFFDF0 0%, #D4A838 55%, #85610E 100%)',
                          border: '2px solid #FFFFFF',
                          boxShadow: '0 8px 18px rgba(0,0,0,0.35), 0 0 15px rgba(253, 224, 71, 0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0F172A',
                          animation: 'coinScratchPath 2.4s infinite ease-in-out',
                          marginBottom: '0.4rem'
                        }}
                      >
                        <GrandSeal size={22} color="#0F172A" />
                      </div>

                      {/* Engraved Typography */}
                      <div 
                        style={{ 
                          fontFamily: 'var(--font-brand)', 
                          fontSize: '1.15rem', 
                          fontWeight: 900, 
                          color: '#0F172A', 
                          letterSpacing: '0.08em',
                          textShadow: '0 1px 4px rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        RUB TO REVEAL PASS
                      </div>
                      <div style={{ fontSize: '0.64rem', fontWeight: 800, color: '#453205', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>
                        TAP TO UNLOCK SECURITY FOIL
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ticket Footer Security Text */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Lock size={10} color="var(--emerald-600)" />
                  <span>Encrypted 1-Time Security Voucher</span>
                </span>
                <span>Valid: 2026 Season</span>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS & CONTROLS BELOW TICKET (Appears after scratching) */}
        {hasDetails && (
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            {isScratchedEnough ? (
              <div style={{ animation: 'fadeIn 0.35s ease' }}>
                {ticketOutcome?.isWinner ? (
                  <>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <button
                        onClick={handleCopyCode}
                        className="btn-outline-gold"
                        style={{ flex: 1, padding: '0.75rem' }}
                      >
                        {copied ? <Check size={16} color="var(--emerald-600)" /> : <Copy size={16} />}
                        <span>{copied ? 'Code Copied!' : 'Copy Serial Code'}</span>
                      </button>

                      <button
                        onClick={handleApplyToReservation}
                        className="btn-gold"
                        style={{ flex: 1.4, padding: '0.75rem' }}
                      >
                        <Ticket size={16} />
                        <span>Apply 10% to Reservation</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                      <span style={{ color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                        <ShieldCheck size={14} /> 10% discount attached to table reservation for {name}
                      </span>
                      <button
                        onClick={handleTryAnotherCard}
                        style={{ background: 'transparent', border: 'none', color: 'var(--gold-800)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700 }}
                      >
                        <RotateCcw size={12} /> Try Another Pass
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                      Better luck next time, {name}! You can test another scratch voucher below:
                    </div>
                    <button
                      onClick={handleTryAnotherCard}
                      className="btn-gold"
                      style={{ padding: '0.75rem 2.2rem' }}
                    >
                      <RotateCcw size={16} />
                      <span>Try Another Scratch Pass</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-800)', marginBottom: '0.4rem', fontWeight: 700 }}>
                  Scratching progress: <strong>{scratchProgress}%</strong> (Rub with mouse or touch until revealed)
                </div>
                <button
                  onClick={handleCompleteScratch}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.74rem', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Skip scratch & reveal coupon outcome instantly
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* POPUP MODAL: Guest Details Fill Card (Appears on clicking Pass) */}
      {isDetailsModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsDetailsModalOpen(false)}>
          <div 
            className="modal-content luxury-glass"
            style={{
              maxWidth: '560px',
              width: '100%',
              padding: '2.5rem',
              background: '#FFFFFF',
              border: '2px solid var(--gold-500)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-800)', fontWeight: 800 }}>
                  VIP Guest Verification
                </span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '0.2rem', fontWeight: 600 }}>
                  Fill Details To Unlock Scratch Pass
                </h3>
              </div>
              <button 
                onClick={() => setIsDetailsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', marginBottom: '1.5rem' }}>
              Please enter your details below. Once confirmed, your gold security pass will unlock for scratching!
            </p>

            <form onSubmit={handleDetailsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  <User size={13} style={{ display: 'inline', marginRight: '4px' }} /> Full Name
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Alexander Wright"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FAF8F5',
                    border: '1px solid rgba(168, 124, 20, 0.35)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.9rem',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              {/* Mobile Phone & Gmail */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    <Phone size={13} style={{ display: 'inline', marginRight: '4px' }} /> Mobile Phone Number
                  </label>
                  <input 
                    type="tel"
                    placeholder="e.g. +1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#FAF8F5',
                      border: '1px solid rgba(168, 124, 20, 0.35)',
                      borderRadius: '0.6rem',
                      padding: '0.7rem 0.9rem',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    <Mail size={13} style={{ display: 'inline', marginRight: '4px' }} /> Gmail / Email Address
                  </label>
                  <input 
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#FAF8F5',
                      border: '1px solid rgba(168, 124, 20, 0.35)',
                      borderRadius: '0.6rem',
                      padding: '0.7rem 0.9rem',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-800)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} /> Residential / Delivery Address
                </label>
                <input 
                  type="text"
                  placeholder="e.g. 742 Evergreen Terrace, Los Angeles, CA 90265"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FAF8F5',
                    border: '1px solid rgba(168, 124, 20, 0.35)',
                    borderRadius: '0.6rem',
                    padding: '0.7rem 0.9rem',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              {formError && (
                <div style={{ color: 'var(--ruby-600)', fontSize: '0.76rem', textAlign: 'center' }}>
                  {formError}
                </div>
              )}

              <button
                type="submit"
                className="btn-gold"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
              >
                <span>Unlock Security Pass</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <Lock size={12} color="var(--emerald-600)" />
                <span>100% Privacy Protected • Instant Unlock</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
