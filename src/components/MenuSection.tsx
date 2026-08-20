import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  Wine, 
  Check, 
  Plus, 
  Info, 
  Star 
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
import { soundEffects } from '../utils/soundEffects';

export function MenuSection({ onSelectDishForReservation }) {
  const [activeCategory, setActiveCategory] = useState('tasting');

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" style={{ padding: '6rem 1.5rem', background: '#FFFFFF', position: 'relative' }}>
      <div className="container-luxury">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span 
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold-700)',
              fontWeight: 800
            }}
          >
            Culinary Repertoire
          </span>
          <h2 
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              marginTop: '0.4rem',
              marginBottom: '1rem',
              color: 'var(--text-main)'
            }}
          >
            Signature Menus & <span className="gold-gradient-text">Haute Gastronomy</span>
          </h2>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.94rem', lineHeight: 1.7 }}>
            Every creation is a tribute to French classical technique and Pacific terroir. Prepared daily with farm-to-table seasonal purity and tableside artistry.
          </p>
        </div>

        {/* Category Tabs */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '3.5rem'
          }}
        >
          {MENU_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                soundEffects.playClickSound();
                setActiveCategory(cat.id);
              }}
              style={{
                background: activeCategory === cat.id 
                  ? 'linear-gradient(135deg, #C29320, #A87C14)' 
                  : '#FAF8F5',
                color: activeCategory === cat.id ? '#FFFFFF' : 'var(--text-sub)',
                border: activeCategory === cat.id ? 'none' : '1px solid rgba(0, 0, 0, 0.08)',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                letterSpacing: '0.02em',
                boxShadow: activeCategory === cat.id ? '0 4px 15px rgba(168, 124, 20, 0.3)' : 'none'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.25rem'
          }}
        >
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="luxury-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* Dish Photo */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Badge */}
                {item.badge && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid var(--gold-500)',
                      color: 'var(--gold-800)',
                      padding: '0.3rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 800
                    }}
                  >
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', lineHeight: 1.3, fontWeight: 600 }}>
                    {item.name}
                  </h3>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
                  {item.description}
                </p>

                {/* Dietary Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {item.dietary.map((tag, i) => (
                    <span 
                      key={i}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        borderRadius: '4px',
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.7rem',
                        color: 'var(--text-sub)',
                        fontWeight: 600
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Pricing & CTA */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(0, 0, 0, 0.07)',
                    paddingTop: '1.25rem',
                    marginTop: 'auto'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-700)', fontFamily: 'var(--font-serif)' }}>
                      ${item.price}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}> / course</span>
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playClickSound();
                      onSelectDishForReservation(item);
                    }}
                    className="btn-gold"
                    style={{ padding: '0.55rem 1.1rem', fontSize: '0.78rem' }}
                  >
                    <Plus size={14} />
                    <span>Reserve For Menu</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
