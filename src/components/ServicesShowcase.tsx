import React from 'react';
import { 
  Bed, 
  UtensilsCrossed, 
  Sparkles, 
  Ship, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export function ServicesShowcase({ onSelectService }) {
  const services = [
    {
      id: 'suites',
      title: 'Suites & Overwater Villas',
      category: 'Sanctuary Living',
      icon: Bed,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      description: 'Private cantilevered plunge pools, glass-bottom ocean salons, and 24/7 dedicated butler service.',
      actionText: 'Explore Suites & Villas',
      anchor: 'suites'
    },
    {
      id: 'dining',
      title: 'Michelin-Starred Gastronomy',
      category: 'Culinary Artistry',
      icon: UtensilsCrossed,
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      description: 'Three world-renowned fine dining restaurants led by 3-Michelin starred Executive Chef Laurent Mercier.',
      actionText: 'Reserve A Table',
      anchor: 'dining'
    },
    {
      id: 'wellness',
      title: 'Thermal Spa & Hydrotherapy',
      category: 'Holistic Rejuvenation',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
      description: 'Roman thermal circuit, sound baths, Himalayan salt grotto, and organic botanical body rituals.',
      actionText: 'Discover Spa Rituals',
      anchor: 'amenities'
    },
    {
      id: 'experiences',
      title: 'Private Riva Yacht & Helipad',
      category: 'Bespoke Journeys',
      icon: Ship,
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=800&q=80',
      description: 'Sunset dolphin cruises, secluded island picnics, deep-sea expeditions, and direct helipad landings.',
      actionText: 'View Bespoke Charters',
      anchor: 'experiences'
    }
  ];

  const handleCardClick = (anchor) => {
    soundEffects.playClickSound();
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services-overview" style={{ padding: '5rem 1.5rem', position: 'relative' }}>
      <div className="container-luxury">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <span 
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold-400)',
              fontWeight: 700
            }}
          >
            Unrivaled World-Class Hospitality
          </span>
          <h2 
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              marginTop: '0.5rem',
              marginBottom: '1rem',
              color: '#FFFFFF'
            }}
          >
            An Odyssey of <span className="gold-gradient-text">Pure Indulgence</span>
          </h2>
          <p style={{ color: 'var(--sand-200)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Every touchpoint at Aura Grand Azure is thoughtfully curated for the world’s most discerning travelers. Explore our signature services and exclusive experiences.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="luxury-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => handleCardClick(item.anchor)}
              >
                {/* Image Container */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(11, 19, 43, 0.95) 100%)'
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(7, 11, 24, 0.8)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '9999px',
                      padding: '0.35rem 0.85rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--gold-300)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Icon size={12} />
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', color: 'var(--sand-50)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--sand-200)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                    {item.description}
                  </p>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--gold-400)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
