import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Ship, 
  Sun, 
  Compass, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { AMENITIES_DATA } from '../data/amenitiesData';
import { soundEffects } from '../utils/soundEffects';

export function AmenitiesSection() {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleBookAmenity = (amenity) => {
    soundEffects.playClickSound();
    setSelectedAmenity(amenity);
    setIsBooked(false);
  };

  const handleConfirmAmenity = () => {
    soundEffects.playWinChime();
    setIsBooked(true);
  };

  return (
    <section id="amenities" style={{ padding: '5rem 1.5rem', background: 'rgba(7, 11, 24, 0.5)', position: 'relative' }}>
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
            Sanctuary & Leisure
          </span>
          <h2 
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              marginTop: '0.5rem',
              marginBottom: '1rem',
              color: '#FFFFFF'
            }}
          >
            Thermal Wellness & <span className="gold-gradient-text">Private Charters</span>
          </h2>
          <p style={{ color: 'var(--sand-200)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Surrender to tranquil wellness therapies, cruise the crystal blue promontory on private Italian Riva yachts, and arrive in effortless style via direct helipad landing.
          </p>
        </div>

        {/* 2x2 Grid of Amenities */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {AMENITIES_DATA.map(item => (
            <div 
              key={item.id}
              className="luxury-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 30%, rgba(11, 19, 43, 0.95) 100%)'
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(7, 11, 24, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--gold-500)',
                    color: 'var(--gold-300)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}
                >
                  {item.badge}
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-400)', fontWeight: 700, marginBottom: '0.2rem' }}>
                  {item.category}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--sand-50)', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--sand-200)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {item.description}
                </p>

                {/* Inclusions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {item.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--sand-100)' }}>
                      <Check size={13} color="var(--gold-400)" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleBookAmenity(item)}
                  className="btn-outline-gold"
                  style={{ marginTop: 'auto', width: '100%', padding: '0.65rem' }}
                >
                  Reserve Experience
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Booking Modal */}
      {selectedAmenity && (
        <div className="modal-backdrop" onClick={() => setSelectedAmenity(null)}>
          <div 
            className="modal-content luxury-glass"
            style={{ maxWidth: '520px', width: '100%', padding: '2rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            {!isBooked ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-400)', fontWeight: 700 }}>
                      Bespoke Concierge Booking
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
                      {selectedAmenity.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedAmenity(null)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--sand-100)', fontSize: '1.5rem', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--sand-200)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Our 24/7 VIP Concierge will coordinate your custom schedule, preferences, and private transportation.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Preferred Date
                    </label>
                    <input 
                      type="date"
                      defaultValue="2026-09-17"
                      style={{
                        width: '100%',
                        background: 'rgba(7, 11, 24, 0.7)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '0.6rem',
                        padding: '0.65rem 0.85rem',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Number of Guests
                    </label>
                    <select
                      style={{
                        width: '100%',
                        background: 'rgba(7, 11, 24, 0.7)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '0.6rem',
                        padding: '0.65rem 0.85rem',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests (Couples)</option>
                      <option value="4">4 Guests</option>
                      <option value="6">Private Charter Party (Up to 8)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleConfirmAmenity}
                  className="btn-gold"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  Send Request to VIP Concierge
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid var(--emerald-400)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    color: 'var(--emerald-400)'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  Experience Requested!
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--sand-200)', marginBottom: '1.5rem' }}>
                  Your dedicated Butler and Concierge team have logged your request for <strong>{selectedAmenity.title}</strong>. We will confirm with you upon arrival.
                </p>
                <button
                  onClick={() => setSelectedAmenity(null)}
                  className="btn-gold"
                  style={{ width: '100%', padding: '0.8rem' }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
