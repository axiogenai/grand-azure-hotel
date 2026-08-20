import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Clock, 
  UserCheck, 
  Sparkles, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Wine 
} from 'lucide-react';
import { DINING_DATA } from '../data/diningData';
import { soundEffects } from '../utils/soundEffects';
import { storage } from '../utils/storage';

export function DiningSection({ onReservationComplete }) {
  const [activeRestaurant, setActiveRestaurant] = useState(DINING_DATA[0]);
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-09-16');
  const [selectedTime, setSelectedTime] = useState(DINING_DATA[0].timeSlots[2]);
  const [selectedTableType, setSelectedTableType] = useState(DINING_DATA[0].tableTypes[0].name);
  const [partySize, setPartySize] = useState('2');
  const [specialNotes, setSpecialNotes] = useState('Anniversary Celebration. Window view preferred.');
  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const handleOpenReserve = (restaurant) => {
    soundEffects.playClickSound();
    setActiveRestaurant(restaurant);
    setSelectedTime(restaurant.timeSlots[2] || restaurant.timeSlots[0]);
    setSelectedTableType(restaurant.tableTypes[0].name);
    setConfirmedReservation(null);
    setIsResModalOpen(true);
  };

  const handleSubmitReservation = (e) => {
    e.preventDefault();
    soundEffects.playWinChime();

    const newRes = {
      id: `DIN-2026-${Math.floor(100 + Math.random() * 900)}`,
      restaurantName: activeRestaurant.name,
      date: selectedDate,
      timeSlot: selectedTime,
      partySize: parseInt(partySize, 10),
      tableType: selectedTableType,
      status: 'Confirmed',
      notes: specialNotes,
      createdAt: new Date().toISOString()
    };

    storage.addDining(newRes);
    setConfirmedReservation(newRes);
    if (onReservationComplete) {
      onReservationComplete(newRes);
    }
  };

  return (
    <section id="dining" style={{ padding: '5rem 1.5rem', position: 'relative' }}>
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
            Gastronomic Excellence
          </span>
          <h2 
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              marginTop: '0.5rem',
              marginBottom: '1rem',
              color: '#FFFFFF'
            }}
          >
            Michelin-Starred <span className="gold-gradient-text">Fine Dining</span>
          </h2>
          <p style={{ color: 'var(--sand-200)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Led by world-renowned culinary masters, our signature venues blend fresh coastal harvest with visionary gastronomy, rare vintage cellars, and oceanfront open-air dining.
          </p>
        </div>

        {/* Restaurant Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {DINING_DATA.map(rest => (
            <div 
              key={rest.id}
              className="luxury-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* Image Banner */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img 
                  src={rest.image} 
                  alt={rest.name}
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
                  {rest.tagline.split('•')[0]}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--sand-50)', marginBottom: '0.3rem' }}>
                  {rest.name}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-400)', fontWeight: 600, marginBottom: '0.85rem' }}>
                  {rest.chef}
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--sand-200)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {rest.description}
                </p>

                {/* Specialties */}
                <div style={{ background: 'rgba(7, 11, 24, 0.5)', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid rgba(212, 175, 55, 0.15)', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-300)', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Chef's Signature Creations:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {rest.specialties.map((dish, i) => (
                      <li key={i} style={{ fontSize: '0.76rem', color: 'var(--sand-100)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ color: 'var(--gold-400)' }}>•</span> {dish}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Info & Button */}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--sand-200)' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} /> {rest.hours.split('•')[0]}
                  </div>
                  <button
                    onClick={() => handleOpenReserve(rest)}
                    className="btn-gold"
                    style={{ padding: '0.55rem 1.15rem', fontSize: '0.78rem' }}
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Table Reservation Modal */}
      {isResModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsResModalOpen(false)}>
          <div 
            className="modal-content luxury-glass"
            style={{ maxWidth: '560px', width: '100%', padding: '2rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            {!confirmedReservation ? (
              <form onSubmit={handleSubmitReservation}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-400)', fontWeight: 700 }}>
                      Table Reservation
                    </span>
                    <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
                      {activeRestaurant.name}
                    </h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsResModalOpen(false)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--sand-100)', fontSize: '1.5rem', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>

                {/* Date & Time */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} /> Date
                    </label>
                    <input 
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
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
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      <Users size={13} style={{ display: 'inline', marginRight: '4px' }} /> Party Size
                    </label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
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
                      <option value="1" style={{ background: '#0B132B' }}>1 Guest</option>
                      <option value="2" style={{ background: '#0B132B' }}>2 Guests (Romantic)</option>
                      <option value="3" style={{ background: '#0B132B' }}>3 Guests</option>
                      <option value="4" style={{ background: '#0B132B' }}>4 Guests</option>
                      <option value="6" style={{ background: '#0B132B' }}>6 Guests (Private Salon)</option>
                      <option value="8" style={{ background: '#0B132B' }}>8+ Guests (Celebration)</option>
                    </select>
                  </div>
                </div>

                {/* Table Seating Preference */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Seating Atmosphere & Location
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {activeRestaurant.tableTypes.map(t => (
                      <div 
                        key={t.id}
                        onClick={() => setSelectedTableType(t.name)}
                        style={{
                          background: selectedTableType === t.name ? 'rgba(212, 175, 55, 0.15)' : 'rgba(7, 11, 24, 0.5)',
                          border: selectedTableType === t.name ? '1px solid var(--gold-500)' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '0.6rem',
                          padding: '0.65rem 0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span style={{ fontSize: '0.82rem', color: 'var(--sand-50)', fontWeight: 500 }}>{t.name}</span>
                        {t.extraFee > 0 ? (
                          <span style={{ fontSize: '0.74rem', color: 'var(--gold-400)' }}>+${t.extraFee} cover</span>
                        ) : (
                          <span style={{ fontSize: '0.74rem', color: 'var(--emerald-400)' }}>Included</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Available Time Slots
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {activeRestaurant.timeSlots.map(time => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        style={{
                          background: selectedTime === time ? 'var(--gold-500)' : 'rgba(7, 11, 24, 0.7)',
                          color: selectedTime === time ? 'var(--navy-950)' : 'var(--sand-100)',
                          border: selectedTime === time ? 'none' : '1px solid rgba(212, 175, 55, 0.2)',
                          borderRadius: '0.4rem',
                          padding: '0.45rem 0.75rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Dietary & Occasion Notes */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-300)', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Dietary Requirements / Special Occasion Notes
                  </label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(7, 11, 24, 0.7)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '0.6rem',
                      padding: '0.65rem 0.85rem',
                      color: '#FFFFFF',
                      fontSize: '0.82rem',
                      outline: 'none',
                      resize: 'none'
                    }}
                    placeholder="e.g. Birthday celebration, gluten sensitivity, sommelier wine pairing preference"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  Confirm Table Reservation
                </button>
              </form>
            ) : (
              /* Success Confirmation */
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
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-400)', fontWeight: 700 }}>
                  Reservation Confirmed
                </span>
                <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginTop: '0.3rem', marginBottom: '0.5rem' }}>
                  {confirmedReservation.restaurantName}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--sand-200)', marginBottom: '1.5rem' }}>
                  Reference: <strong style={{ color: 'var(--gold-300)' }}>{confirmedReservation.id}</strong>
                </p>

                <div 
                  style={{
                    background: 'rgba(7, 11, 24, 0.6)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    textAlign: 'left',
                    fontSize: '0.84rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--sand-200)' }}>Date & Time:</span>
                    <strong style={{ color: '#FFFFFF' }}>{confirmedReservation.date} at {confirmedReservation.timeSlot}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--sand-200)' }}>Party Size:</span>
                    <strong style={{ color: '#FFFFFF' }}>{confirmedReservation.partySize} Guests</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--sand-200)' }}>Seating:</span>
                    <strong style={{ color: 'var(--gold-300)' }}>{confirmedReservation.tableType}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--sand-200)' }}>Status:</span>
                    <strong style={{ color: 'var(--emerald-400)' }}>Confirmed & Added to Profile</strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsResModalOpen(false)}
                  className="btn-gold"
                  style={{ width: '100%', padding: '0.8rem' }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
