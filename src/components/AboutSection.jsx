import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Compass, 
  Waves, 
  Wine, 
  Calendar,
  Users,
  Clock,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import { MichelinRosette, LuxuryCrest } from './LuxuryIcons';
import { soundEffects } from '../utils/soundEffects';

export function AboutSection({ onQuickReserve, onOpenReserve }) {
  const [date, setDate] = useState('2026-09-18');
  const [time, setTime] = useState('7:30 PM');
  const [guests, setGuests] = useState(2);
  const [seatingZone, setSeatingZone] = useState('window');

  // Custom Time Arrow Counter State
  const [customHour, setCustomHour] = useState(7);
  const [customMin, setCustomMin] = useState(30);
  const [customPeriod, setCustomPeriod] = useState('PM');

  // Active Very Short Mini-Box State
  const [openBox, setOpenBox] = useState(null); // 'date' | 'time' | 'guests' | 'seating' | null
  const cardContainerRef = useRef(null);

  // Close box on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (cardContainerRef.current && !cardContainerRef.current.contains(e.target)) {
        setOpenBox(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const timePresets = ['5:30 PM', '6:30 PM', '7:30 PM', '8:30 PM', '9:30 PM'];
  
  const guestOptions = [
    { value: 1, label: '1 Guest' },
    { value: 2, label: '2 Guests' },
    { value: 4, label: '4 Guests' },
    { value: 6, label: '6 Guests' },
    { value: 8, label: '8+ Guests' }
  ];
  
  const seatingOptions = [
    { id: 'window', label: '🌊 Ocean View' },
    { id: 'terrace', label: '✨ Starlit Terrace' },
    { id: 'chef', label: '🍷 VIP Cellar' },
    { id: 'booth', label: '🛋️ Velvet Booth' }
  ];

  const datePresets = [
    { label: 'Tonight', val: '2026-09-17' },
    { label: 'Tomorrow', val: '2026-09-18' },
    { label: 'Friday', val: '2026-09-19' },
    { label: 'Saturday Gala', val: '2026-09-20' }
  ];

  // Arrow Step Functions for Custom Time
  const stepHour = (delta) => {
    soundEffects.playClickSound();
    let next = customHour + delta;
    if (next > 12) next = 1;
    if (next < 1) next = 12;
    setCustomHour(next);
    const formatted = `${next}:${customMin < 10 ? '0' : ''}${customMin} ${customPeriod}`;
    setTime(formatted);
  };

  const stepMinute = (delta) => {
    soundEffects.playClickSound();
    let next = customMin + delta;
    if (next >= 60) next = 0;
    if (next < 0) next = 45;
    setCustomMin(next);
    const formatted = `${customHour}:${next < 10 ? '0' : ''}${next} ${customPeriod}`;
    setTime(formatted);
  };

  const togglePeriod = () => {
    soundEffects.playClickSound();
    const next = customPeriod === 'PM' ? 'AM' : 'PM';
    setCustomPeriod(next);
    const formatted = `${customHour}:${customMin < 10 ? '0' : ''}${customMin} ${next}`;
    setTime(formatted);
  };

  const toggleBox = (boxName) => {
    soundEffects.playClickSound();
    setOpenBox(openBox === boxName ? null : boxName);
  };

  const handleSelectOption = (action) => {
    soundEffects.playClickSound();
    action();
    setOpenBox(null);
  };

  // Animated Metrics State with IntersectionObserver
  const tickerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [countYear, setCountYear] = useState(1900);
  const [countCellar, setCountCellar] = useState(0);
  const [countRank, setCountRank] = useState(25);
  const [starsRevealed, setStarsRevealed] = useState([false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (tickerRef.current) {
      observer.observe(tickerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Smooth Count Up Easing
  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounts = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCountYear(Math.round(1900 + (1928 - 1900) * easeOut));
      setCountCellar(Math.round(0 + 4500 * easeOut));
      setCountRank(Math.round(25 - (25 - 4) * easeOut));

      if (progress > 0.3 && !starsRevealed[0]) setStarsRevealed([true, false, false]);
      if (progress > 0.6 && !starsRevealed[1]) setStarsRevealed([true, true, false]);
      if (progress > 0.85 && !starsRevealed[2]) setStarsRevealed([true, true, true]);

      if (progress < 1) {
        requestAnimationFrame(updateCounts);
      }
    };

    requestAnimationFrame(updateCounts);
  }, [hasAnimated]);

  const handleQuickSubmit = (e) => {
    if (e) e.preventDefault();
    soundEffects.playClickSound();
    if (onQuickReserve) {
      onQuickReserve({
        date,
        time,
        guests: parseInt(guests, 10),
        seatingZone
      });
    } else if (onOpenReserve) {
      onOpenReserve();
    }
  };

  return (
    <section 
      id="about"
      style={{
        padding: '0 1.5rem 5.5rem',
        background: '#FAF9F5',
        position: 'relative'
      }}
    >
      <div className="container-luxury" style={{ maxWidth: '1180px' }}>
        
        {/* 1. ELEVATED LUXURY CAPSULE CARD (2cm elevated, with Arrow Tab Counter) */}
        <div 
          ref={cardContainerRef}
          style={{
            marginTop: '-50px',
            marginBottom: '4rem',
            position: 'relative',
            zIndex: 35,
            maxWidth: '780px',
            margin: '-50px auto 4rem'
          }}
        >
          <div 
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(168, 124, 20, 0.45)',
              borderRadius: '9999px',
              padding: '0.55rem 0.65rem 0.55rem 1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.6rem',
              boxShadow: '0 22px 55px rgba(15, 23, 42, 0.13), 0 0 25px rgba(184, 138, 27, 0.12)',
              flexWrap: 'wrap',
              position: 'relative'
            }}
          >
            {/* 1. Date Trigger Button */}
            <button
              type="button"
              onClick={() => toggleBox('date')}
              style={{
                border: openBox === 'date' ? '1.5px solid var(--gold-600)' : '1px solid rgba(168, 124, 20, 0.25)',
                background: openBox === 'date' ? 'var(--gold-100)' : '#FAF8F5',
                borderRadius: '9999px',
                padding: '0.45rem 0.85rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: 'var(--gold-800)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              <Calendar size={14} />
              <span>{date}</span>
            </button>

            {/* 2. Time Trigger Button */}
            <button
              type="button"
              onClick={() => toggleBox('time')}
              style={{
                border: openBox === 'time' ? '1.5px solid var(--gold-600)' : '1px solid rgba(168, 124, 20, 0.25)',
                background: openBox === 'time' ? 'var(--gold-100)' : '#FAF8F5',
                borderRadius: '9999px',
                padding: '0.45rem 0.85rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: 'var(--gold-800)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              <Clock size={14} />
              <span>{time}</span>
            </button>

            {/* 3. Guests Trigger Button */}
            <button
              type="button"
              onClick={() => toggleBox('guests')}
              style={{
                border: openBox === 'guests' ? '1.5px solid var(--gold-600)' : '1px solid rgba(168, 124, 20, 0.25)',
                background: openBox === 'guests' ? 'var(--gold-100)' : '#FAF8F5',
                borderRadius: '9999px',
                padding: '0.45rem 0.85rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: 'var(--gold-800)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              <Users size={14} />
              <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
            </button>

            {/* 4. Seating Trigger Button */}
            <button
              type="button"
              onClick={() => toggleBox('seating')}
              style={{
                border: openBox === 'seating' ? '1.5px solid var(--gold-600)' : '1px solid rgba(168, 124, 20, 0.25)',
                background: openBox === 'seating' ? 'var(--gold-100)' : '#FAF8F5',
                borderRadius: '9999px',
                padding: '0.45rem 0.85rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: 'var(--gold-800)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{seatingOptions.find(z => z.id === seatingZone)?.label}</span>
            </button>

            {/* 5. Book Action Button */}
            <button 
              type="button"
              onClick={handleQuickSubmit}
              className="btn-gold"
              style={{ 
                borderRadius: '9999px', 
                padding: '0.55rem 1.4rem', 
                fontSize: '0.86rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                whiteSpace: 'nowrap'
              }}
            >
              <span>Book</span>
              <ArrowRight size={14} />
            </button>

            {/* VERY SHORT HORIZONTAL FLOATING MINI-BOX (With Arrow Tab Counter) */}
            {openBox && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 9px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#FFFFFF',
                  border: '1.5px solid var(--gold-500)',
                  borderRadius: '9999px',
                  padding: '0.4rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.16), 0 0 18px rgba(184, 138, 27, 0.12)',
                  zIndex: 100,
                  animation: 'scaleUp 0.15s ease-out',
                  whiteSpace: 'nowrap'
                }}
              >
                {/* 1. SHORT DATE BOX */}
                {openBox === 'date' && (
                  <>
                    {datePresets.map(dp => (
                      <button
                        key={dp.val}
                        type="button"
                        onClick={() => handleSelectOption(() => setDate(dp.val))}
                        style={{
                          border: date === dp.val ? '1.5px solid var(--gold-600)' : '1px solid rgba(0,0,0,0.08)',
                          background: date === dp.val ? 'var(--gold-100)' : '#FAF8F5',
                          color: date === dp.val ? 'var(--gold-800)' : 'var(--text-main)',
                          borderRadius: '9999px',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.76rem',
                          fontWeight: date === dp.val ? 800 : 600,
                          cursor: 'pointer'
                        }}
                      >
                        {dp.label}
                      </button>
                    ))}
                  </>
                )}

                {/* 2. TIME BOX WITH ARROW TAB COUNTER & PRESETS */}
                {openBox === 'time' && (
                  <>
                    {/* Presets */}
                    {timePresets.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          const [t, p] = slot.split(' ');
                          const [h, m] = t.split(':');
                          setCustomHour(parseInt(h, 10));
                          setCustomMin(parseInt(m, 10));
                          setCustomPeriod(p);
                          handleSelectOption(() => setTime(slot));
                        }}
                        style={{
                          border: time === slot ? '1.5px solid var(--gold-600)' : '1px solid rgba(0,0,0,0.08)',
                          background: time === slot ? 'var(--gold-100)' : '#FAF8F5',
                          color: time === slot ? 'var(--gold-800)' : 'var(--text-main)',
                          borderRadius: '9999px',
                          padding: '0.35rem 0.7rem',
                          fontSize: '0.76rem',
                          fontWeight: time === slot ? 800 : 600,
                          cursor: 'pointer'
                        }}
                      >
                        {slot}
                      </button>
                    ))}

                    {/* BESPOKE ARROW TAB COUNTER (No Default Browser Time Popup!) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', borderLeft: '1.5px solid rgba(168, 124, 20, 0.25)', paddingLeft: '0.5rem', marginLeft: '0.15rem' }}>
                      
                      {/* Hour Stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', background: '#FAF8F5', border: '1px solid rgba(168, 124, 20, 0.3)', borderRadius: '9999px', padding: '0.15rem 0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => stepHour(-1)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px', color: 'var(--gold-800)', display: 'flex', alignItems: 'center' }}
                        >
                          <ChevronLeft size={13} />
                        </button>
                        <span style={{ fontSize: '0.76rem', fontWeight: 800, minWidth: '18px', textAlign: 'center', color: 'var(--text-main)' }}>
                          {customHour}
                        </span>
                        <button
                          type="button"
                          onClick={() => stepHour(1)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px', color: 'var(--gold-800)', display: 'flex', alignItems: 'center' }}
                        >
                          <ChevronRight size={13} />
                        </button>
                      </div>

                      <span style={{ fontWeight: 800, color: 'var(--gold-800)', fontSize: '0.78rem' }}>:</span>

                      {/* Minute Stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', background: '#FAF8F5', border: '1px solid rgba(168, 124, 20, 0.3)', borderRadius: '9999px', padding: '0.15rem 0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => stepMinute(-15)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px', color: 'var(--gold-800)', display: 'flex', alignItems: 'center' }}
                        >
                          <ChevronLeft size={13} />
                        </button>
                        <span style={{ fontSize: '0.76rem', fontWeight: 800, minWidth: '20px', textAlign: 'center', color: 'var(--text-main)' }}>
                          {customMin < 10 ? '0' : ''}{customMin}
                        </span>
                        <button
                          type="button"
                          onClick={() => stepMinute(15)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px', color: 'var(--gold-800)', display: 'flex', alignItems: 'center' }}
                        >
                          <ChevronRight size={13} />
                        </button>
                      </div>

                      {/* AM/PM Toggle Button */}
                      <button
                        type="button"
                        onClick={togglePeriod}
                        style={{
                          border: '1px solid var(--gold-500)',
                          background: 'var(--gold-100)',
                          color: 'var(--gold-800)',
                          borderRadius: '9999px',
                          padding: '0.2rem 0.45rem',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        {customPeriod}
                      </button>

                      {/* Done Button */}
                      <button
                        type="button"
                        onClick={() => setOpenBox(null)}
                        style={{
                          border: 'none',
                          background: 'var(--gold-600)',
                          color: '#FFFFFF',
                          borderRadius: '50%',
                          width: '22px',
                          height: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          marginLeft: '0.2rem'
                        }}
                        title="Confirm time"
                      >
                        <Check size={13} />
                      </button>
                    </div>
                  </>
                )}

                {/* 3. SHORT GUESTS BOX */}
                {openBox === 'guests' && (
                  <>
                    {guestOptions.map(g => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => handleSelectOption(() => setGuests(g.value))}
                        style={{
                          border: guests === g.value ? '1.5px solid var(--gold-600)' : '1px solid rgba(0,0,0,0.08)',
                          background: guests === g.value ? 'var(--gold-100)' : '#FAF8F5',
                          color: guests === g.value ? 'var(--gold-800)' : 'var(--text-main)',
                          borderRadius: '9999px',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.76rem',
                          fontWeight: guests === g.value ? 800 : 600,
                          cursor: 'pointer'
                        }}
                      >
                        {g.label}
                      </button>
                    ))}

                    {/* Custom Guest Stepper Option */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', borderLeft: '1.5px solid rgba(168, 124, 20, 0.25)', paddingLeft: '0.5rem', marginLeft: '0.15rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--gold-800)', whiteSpace: 'nowrap' }}>
                        Custom:
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', background: '#FAF8F5', border: '1px solid rgba(168, 124, 20, 0.3)', borderRadius: '9999px', padding: '0.15rem 0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => {
                            soundEffects.playClickSound();
                            if (guests > 1) setGuests(guests - 1);
                          }}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px', color: 'var(--gold-800)', display: 'flex', alignItems: 'center' }}
                        >
                          <ChevronLeft size={13} />
                        </button>
                        <span style={{ fontSize: '0.76rem', fontWeight: 800, minWidth: '18px', textAlign: 'center', color: 'var(--text-main)' }}>
                          {guests}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            soundEffects.playClickSound();
                            if (guests < 50) setGuests(guests + 1);
                          }}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px', color: 'var(--gold-800)', display: 'flex', alignItems: 'center' }}
                        >
                          <ChevronRight size={13} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenBox(null)}
                        style={{
                          border: 'none',
                          background: 'var(--gold-600)',
                          color: '#FFFFFF',
                          borderRadius: '50%',
                          width: '22px',
                          height: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          marginLeft: '0.2rem'
                        }}
                        title="Confirm guests"
                      >
                        <Check size={13} />
                      </button>
                    </div>
                  </>
                )}

                {/* 4. SHORT SEATING BOX */}
                {openBox === 'seating' && (
                  <>
                    {seatingOptions.map(z => (
                      <button
                        key={z.id}
                        type="button"
                        onClick={() => handleSelectOption(() => setSeatingZone(z.id))}
                        style={{
                          border: seatingZone === z.id ? '1.5px solid var(--gold-600)' : '1px solid rgba(0,0,0,0.08)',
                          background: seatingZone === z.id ? 'var(--gold-100)' : '#FAF8F5',
                          color: seatingZone === z.id ? 'var(--gold-800)' : 'var(--text-main)',
                          borderRadius: '9999px',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.76rem',
                          fontWeight: seatingZone === z.id ? 800 : 600,
                          cursor: 'pointer'
                        }}
                      >
                        {z.label}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 2. SECTION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'var(--gold-100)',
              border: '1px solid var(--gold-500)',
              borderRadius: '9999px',
              padding: '0.35rem 1.15rem',
              color: 'var(--gold-800)',
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}
          >
            <LuxuryCrest size={14} color="var(--gold-700)" />
            <span>Heritage & Hospitality</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: 500 }}>
            About <span className="gold-gradient-text">L'Aura Grand Hotel & Estate</span>
          </h2>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.94rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.65 }}>
            Perched on the cliffside of the Pacific coastline since 1928, L'Aura Grand seamlessly unifies ultra-luxury hospitality with world-renowned 3-Michelin star gastronomy.
          </p>
        </div>

        {/* 3. 4 CORE ESTATE HIGHLIGHTS */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Pillar 1: Coastal Suites */}
          <div 
            className="luxury-card"
            style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1px solid rgba(168, 124, 20, 0.22)'
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--gold-100)',
                border: '1px solid var(--gold-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-800)',
                marginBottom: '1rem'
              }}
            >
              <Building2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              84 Oceanfront Suites
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', lineHeight: 1.6 }}>
              Cliffside penthouses with private heated infinity plunge pools, Italian marble bathrooms, and panoramic Pacific horizon views.
            </p>
          </div>

          {/* Pillar 2: 3-Michelin Gastronomy */}
          <div 
            className="luxury-card"
            style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1px solid rgba(168, 124, 20, 0.22)'
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--gold-100)',
                border: '1px solid var(--gold-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-800)',
                marginBottom: '1rem'
              }}
            >
              <Star size={22} fill="#C29320" color="#C29320" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              3-Michelin Gastronomy
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', lineHeight: 1.6 }}>
              Artisanal French cuisine orchestrated tableside by Master Chef Laurent Mercier, paired with our 4,500+ vintage Grand Cru cellar.
            </p>
          </div>

          {/* Pillar 3: Thalasso Spa & Wellness */}
          <div 
            className="luxury-card"
            style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1px solid rgba(168, 124, 20, 0.22)'
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--gold-100)',
                border: '1px solid var(--gold-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-800)',
                marginBottom: '1rem'
              }}
            >
              <Waves size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Ocean Thalasso Spa
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', lineHeight: 1.6 }}>
              Hydrothermal sea-salt baths, seaweed body therapy, private yoga pavilions, and restorative holistic vitality treatments.
            </p>
          </div>

          {/* Pillar 4: Private Yacht & Helipad */}
          <div 
            className="luxury-card"
            style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1px solid rgba(168, 124, 20, 0.22)'
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--gold-100)',
                border: '1px solid var(--gold-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-800)',
                marginBottom: '1rem'
              }}
            >
              <Compass size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Private Yacht & Helipad
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', lineHeight: 1.6 }}>
              Direct private helicopter arrival, bespoke sunset yacht cruises with champagne service, and chauffeur limousine transfers.
            </p>
          </div>
        </div>

        {/* 4. SHORT KEY FACTS TICKER STRIP WITH SMOOTH ANIMATIONS & 5-POINT GOLD STARS */}
        <div 
          ref={tickerRef}
          className="luxury-glass"
          style={{
            background: 'linear-gradient(135deg, #FAF8F5 0%, #FFFFFF 50%, #FAF8F5 100%)',
            border: '1.5px solid rgba(168, 124, 20, 0.35)',
            borderRadius: '1.25rem',
            padding: '2rem 2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
            boxShadow: '0 15px 40px rgba(20, 24, 33, 0.08), 0 0 20px rgba(184, 138, 27, 0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Smooth Subtle Ambient Light Sweep */}
          <div 
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-60%',
              width: '50%',
              height: '200%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
              transform: 'rotate(25deg)',
              animation: 'lightSweep 5s infinite cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none'
            }}
          />

          {/* Metric 1: Year Founded */}
          <div 
            style={{ transition: 'transform 0.3s ease', cursor: 'default' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div 
              className="gold-gradient-text"
              style={{ fontFamily: 'var(--font-brand)', fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1 }}
            >
              {countYear}
            </div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-sub)', fontWeight: 700, marginTop: '0.35rem' }}>
              Heritage Founded
            </div>
          </div>

          {/* Metric 2: 3-Michelin Distinction (Classic 5-Point Gold Stars) */}
          <div 
            style={{ transition: 'transform 0.3s ease', cursor: 'default' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.45rem', 
                height: '42px'
              }}
            >
              {[0, 1, 2].map((idx) => (
                <div 
                  key={idx}
                  style={{
                    transform: starsRevealed[idx] ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-45deg)',
                    opacity: starsRevealed[idx] ? 1 : 0,
                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  <Star size={24} fill="#C29320" color="#C29320" />
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-sub)', fontWeight: 700, marginTop: '0.35rem' }}>
              3-Michelin Distinction
            </div>
          </div>

          {/* Metric 3: Grand Cru Cellar */}
          <div 
            style={{ transition: 'transform 0.3s ease', cursor: 'default' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div 
              className="gold-gradient-text"
              style={{ fontFamily: 'var(--font-brand)', fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1 }}
            >
              {countCellar.toLocaleString()}+
            </div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-sub)', fontWeight: 700, marginTop: '0.35rem' }}>
              Grand Cru Cellar
            </div>
          </div>

          {/* Metric 4: World's 50 Best */}
          <div 
            style={{ transition: 'transform 0.3s ease', cursor: 'default' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div 
              className="gold-gradient-text"
              style={{ fontFamily: 'var(--font-brand)', fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1 }}
            >
              #{countRank}
            </div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-sub)', fontWeight: 700, marginTop: '0.35rem' }}>
              World's 50 Best
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
