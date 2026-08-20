import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCw, 
  Ticket, 
  Copy, 
  Check, 
  ArrowRight, 
  Coins, 
  Flame, 
  ShieldCheck 
} from 'lucide-react';
import { WHEEL_PRIZES } from './SpinAndScratchSection';
import { generateUniqueCouponCode } from '../data/couponPrizes';
import { soundEffects } from '../utils/soundEffects';
import { storage } from '../utils/storage';

export function ScratchCouponModal({ 
  isOpen, 
  onClose, 
  onApplyCouponToBooking, 
  onCouponClaimed 
}) {
  const [stage, setStage] = useState('wheel'); // 'wheel' | 'scratch'
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [currentPrize, setCurrentPrize] = useState(null);
  
  const canvasRef = useRef(null);
  const [isScratchedEnough, setIsScratchedEnough] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStage('wheel');
      setIsSpinning(false);
      setIsScratchedEnough(false);
      setScratchProgress(0);
      setCopied(false);
    }
  }, [isOpen]);

  const handleSpin = () => {
    if (isSpinning) return;
    soundEffects.playClickSound();
    setIsSpinning(true);

    const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const prize = WHEEL_PRIZES[prizeIndex];

    const sliceAngle = 360 / WHEEL_PRIZES.length;
    const baseSpins = 360 * 6;
    const targetAngle = baseSpins + (360 - (prizeIndex * sliceAngle + sliceAngle / 2));

    const totalRotation = wheelRotation + targetAngle;
    setWheelRotation(totalRotation);

    let tickCount = 0;
    const tickInterval = setInterval(() => {
      soundEffects.playWheelTick();
      tickCount++;
      if (tickCount > 30) clearInterval(tickInterval);
    }, 120);

    setTimeout(() => {
      setIsSpinning(false);
      soundEffects.playWinChime();

      const uniqueCode = generateUniqueCouponCode(prize.tier);
      const expiryDate = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      const couponPayload = {
        ...prize,
        uniqueCode,
        createdAt: new Date().toISOString(),
        expiryDate,
        isRedeemed: false
      };

      setCurrentPrize(couponPayload);
      setStage('scratch');

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#DEB54C', '#FFFFFF']
      });

      setTimeout(() => {
        drawFoil();
      }, 80);
    }, 4200);
  };

  const drawFoil = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.globalCompositeOperation = 'source-over';

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#A67C1E');
    grad.addColorStop(0.25, '#FDF6D8');
    grad.addColorStop(0.5, '#D4AF37');
    grad.addColorStop(0.75, '#F8E8AC');
    grad.addColorStop(1, '#6D5111');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      ctx.fillRect(x, y, 2, 2);
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.fillStyle = '#070B18';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ UNLOCKED VIP LUCKY SCRATCH TICKET ✨', w / 2, h / 2 - 28);

    ctx.font = 'bold 22px "Playfair Display", serif';
    ctx.fillStyle = '#0B132B';
    ctx.fillText('SCRATCH WITH COIN', w / 2, h / 2 + 2);

    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#4A3E31';
    ctx.fillText('Rub with mouse or touch to unlock discount code', w / 2, h / 2 + 30);
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
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#DEB54C', '#FFFFFF', '#38BDF8']
    });

    if (currentPrize) {
      storage.addCoupon(currentPrize);
      if (onCouponClaimed) {
        onCouponClaimed(currentPrize);
      }
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
    if (currentPrize) {
      onApplyCouponToBooking(currentPrize);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content luxury-glass"
        style={{
          maxWidth: '560px',
          width: '100%',
          padding: '2.25rem 2rem',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(212, 175, 55, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: 'var(--sand-200)', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          ✕
        </button>

        <div style={{ marginBottom: '1.25rem' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid var(--gold-500)',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
              color: 'var(--gold-300)',
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '0.4rem'
            }}
          >
            <Sparkles size={13} color="var(--gold-400)" />
            <span>VIP Spin & Scratch Station</span>
          </div>
          <h2 style={{ fontSize: '1.65rem', color: '#FFFFFF' }}>
            {stage === 'wheel' ? 'Spin To Unlock Your Scratch Card' : 'Scratch To Reveal Coupon Code'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--sand-200)' }}>
            {stage === 'wheel' ? 'Spin the golden roulette to determine your guaranteed reward tier!' : 'Rub the gold foil to claim your unique serial voucher!'}
          </p>
        </div>

        {stage === 'wheel' ? (
          /* Spin Wheel in Modal */
          <div>
            <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 1.5rem' }}>
              <div 
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 20,
                  width: '0',
                  height: '0',
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderTop: '24px solid #D4AF37',
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.8))'
                }}
              />

              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  padding: '8px',
                  background: 'linear-gradient(135deg, #DEB54C 0%, #D4AF37 50%, #937119 100%)',
                  boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)'
                }}
              >
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: isSpinning ? 'transform 4.2s cubic-bezier(0.15, 0.95, 0.35, 1)' : 'none',
                    transform: `rotate(${wheelRotation}deg)`
                  }}
                >
                  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ transform: 'rotate(-22.5deg)' }}>
                    {WHEEL_PRIZES.map((prize, idx) => {
                      const angle = 360 / WHEEL_PRIZES.length;
                      const startAngle = idx * angle;
                      const endAngle = startAngle + angle;
                      const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                      const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                      const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                      const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);
                      return (
                        <path 
                          key={prize.id}
                          d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} 
                          fill={idx % 2 === 0 ? '#111C38' : '#0B132B'} 
                          stroke="#D4AF37" 
                          strokeWidth="0.5" 
                        />
                      );
                    })}
                  </svg>

                  {WHEEL_PRIZES.map((prize, idx) => {
                    const angle = idx * (360 / WHEEL_PRIZES.length);
                    return (
                      <div
                        key={prize.id}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transformOrigin: '0 0',
                          transform: `rotate(${angle}deg) translate(0, -50%)`,
                          width: '120px',
                          textAlign: 'right',
                          paddingRight: '8px',
                          pointerEvents: 'none'
                        }}
                      >
                        <div style={{ fontSize: '0.62rem', fontWeight: 800, color: prize.color, whiteSpace: 'nowrap' }}>
                          {prize.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleSpin}
                disabled={isSpinning}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 15,
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #DEB54C, #937119)',
                  border: '2px solid #FFFFFF',
                  color: 'var(--navy-950)',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  cursor: isSpinning ? 'not-allowed' : 'pointer'
                }}
              >
                {isSpinning ? <RotateCw size={18} className="animate-spin" /> : 'SPIN'}
              </button>
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="btn-gold"
              style={{ width: '100%', maxWidth: '300px', padding: '0.8rem' }}
            >
              <span>{isSpinning ? 'Spinning Lucky Wheel...' : 'Spin The Wheel'}</span>
            </button>
          </div>
        ) : (
          /* Scratch Card in Modal */
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div 
              className="scratch-card-container"
              style={{
                width: '100%',
                height: '240px',
                borderRadius: '1rem',
                overflow: 'hidden',
                position: 'relative',
                border: '2px solid var(--gold-500)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.8), 0 0 25px rgba(212, 175, 55, 0.3)',
                margin: '0 auto 1.25rem'
              }}
            >
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
                    color: '#FFFFFF'
                  }}
                >
                  <span 
                    style={{
                      background: 'rgba(212, 175, 55, 0.2)',
                      color: 'var(--gold-400)',
                      border: '1px solid var(--gold-500)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      marginBottom: '0.4rem'
                    }}
                  >
                    {currentPrize.badge}
                  </span>

                  <h3 className="gold-gradient-text" style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-brand)', marginBottom: '0.25rem' }}>
                    {currentPrize.title}
                  </h3>

                  <p style={{ fontSize: '0.78rem', color: 'var(--sand-200)', maxWidth: '340px', marginBottom: '0.65rem' }}>
                    {currentPrize.description}
                  </p>

                  <div style={{ background: 'rgba(7, 11, 24, 0.95)', border: '1px dashed var(--gold-400)', borderRadius: '0.5rem', padding: '0.35rem 1rem' }}>
                    <div style={{ fontSize: '0.55rem', color: 'var(--sand-300)', textTransform: 'uppercase' }}>
                      Unique Identifier Code
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-300)' }}>
                      {currentPrize.uniqueCode}
                    </div>
                  </div>
                </div>
              )}

              <canvas
                ref={canvasRef}
                width={460}
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

            {isScratchedEnough ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button onClick={handleCopy} className="btn-outline-gold" style={{ flex: 1, padding: '0.65rem' }}>
                    {copied ? <Check size={15} color="var(--emerald-400)" /> : <Copy size={15} />}
                    <span>{copied ? 'Code Copied!' : 'Copy Code'}</span>
                  </button>
                  <button onClick={handleApply} className="btn-gold" style={{ flex: 1.2, padding: '0.65rem' }}>
                    <Ticket size={15} />
                    <span>Apply & Book Stay</span>
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: 'var(--sand-200)', marginTop: '0.2rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--emerald-400)' }}>
                    <ShieldCheck size={14} /> Saved in wallet
                  </span>
                  <button onClick={() => setStage('wheel')} style={{ background: 'transparent', border: 'none', color: 'var(--gold-400)', cursor: 'pointer', textDecoration: 'underline' }}>
                    Spin Wheel Again
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.4rem' }}>
                  Scratching... {scratchProgress}%
                </div>
                <button onClick={handleComplete} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', textDecoration: 'underline', cursor: 'pointer' }}>
                  Skip & reveal code instantly
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
