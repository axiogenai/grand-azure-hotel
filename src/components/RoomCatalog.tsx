import React, { useState } from 'react';
import { 
  Users, 
  Maximize2, 
  Bed, 
  Eye, 
  Check, 
  Star, 
  Sparkles, 
  CalendarCheck, 
  ChevronRight, 
  Info 
} from 'lucide-react';
import { ROOMS_DATA } from '../data/roomsData';
import { soundEffects } from '../utils/soundEffects';

export function RoomCatalog({ onSelectRoomForBooking, onOpenScratchModal }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [detailedRoom, setDetailedRoom] = useState(null);

  const filters = [
    { id: 'all', label: 'All Sanctuaries' },
    { id: 'Overwater Villa', label: 'Overwater Villas' },
    { id: 'Penthouse', label: 'Imperial Penthouses' },
    { id: 'Oceanfront Suite', label: 'Oceanfront Suites' },
    { id: 'Garden Villa', label: 'Botanical Villas' }
  ];

  const filteredRooms = selectedFilter === 'all' 
    ? ROOMS_DATA 
    : ROOMS_DATA.filter(r => r.category === selectedFilter);

  return (
    <section id="suites" style={{ padding: '5rem 1.5rem', background: 'rgba(7, 11, 24, 0.5)', position: 'relative' }}>
      <div className="container-luxury">
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <span 
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold-400)',
              fontWeight: 700
            }}
          >
            Exclusive Living Spaces
          </span>
          <h2 
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              marginTop: '0.5rem',
              marginBottom: '1rem',
              color: '#FFFFFF'
            }}
          >
            Suites, Penthouses & <span className="gold-gradient-text">Overwater Villas</span>
          </h2>
          <p style={{ color: 'var(--sand-200)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Crafted with Italian marble, warm natural teak, and expansive floor-to-ceiling glass that blurs the line between bespoke indoor luxury and the azure ocean.
          </p>
        </div>

        {/* Filter Pills */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '3rem'
          }}
        >
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => {
                soundEffects.playClickSound();
                setSelectedFilter(filter.id);
              }}
              style={{
                background: selectedFilter === filter.id 
                  ? 'linear-gradient(135deg, #DEB54C, #D4AF37)' 
                  : 'rgba(16, 27, 60, 0.6)',
                color: selectedFilter === filter.id ? 'var(--navy-950)' : 'var(--sand-200)',
                border: selectedFilter === filter.id ? 'none' : '1px solid rgba(212, 175, 55, 0.2)',
                padding: '0.6rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.04em'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Rooms Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredRooms.map(room => (
            <div 
              key={room.id}
              className="luxury-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Image & Badges */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <img 
                  src={room.image} 
                  alt={room.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(11, 19, 43, 0.95) 100%)'
                  }}
                />

                {/* Category Tag */}
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
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}
                >
                  {room.tag}
                </div>

                {/* Rating Badge */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(7, 11, 24, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <Star size={13} fill="#D4AF37" color="#D4AF37" />
                  <span>{room.rating}</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem' }}>({room.reviewsCount})</span>
                </div>

                {/* Quick Spec Pills on bottom of image */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '1rem',
                    right: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    color: 'var(--sand-100)'
                  }}
                >
                  <span>{room.size}</span>
                  <span>{room.view}</span>
                </div>
              </div>

              {/* Room Card Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--sand-50)', marginBottom: '0.2rem' }}>
                      {room.name}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gold-400)', fontWeight: 600 }}>
                      {room.bed} • Up to {room.maxGuests} Guests
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--sand-200)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {room.description}
                </p>

                {/* Amenities checklist */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {room.features.slice(0, 4).map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.74rem', color: 'var(--sand-100)' }}>
                      <Check size={13} color="var(--gold-400)" />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Action Container */}
                <div 
                  style={{
                    marginTop: 'auto',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gold-400)', fontFamily: 'var(--font-brand)' }}>
                        ${room.pricePerNight}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>
                        ${room.originalPrice}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--sand-200)' }}>/ night</span>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--emerald-400)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Sparkles size={10} /> Coupon discounts eligible
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        soundEffects.playClickSound();
                        setDetailedRoom(room);
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: 'var(--sand-100)',
                        padding: '0.55rem',
                        borderRadius: '0.6rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="View Full Gallery & Specs"
                    >
                      <Info size={16} />
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playClickSound();
                        onSelectRoomForBooking(room);
                      }}
                      className="btn-gold"
                      style={{ padding: '0.55rem 1.15rem', fontSize: '0.78rem' }}
                    >
                      <CalendarCheck size={14} />
                      <span>Reserve</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Detail Modal Peek */}
      {detailedRoom && (
        <div className="modal-backdrop" onClick={() => setDetailedRoom(null)}>
          <div 
            className="modal-content luxury-glass"
            style={{ maxWidth: '750px', width: '100%', padding: '2rem', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-400)', fontWeight: 700 }}>
                  {detailedRoom.category}
                </span>
                <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginTop: '0.2rem' }}>{detailedRoom.name}</h3>
              </div>
              <button 
                onClick={() => setDetailedRoom(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--sand-100)', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Gallery Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <img 
                src={detailedRoom.gallery[0]} 
                alt="Main view" 
                style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '0.75rem' }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <img 
                  src={detailedRoom.gallery[1] || detailedRoom.gallery[0]} 
                  alt="Detail view 1" 
                  style={{ width: '100%', height: '125px', objectFit: 'cover', borderRadius: '0.75rem' }} 
                />
                <img 
                  src={detailedRoom.gallery[2] || detailedRoom.gallery[0]} 
                  alt="Detail view 2" 
                  style={{ width: '100%', height: '125px', objectFit: 'cover', borderRadius: '0.75rem' }} 
                />
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--sand-200)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {detailedRoom.description}
            </p>

            <h4 style={{ fontSize: '1rem', color: 'var(--sand-50)', marginBottom: '0.75rem' }}>All Inclusions & Luxury Amenities:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem', marginBottom: '2rem' }}>
              {detailedRoom.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--sand-100)' }}>
                  <Check size={14} color="var(--gold-400)" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-400)', fontFamily: 'var(--font-brand)' }}>
                  ${detailedRoom.pricePerNight}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--sand-200)' }}> / night</span>
              </div>
              <button
                onClick={() => {
                  const r = detailedRoom;
                  setDetailedRoom(null);
                  onSelectRoomForBooking(r);
                }}
                className="btn-gold"
                style={{ padding: '0.8rem 1.8rem' }}
              >
                Proceed to Reserve Suite
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
