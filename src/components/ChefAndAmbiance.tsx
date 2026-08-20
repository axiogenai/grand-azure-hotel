import React from 'react';
import { Award, Wine, Sparkles, UtensilsCrossed, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export function ChefAndAmbiance() {
  const ambianceCards = [
    {
      title: 'Grand Sommelier Wine Vault',
      desc: 'Over 4,500 rare vintages, Grand Crus, and biodynamic champagnes curated by Head Sommelier Émilie Dubois.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Oceanfront Starlight Balcony',
      desc: 'Dine under celestial constellations with gentle Pacific breezes and panoramic illuminated wave vistas.',
      image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Private Velvet Dining Salon',
      desc: 'Exclusive private banquet salon accommodating up to 16 guests with custom personalized tasting menus.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section id="chef" style={{ padding: '6rem 1.5rem', background: '#FFFFFF', position: 'relative' }}>
      <div className="container-luxury">
        {/* Chef Bio Block */}
        <div 
          className="luxury-glass"
          style={{
            padding: '3.5rem 3rem',
            background: 'var(--bg-primary)',
            marginBottom: '5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}
        >
          {/* Portrait */}
          <div style={{ position: 'relative', height: '400px', borderRadius: '0.85rem', overflow: 'hidden', boxShadow: 'var(--shadow-luxury)' }}>
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80" 
              alt="Master Chef Laurent Mercier" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div 
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '0.85rem 1.25rem',
                borderRadius: '0.65rem',
                border: '1px solid var(--gold-hairline)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
              }}
            >
              <Award size={26} color="var(--gold-600)" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>Master Chef Laurent Mercier</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--gold-700)', fontWeight: 600 }}>Chef of the Year • 3 Michelin Stars</div>
              </div>
            </div>
          </div>

          {/* Bio Story */}
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-700)', fontWeight: 800 }}>
              Culinary Visionary
            </span>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--text-main)', marginTop: '0.3rem', marginBottom: '1.25rem', fontWeight: 500 }}>
              The Art & Discipline of <span className="gold-gradient-text">Pure Gastronomy</span>
            </h2>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-sub)', lineHeight: 1.8, marginBottom: '1.25rem', fontStyle: 'italic' }}>
              "Food is not merely sustenance; it is a live theatrical performance of memory, terroir, and precision chemistry. At L’Aura Grand, we honor each seasonal ingredient in its purest, most breathtaking form."
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Trained in Paris, Lyon, and Tokyo, Chef Laurent brings over 25 years of haute cuisine leadership, sourcing exclusively from biodynamic organic farms and day-boat fishermen.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              {RESTAURANT_INFO.accolades.map((acc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <Award size={15} color="var(--gold-600)" />
                  <span>{acc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ambiance Sanctuaries */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-700)', fontWeight: 800 }}>
            Atmosphere & Sanctuaries
          </span>
          <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', marginTop: '0.3rem' }}>
            An Atmosphere of Starlit Elegance
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.25rem' }}>
          {ambianceCards.map((item, i) => (
            <div key={i} className="luxury-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '240px', overflow: 'hidden' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.6rem', fontWeight: 600 }}>{item.title}</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
