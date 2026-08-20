import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  UtensilsCrossed, 
  Calendar, 
  Ticket
} from 'lucide-react';
import { MichelinRosette } from './LuxuryIcons';
import { soundEffects } from '../utils/soundEffects';

interface NavbarProps {
  onOpenReserve: () => void;
  onOpenScratch: () => void;
  activeCoupon: any;
}

export function Navbar({ onOpenReserve, onOpenScratch, activeCoupon }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    soundEffects.playClickSound();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-header">
      {/* Floating Luxury Island Capsule Navbar */}
      <div 
        className="navbar-capsule"
        style={{ 
          background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
          boxShadow: isScrolled 
            ? '0 12px 35px rgba(20, 24, 33, 0.12), 0 2px 8px rgba(168, 124, 20, 0.1)' 
            : '0 8px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Left: Brand Emblem & Name */}
        <a 
          href="#" 
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <div 
            style={{
              width: '28px',
              height: '28px',
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
            <UtensilsCrossed size={14} />
          </div>
          <div>
            <div className="nav-brand-title">
              L'AURA GRAND
            </div>
            <div className="nav-brand-stars">
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
          {activeCoupon && (
            <div 
              style={{
                background: 'var(--emerald-50)',
                border: '1px solid var(--emerald-600)',
                color: 'var(--emerald-700)',
                padding: '0.22rem 0.55rem',
                borderRadius: '9999px',
                fontSize: '0.68rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                whiteSpace: 'nowrap'
              }}
            >
              <Ticket size={11} />
              <span>{activeCoupon.uniqueCode}</span>
            </div>
          )}

          {/* VIP Pass Button (Desktop Only) */}
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
            className="btn-gold nav-book-btn"
          >
            <Calendar size={12} />
            <span>Book</span>
          </button>

          {/* Mobile Menu Hamburger Toggle (Visible <= 1024px, Always inside capsule) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="nav-mobile-toggle-btn"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
            padding: '1.25rem 1.4rem',
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
