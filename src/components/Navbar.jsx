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
        top: '0.75rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '94%',
        maxWidth: '1220px',
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Floating Luxury Island Capsule Navbar */}
      <div 
        style={{ 
          background: isScrolled ? 'rgba(255, 255, 255, 0.97)' : 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 124, 20, 0.28)',
          borderRadius: '9999px',
          padding: '0.45rem 1.4rem',
          boxShadow: isScrolled 
            ? '0 12px 35px rgba(20, 24, 33, 0.12), 0 2px 8px rgba(168, 124, 20, 0.1)' 
            : '0 8px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          minHeight: '52px',
          gap: '1rem'
        }}
      >
        {/* Left: Brand Emblem & Name */}
        <a 
          href="#" 
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <div 
            style={{
              width: '34px',
              height: '34px',
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
            <div style={{ fontFamily: 'var(--font-brand)', fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--text-main)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
              L'AURA GRAND
            </div>
            <div style={{ fontSize: '0.54rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-700)', fontWeight: 700, whiteSpace: 'nowrap' }}>
              ★★★ 3 Michelin Stars
            </div>
          </div>
        </a>

        {/* Center: Desktop Nav Links (Hidden on Tablet/Mobile via CSS) */}
        <nav className="nav-center-links">
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, 'about')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          >
            About Hotel
          </a>
          <a 
            href="#scratch-discounts" 
            onClick={(e) => handleNavClick(e, 'scratch-discounts')} 
            style={{ color: 'var(--gold-800)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}
          >
            <MichelinRosette size={13} color="var(--gold-700)" />
            <span>VIP Pass</span>
          </a>
          <a 
            href="#menu" 
            onClick={(e) => handleNavClick(e, 'menu')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          >
            Culinary Menu
          </a>
          <a 
            href="#reserve" 
            onClick={(e) => handleNavClick(e, 'reserve')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          >
            Reservations
          </a>
          <a 
            href="#chef" 
            onClick={(e) => handleNavClick(e, 'chef')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          >
            Master Chef
          </a>
          <a 
            href="#reviews" 
            onClick={(e) => handleNavClick(e, 'reviews')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          >
            Reviews
          </a>
        </nav>

        {/* Right: Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
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
                gap: '0.3rem',
                whiteSpace: 'nowrap'
              }}
            >
              <Ticket size={12} />
              <span>{activeCoupon.uniqueCode}</span>
            </div>
          )}

          {/* VIP Pass Button */}
          <button
            onClick={() => {
              soundEffects.playClickSound();
              onOpenScratch();
            }}
            className="btn-outline-gold nav-vip-btn"
            style={{
              padding: '0.35rem 0.85rem',
              fontSize: '0.74rem',
              fontWeight: 700,
              height: '34px',
              whiteSpace: 'nowrap'
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
              height: '34px',
              whiteSpace: 'nowrap'
            }}
          >
            <Calendar size={13} />
            <span>Book</span>
          </button>

          {/* Mobile Menu Hamburger Toggle (Visible <= 1024px) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="nav-mobile-toggle-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '0.35rem',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div 
          style={{
            marginTop: '0.5rem',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(168, 124, 20, 0.28)',
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
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
          >
            🏰 About Hotel & Estate
          </a>
          <a 
            href="#scratch-discounts" 
            onClick={(e) => handleNavClick(e, 'scratch-discounts')} 
            style={{ color: 'var(--gold-800)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: 700 }}
          >
            🎟️ VIP Scratch Pass
          </a>
          <a 
            href="#menu" 
            onClick={(e) => handleNavClick(e, 'menu')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
          >
            🍽️ Culinary Menu & Tasting
          </a>
          <a 
            href="#reserve" 
            onClick={(e) => handleNavClick(e, 'reserve')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
          >
            🍷 Table Reservations
          </a>
          <a 
            href="#chef" 
            onClick={(e) => handleNavClick(e, 'chef')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
          >
            👨‍🍳 Master Chef Laurent Mercier
          </a>
          <a 
            href="#reviews" 
            onClick={(e) => handleNavClick(e, 'reviews')} 
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.4rem 0' }}
          >
            ⭐ Critic Reviews & FAQs
          </a>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(168, 124, 20, 0.15)' }}>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenScratch();
              }}
              className="btn-outline-gold"
              style={{ flex: 1, padding: '0.55rem 0', fontSize: '0.8rem' }}
            >
              🎟️ Scratch VIP Draw
            </button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="btn-gold"
              style={{ flex: 1, padding: '0.55rem 0', fontSize: '0.8rem' }}
            >
              🍷 Reserve Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
