import React from 'react';
import { 
  Sparkles, 
  Sun, 
  Waves, 
  Clock, 
  Award, 
  Wine, 
  Anchor, 
  Shield 
} from 'lucide-react';

export function Highlights() {
  const stats = [
    { value: '5-Star', label: 'Forbes Diamond Award', sub: 'Triple Crown Verified' },
    { value: '120', label: 'Oceanfront Sanctuaries', sub: 'With Private Infinity Pools' },
    { value: '3 Michelin', label: 'Starred Dining Venues', sub: 'By Master Laurent Mercier' },
    { value: '100%', label: 'Dedicated Butler Care', sub: '24/7 Personalized Concierge' }
  ];

  return (
    <section 
      style={{
        position: 'relative',
        zIndex: 2,
        marginTop: '-3rem',
        padding: '0 1.5rem 4rem'
      }}
    >
      <div className="container-luxury">
        {/* Stats Grid */}
        <div 
          className="luxury-glass"
          style={{
            padding: '2rem 1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7)'
          }}
        >
          {stats.map((stat, i) => (
            <div 
              key={i} 
              style={{
                textAlign: 'center',
                padding: '1rem',
                borderRight: i < stats.length - 1 ? '1px solid rgba(212, 175, 55, 0.15)' : 'none'
              }}
            >
              <div 
                className="gold-gradient-text"
                style={{
                  fontFamily: 'var(--font-brand)',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  marginBottom: '0.2rem'
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--sand-50)', marginBottom: '0.2rem' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--sand-200)' }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Live Resort Environment Telemetry Bar */}
        <div 
          style={{
            marginTop: '1.5rem',
            background: 'rgba(16, 27, 60, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '0.85rem',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: '1rem',
            fontSize: '0.78rem',
            color: 'var(--sand-200)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sun size={16} color="var(--gold-400)" />
            <span>Resort Microclimate: <strong>27°C / 81°F (Sunny & Calm)</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Waves size={16} color="var(--gold-400)" />
            <span>Azure Lagoon Temp: <strong>26.4°C (Crystal Clear Visibility)</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Anchor size={16} color="var(--gold-400)" />
            <span>Private Marina: <strong>Riva Fleet Ready for Sunset Cruises</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} color="var(--gold-400)" />
            <span>Tonight's Stargazing: <strong>100% Celestial Moon Viewing</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
