import React from 'react';
import { 
  Wine,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { MichelinRosette, LuxuryCrest } from './LuxuryIcons';
import { soundEffects } from '../utils/soundEffects';

export function Hero({ onOpenScratch }) {
  const handleScrollToMenu = () => {
    soundEffects.playClickSound();
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToReserve = () => {
    soundEffects.playClickSound();
    const el = document.getElementById('reserve');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToScratch = () => {
    soundEffects.playClickSound();
    const el = document.getElementById('scratch-discounts');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenScratch();
    }
  };

  return (
    <section 
      id="hero"
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8.5rem 1.5rem 6.5rem',
        overflow: 'hidden'
      }}
    >
      {/* 1. Crystal-Clear Luxury Restaurant Interior Background Image */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2600&q=95')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          zIndex: 0
        }}
      />

      {/* 2. BLACK CORNER-ONLY VIGNETTE: Center is crystal clear, dark shadow ONLY on corners and edges */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0.75) 80%, rgba(0, 0, 0, 0.92) 100%)',
          zIndex: 1
        }}
      />

      {/* 3. Subtle Dark Top & Bottom Edge Gradient */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(7, 11, 24, 0.7) 0%, transparent 20%, transparent 75%, rgba(7, 11, 24, 0.85) 100%)',
          zIndex: 2
        }}
      />

      {/* Hero Content Container */}
      <div 
        className="container-luxury"
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Minimalist Top Pill Badge */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212, 175, 55, 0.5)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            borderRadius: '9999px',
            padding: '0.42rem 1.4rem',
            marginBottom: '1.5rem',
            color: '#FDE047',
            fontSize: '0.74rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase'
          }}
        >
          <MichelinRosette size={14} color="#FDE047" />
          <span>3-MICHELIN STAR HAUTE GASTRONOMY SANCTUARY</span>
          <MichelinRosette size={14} color="#FDE047" />
        </div>

        {/* Bold Serif White Headline */}
        <h1 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 6.4vw, 5rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            color: '#FFFFFF',
            marginBottom: '1.25rem',
            letterSpacing: '-0.025em',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 1px 4px rgba(0, 0, 0, 0.8)'
          }}
        >
          Taste. Savor. Transcend.
        </h1>

        {/* Subtitle */}
        <p 
          style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.22rem)',
            color: '#E2E8F0',
            maxWidth: '720px',
            lineHeight: 1.65,
            marginBottom: '2.25rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
          }}
        >
          An extraordinary culinary sanctuary perched on the Pacific promontory. 
          Indulge in 24 artisanal French tasting menus orchestrated by Master Chef Laurent Mercier.
        </p>

        {/* Action Pills */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >
          {/* Deep Cognac Gold Primary Button */}
          <button
            onClick={handleScrollToMenu}
            style={{
              background: 'linear-gradient(135deg, #DEB54C 0%, #B88A1B 50%, #85610E 100%)',
              color: '#0B111E',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.85rem 2.25rem',
              fontSize: '0.86rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 6px 25px rgba(184, 138, 27, 0.5)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>EXPLORE 24 MENUS</span>
            <ArrowRight size={16} />
          </button>

          {/* Frosted Glass Secondary Button */}
          <button
            onClick={handleScrollToReserve}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              color: '#FFFFFF',
              border: '1.5px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '9999px',
              padding: '0.85rem 2.25rem',
              fontSize: '0.86rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>RESERVE A TABLE</span>
            <Wine size={16} color="#FDE047" />
          </button>
        </div>

        {/* Floating VIP Scratch Coupon Banner */}
        <div 
          onClick={handleScrollToScratch}
          className="shimmer-badge"
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(212, 175, 55, 0.6)',
            borderRadius: '9999px',
            padding: '0.6rem 1.4rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.3)',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div 
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #DEB54C, #9E7412)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0B111E',
              flexShrink: 0
            }}
          >
            <MichelinRosette size={14} color="#0B111E" />
          </div>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF' }}>
            VIP Dining Pass — Unlock Exclusive Mystery Rewards
          </div>
          <ChevronRight size={15} color="#DEB54C" />
        </div>
      </div>
    </section>
  );
}
