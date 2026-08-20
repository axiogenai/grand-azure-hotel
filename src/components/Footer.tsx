import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Award, 
  Send, 
  CheckCircle2, 
  UtensilsCrossed 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { soundEffects } from '../utils/soundEffects';

export function Footer({ onOpenScratch, onOpenReserve }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    soundEffects.playWinChime();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer 
      style={{
        background: '#FAF8F5',
        borderTop: '1px solid rgba(168, 124, 20, 0.25)',
        paddingTop: '5rem',
        paddingBottom: '3rem'
      }}
    >
      <div className="container-luxury">
        {/* Newsletter Callout */}
        <div 
          className="luxury-glass"
          style={{
            background: '#FFFFFF',
            padding: '2.5rem 2rem',
            borderRadius: '1rem',
            marginBottom: '4.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            boxShadow: 'var(--shadow-luxury)'
          }}
        >
          <div style={{ maxWidth: '480px' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-700)', fontWeight: 800 }}>
              The Epicurean Society
            </span>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '0.2rem', fontWeight: 600 }}>
              Subscribe For Exclusive Seasonal Tastings
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)' }}>
              Receive invitations to rare Grand Cru cellar releases, white truffle season previews, and an instant $25 dining voucher.
            </p>
          </div>

          <div style={{ flex: 1, minWidth: '280px', maxWidth: '440px' }}>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.6rem' }}>
                <input 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#FAF8F5',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.25rem',
                    color: 'var(--text-main)',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                  required
                />
                <button type="submit" className="btn-gold" style={{ padding: '0.75rem 1.4rem' }}>
                  <Send size={15} />
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--emerald-50)', border: '1px solid var(--emerald-600)', color: 'var(--emerald-700)', padding: '0.75rem 1.25rem', borderRadius: '9999px', fontSize: '0.84rem', fontWeight: 700 }}>
                <CheckCircle2 size={16} />
                <span>$25 Dining voucher sent to your inbox!</span>
              </div>
            )}
          </div>
        </div>

        {/* 4 Footer Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #C29320, #A87C14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <UtensilsCrossed size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-brand)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.12em' }}>
                L'AURA GRAND
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              A 3 Michelin-starred sanctuary of contemporary French gastronomy, Pacific oceanfront vistas, and unforgettable dining theater.
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--gold-700)', fontWeight: 800 }}>
              ★★★ 3 Michelin Stars (2024–2026)
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontSize: '0.86rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-800)', marginBottom: '1.2rem', fontWeight: 800 }}>
              Hours of Service
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem', color: 'var(--text-sub)' }}>
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Lunch:</strong>
                {RESTAURANT_INFO.hours.lunch}
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Dinner:</strong>
                {RESTAURANT_INFO.hours.dinner}
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Starlight Lounge:</strong>
                {RESTAURANT_INFO.hours.lounge}
              </div>
            </div>
          </div>

          {/* Guest Services */}
          <div>
            <h4 style={{ fontSize: '0.86rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-800)', marginBottom: '1.2rem', fontWeight: 800 }}>
              Guest Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.84rem' }}>
              <li><a href="#menu" style={{ color: 'var(--text-sub)', textDecoration: 'none' }}>Chef's 7-Course Tasting Menu</a></li>
              <li><a href="#scratch-discounts" style={{ color: 'var(--gold-800)', textDecoration: 'none', fontWeight: 700 }}>🎟️ VIP Scratch Pass</a></li>
              <li><a href="#reserve" style={{ color: 'var(--text-sub)', textDecoration: 'none' }}>Oceanfront Table Booking</a></li>
              <li><a href="#chef" style={{ color: 'var(--text-sub)', textDecoration: 'none' }}>Private Dining & Banquets</a></li>
              <li><a href="#reviews" style={{ color: 'var(--text-sub)', textDecoration: 'none' }}>Michelin Inspector Notes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.86rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-800)', marginBottom: '1.2rem', fontWeight: 800 }}>
              Reservations & Location
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem', color: 'var(--text-sub)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                <MapPin size={15} color="var(--gold-600)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={15} color="var(--gold-600)" />
                <a href="tel:+18002872589" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600 }}>{RESTAURANT_INFO.phone}</a>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={onOpenReserve} className="btn-gold" style={{ padding: '0.5rem 1.2rem', fontSize: '0.76rem' }}>
                  Reserve Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '1.75rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          <div>© 2026 L'Aura Grand Haute Gastronomy & Ocean Lounge. All Rights Reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Dining Terms</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Valet Parking Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
