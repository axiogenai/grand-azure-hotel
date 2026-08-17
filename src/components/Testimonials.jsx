import React from 'react';
import { Star, Award, CheckCircle2, Quote } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      author: 'Lord & Lady Harrington',
      role: 'Private Yacht Owner & Returning VIP',
      suite: 'Azure Overwater Horizon Villa',
      rating: 5,
      date: 'July 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      text: 'From the private helicopter touchdown to the Michelin tasting at L’Aura, our stay was pure magic. Our butler James anticipated every desire before we could even ask. The $250 scratch credit was a delightful touch.'
    },
    {
      author: 'Sophia Zhang, Architecture Critic',
      role: 'Condé Nast Traveler Guest Review',
      suite: 'The Grand Imperial Penthouse',
      rating: 5,
      date: 'August 2026',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      text: 'An architectural tour de force. The cantilevered heated pool suspended over the crashing waves offers the most breathtaking sunset view on Earth. The level of refinement is unmatched anywhere in the world.'
    },
    {
      author: 'Dr. Julian & Marcella Moreau',
      role: 'Honeymoon Couple',
      suite: 'Oceanfront Sunset Pool Suite',
      rating: 5,
      date: 'June 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      text: 'We unlocked a 50% Grand Jackpot on the guest scratch card and upgraded immediately to the Sunset Suite. The couples thermal hydrotherapy and sunset Riva yacht cruise made this our dream honeymoon.'
    }
  ];

  return (
    <section id="experiences" style={{ padding: '5rem 1.5rem', position: 'relative' }}>
      <div className="container-luxury">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span 
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold-400)',
              fontWeight: 700
            }}
          >
            Esteemed Guest Chronicles
          </span>
          <h2 
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              marginTop: '0.5rem',
              marginBottom: '1rem',
              color: '#FFFFFF'
            }}
          >
            Praised by World <span className="gold-gradient-text">Connoisseurs</span>
          </h2>
          <p style={{ color: 'var(--sand-200)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Read genuine reflections from royalty, industry leaders, and global travelers who call Aura Grand Azure their sanctuary.
          </p>
        </div>

        {/* Reviews Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {reviews.map((rev, i) => (
            <div 
              key={i}
              className="luxury-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <Quote size={32} color="rgba(212, 175, 55, 0.2)" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }} />

              <div>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} size={15} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--sand-100)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{rev.text}"
                </p>
              </div>

              {/* Author Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
                <img 
                  src={rev.avatar} 
                  alt={rev.author} 
                  style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--gold-500)' }} 
                />
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {rev.author}
                    <CheckCircle2 size={13} color="var(--emerald-400)" title="Verified VIP Stay" />
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--gold-400)' }}>
                    {rev.role}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--sand-300)' }}>
                    Stayed in {rev.suite} • {rev.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
