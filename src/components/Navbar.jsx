import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  UtensilsCrossed, 
  Calendar, 
  Ticket
} from 'lucide-react';
import { MichelinRosette, LuxuryCrest } from './LuxuryIcons';
import { soundEffects } from '../utils/soundEffects';

export function Navbar({ onOpenReserve, onOpenScratch, activeCoupon }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    soundEffects.playClickSound();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92%',
        maxWidth: '1220px',
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Floating Luxury Island Capsule Navbar */}
      <div 
        style={{ 
          background: isScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 124, 20, 0.25)',
          borderRadius: '9999px',
          padding: '0.45rem 1.5rem',
          boxShadow: isScrolled 
            ? '0 12px 35px rgba(20, 24, 33, 0.12), 0 2px 8px rgba(168, 124, 20, 0.1)' 
            : '0 8px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          minHeight: '52px'
        }}
      >
        {/* Left: Brand Emblem & Name */}
        <a 
          href="#" 
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C29320 0%, #88640E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(168, 124, 20, 0.3)',
              flexShrink: 0
            }}
          >
            <UtensilsCrossed size={16} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-brand)', fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--text-main)', lineHeight: 1.1 }}>
              L'AURA GRAND
            </div>
            <div style={{ fontSize: '0.54rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-700)', fontWeight: 700 }}>
              ★★★ 3 Michelin Stars
            </div>
          </div>
        </a>

        {/* Center: Desktop Nav Links */}
        <nav style={{ display: 'none', lgDisplay: 'flex', alignItems: 'center', gap: '1.8rem' }}>
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, 'about')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.02em' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          >
            About Hotel
          </a>
          <a 
            href="#scratch-discounts" 
            onClick={(e) => handleNavClick(e, 'scratch-discounts')} 
            style={{ color: 'var(--gold-800)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', letterSpacing: '0.02em' }}
          >
            <MichelinRosette size={13} color="var(--gold-700)" />
            <span>VIP Pass</span>
          </a>
          <a 
            href="#menu" 
            onClick={(e) => handleNavClick(e, 'menu')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.02em' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          >
            Culinary Menu
          </a>
          <a 
            href="#reserve" 
            onClick={(e) => handleNavClick(e, 'reserve')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.02em' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          >
            Reservations
          </a>
          <a 
            href="#chef" 
            onClick={(e) => handleNavClick(e, 'chef')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.02em' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          >
            Master Chef
          </a>
          <a 
            href="#reviews" 
            onClick={(e) => handleNavClick(e, 'reviews')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.02em' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          >
            Reviews
          </a>
        </nav>

        {/* Right: Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {activeCoupon && (
            <div 
              style={{
                background: 'var(--emerald-50)',
                border: '1px solid var(--emerald-600)',
                color: 'var(--emerald-700)',
                padding: '0.28rem 0.65rem',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Ticket size={12} />
              <span>{activeCoupon.uniqueCode}</span>
            </div>
          )}

          {/* Scratch & Win Button */}
          <button
            onClick={() => {
              soundEffects.playClickSound();
              onOpenScratch();
            }}
            className="btn-outline-gold"
            style={{
              padding: '0.35rem 0.85rem',
              fontSize: '0.74rem',
              fontWeight: 700,
              height: '32px'
            }}
          >
            <MichelinRosette size={13} color="var(--gold-700)" />
            <span>VIP Draw</span>
          </button>

          {/* Reserve Table Button */}
          <button
            onClick={() => {
              soundEffects.playClickSound();
              onOpenReserve();
            }}
            className="btn-gold"
            style={{ 
              padding: '0.35rem 1.05rem', 
              fontSize: '0.76rem',
              height: '32px'
            }}
          >
            <Calendar size={13} />
            <span>Reserve Table</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div 
          style={{
            marginTop: '0.5rem',
            background: '#FFFFFF',
            border: '1px solid rgba(168, 124, 20, 0.25)',
            borderRadius: '1.25rem',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, 'about')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
          >
            🏰 About Hotel & Estate
          </a>
          <a 
            href="#scratch-discounts" 
            onClick={(e) => handleNavClick(e, 'scratch-discounts')} 
            style={{ color: 'var(--gold-800)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: 700 }}
          >
            🎟️ VIP Scratch Pass
          </a>
          <a 
            href="#menu" 
            onClick={(e) => handleNavClick(e, 'menu')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
          >
            🍽️ Culinary Menu & Tasting
          </a>
          <a 
            href="#reserve" 
            onClick={(e) => handleNavClick(e, 'reserve')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
          >
            🍷 Table Reservations
          </a>
          <a 
            href="#chef" 
            onClick={(e) => handleNavClick(e, 'chef')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.35rem 0' }}
          >
            👨‍🍳 Master Chef Laurent Mercier
          </a>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.4rem' }}>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenScratch();
              }}
              className="btn-outline-gold" 
              style={{ flex: 1, padding: '0.6rem', fontSize: '0.78rem' }}
            >
              🎟️ Scratch Card
            </button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="btn-gold" 
              style={{ flex: 1, padding: '0.6rem', fontSize: '0.78rem' }}
            >
              Reserve Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
